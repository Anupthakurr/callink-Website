import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const STATS_FILE = path.join(DATA_DIR, "download-count.json");

// In-memory fallback if file system is read-only (e.g. some serverless runtimes)
let memoryCount = 0;
let memoryLastDownloaded: string | null = null;

interface StatsData {
  count: number;
  lastDownloaded: string | null;
  history?: Array<{ timestamp: string; userAgent?: string }>;
}

function getLocalStats(): StatsData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // If filesystem is restricted, return in-memory state
  }
  return { count: memoryCount, lastDownloaded: memoryLastDownloaded };
}

function saveLocalStats(data: StatsData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Fall back to memory
  }
  memoryCount = data.count;
  memoryLastDownloaded = data.lastDownloaded;
}

export async function incrementDownloadCount(userAgent?: string): Promise<{ count: number; storage: string }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  const now = new Date().toISOString();

  // If Upstash Redis or Vercel KV is configured
  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl}/incr/callink_downloads_total`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
        },
        cache: "no-store",
      });
      const data = await res.json();

      // Record last downloaded timestamp
      await fetch(`${upstashUrl}/set/callink_last_download/${encodeURIComponent(now)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
        },
        cache: "no-store",
      }).catch(() => {});

      if (data && typeof data.result === "number") {
        return { count: data.result, storage: "upstash_redis" };
      }
    } catch (err) {
      console.error("Failed to increment Redis download count:", err);
    }
  }

  // Fallback to local file / memory
  const stats = getLocalStats();
  stats.count = (stats.count || 0) + 1;
  stats.lastDownloaded = now;
  if (!stats.history) stats.history = [];
  // Keep last 50 log records
  stats.history.unshift({ timestamp: now, userAgent: userAgent?.slice(0, 120) });
  if (stats.history.length > 50) stats.history = stats.history.slice(0, 50);

  saveLocalStats(stats);
  return { count: stats.count, storage: "local" };
}

export async function getDownloadStats(): Promise<{ count: number; lastDownloaded: string | null; storage: string }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const countRes = await fetch(`${upstashUrl}/get/callink_downloads_total`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
        cache: "no-store",
      });
      const countData = await countRes.json();

      const timeRes = await fetch(`${upstashUrl}/get/callink_last_download`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
        cache: "no-store",
      });
      const timeData = await timeRes.json();

      const count = Number(countData.result) || 0;
      const lastDownloaded = timeData.result ? String(timeData.result) : null;
      return { count, lastDownloaded, storage: "upstash_redis" };
    } catch {
      // Fall through to local
    }
  }

  const stats = getLocalStats();
  return {
    count: stats.count || 0,
    lastDownloaded: stats.lastDownloaded || null,
    storage: "local",
  };
}
