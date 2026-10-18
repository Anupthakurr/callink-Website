"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GitCommit, Tag, Sparkles, Check, Clock, ArrowRight } from "lucide-react";

export default function ChangelogPage() {
  const releases = [
    {
      version: "v1.0.0",
      date: "October 2026",
      tag: "Latest Stable",
      tagColor: "#34D399",
      summary: "First production release of Callink: GSM-to-Gemini Live AI voice gateway for Windows.",
      features: [
        "Bluetooth HFP/SCO Bridge: Low-latency 16kHz WASAPI audio routing directly to and from Android cellular calls.",
        "Google Gemini Live Multimodal Integration: Direct WebSocket connection to gemini-3.1-flash-live-preview with sub-second response times.",
        "Natural Barge-in System: Client-side RMS energy VAD coupled with server-side semantic turn completion, achieving <40ms interruption muting.",
        "Dual-Track Stereo Recording: Left channel records caller audio, Right channel records AI speech, accompanied by timestamped JSON transcripts.",
        "Inbound Auto-Answer & Outbound AI Dialer: Configurable ring delay for incoming calls and scheduled batch outbound dialing.",
        "Web Dashboard (localhost:5000): 5 complete suites including Live Gateway VU meters, Voice Studio, Recordings Player, Knowledge Base grounder, and AI Persona tuner.",
        "Windows Resilience: Integrated Stay-Awake guard preventing PC sleep and 120ms circular SCO jitter buffer.",
      ],
    },
    {
      version: "v0.9.2-beta",
      date: "September 2026",
      tag: "Beta",
      tagColor: "#67E8F9",
      summary: "Windows Phone Link automation refinements and SCO audio jitter stabilization.",
      features: [
        "Added 120ms circular audio ring buffer to eliminate packet loss on low-tier Bluetooth adapters.",
        "Integrated Microsoft Phone Link dialer UI automation via Windows UI Automation (UIA) APIs.",
        "Added support for 8 popular Gemini voices: Puck, Charon, Aoede, Fenrir, Kore, Leda, Orpheus, and Zephyr.",
      ],
    },
    {
      version: "v0.8.0-alpha",
      date: "August 2026",
      tag: "Alpha",
      tagColor: "#A78BFA",
      summary: "Proof of concept bridging Windows Hands-Free profile to Google Gemini Live WebSocket.",
      features: [
        "Initial prototype connecting Bluetooth SCO audio stream to Gemini multimodal WebSocket API.",
        "Demonstrated 800ms speech-to-speech round-trip latency on real Airtel and Jio SIM cards.",
      ],
    },
  ];

  const roadmap = [
    { title: "Multi-SIM Android Routing", status: "In Progress", desc: "Select which physical SIM or eSIM to use for outbound campaigns dynamically." },
    { title: "Post-Call WhatsApp / SMS Webhooks", status: "Planned", desc: "Automatically send summary texts, payment links, or calendar invites to the caller after hang-up." },
    { title: "Local Whisper V3 Fallback", status: "Under Research", desc: "Offline transcription fallback when network jitter exceeds 300ms." },
    { title: "Headless Windows Service Mode", status: "Planned", desc: "Run Callink as a silent Windows background service on mini PCs without an active desktop session." },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />

      <div style={{ paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="section-container" style={{ maxWidth: "860px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="section-eyebrow">
              <GitCommit size={13} />
              RELEASES &amp; ROADMAP
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 50px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Changelog
            </h1>
            <p style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Track the development history, new capabilities, and upcoming features of Callink.
            </p>
          </div>

          {/* Releases List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "36px", marginBottom: "60px" }}>
            {releases.map((rel) => (
              <div key={rel.version} className="glass-card" style={{ padding: "36px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                      {rel.version}
                    </h2>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        fontWeight: 600,
                        background: `${rel.tagColor}1A`,
                        color: rel.tagColor,
                        border: `1px solid ${rel.tagColor}44`,
                      }}
                    >
                      {rel.tag}
                    </span>
                  </div>
                  <div style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {rel.date}
                  </div>
                </div>

                <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
                  {rel.summary}
                </p>

                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px" }}>
                  What&apos;s New:
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {rel.features.map((feat, i) => (
                    <li key={i} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      <Check size={16} color="#34D399" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Upcoming Roadmap */}
          <div className="glass-card" style={{ padding: "36px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <Clock size={20} color="#22D3EE" />
              Upcoming Roadmap
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="roadmap-grid">
              {roadmap.map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: "18px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "10px",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ fontWeight: 600, fontSize: "15px" }}>{item.title}</div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-accent-cyan)",
                        background: "rgba(6, 182, 212, 0.1)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .roadmap-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
