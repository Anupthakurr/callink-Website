"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Terminal, Download, ExternalLink } from "lucide-react";
import { YouTube } from "@/components/ui/Icons";
import LiveDownloadBadge, { triggerDownloadEvent } from "@/components/ui/LiveDownloadBadge";
import { DOWNLOAD_URL, YOUTUBE_WALKTHROUGH_URL } from "@/lib/constants";


/* ---- Code Copy Button ---- */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy code"}
      style={{
        background: copied ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${copied ? "rgba(52,211,153,0.4)" : "var(--border-subtle)"}`,
        borderRadius: "7px",
        padding: "5px 10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: copied ? "#34D399" : "var(--text-muted)",
        transition: "all 0.2s",
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function highlightCode(rawCode: string): string {
  const lines = rawCode.split("\n");

  return lines
    .map((line) => {
      // 1. Comments
      const trimmed = line.trimStart();
      if (trimmed.startsWith("#")) {
        const indentLength = line.length - trimmed.length;
        const indent = line.slice(0, indentLength);
        const commentEscaped = trimmed
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `${indent}<span style="color:#64748B;font-style:italic">${commentEscaped}</span>`;
      }

      // 2. Base escape
      let html = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // 3. Extract strings to protect them from inner HTML tag clashes
      const strings: string[] = [];
      html = html.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (match) => {
        strings.push(match);
        return `___CALLINK_STR_${strings.length - 1}___`;
      });

      // 4. Split inline comment if any
      const inlineCommentIdx = html.indexOf("#");
      let codePart = html;
      let commentPart = "";
      if (inlineCommentIdx !== -1) {
        codePart = html.slice(0, inlineCommentIdx);
        commentPart = `<span style="color:#64748B;font-style:italic">${html.slice(inlineCommentIdx)}</span>`;
      }

      // 5. Highlight code tokens
      codePart = codePart
        .replace(/\b(Invoke-WebRequest|OutFile|Uri|git|clone|pip|install|copy|python|export|set|echo|cd)\b/g, '<span style="color:#60A5FA;font-weight:600">$1</span>')
        .replace(/(\$env:)/g, '<span style="color:#C084FC;font-weight:600">$1</span>')
        .replace(/\b(GEMINI_API_KEY)\b/g, '<span style="color:#FCA5A5;font-weight:600">$1</span>')
        .replace(/(\.\\[a-zA-Z0-9_\-\.]+)/g, '<span style="color:#38BDF8">$1</span>');

      let combined = codePart + commentPart;

      // 6. Restore strings
      combined = combined.replace(/___CALLINK_STR_(\d+)___/g, (_, idx) => {
        return `<span style="color:#86EFAC">${strings[Number(idx)]}</span>`;
      });

      return combined;
    })
    .join("\n");
}

/* ---- Highlighted Code Block ---- */
function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "rgba(0,0,0,0.4)",
          borderBottom: "1px solid var(--border-subtle)",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          {["#FF5F57", "#FFBD2E", "#27C93F"].map((c, i) => (
            <div
              key={i}
              style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }}
            />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {lang}
          </span>
          <CopyButton code={code} />
        </div>
      </div>
      <pre
        style={{
          background: "#060809",
          border: "1px solid var(--border-subtle)",
          borderTop: "none",
          borderRadius: "0 0 10px 10px",
          padding: "22px",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          overflowX: "auto",
          lineHeight: 1.7,
          color: "#E2E8F0",
          margin: 0,
        }}
      >
        <code
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </pre>
    </div>
  );
}

const tabContent = {
  exe: {
    label: "Callink_v2.1.exe",
    icon: "⚡",
    steps: [
      { step: "1", title: "Download Callink_v2.1.exe (Windows x64)" },
      { step: "2", title: "Set your Gemini API key in Callink Dashboard Settings" },
      { step: "3", title: "Pair your phone to Windows via Phone Link in Windows and Link to Windows in Android" },
      { step: "4", title: "Run Callink_v2.1.exe" },
      { step: "5", title: "Dashboard opens on localhost:5000" },
    ],
    code: `# 1. Download Callink v2.1
Invoke-WebRequest -Uri "${DOWNLOAD_URL}" -OutFile "Callink_v2.1.exe"

# 2. Set your Gemini API key
$env:GEMINI_API_KEY = "your_api_key_here"

# 3. Run Callink
.\\Callink_v2.1.exe

# Dashboard opens automatically at:
# http://localhost:5000`,
    lang: "powershell",
  },
  bat: {
    label: "run.bat",
    icon: "🗂",
    steps: [
      { step: "1", title: "Clone the repo" },
      { step: "2", title: "Edit .env with your Gemini API key" },
      { step: "3", title: "Pair your phone to Windows via Phone Link in Windows and Link to Windows in Android" },
      { step: "4", title: 'Run run.bat' },
      { step: "5", title: "Dashboard opens on localhost:5000" },
    ],
    code: `# 1. Clone the repository
git clone https://github.com/Anupthakurr/callink.git
cd callink

# 2. Create .env file
echo GEMINI_API_KEY=your_api_key > .env

# 3. Run the batch launcher
.\\run.bat`,
    lang: "batch",
  },
  manual: {
    label: "Manual (Dev)",
    icon: "🔧",
    steps: [
      { step: "1", title: "Clone + create virtual env" },
      { step: "2", title: "Install Python dependencies" },
      { step: "3", title: "Configure .env" },
      { step: "4", title: "Start the gateway" },
      { step: "5", title: "Navigate to dashboard" },
    ],
    code: `# 1. Clone and setup Python 3.11+
git clone https://github.com/Anupthakurr/callink.git
cd callink
python -m venv .venv
.venv\\Scripts\\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
copy .env.example .env
# Edit .env: set GEMINI_API_KEY="your_key"

# 4. Start the gateway
python main.py

# 5. Open http://localhost:5000`,
    lang: "bash",
  },
};

