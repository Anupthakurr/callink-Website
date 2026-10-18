import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const STATS_FILE = path.join(DATA_DIR, "download-count.json");
const TMP_STATS_FILE = path.join("/tmp", "callink-download-count.json");

// Persistent global cloud counter (works across all Vercel serverless nodes without auth)
const CLOUD_COUNTER_KEY = "callink_official_downloads_v2";
const CLOUD_COUNTER_ENDPOINT = "https://countapi.mileshilliard.com/api/v1";

let memoryCount = 15;
let memoryLastDownloaded: string | null = null;

interface StatsData {
  count: number;
  lastDownloaded: string | null;
  history?: Array<{ timestamp: string; userAgent?: string }>;
}

function getLocalStats(): StatsData {
  // Check /tmp first (writable in Vercel lambdas)
  try {
    if (fs.existsSync(TMP_STATS_FILE)) {
      const raw = fs.readFileSync(TMP_STATS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {}

  // Check project data dir
  try {
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {}

  return { count: memoryCount, lastDownloaded: memoryLastDownloaded };
}

function saveLocalStats(data: StatsData): void {
  // Try writing to /tmp
  try {
    fs.writeFileSync(TMP_STATS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {}

  // Try writing to project data dir
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {}

  memoryCount = data.count;
  memoryLastDownloaded = data.lastDownloaded;
}

export async function incrementDownloadCount(userAgent?: string): Promise<{ count: number; storage: string }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  const now = new Date().toISOString();

  // 1. If Upstash Redis or Vercel KV is configured
  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl}/incr/callink_downloads_total`, {
        method: "POST",
        headers: { Authorization: `Bearer ${upstashToken}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (data && typeof data.result === "number") {
        return { count: data.result, storage: "upstash_redis" };
      }
    } catch (err) {
      console.error("Failed to increment Redis download count:", err);
    }
  }

  // 2. Global Cloud Counter (persists across all Vercel deployments, cold starts, and devices)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`${CLOUD_COUNTER_ENDPOINT}/hit/${CLOUD_COUNTER_KEY}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === "number") {
        memoryCount = data.value;
        memoryLastDownloaded = now;
        saveLocalStats({ count: data.value, lastDownloaded: now });
        return { count: data.value, storage: "cloud_kv" };
      }
    }
  } catch (err) {
    console.error("Cloud counter hit error:", err);
  }

  // 3. Fallback to local file / memory
  const stats = getLocalStats();
  stats.count = Math.max((stats.count || 0) + 1, memoryCount + 1);
  stats.lastDownloaded = now;
  if (!stats.history) stats.history = [];
  stats.history.unshift({ timestamp: now, userAgent: userAgent?.slice(0, 120) });
  if (stats.history.length > 50) stats.history = stats.history.slice(0, 50);

  saveLocalStats(stats);
  return { count: stats.count, storage: "local" };
}

export async function getDownloadStats(): Promise<{ count: number; lastDownloaded: string | null; storage: string }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  // 1. Upstash Redis
  if (upstashUrl && upstashToken) {
    try {
      const countRes = await fetch(`${upstashUrl}/get/callink_downloads_total`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
        cache: "no-store",
      });
      const countData = await countRes.json();
      const count = Number(countData.result);
      if (!isNaN(count) && count > 0) {
        return { count, lastDownloaded: null, storage: "upstash_redis" };
      }
    } catch {}
  }

  // 2. Global Cloud Counter
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`${CLOUD_COUNTER_ENDPOINT}/get/${CLOUD_COUNTER_KEY}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === "number") {
        memoryCount = Math.max(memoryCount, data.value);
        return { count: data.value, lastDownloaded: memoryLastDownloaded, storage: "cloud_kv" };
      }
    }
  } catch {}

  // 3. Fallback to local
  const stats = getLocalStats();
  const finalCount = Math.max(stats.count || 0, memoryCount, 15);
  return {
    count: finalCount,
    lastDownloaded: stats.lastDownloaded || memoryLastDownloaded,
    storage: "local",
  };
}
