import { NextRequest, NextResponse } from "next/server";
import { getDownloadStats } from "@/lib/downloadCounter";

export async function GET(request: NextRequest) {
  // Access nextUrl to ensure route is evaluated dynamically on request
  const _url = request.nextUrl;
  try {
    const stats = await getDownloadStats();
    return NextResponse.json(
      {
        status: "success",
        file: "Callink_v2.1.exe",
        totalDownloads: stats.count,
        lastDownloaded: stats.lastDownloaded,
        storageEngine: stats.storage,
        note: stats.storage === "local"
          ? "Running on local file storage. For persistent distributed cloud counts across deployments, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your environment variables."
          : "Persisted to cloud key-value store (Upstash Redis / Vercel KV).",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
