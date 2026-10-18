"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";

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
          padding: "20px",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          overflowX: "auto",
          lineHeight: 1.7,
          color: "#C4B5FD",
          margin: 0,
        }}
      >
        <code
          dangerouslySetInnerHTML={{ __html: code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/(#.+)/g, '<span style="color:#475569;font-style:italic">$1</span>')
            .replace(/(GEMINI_API_KEY)/g, '<span style="color:#FCA5A5">$1</span>')
            .replace(/("(?:[^"\\]|\\.)*")/g, '<span style="color:#86EFAC">$1</span>')
          }}
        />
      </pre>
    </div>
  );
}

const tabContent = {
  exe: {
    label: "Callink.exe",
    icon: "⚡",
    steps: [
      { step: "1", title: "Download the executable" },
      { step: "2", title: 'Set your Gemini API key as an environment variable' },
      { step: "3", title: "Pair your Android phone via Phone Link" },
      { step: "4", title: "Run Callink" },
      { step: "5", title: "Open the dashboard" },
    ],
    code: `# 1. Set your Gemini API key
$env:GEMINI_API_KEY = "your_api_key_here"

# 2. Run Callink (double-click or via PowerShell)
.\\Callink.exe

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
      { step: "3", title: "Pair phone via Phone Link" },
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
            gridTemplateColumns: "1fr 1.4fr",
            gap: "24px",
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
              style={{ padding: "28px" }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "16px",
                  marginBottom: "24px",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                Steps
              </h3>
              {tab.steps.map((s, i) => (
                <div
                  key={s.step}
                  style={{
                    display: "flex",
                    gap: "14px",
                    marginBottom: i < tab.steps.length - 1 ? "20px" : 0,
                    position: "relative",
                  }}
                >
                  {/* Connector line */}
                  {i < tab.steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "32px",
                        bottom: "-20px",
                        width: "1px",
                        background: "rgba(124,58,237,0.2)",
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "rgba(124,58,237,0.15)",
                      border: "1px solid rgba(124,58,237,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#A78BFA",
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  >
                    {s.step}
                  </div>
                  <div style={{ paddingTop: "4px" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        lineHeight: 1.4,
                      }}
                    >
                      {s.title}
                    </div>
                  </div>
                </div>
              ))}
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
          style={{ marginTop: "24px", overflowX: "auto" }}
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
        @media (max-width: 768px) {
          .quickstart-grid { grid-template-columns: 1fr !important; }
          .phone-steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .phone-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
