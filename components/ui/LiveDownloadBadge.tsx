"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export function useLiveDownloadCount() {
  const [count, setCount] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("callink_known_downloads");
      return cached ? Number(cached) : null;
    }
    return null;
  });
  const [lastDownloaded, setLastDownloaded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    fetch("/api/stats?t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.totalDownloads === "number" && data.totalDownloads > 0) {
          setCount((prev) => {
            const next = prev !== null ? Math.max(prev, data.totalDownloads) : data.totalDownloads;
            try {
              localStorage.setItem("callink_known_downloads", String(next));
            } catch {}
            return next;
          });
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
      setCount((prev) => {
        const next = (prev ?? 15) + 1;
        try {
          localStorage.setItem("callink_known_downloads", String(next));
        } catch {}
        return next;
      });
      setTimeout(fetchStats, 1000);
      setTimeout(fetchStats, 3000);
    };

    const handleServerUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ count: number }>;
      if (customEvent.detail?.count) {
        const newCount = customEvent.detail.count;
        setCount((prev) => {
          const next = prev !== null ? Math.max(prev, newCount) : newCount;
          try {
            localStorage.setItem("callink_known_downloads", String(next));
          } catch {}
          return next;
        });
      }
    };

    window.addEventListener("callink:download", handleLocalDownload);
    window.addEventListener("callink:download:updated", handleServerUpdate);

    // Periodic poll every 20 seconds
    const interval = setInterval(fetchStats, 20000);

    return () => {
      window.removeEventListener("callink:download", handleLocalDownload);
      window.removeEventListener("callink:download:updated", handleServerUpdate);
      clearInterval(interval);
    };
  }, []);

  return { count, lastDownloaded, loading, refresh: fetchStats };
}

export function triggerDownloadEvent() {
  if (typeof window !== "undefined") {
    // 1. Instant optimistic update on UI
    window.dispatchEvent(new Event("callink:download"));

    // 2. Persistently increment on cloud counter
    try {
      fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          if (typeof data.totalDownloads === "number") {
            window.dispatchEvent(
              new CustomEvent("callink:download:updated", {
                detail: { count: data.totalDownloads },
              })
            );
          }
        })
        .catch(() => {});
    } catch {}
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
