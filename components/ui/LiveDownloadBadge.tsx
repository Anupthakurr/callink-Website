"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export function useLiveDownloadCount() {
  const [count, setCount] = useState<number | null>(null);
  const [lastDownloaded, setLastDownloaded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.totalDownloads === "number") {
          setCount(data.totalDownloads);
        }
        if (data.lastDownloaded) {
          setLastDownloaded(data.lastDownloaded);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();

    // Listen for custom event when user clicks download on this client
    const handleLocalDownload = () => {
      setCount((prev) => (prev !== null ? prev + 1 : 1));
      setTimeout(fetchStats, 1500);
    };

    window.addEventListener("callink:download", handleLocalDownload);

    // Periodic poll every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => {
      window.removeEventListener("callink:download", handleLocalDownload);
      clearInterval(interval);
    };
  }, []);

  return { count, lastDownloaded, loading, refresh: fetchStats };
}

export function triggerDownloadEvent() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("callink:download"));
  }
}

export default function LiveDownloadBadge({
  showLabel = true,
  className = "",
  style = {},
}: {
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { count, loading } = useLiveDownloadCount();

  if (loading && count === null) {
    return (
      <span
        className={`chip chip-violet ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          padding: "4px 12px",
          opacity: 0.7,
          ...style,
        }}
      >
        <Download size={12} color="#A78BFA" />
        <span>Loading stats...</span>
      </span>
    );
  }

  const displayCount = count ?? 0;

  return (
    <a
      href="/stats"
      title="View live release metrics & download analytics"
      className={`chip chip-violet ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        padding: "4px 12px",
        textDecoration: "none",
        transition: "all 0.2s ease",
        cursor: "pointer",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-glow-violet)";
        e.currentTarget.style.boxShadow = "0 0 15px rgba(124,58,237,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Download size={12} color="#A78BFA" />
      <span style={{ fontWeight: 600, color: "#fff" }}>
        {displayCount.toLocaleString()}
      </span>
      {showLabel && (
        <span style={{ color: "var(--text-accent-violet)" }}>
          {displayCount === 1 ? "download" : "downloads"}
        </span>
      )}
      <span
        className="live-dot"
        style={{ width: "6px", height: "6px", marginLeft: "2px" }}
      />
    </a>
  );
}
