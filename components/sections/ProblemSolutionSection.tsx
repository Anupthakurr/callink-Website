"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, AlertTriangle, DollarSign, Clock, Shield } from "lucide-react";

const oldWay = [
  { icon: DollarSign, text: "Virtual number rental (~$5–20/mo)" },
  { icon: DollarSign, text: "Telephony fees ($0.005–0.05/min per Twilio, Exotel)" },
  { icon: AlertTriangle, text: "3.2–4.5 s round-trip latency (STT→LLM→TTS)" },
  { icon: AlertTriangle, text: "Calls often spam-flagged (virtual numbers)" },
  { icon: X, text: "Complex SIP trunk + PBX setup" },
  { icon: X, text: "Vendor lock-in for every API" },
];

const newWay = [
  { icon: Check, text: "Your own SIM — no virtual number needed" },
  { icon: Check, text: "$0 telephony (Gemini API usage is your only cost)" },
  { icon: Check, text: "~800 ms–1.2 s round-trip via Gemini Live WebSocket" },
  { icon: Shield, text: "Caller ID trusted — it's your real number" },
  { icon: Check, text: "One Bluetooth link — no PBX, no SIP, no config hell" },
  { icon: Check, text: "Open-source — you own the stack" },
];

function CompareCard({
  title,
  subtitle,
  items,
  variant,
  delay,
}: {
  title: string;
  subtitle: string;
  items: { icon: React.ElementType; text: string }[];
  variant: "old" | "new";
  delay: number;
}) {
  const isOld = variant === "old";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-card"
      style={{
        padding: "32px",
        border: isOld
          ? "1px solid rgba(239,68,68,0.2)"
          : "1px solid rgba(124,58,237,0.3)",
        boxShadow: isOld
          ? "0 8px 40px rgba(0,0,0,0.3)"
          : "0 0 40px rgba(124,58,237,0.1), 0 8px 40px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            marginBottom: "16px",
            background: isOld
              ? "rgba(239,68,68,0.1)"
              : "rgba(16,185,129,0.1)",
            border: isOld
              ? "1px solid rgba(239,68,68,0.3)"
              : "1px solid rgba(16,185,129,0.3)",
          }}
        >
          {isOld ? (
            <X size={14} color="#F87171" />
          ) : (
            <Check size={14} color="#34D399" />
          )}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              color: isOld ? "#F87171" : "#34D399",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {title}
          </span>
        </div>
        <h3
          style={{
            fontSize: "22px",
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
            marginBottom: "6px",
          }}
        >
          {subtitle}
        </h3>
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: isOld
                    ? "rgba(239,68,68,0.12)"
                    : "rgba(16,185,129,0.12)",
                  border: isOld
                    ? "1px solid rgba(239,68,68,0.25)"
                    : "1px solid rgba(16,185,129,0.25)",
                }}
              >
                <Icon
                  size={14}
                  color={isOld ? "#F87171" : "#34D399"}
                  strokeWidth={2.5}
                />
              </div>
              <span
                style={{
                  fontSize: "15px",
                  color: isOld ? "var(--text-secondary)" : "var(--text-primary)",
                  lineHeight: 1.5,
                  paddingTop: "3px",
                  textDecoration: isOld ? "line-through" : "none",
                  textDecorationColor: "rgba(239,68,68,0.4)",
                }}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function ProblemSolutionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      id="problem"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="Problem vs Solution"
    >
      {/* Ambient */}
      <div
        className="ambient-orb"
        style={{
          width: "500px",
          height: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div className="section-eyebrow" style={{ margin: "0 auto 20px" }}>
            The shift
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            Why voice AI costs a{" "}
            <span className="text-glow-violet">fortune today</span>
            <br />and how Callink changes it
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
            Every hosted voice-AI platform stacks virtual numbers, telephony
            minutes, and STT/TTS API fees. Callink collapses that to one
            Bluetooth cable and a Gemini key.
          </p>
        </motion.div>

        {/* Two columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            alignItems: "start",
          }}
          className="compare-grid"
        >
          <CompareCard
            title="The old way"
            subtitle="Twilio / SIP trunk + STT→LLM→TTS"
            items={oldWay}
            variant="old"
            delay={0.1}
          />
          <CompareCard
            title="The Callink way"
            subtitle="Your SIM + Bluetooth + Gemini Live"
            items={newWay}
            variant="new"
            delay={0.25}
          />
        </div>

        {/* Arrow connector on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(124,58,237,0.5)",
            zIndex: 2,
            color: "#fff",
            fontSize: "22px",
            fontWeight: 700,
          }}
          className="vs-badge"
          aria-hidden="true"
        >
          →
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .compare-grid { grid-template-columns: 1fr !important; }
          .vs-badge { display: none !important; }
        }
      `}</style>
    </section>
  );
}
