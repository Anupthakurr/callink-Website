"use client";

import { motion } from "framer-motion";
import { Download, Terminal, Sparkles, Shield, ArrowRight, BookOpen } from "lucide-react";
import { Github } from "@/components/ui/Icons";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="section-pad"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 0 100px",
      }}
      aria-label="Call to Action"
    >
      {/* Background radial glow */}
      <div
        className="ambient-orb orb-violet"
        style={{
          width: "700px",
          height: "400px",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.35,
        }}
      />
      <div
        className="ambient-orb orb-cyan"
        style={{
          width: "500px",
          height: "300px",
          bottom: "10%",
          left: "20%",
          opacity: 0.25,
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{
            padding: "60px 40px",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(19, 22, 42, 0.85) 0%, rgba(13, 15, 24, 0.95) 100%)",
            border: "1px solid rgba(124, 58, 237, 0.35)",
            boxShadow: "0 0 60px rgba(124, 58, 237, 0.2), 0 30px 80px rgba(0, 0, 0, 0.6)",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              background: "rgba(124, 58, 237, 0.15)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "var(--radius-pill)",
              color: "var(--text-accent-violet)",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              marginBottom: "24px",
            }}
          >
            <Sparkles size={14} color="#A78BFA" />
            READY TO DEPLOY IN UNDER 10 MINUTES
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              lineHeight: 1.15,
            }}
          >
            Give your phone number a{" "}
            <span className="text-glow-violet">brain.</span>
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "var(--text-secondary)",
              maxWidth: "680px",
              margin: "0 auto 36px",
              lineHeight: 1.6,
            }}
          >
            Bridge your Android SIM straight to Gemini Live on Windows. No virtual numbers, no Twilio SIP trunking, no per-minute voice bills.
          </p>

          {/* Key Badges */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            <span className="chip chip-violet">
              <span className="live-dot" style={{ width: "6px", height: "6px" }} />
              Gemini Live (3.1 Flash)
            </span>
            <span className="chip chip-cyan">
              <Terminal size={12} />
              ~800 ms Latency
            </span>
            <span className="chip chip-emerald">
              <Shield size={12} />
              $0 Telephony Costs
            </span>
            <span className="chip" style={{ color: "#E2E8F0" }}>
              Windows 10 / 11 + Android
            </span>
          </div>

          {/* Action CTAs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/api/download"
              className="btn-primary"
              style={{
                fontSize: "16px",
                padding: "14px 32px",
                boxShadow: "0 0 35px rgba(124, 58, 237, 0.5)",
              }}
            >
              <Download size={18} />
              Download Callink v2.1 (EXE)
            </a>
            <a
              href="https://github.com/Anupthakurr/callink"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                fontSize: "16px",
                padding: "14px 28px",
              }}
            >
              <Github size={18} />
              Star on GitHub
            </a>
            <a
              href="/docs"
              className="btn-ghost"
              style={{
                fontSize: "15px",
                padding: "14px 24px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <BookOpen size={16} />
              Documentation
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Trust info note */}
          <div
            style={{
              marginTop: "32px",
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Free for personal, educational, and research use under BSL 1.1 · Converts to MIT on 2029-01-01
          </div>
        </motion.div>
      </div>
    </section>
  );
}
