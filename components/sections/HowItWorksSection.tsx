"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Bluetooth, Cpu, Zap, Wifi, ChevronRight } from "lucide-react";

const steps = [
  {
    id: "caller",
    label: "Caller",
    icon: Phone,
    color: "#06B6D4",
    x: 0,
    description:
      "A person dials your real SIM number — no VoIP, no virtual number. Calls arrive on your Android phone as a normal cellular call.",
    tech: "Cellular GSM / LTE",
  },
  {
    id: "android",
    label: "Android Phone",
    icon: Phone,
    color: "#A78BFA",
    description:
      "Microsoft Phone Link (Link to Windows) mirrors your phone's call state to the Windows PC over Bluetooth. Your SIM stays in your phone.",
    tech: "Phone Link + Link to Windows",
  },
  {
    id: "bluetooth",
    label: "Bluetooth HFP/SCO",
    icon: Bluetooth,
    color: "#67E8F9",
    description:
      "Callink opens an HFP 1.7 Hands-Free Profile connection and negotiates an SCO audio channel at 8 kHz (CVSD) or 16 kHz (mSBC). A 120 ms jitter buffer smooths packet loss.",
    tech: "HFP 1.7 · SCO · CVSD/mSBC",
  },
  {
    id: "callink",
    label: "Callink Engine",
    icon: Cpu,
    color: "#7C3AED",
    description:
      "The Windows service: call detector, dialer, SCO bridge, RMS VAD for barge-in, recorder (dual-track stereo), knowledge engine, AI persona manager, and the web dashboard on localhost:5000.",
    tech: "Python · aiohttp · WinAPI",
  },
  {
    id: "gemini",
    label: "Gemini Live",
    icon: Zap,
    color: "#10B981",
    description:
      "Callink maintains a persistent WebSocket to the Gemini Live API (gemini-2.5-flash-preview-native-audio-dialog). Audio is streamed in real time — no STT, no TTS pipeline.",
    tech: "WebSocket · Gemini 2.5",
  },
  {
    id: "return",
    label: "Audio Return",
    icon: Wifi,
    color: "#FBBF24",
    description:
      "AI speech audio arrives via the same WebSocket, is decoded, and played back to the caller over the SCO channel. Total loop: ~800–1,200 ms from end of speech to first AI audio.",
    tech: "~800–1,200 ms RTT",
  },
];

function ArchNode({
  step,
  isActive,
  onClick,
  index,
}: {
  step: (typeof steps)[0];
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const Icon = step.icon;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`${step.label} — click to see details`}
      style={{
        background: isActive
          ? `rgba(${step.color === "#7C3AED" ? "124,58,237" : step.color === "#06B6D4" ? "6,182,212" : step.color === "#A78BFA" ? "167,139,250" : step.color === "#67E8F9" ? "103,232,249" : step.color === "#10B981" ? "16,185,129" : "251,191,36"},0.15)`
          : "rgba(13,15,24,0.6)",
        border: `2px solid ${isActive ? step.color : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        padding: "20px 16px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        transition: "all 0.25s ease",
        backdropFilter: "blur(12px)",
        boxShadow: isActive ? `0 0 25px ${step.color}40` : "none",
        flex: 1,
        minWidth: "100px",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${step.color}22`,
          border: `1px solid ${step.color}44`,
        }}
      >
        <Icon size={20} color={step.color} strokeWidth={2} />
      </div>
      <span
        style={{
          fontSize: "12px",
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          color: isActive ? step.color : "var(--text-secondary)",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {step.label}
      </span>
      {isActive && (
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: step.color,
            boxShadow: `0 0 8px ${step.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];

  return (
    <section
      id="how-it-works"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="How Callink works"
    >
      {/* Ambient */}
      <div
        className="ambient-orb orb-cyan"
        style={{ width: "500px", height: "500px", bottom: 0, left: "-150px", opacity: 0.5 }}
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
            Architecture
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            One call. One{" "}
            <span className="text-glow-violet">Bluetooth link.</span>
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            Click any node in the diagram to see how each component works.
          </p>
        </motion.div>

        {/* Architecture Flow */}
        <div className="glass-card desktop-arch-flow" style={{ padding: "40px 32px", marginBottom: "24px" }}>
          {/* Node row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              overflowX: "auto",
              paddingBottom: "8px",
            }}
          >
            {steps.map((step, i) => (
              <div
                key={step.id}
                style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? "1 1 auto" : "0 0 auto" }}
              >
                <ArchNode
                  step={step}
                  isActive={activeStep === i}
                  onClick={() => setActiveStep(i)}
                  index={i}
                />
                {i < steps.length - 1 && (
                  <ChevronRight
                    size={18}
                    color="var(--text-muted)"
                    style={{ flexShrink: 0 }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: "32px",
                padding: "24px",
                borderRadius: "12px",
                background: `${active.color}0D`,
                border: `1px solid ${active.color}33`,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${active.color}22`,
                    border: `1px solid ${active.color}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <active.icon size={22} color={active.color} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontFamily: "var(--font-display)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {active.label}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        background: `${active.color}18`,
                        border: `1px solid ${active.color}44`,
                        color: active.color,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {active.tech}
                    </span>
                  </div>
                  <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {active.description}
                  </p>
                </div>
              </div>

              {/* Step nav */}
              <div style={{ display: "flex", gap: "8px", marginTop: "20px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    cursor: activeStep === 0 ? "not-allowed" : "pointer",
                    color: activeStep === 0 ? "var(--text-muted)" : "var(--text-primary)",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                  }}
                  aria-label="Previous step"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  style={{
                    background: `${active.color}22`,
                    border: `1px solid ${active.color}44`,
                    borderRadius: "8px",
                    padding: "6px 14px",
                    cursor: activeStep === steps.length - 1 ? "not-allowed" : "pointer",
                    color: active.color,
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                  }}
                  aria-label="Next step"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile 4-step simplified */}
        <div className="glass-card mobile-steps" style={{ padding: "28px", display: "none" }}>
          <h3
            style={{
              fontSize: "16px",
              fontFamily: "var(--font-display)",
              marginBottom: "20px",
              color: "var(--text-secondary)",
            }}
          >
            Simplified flow
          </h3>
          {[
            { n: "1", label: "Caller dials your real SIM", color: "#06B6D4" },
            { n: "2", label: "Android + Phone Link bridges to PC", color: "#A78BFA" },
            { n: "3", label: "Callink opens SCO audio over Bluetooth", color: "#7C3AED" },
            { n: "4", label: "Gemini Live replies in ~800 ms", color: "#10B981" },
          ].map((s) => (
            <div
              key={s.n}
              style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: `${s.color}22`,
                  border: `1px solid ${s.color}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  color: s.color,
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                {s.n}
              </div>
              <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-arch-flow { display: none !important; }
          .mobile-steps { display: block !important; padding: 20px 16px !important; }
        }
      `}</style>
    </section>
  );
}
