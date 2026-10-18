"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Mic, FileText, BookOpen, User } from "lucide-react";

const tabs = [
  {
    id: "gateway",
    label: "Live Gateway",
    icon: Activity,
    color: "#10B981",
    screenshot: "[ Live Gateway Dashboard Screenshot ]",
    caption: "Real-time call monitoring with VU meters, transcript stream, and session stats",
    bullets: [
      "Live dual VU meter: Caller L / AI R with SCO quality indicator",
      "Scrolling transcript bubbles with language detection badge",
      "Session stats: duration, turn count, average latency, KB articles used",
    ],
  },
  {
    id: "studio",
    label: "Voice Studio",
    icon: Mic,
    color: "#7C3AED",
    screenshot: "[ Voice Studio Screenshot ]",
    caption: "Test your AI persona in-browser before going live — no phone call needed",
    bullets: [
      "Browser mic → Gemini Live WebSocket loop in the UI",
      "System prompt editor with live reload",
      "Temperature, voice, and language controls",
    ],
  },
  {
    id: "recordings",
    label: "Recordings",
    icon: FileText,
    color: "#06B6D4",
    screenshot: "[ Recordings Library Screenshot ]",
    caption: "Browse, play, and download all recorded calls with JSON transcripts",
    bullets: [
      "Sortable list with date, duration, direction, and language",
      "Inline player with dual-track channel isolation",
      "JSON transcript download with speaker diarization",
    ],
  },
  {
    id: "knowledge",
    label: "Knowledge Base",
    icon: BookOpen,
    color: "#FBBF24",
    screenshot: "[ Knowledge Base Screenshot ]",
    caption: "Upload documents — Callink injects them directly into the system prompt",
    bullets: [
      "Supports PDF, DOCX, TXT, MD, CSV, JSON",
      "Zero vector-DB latency — pure prompt injection",
      "Character counter so you stay under context window",
    ],
  },
  {
    id: "persona",
    label: "AI Persona",
    icon: User,
    color: "#F472B6",
    screenshot: "[ AI Persona Editor Screenshot ]",
    caption: "Design your agent's name, voice, language, and personality",
    bullets: [
      "Named personas (e.g., 'Priya — Clinic Receptionist')",
      "Pick voice gender, language priority, and tone",
      "Persona presets for common use cases",
    ],
  },
];

export default function DashboardSection() {
  const [activeTab, setActiveTab] = useState("gateway");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      id="dashboard"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="Dashboard showcase"
    >
      {/* Ambient */}
      <div
        className="ambient-orb orb-cyan"
        style={{ width: "500px", height: "500px", top: "50%", right: "-200px", opacity: 0.4 }}
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
            Web dashboard · localhost:5000
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            Five suites. One{" "}
            <span className="text-glow-violet">unified dashboard.</span>
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Callink ships a full web UI at localhost:5000. No cloud, no SaaS
            subscription — it runs entirely on your machine.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "32px",
          }}
          role="tablist"
          aria-label="Dashboard sections"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  border: `1px solid ${isActive ? tab.color + "60" : "var(--border-subtle)"}`,
                  background: isActive ? `${tab.color}18` : "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  color: isActive ? tab.color : "var(--text-secondary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? `0 0 20px ${tab.color}25` : "none",
                }}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
            <div
              className="glass-card"
              style={{
                border: `1px solid ${active.color}30`,
                overflow: "hidden",
              }}
            >
              {/* Screenshot placeholder */}
              <div
                style={{
                  height: "340px",
                  background: `linear-gradient(135deg, ${active.color}08 0%, rgba(13,15,24,0.8) 100%)`,
                  border: "none",
                  borderBottom: "1px solid var(--border-subtle)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  position: "relative",
                }}
                aria-label={`${active.label} screenshot placeholder`}
              >
                {/* Simulated browser chrome */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "36px",
                    background: "rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    gap: "8px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {["#FF5F57", "#FFBD2E", "#27C93F"].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: c,
                      }}
                    />
                  ))}
                  <div
                    style={{
                      marginLeft: "12px",
                      flex: 1,
                      height: "22px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "12px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                    }}
                  >
                    localhost:5000/{activeTab}
                  </div>
                </div>

                <active.icon size={56} color={active.color} strokeWidth={1.5} />
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    textAlign: "center",
                    padding: "0 32px",
                  }}
                >
                  {active.screenshot}
                </div>
              </div>

              {/* Details */}
              <div
                style={{
                  padding: "32px",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "24px",
                  alignItems: "start",
                }}
                className="dashboard-detail"
              >
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontFamily: "var(--font-display)",
                      marginBottom: "10px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {active.label}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "var(--text-secondary)",
                      marginBottom: "20px",
                      lineHeight: 1.6,
                    }}
                  >
                    {active.caption}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {active.bullets.map((b, i) => (
                      <li
                        key={i}
                        style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
                      >
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "5px",
                            background: `${active.color}22`,
                            border: `1px solid ${active.color}44`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "1px",
                          }}
                        >
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: active.color,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .dashboard-detail {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
