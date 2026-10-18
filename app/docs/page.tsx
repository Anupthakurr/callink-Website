"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Terminal,
  Copy,
  Check,
  Smartphone,
  Bluetooth,
  Sliders,
  AlertTriangle,
  HelpCircle,
  FileCode,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid var(--border-glass)",
        borderRadius: "6px",
        padding: "4px 8px",
        color: copied ? "#34D399" : "var(--text-secondary)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "12px",
        transition: "all 0.2s",
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("quickstart");

  const sections = [
    { id: "quickstart", title: "Quickstart Installation", icon: Terminal },
    { id: "pairing", title: "Phone Link & Bluetooth Setup", icon: Smartphone },
    { id: "gemini-api", title: "Gemini Live API Config", icon: FileCode },
    { id: "barge-in", title: "Barge-in RMS Tuning", icon: Sliders },
    { id: "knowledge-base", title: "Knowledge Base Grounding", icon: ShieldCheck },
    { id: "troubleshooting", title: "Troubleshooting Guide", icon: AlertTriangle },
    { id: "faq", title: "Frequently Asked Questions", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />

      <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="section-container">
          {/* Docs Header */}
          <div style={{ marginBottom: "50px" }}>
            <div className="section-eyebrow">
              <Terminal size={13} />
              CALLINK DOCUMENTATION & MANUAL
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Setup & Technical Reference
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "var(--text-secondary)",
                maxWidth: "720px",
                lineHeight: 1.6,
              }}
            >
              Complete installation guides, Windows audio bridge configuration, barge-in tuning thresholds, and production resilience parameters for Callink.
            </p>
          </div>

          {/* Docs Layout: Sidebar + Main Content */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: "40px",
              alignItems: "start",
            }}
            className="docs-layout"
          >
            {/* Sidebar Navigation */}
            <aside
              className="glass-card"
              style={{
                padding: "20px 16px",
                position: "sticky",
                top: "84px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  padding: "0 12px 12px",
                  borderBottom: "1px solid var(--border-subtle)",
                  marginBottom: "8px",
                }}
              >
                Table of Contents
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setActiveSection(sec.id);
                        const el = document.getElementById(sec.id);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "none",
                        background: isActive ? "rgba(124,58,237,0.15)" : "transparent",
                        color: isActive ? "#A78BFA" : "var(--text-secondary)",
                        fontWeight: isActive ? 600 : 400,
                        fontSize: "14px",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <Icon size={16} color={isActive ? "#A78BFA" : "#64748B"} />
                      <span>{sec.title}</span>
                    </button>
                  );
                })}
              </nav>

              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border-subtle)",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
              >
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
                  Need enterprise support?
                </div>
                <a
                  href="/contact"
                  style={{
                    fontSize: "13px",
                    color: "var(--cyan-soft)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Contact support <ChevronRight size={13} />
                </a>
              </div>
            </aside>

            {/* Main Content Area */}
            <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
              {/* Section 1: Quickstart */}
              <section id="quickstart" className="glass-card" style={{ padding: "36px" }}>
                <h2
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Terminal size={22} color="#A78BFA" />
                  Quickstart Installation
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
                  Callink can be installed in under 2 minutes. You can choose between the standalone zero-dependency Windows executable or building from Python source.
                </p>

                <h3 style={{ fontSize: "17px", fontWeight: 600, marginTop: "24px", marginBottom: "12px" }}>
                  Option A: Standalone Callink_v2.1.exe (Recommended)
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "12px" }}>
                  Download the self-contained binary packaged with PyInstaller and embedded Windows Audio Session API (WASAPI) libraries.
                </p>
                <div style={{ marginBottom: "16px" }}>
                  <a
                    href="https://pub-fd660d9dc0a946a0b983b5f725bba3ea.r2.dev/Callink_v2.1.exe"
                    className="btn-primary"
                    style={{ fontSize: "14px", padding: "10px 20px" }}
                    download
                  >
                    Download Callink_v2.1.exe (Direct)
                  </a>
                </div>
                <div className="code-block" style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "12px", color: "#64748B" }}>PowerShell (Run as Administrator)</span>
                    <CopyButton text="Invoke-WebRequest -Uri 'https://pub-fd660d9dc0a946a0b983b5f725bba3ea.r2.dev/Callink_v2.1.exe' -OutFile 'Callink_v2.1.exe'; .\Callink_v2.1.exe" />
                  </div>
                  <code>
                    Invoke-WebRequest -Uri &apos;https://pub-fd660d9dc0a946a0b983b5f725bba3ea.r2.dev/Callink_v2.1.exe&apos; -OutFile &apos;Callink_v2.1.exe&apos;
                    <br />
                    .\Callink_v2.1.exe
                  </code>
                </div>

                <h3 style={{ fontSize: "17px", fontWeight: 600, marginTop: "24px", marginBottom: "12px" }}>
                  Option B: Git Clone &amp; 1-Click Batch Runner
                </h3>
                <div className="code-block" style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "12px", color: "#64748B" }}>Command Prompt / Git Bash</span>
                    <CopyButton text="git clone https://github.com/Anupthakurr/callink.git && cd callink && run.bat" />
                  </div>
                  <code>
                    git clone https://github.com/Anupthakurr/callink.git
                    <br />
                    cd callink
                    <br />
                    run.bat
                  </code>
                </div>

                <div
                  style={{
                    padding: "16px",
                    background: "rgba(6, 182, 212, 0.08)",
                    border: "1px solid rgba(6, 182, 212, 0.25)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#A5F3FC",
                  }}
                >
                  <strong>Note:</strong> When Callink starts, it binds a local web dashboard at{" "}
                  <code>http://localhost:5000</code>. Keep your browser open to monitor calls, view real-time transcripts, and adjust audio gains.
                </div>
              </section>

              {/* Section 2: Phone Link & Bluetooth */}
              <section id="pairing" className="glass-card" style={{ padding: "36px" }}>
                <h2
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Smartphone size={22} color="#67E8F9" />
                  Microsoft Phone Link &amp; Bluetooth HFP Setup
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
                  Callink leverages the Bluetooth Hands-Free Profile (HFP/SCO) that Windows creates when pairing with an Android device via Microsoft Phone Link.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    {
                      step: "01",
                      title: "Enable Bluetooth on Windows PC",
                      desc: "Ensure your PC has Bluetooth 4.2+ (or a $5 USB Bluetooth dongle) and is set to discoverable.",
                    },
                    {
                      step: "02",
                      title: "Install 'Link to Windows' on Android",
                      desc: "Install from Google Play Store. On Samsung devices, it comes pre-installed in Settings > Connected devices.",
                    },
                    {
                      step: "03",
                      title: "Pair via Microsoft Phone Link",
                      desc: "Open Phone Link on Windows 10/11. Scan the QR code with your phone and grant permissions for Call Logs and Audio.",
                    },
                    {
                      step: "04",
                      title: "Enable 'Calls' in Phone Link Settings",
                      desc: "In Phone Link > Settings > Features > Calls, toggle 'Allow this app to make and manage calls from my phone' to ON.",
                    },
                    {
                      step: "05",
                      title: "Verify Hands-Free Audio Endpoint",
                      desc: "Open Windows Sound Control Panel (`mmsys.cpl`). Confirm that your phone appears as both a Recording and Playback device under 'Hands-Free AG Audio'.",
                    },
                  ].map((s) => (
                    <div
                      key={s.step}
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "16px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          color: "#A78BFA",
                        }}
                      >
                        {s.step}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>
                          {s.title}
                        </div>
                        <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Gemini API Config */}
              <section id="gemini-api" className="glass-card" style={{ padding: "36px" }}>
                <h2
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <FileCode size={22} color="#34D399" />
                  Gemini Live API Configuration
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
                  Callink connects directly to Google&apos;s Gemini Live multimodal WebSocket protocol (model: <code>gemini-3.1-flash-live-preview</code>) for bidirectional 16kHz PCM streaming.
                </p>

                <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "10px" }}>
                  Environment Variables (.env)
                </h3>
                <div className="code-block" style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "12px", color: "#64748B" }}>.env file</span>
                    <CopyButton
                      text={`GEMINI_API_KEY=AIzaSy...your_gemini_key
GEMINI_MODEL=gemini-3.1-flash-live-preview
VOICE_NAME=Puck
SYSTEM_PROMPT_PATH=./prompts/default_receptionist.txt
AUTO_ANSWER_DELAY_SECONDS=2
CALL_RECORDING_ENABLED=true`}
                    />
                  </div>
                  <code>
                    <span className="keyword">GEMINI_API_KEY</span>=AIzaSy...your_gemini_key<br />
                    <span className="keyword">GEMINI_MODEL</span>=gemini-3.1-flash-live-preview<br />
                    <span className="keyword">VOICE_NAME</span>=Puck <span className="comment"># Puck, Charon, Aoede, Fenrir, Kore</span><br />
                    <span className="keyword">SYSTEM_PROMPT_PATH</span>=./prompts/default_receptionist.txt<br />
                    <span className="keyword">AUTO_ANSWER_DELAY_SECONDS</span>=2<br />
                    <span className="keyword">CALL_RECORDING_ENABLED</span>=true
                  </code>
                </div>

                <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                  Need a key? Generate one with zero credit card required at{" "}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--cyan-soft)", textDecoration: "underline" }}
                  >
                    Google AI Studio
                  </a>
                  . Free tier includes 15 RPM for live streaming.
                </div>
              </section>

              {/* Section 4: Barge-in RMS Tuning */}
              <section id="barge-in" className="glass-card" style={{ padding: "36px" }}>
                <h2
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Sliders size={22} color="#F59E0B" />
                  Barge-In (Interruption) RMS Threshold Tuning
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
                  Callink combines dual-level interruption handling: client-side Root-Mean-Square (RMS) Voice Activity Detection (VAD) and Google&apos;s server-side semantic barge-in signals.
                </p>

                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                      textAlign: "left",
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-glass)" }}>
                        <th style={{ padding: "12px", color: "var(--text-primary)" }}>Environment</th>
                        <th style={{ padding: "12px", color: "var(--text-primary)" }}>RMS Threshold</th>
                        <th style={{ padding: "12px", color: "var(--text-primary)" }}>Hangover Duration</th>
                        <th style={{ padding: "12px", color: "var(--text-primary)" }}>Recommended Use</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "var(--text-secondary)" }}>
                      <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <td style={{ padding: "12px", fontWeight: 600 }}>Quiet Office / Room</td>
                        <td style={{ padding: "12px", fontFamily: "var(--font-mono)", color: "#34D399" }}>0.012 – 0.018</td>
                        <td style={{ padding: "12px", fontFamily: "var(--font-mono)" }}>160 ms</td>
                        <td style={{ padding: "12px" }}>Instant barge-in with minimal false cuts.</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <td style={{ padding: "12px", fontWeight: 600 }}>Typical Home / Fan</td>
                        <td style={{ padding: "12px", fontFamily: "var(--font-mono)", color: "#67E8F9" }}>0.022 – 0.030</td>
                        <td style={{ padding: "12px", fontFamily: "var(--font-mono)" }}>220 ms</td>
                        <td style={{ padding: "12px" }}>Default setting for most residential locations.</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <td style={{ padding: "12px", fontWeight: 600 }}>Street / Traffic</td>
                        <td style={{ padding: "12px", fontFamily: "var(--font-mono)", color: "#FBBF24" }}>0.038 – 0.055</td>
                        <td style={{ padding: "12px", fontFamily: "var(--font-mono)" }}>280 ms</td>
                        <td style={{ padding: "12px" }}>Ignores engine revs, honks, and wind gusts.</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "12px", fontWeight: 600 }}>Busy Cafe / Shop</td>
                        <td style={{ padding: "12px", fontFamily: "var(--font-mono)", color: "#F87171" }}>0.060 – 0.085</td>
                        <td style={{ padding: "12px", fontFamily: "var(--font-mono)" }}>340 ms</td>
                        <td style={{ padding: "12px" }}>Requires deliberate, loud speech to interrupt.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Troubleshooting */}
              <section id="troubleshooting" className="glass-card" style={{ padding: "36px" }}>
                <h2
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <AlertTriangle size={22} color="#EF4444" />
                  Troubleshooting &amp; Common Fixes
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px" }}>
                      Issue: Audio is robotic or stuttering on inbound calls
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      <strong>Solution:</strong> Increase the SCO jitter buffer in <code>config.json</code> from <code>120ms</code> to <code>180ms</code>. Ensure your PC is not in Windows Power Saver mode, and keep your phone within 2 meters of the Bluetooth adapter.
                    </p>
                  </div>

                  <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px" }}>
                      Issue: Call answers, but Gemini does not speak
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      <strong>Solution:</strong> Check that your <code>GEMINI_API_KEY</code> has multimodal Live API permissions enabled. Also inspect the dashboard console at <code>http://localhost:5000</code> to verify WebSocket handshake status code <code>101 Switching Protocols</code>.
                    </p>
                  </div>

                  <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px" }}>
                      Issue: Windows drops connection when laptop lid is closed
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      <strong>Solution:</strong> In Windows Power Options, set &quot;When I close the lid&quot; to &quot;Do nothing&quot;. Callink has an integrated Windows Stay-Awake guard (`SetThreadExecutionState(ES_CONTINUOUS | ES_SYSTEM_REQUIRED)`), which prevents sleep while the gateway is active.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .docs-layout {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