const phoneSteps = [
  {
    n: "1",
    title: "Install Phone Link on Windows",
    desc: "Open the Phone Link app (pre-installed on Win 11, available from Microsoft Store on Win 10).",
  },
  {
    n: "2",
    title: 'Install "Link to Windows" on Android',
    desc: "Download from Google Play Store. Available on Samsung, Pixel, and other Android phones.",
  },
  {
    n: "3",
    title: "Pair via QR code",
    desc: "Scan the QR code shown in Phone Link with the Link to Windows app on your Android.",
  },
  {
    n: "4",
    title: "Grant Bluetooth + microphone permissions",
    desc: "On Android, allow Bluetooth HFP access when prompted. On Windows, allow microphone in Settings.",
  },
  {
    n: "5",
    title: "Verify Bluetooth audio device",
    desc: 'Your phone should appear in Windows "Bluetooth & devices" as a Hands-Free device. You\'re ready.',
  },
];

const requirements = [
  { req: "Windows", min: "10 (Build 19041+)", rec: "Windows 11 22H2+" },
  { req: "Android phone", min: "Android 7.0+", rec: "Android 10+ (Pixel / Samsung)" },
  { req: "Bluetooth", min: "4.2 (HFP 1.5)", rec: "5.0+ (HFP 1.7, mSBC support)" },
  { req: "RAM", min: "4 GB", rec: "8 GB+" },
  { req: "Python (dev mode)", min: "3.10", rec: "3.11+" },
  { req: "Gemini API", min: "Valid API key", rec: "Paid tier (lower rate limits)" },
];

