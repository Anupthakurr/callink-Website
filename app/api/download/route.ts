import { NextRequest, NextResponse } from "next/server";
import { incrementDownloadCount } from "@/lib/downloadCounter";
import { DOWNLOAD_URL } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const userAgent = request.headers.get("user-agent") || undefined;
    // Increment the persistent counter
    await incrementDownloadCount(userAgent);
  } catch (error: unknown) {
    if ((error as { digest?: string })?.digest === "NEXT_PRERENDER_INTERRUPTED") {
      throw error;
    }
    console.error("Error logging download count:", error);
  }

  // Redirect to the actual R2 binary
  return NextResponse.redirect(DOWNLOAD_URL, {
    status: 302,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
