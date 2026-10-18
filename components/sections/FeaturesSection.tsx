"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  DollarSign,
  PhoneIncoming,
  Globe,
  Mic,
  Radio,
  Brain,
  BookOpen,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "$0 telephony on your own number",
    desc: "Use your Android SIM. No virtual numbers, no per-minute billing. Your caller ID is trusted.",
    metric: "$0 / min",
    color: "emerald",
    colSpan: 1,
  },
  {
    icon: PhoneIncoming,
    title: "Inbound auto-answer & outbound AI dialer",
    desc: "Callink detects incoming calls and auto-answers, or dials out on command. Full duplex.",
    metric: "Both directions",
    color: "cyan",
    colSpan: 1,
  },
  {
    icon: Globe,
    title: "Multilingual auto-detection",
    desc: "Hindi, Hinglish, English, Spanish, French, German, Japanese and more. Seamless code-switching mid-call.",
    metric: "15+ languages",
    color: "violet",
    colSpan: 2,
  },
  {
    icon: Mic,
    title: "Natural barge-in",
    desc: "Client-side RMS VAD + Gemini server-side turn detection. Interrupt the AI naturally, just like a real conversation.",
    metric: "RMS + VAD",
    color: "cyan",
    colSpan: 1,
  },
  {
    icon: Radio,
    title: "Dual-track stereo recording",
    desc: "Left channel = caller, Right channel = AI. JSON transcripts included. Store locally; nothing leaves your machine.",
    metric: "Local only",
    color: "emerald",
    colSpan: 1,
  },
  {
    icon: Brain,
    title: "Voice Studio (test in browser)",
    desc: "Test your AI persona directly in the web dashboard before going live. No calls needed.",
    metric: "localhost:5000",
    color: "violet",
    colSpan: 1,
  },
  {
    icon: BookOpen,
    title: "Knowledge base grounding",
    desc: "Ingest PDF, DOCX, TXT, MD, CSV, JSON into the system prompt. Zero vector-DB latency.",
    metric: "Prompt-level RAG",
    color: "cyan",
    colSpan: 1,
  },
  {
    icon: Cpu,
    title: "Windows resilience",
    desc: "Stay-Awake guard prevents sleep during calls. 120 ms SCO jitter buffer. Call pre-warming reduces cold-start.",
    metric: "120 ms buffer",
    color: "emerald",
    colSpan: 2,
  },
];

const colorMap = {
  violet: {
    icon: "rgba(124,58,237,0.15)",
    border: "rgba(124,58,237,0.25)",
    iconColor: "#A78BFA",
    glow: "rgba(124,58,237,0.1)",
    badge: "rgba(124,58,237,0.12)",
    badgeBorder: "rgba(124,58,237,0.3)",
    badgeText: "#A78BFA",
  },
  cyan: {
    icon: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.25)",
    iconColor: "#67E8F9",
    glow: "rgba(6,182,212,0.08)",
    badge: "rgba(6,182,212,0.1)",
    badgeBorder: "rgba(6,182,212,0.3)",
    badgeText: "#67E8F9",
  },
  emerald: {
    icon: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.25)",
    iconColor: "#34D399",
    glow: "rgba(16,185,129,0.08)",
    badge: "rgba(16,185,129,0.1)",
    badgeBorder: "rgba(16,185,129,0.3)",
    badgeText: "#34D399",
  },
};

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const Icon = feature.icon;
  const colors = colorMap[feature.color as keyof typeof colorMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="glass-card glass-card-hover"
      style={{
        padding: "28px",
        gridColumn: `span ${feature.colSpan}`,
        border: `1px solid ${colors.border}`,
        cursor: "default",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.icon,
          border: `1px solid ${colors.border}`,
          marginBottom: "18px",
          boxShadow: `0 4px 20px ${colors.glow}`,
        }}
      >
        <Icon size={22} color={colors.iconColor} strokeWidth={2} />
      </div>

      {/* Metric badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "3px 10px",
          borderRadius: "999px",
          background: colors.badge,
          border: `1px solid ${colors.badgeBorder}`,
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: 600,
          color: colors.badgeText,
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {feature.metric}
      </div>

      <h3
        style={{
          fontSize: "17px",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          marginBottom: "10px",
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </h3>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
        {feature.desc}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="Key features"
    >
      {/* Ambient */}
      <div
        className="ambient-orb orb-violet"
        style={{ width: "600px", height: "600px", top: 0, right: "-200px", opacity: 0.6 }}
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
            Feature set
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            Everything your{" "}
            <span className="text-glow-cyan">AI call agent</span> needs
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
            Built for real-world use: inbound, outbound, multilingual, and
            resilient. Not a demo — a production-grade engine.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
          className="features-bento"
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .features-bento {
            grid-template-columns: 1fr !important;
          }
          .features-bento > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