export default function QuickstartSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof tabContent>("exe");
  const tab = tabContent[activeTab];

  return (
    <section
      id="quickstart"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="Quickstart guide"
    >
      {/* Ambient */}
      <div
        className="ambient-orb orb-violet"
        style={{ width: "500px", height: "500px", top: "0", right: "-200px", opacity: 0.4 }}
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
            <Terminal size={13} />
            Quickstart
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            Up and running in{" "}
            <span className="text-glow-cyan">under 5 minutes</span>
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
            Choose your installation method. The .exe is the simplest — no
            Python, no terminal, just download and run.
          </p>
        </motion.div>

        {/* Walkthrough Video Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{
            marginBottom: "28px",
            padding: "16px 22px",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            background:
              "linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "260px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <YouTube size={18} color="#EF4444" />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                Prefer a visual guide? Watch the project walkthrough
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--text-secondary)" }}>
                Watch setup, phone pairing, and a real cellular call demo in action.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={() =>
                document.querySelector("#walkthrough")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary"
              style={{
                fontSize: "13px",
                padding: "8px 16px",
                background: "linear-gradient(135deg, #EF4444, #B91C1C)",
              }}
            >
              Play Video on Site ↑
            </button>
            <a
              href={YOUTUBE_WALKTHROUGH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{
                fontSize: "13px",
                padding: "8px 14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              YouTube <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>

        {/* Tab bar */}
        <div
          style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}
          role="tablist"
          aria-label="Installation methods"
        >
          {(Object.keys(tabContent) as (keyof typeof tabContent)[]).map((key) => {
            const t = tabContent[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: `1px solid ${isActive ? "rgba(124,58,237,0.5)" : "var(--border-subtle)"}`,
                  background: isActive ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: isActive ? "#A78BFA" : "var(--text-secondary)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(380px, 1.15fr) minmax(0, 1.25fr)",
            gap: "28px",
            alignItems: "start",
          }}
          className="quickstart-grid"
        >
          {/* Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-steps"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="glass-card"
              style={{ padding: "32px 28px" }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "17px",
                  marginBottom: "24px",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Installation Steps</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#A78BFA",
                    background: "rgba(124,58,237,0.12)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tab.steps.length} steps
                </span>
              </h3>
              {tab.steps.map((s, i) => (
                <div
                  key={s.step}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    marginBottom: i < tab.steps.length - 1 ? "22px" : 0,
                    position: "relative",
                  }}
                >
                  {/* Connector line */}
                  {i < tab.steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "34px",
                        bottom: "-22px",
                        width: "2px",
                        background: "linear-gradient(to bottom, rgba(124,58,237,0.35), rgba(124,58,237,0.08))",
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(124,58,237,0.15)",
                      border: "1px solid rgba(124,58,237,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#A78BFA",
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  >
                    {s.step}
                  </div>
                  <div style={{ paddingTop: "5px", flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "14.5px",
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                      }}
                    >
                      {s.title}
                    </div>
                  </div>
                </div>
              ))}
              {activeTab === "exe" && (
                <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a
                    href={DOWNLOAD_URL}
                    onClick={triggerDownloadEvent}
                    className="btn-primary"
                    style={{
                      fontSize: "14px",
                      padding: "11px 18px",
                      width: "100%",
                      justifyContent: "center",
                      boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)",
                      fontWeight: 600,
                    }}
                    download
                  >
                    <Download size={15} />
                    Download Callink_v2.1.exe (Windows x64)
                  </a>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <LiveDownloadBadge />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Code block */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-code"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              style={{ minWidth: 0, width: "100%" }}
            >
              <CodeBlock code={tab.code} lang={tab.lang} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phone Link Pairing */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ marginTop: "32px", padding: "36px" }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              marginBottom: "6px",
            }}
          >
            Phone Link pairing — 5 steps
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "28px" }}>
            You only need to do this once. After pairing, Callink connects automatically.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
            }}
            className="phone-steps-grid"
          >
            {phoneSteps.map((s) => (
              <div
                key={s.n}
                style={{
                  padding: "20px 16px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  border: "1px solid var(--border-subtle)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(6,182,212,0.15)",
                    border: "1px solid rgba(6,182,212,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    color: "#67E8F9",
                    fontSize: "14px",
                    margin: "0 auto 12px",
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "6px", lineHeight: 1.3 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Requirements table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ marginTop: "24px", width: "100%", maxWidth: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "400px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                {["Requirement", "Minimum", "Recommended"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requirements.map((r, i) => (
                <tr
                  key={r.req}
                  style={{
                    borderBottom: i < requirements.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 20px",
                      fontFamily: "var(--font-display)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {r.req}
                  </td>
                  <td style={{ padding: "14px 20px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#FBBF24" }}>
                    {r.min}
                  </td>
                  <td style={{ padding: "14px 20px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#34D399" }}>
                    {r.rec}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .quickstart-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 768px) {
          .phone-steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .phone-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
