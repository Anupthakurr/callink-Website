"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ChevronDown, Zap, DollarSign, Globe } from "lucide-react";
import { Github } from "@/components/ui/Icons";

/* ---- Animated Waveform ---- */
function Waveform({ color = "#7C3AED" }: { color?: string }) {
  const bars = Array.from({ length: 28 });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "3px",
        height: "40px",
      }}
      aria-hidden="true"
    >
      {bars.map((_, i) => {
        const dur = 0.6 + ((i * 17) % 8) * 0.1;
        const delay = ((i * 23) % 6) * 0.1;
        const minH = 4 + ((i * 7) % 8);
        const maxH = 16 + ((i * 13) % 22);
        return (
          <div
            key={i}
            className="wave-bar"
            style={{
              background: color,
              height: `${minH}px`,
              minHeight: `${minH}px`,
              maxHeight: `${maxH}px`,
              "--dur": `${dur}s`,
              "--delay": `${delay}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

/* ---- Dashboard Mock ---- */
function DashboardMock() {
  const transcripts = [
    { side: "caller", text: "Haan, mujhe kal ke liye appointment chahiye..." },
    { side: "ai", text: "Bilkul! Kal kaun sa time theek rahega aapke liye?" },
    { side: "caller", text: "10 baje sahi rahega." },
    { side: "ai", text: "10 AM confirmed. Name and contact number please?" },
    { side: "caller", text: "Rahul Sharma, 98765-XXXXX." },
    { side: "ai", text: "Booked! Kal 10 AM. See you, Rahul. Have a great day!" },
  ];

  return (
    <div
      className="glass-card"
      style={{
        width: "100%",
        maxWidth: "560px",
        overflow: "hidden",
        border: "1px solid rgba(124,58,237,0.25)",
        boxShadow:
          "0 0 60px rgba(124,58,237,0.15), 0 40px 80px rgba(0,0,0,0.5)",
      }}
    >
      {/* Titlebar */}
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {["#FF5F57", "#FFBD2E", "#27C93F"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
            }}
          >
            Callink · Live Gateway
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className="live-dot" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#10B981",
              fontWeight: 600,
            }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* VU Meters */}
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Caller ← L
          </div>
          <Waveform color="#06B6D4" />
        </div>
        <div>
          <div
            style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            AI → R
          </div>
          <Waveform color="#A78BFA" />
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "22px",
              fontWeight: 700,
              color: "#10B981",
            }}
          >
            ~847ms
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            latency
          </div>
        </div>
      </div>

      {/* Transcript bubbles */}
      <div
        style={{
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "220px",
          overflowY: "auto",
        }}
      >
        {transcripts.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: t.side === "ai" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 + 0.5, duration: 0.4 }}
            style={{
              display: "flex",
              justifyContent: t.side === "ai" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "8px 12px",
                borderRadius:
                  t.side === "ai" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                background:
                  t.side === "ai"
                    ? "rgba(124, 58, 237, 0.2)"
                    : "rgba(255,255,255,0.06)",
                border:
                  t.side === "ai"
                    ? "1px solid rgba(124,58,237,0.3)"
                    : "1px solid rgba(255,255,255,0.08)",
                fontSize: "12px",
                color: "var(--text-primary)",
                lineHeight: 1.5,
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "var(--font-mono)",
                  color:
                    t.side === "ai" ? "var(--text-accent-violet)" : "var(--text-accent-cyan)",
                  marginBottom: "3px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {t.side === "ai" ? "Gemini AI" : "Caller"}
              </div>
              {t.text}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---- Floating Chips ---- */
function FloatingChip({
  text,
  icon: Icon,
  color,
  delay,
  style,
}: {
  text: string;
  icon: React.ElementType;
  color: "violet" | "cyan" | "emerald";
  delay: number;
  style?: React.CSSProperties;
}) {
  const colorMap = {
    violet: {
      bg: "rgba(124,58,237,0.15)",
      border: "rgba(124,58,237,0.4)",
      text: "#A78BFA",
    },
    cyan: {
      bg: "rgba(6,182,212,0.12)",
      border: "rgba(6,182,212,0.4)",
      text: "#67E8F9",
    },
    emerald: {
      bg: "rgba(16,185,129,0.12)",
      border: "rgba(16,185,129,0.4)",
      text: "#34D399",
    },
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "7px 14px",
        background: colorMap.bg,
        border: `1px solid ${colorMap.border}`,
        borderRadius: "999px",
        backdropFilter: "blur(12px)",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        fontWeight: 600,
        color: colorMap.text,
        whiteSpace: "nowrap",
        boxShadow: `0 4px 20px ${colorMap.border.replace("0.4", "0.2")}`,
        ...style,
      }}
    >
      <Icon size={13} />
      {text}
    </motion.div>
  );
}

/* ---- Trust Strip ---- */
const trustItems = [
  "Gemini Live",
  "Windows Phone Link",
  "Bluetooth HFP/SCO",
  "Python + aiohttp",
  "WebSockets",
];

function TrustStrip() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {trustItems.map((item, i) => (
        <span key={item} style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              padding: "0 14px",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
          {i < trustItems.length - 1 && (
            <span
              style={{
                width: "1px",
                height: "16px",
                background: "var(--border-subtle)",
                display: "inline-block",
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

/* ---- Main Hero ---- */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  const handleDemoClick = () => {
    document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "80px",
        overflow: "hidden",
      }}
      aria-label="Hero section"
    >
      {/* Ambient Orbs */}
      <div
        className="ambient-orb orb-violet"
        style={{
          width: "700px",
          height: "700px",
          top: "-200px",
          left: "-200px",
        }}
        aria-hidden="true"
      />
      <div
        className="ambient-orb orb-cyan"
        style={{
          width: "600px",
          height: "600px",
          bottom: "-100px",
          right: "-100px",
        }}
        aria-hidden="true"
      />
      <div
        className="ambient-orb orb-emerald"
        style={{
          width: "300px",
          height: "300px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div
        className="section-container"
        style={{
          width: "100%",
          position: "relative",
          zIndex: 1,
          paddingTop: "60px",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left: Copy */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="section-eyebrow" style={{ marginBottom: "28px" }}>
                <span className="live-dot" />
                Powered by Gemini Live · Runs on your own SIM
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: "clamp(36px, 5vw, 62px)", marginBottom: "20px" }}
            >
              Turn your phone number into an{" "}
              <span className="text-gradient-hero">AI voice agent.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: "18px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "36px",
                maxWidth: "520px",
              }}
            >
              Callink bridges real cellular calls to Gemini Live over Bluetooth
              HFP, with{" "}
              <span style={{ color: "var(--text-accent-cyan)", fontWeight: 600 }}>
                ~800 ms response time
              </span>{" "}
              and{" "}
              <span
                style={{ color: "var(--text-accent-violet)", fontWeight: 600 }}
              >
                zero telephony fees
              </span>
              . No SIP trunk. No virtual number. No per-minute billing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "44px" }}
            >
              <a
                href="#quickstart"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#quickstart")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
                style={{ fontSize: "16px", padding: "14px 28px" }}
              >
                <Download size={18} />
                Download for Windows
              </a>
              <a
                href="https://github.com/Anupthakurr/callink"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: "16px", padding: "14px 28px" }}
              >
                <Github size={18} />
                View on GitHub
              </a>
              <button
                onClick={handleDemoClick}
                className="btn-ghost"
                style={{ fontSize: "16px", padding: "14px 24px" }}
              >
                Hear a live call ↓
              </button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "10px",
                }}
              >
                Built on
              </div>
              <TrustStrip />
            </motion.div>
          </div>

          {/* Right: Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <DashboardMock />

            {/* Floating chips */}
            <FloatingChip
              text="~800 ms"
              icon={Zap}
              color="cyan"
              delay={0.8}
              style={{ top: "-16px", right: "30px" }}
            />
            <FloatingChip
              text="$0 telephony"
              icon={DollarSign}
              color="emerald"
              delay={1.0}
              style={{ bottom: "30px", left: "-20px" }}
            />
            <FloatingChip
              text="Hindi · Hinglish · EN"
              icon={Globe}
              color="violet"
              delay={1.2}
              style={{ bottom: "-16px", right: "20px" }}
            />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "60px",
          }}
        >
          <button
            onClick={() =>
              document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll to next section"
            style={{
              background: "none",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-muted)",
              transition: "all 0.2s",
              animation: "bounce 2s ease-in-out infinite",
            }}
          >
            <ChevronDown size={20} />
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
