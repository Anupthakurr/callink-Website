import { NextRequest, NextResponse } from "next/server";
import { getDownloadStats, incrementDownloadCount } from "@/lib/downloadCounter";
import { DOWNLOAD_FILENAME } from "@/lib/constants";

export async function GET(request: NextRequest) {
  // Access request to opt out of static prerendering
  const _ = request.url;
  try {
    const stats = await getDownloadStats();
    return NextResponse.json(
      {
        status: "success",
        file: DOWNLOAD_FILENAME,
        totalDownloads: stats.count,
        lastDownloaded: stats.lastDownloaded,
        storageEngine: stats.storage,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          Pragma: "no-cache",
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

export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get("user-agent") || undefined;
    const stats = await incrementDownloadCount(userAgent);
    return NextResponse.json(
      {
        status: "success",
        totalDownloads: stats.count,
        storageEngine: stats.storage,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          Pragma: "no-cache",
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
