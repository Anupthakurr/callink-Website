"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, RefreshCw, BarChart3, Clock, Database, CheckCircle2, ArrowRight } from "lucide-react";
import { useLiveDownloadCount, triggerDownloadEvent } from "@/components/ui/LiveDownloadBadge";
import { DOWNLOAD_URL } from "@/lib/constants";

export default function StatsPage() {
  const { count, lastDownloaded, loading, refresh } = useLiveDownloadCount();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleTestDownload = () => {
    triggerDownloadEvent();
    window.location.href = DOWNLOAD_URL;
  };

  const formattedDate = lastDownloaded
    ? new Date(lastDownloaded).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "No downloads recorded yet";

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />

      <div style={{ paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="section-container" style={{ maxWidth: "800px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="section-eyebrow">
              <BarChart3 size={13} />
              REAL-TIME RELEASE ANALYTICS
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Live Download Metrics
            </h1>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Real-time counter tracking every person who downloads the standalone Windows binary (`Callink_v2.1.exe`).
            </p>
          </div>

          {/* Primary Metric Card */}
          <div
            className="glass-card"
            style={{
              padding: "48px 36px",
              textAlign: "center",
              marginBottom: "32px",
              background: "linear-gradient(135deg, rgba(19, 22, 42, 0.85) 0%, rgba(13, 15, 24, 0.95) 100%)",
              border: "1px solid rgba(124, 58, 237, 0.35)",
              boxShadow: "0 0 50px rgba(124, 58, 237, 0.15)",
              position: "relative",
            }}
          >
            {/* Live Indicator */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                color: "#34D399",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              <span className="live-dot" />
              LIVE TELEMETRY ACTIVE
            </div>

            {/* Giant Counter */}
            <div
              style={{
                fontSize: "clamp(56px, 10vw, 96px)",
                fontWeight: 800,
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: "12px",
              }}
              className="text-glow-violet"
            >
              {loading && count === null ? "..." : (count ?? 0).toLocaleString()}
            </div>

            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#F8FAFC",
                marginBottom: "6px",
              }}
            >
              Total Binary Downloads
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                marginBottom: "36px",
              }}
            >
              File: Callink_v2.1.exe (Windows x64)
            </div>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={handleRefresh}
                className="btn-secondary"
                style={{ fontSize: "14px", padding: "10px 20px" }}
                disabled={refreshing}
              >
                <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                {refreshing ? "Refreshing..." : "Refresh Count"}
              </button>

              <button
                onClick={handleTestDownload}
                className="btn-primary"
                style={{ fontSize: "14px", padding: "10px 22px" }}
              >
                <Download size={14} />
                Test Download Now (+1)
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "40px",
            }}
            className="stats-grid"
          >
            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <Clock size={18} color="#67E8F9" />
                <h2 style={{ fontSize: "15px", fontWeight: 600 }}>Last Download Event</h2>
              </div>
              <div style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                {formattedDate}
              </div>
            </div>

            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <Database size={18} color="#A78BFA" />
                <h2 style={{ fontSize: "15px", fontWeight: 600 }}>Tracking Mechanism</h2>
              </div>
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                Server-side HTTP 302 redirect via <code style={{ color: "var(--cyan-soft)" }}>/api/download</code>
              </div>
            </div>
          </div>

          {/* API Access Note */}
          <div
            className="glass-card"
            style={{
              padding: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>
                Need raw JSON for scripts or badges?
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                Access live data programmatically at <code style={{ color: "#34D399" }}>/api/stats</code>
              </div>
            </div>
            <a href="/api/stats" target="_blank" className="btn-ghost" style={{ fontSize: "13px" }}>
              View JSON Endpoint <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 650px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
