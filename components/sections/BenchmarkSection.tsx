"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ---- Latency data ---- */
const legacySegments = [
  { label: "Capture + codec", ms: 60, color: "#F87171" },
  { label: "Network / SIP", ms: 180, color: "#FB923C" },
  { label: "STT (cloud)", ms: 900, color: "#FBBF24" },
  { label: "LLM inference", ms: 1400, color: "#F87171" },
  { label: "TTS (cloud)", ms: 600, color: "#FB923C" },
  { label: "VAD / turn detect", ms: 360, color: "#FBBF24" },
  { label: "Return audio", ms: 300, color: "#F87171" },
];

const callinkSegments = [
  { label: "Capture + SCO codec", ms: 30, color: "#34D399" },
  { label: "Bluetooth HFP bridge", ms: 40, color: "#22D3EE" },
  { label: "Gemini Live WS (RTT)", ms: 700, color: "#A78BFA" },
  { label: "VAD / barge-in", ms: 20, color: "#34D399" },
  { label: "Return audio", ms: 60, color: "#22D3EE" },
];

const legacyTotal = legacySegments.reduce((s, x) => s + x.ms, 0); // 3800
const callinkTotal = callinkSegments.reduce((s, x) => s + x.ms, 0); // 850
const maxMs = legacyTotal;

function LatencyBar({
  segments,
  totalMs,
  maxMs,
  label,
  isCallink,
  delay,
}: {
  segments: typeof legacySegments;
  totalMs: number;
  maxMs: number;
  label: string;
  isCallink: boolean;
  delay: number;
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "16px",
            color: isCallink ? "#A78BFA" : "#F87171",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            fontWeight: 700,
            color: isCallink ? "#34D399" : "#F87171",
            background: isCallink ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
            border: `1px solid ${isCallink ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`,
            padding: "3px 12px",
            borderRadius: "999px",
          }}
        >
          ~{(totalMs / 1000).toFixed(1)}–{isCallink ? "1.2" : "4.5"} s
        </span>
      </div>

      {/* Bar track */}
      <div
        style={{
          height: "40px",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border-subtle)",
          overflow: "hidden",
          display: "flex",
        }}
      >
        {segments.map((seg, i) => (
          <motion.div
            key={seg.label}
            initial={{ width: 0 }}
            whileInView={{ width: `${(seg.ms / maxMs) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + i * 0.08, ease: "easeOut" }}
            style={{
              height: "100%",
              background: seg.color,
              opacity: 0.85,
              position: "relative",
              overflow: "hidden",
            }}
            title={`${seg.label}: ${seg.ms}ms`}
          />
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {segments.map((seg) => (
          <div
            key={seg.label}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "3px",
                background: seg.color,
                opacity: 0.85,
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {seg.label}:{" "}
              <span style={{ color: "var(--text-secondary)" }}>{seg.ms}ms</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BenchmarkSection() {
  const [tableOpen, setTableOpen] = useState(false);

  return (
    <section
      id="benchmark"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="Latency benchmark"
    >
      {/* Ambient */}
      <div
        className="ambient-orb orb-emerald"
        style={{ width: "500px", height: "500px", top: "0", right: "-150px", opacity: 0.5 }}
        aria-hidden="true"
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div className="section-eyebrow" style={{ margin: "0 auto 20px" }}>
            Latency benchmark
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            <span className="text-gradient-hero">70–75% faster</span> than the old stack
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Gemini Live's speech-to-speech WebSocket eliminates the STT→LLM→TTS
            pipeline, slashing latency from 3.2–4.5 s to ~800 ms–1.2 s.
          </p>
        </motion.div>

        {/* Big stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 28px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))",
              border: "1px solid rgba(124,58,237,0.25)",
              gap: "4px",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(52px, 8vw, 88px)",
                fontWeight: 700,
                lineHeight: 1,
                background: "linear-gradient(135deg, #A78BFA, #67E8F9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ~70–75%
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              faster response time vs. STT→LLM→TTS
            </div>
          </div>
        </motion.div>

        {/* Bars */}
        <div className="glass-card benchmark-card" style={{ padding: "40px" }}>
          <LatencyBar
            segments={legacySegments}
            totalMs={legacyTotal}
            maxMs={maxMs}
            label="Legacy: STT → LLM → TTS stack"
            isCallink={false}
            delay={0.1}
          />
          <LatencyBar
            segments={callinkSegments}
            totalMs={callinkTotal}
            maxMs={maxMs}
            label="Callink: Gemini Live WebSocket"
            isCallink={true}
            delay={0.5}
          />

          {/* Expandable detail table */}
          <div style={{ marginTop: "32px", borderTop: "1px solid var(--border-subtle)", paddingTop: "24px" }}>
            <button
              onClick={() => setTableOpen(!tableOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 500,
              }}
              aria-expanded={tableOpen}
            >
              <ChevronDown
                size={16}
                style={{
                  transform: tableOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
              {tableOpen ? "Hide" : "Show"} per-stage breakdown
            </button>

            {tableOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ marginTop: "20px", overflowX: "auto" }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      {["Stage", "Legacy (ms)", "Callink (ms)", "Savings"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "10px 16px",
                            textAlign: "left",
                            color: "var(--text-muted)",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            fontSize: "11px",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { stage: "Audio capture + codec", legacy: 60, callink: 30 },
                      { stage: "Network / telephony", legacy: 180, callink: 40 },
                      { stage: "Speech-to-Text", legacy: 900, callink: 0 },
                      { stage: "LLM inference", legacy: 1400, callink: 700 },
                      { stage: "Text-to-Speech", legacy: 600, callink: 0 },
                      { stage: "VAD / turn detection", legacy: 360, callink: 20 },
                      { stage: "Return audio", legacy: 300, callink: 60 },
                    ].map((row, i) => (
                      <tr
                        key={row.stage}
                        style={{
                          borderBottom: "1px solid var(--border-subtle)",
                          background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                        }}
                      >
                        <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>{row.stage}</td>
                        <td style={{ padding: "12px 16px", color: "#F87171" }}>{row.legacy}</td>
                        <td style={{ padding: "12px 16px", color: "#34D399" }}>
                          {row.callink === 0 ? <span title="Eliminated">—</span> : row.callink}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#A78BFA", fontWeight: 600 }}>
                          {row.callink === 0
                            ? "Eliminated"
                            : `−${Math.round(((row.legacy - row.callink) / row.legacy) * 100)}%`}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: "2px solid rgba(124,58,237,0.3)", fontWeight: 700 }}>
                      <td style={{ padding: "14px 16px", color: "var(--text-primary)" }}>Total (estimate)</td>
                      <td style={{ padding: "14px 16px", color: "#F87171" }}>~3,800</td>
                      <td style={{ padding: "14px 16px", color: "#34D399" }}>~850</td>
                      <td style={{ padding: "14px 16px", color: "#A78BFA" }}>~78% faster</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            )}
          </div>

          {/* Footnote */}
          <p
            style={{
              marginTop: "20px",
              fontSize: "12px",
              color: "var(--text-muted)",
              fontStyle: "italic",
              lineHeight: 1.5,
              fontFamily: "var(--font-mono)",
            }}
          >
            * Figures are engineering estimates measured on a mid-range Windows
            laptop (i5-12th gen, 16 GB RAM) with a stable Bluetooth 5.0
            connection and 40–60 ms Wi-Fi RTT to Google. Actual results vary by
            device, network quality, and Gemini API load.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .benchmark-card {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
