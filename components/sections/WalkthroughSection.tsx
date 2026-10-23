"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  ExternalLink,
  Copy,
  Check,
  PhoneCall,
  Zap,
  DollarSign,
  ShieldCheck,
  Download,
  Terminal,
} from "lucide-react";
import { YouTube, Github } from "@/components/ui/Icons";
import {
  YOUTUBE_WALKTHROUGH_URL,
  YOUTUBE_EMBED_URL,
  YOUTUBE_CHANNEL_URL,
  WALKTHROUGH_TITLE,
  DOWNLOAD_URL,
} from "@/lib/constants";
import { triggerDownloadEvent } from "@/components/ui/LiveDownloadBadge";

const walkthroughHighlights = [
  {
    icon: DollarSign,
    color: "#10B981",
    title: "100% Free Telephony",
    description:
      "Bypasses Twilio and SIP trunk charges completely by routing real phone calls through your existing cellular SIM.",
  },
  {
    icon: Zap,
    color: "#06B6D4",
    title: "~800 ms Ultra-Low Latency",
    description:
      "Bidirectional voice streaming over WebSockets directly to Gemini Live without STT → LLM → TTS pipeline latency.",
  },
  {
    icon: PhoneCall,
    color: "#A78BFA",
    title: "Live Cellular Call Test",
    description:
      "Real outbound and inbound call demonstrations in Hindi & Hinglish with natural conversational interruptions.",
  },
  {
    icon: ShieldCheck,
    color: "#F59E0B",
    title: "Zero Hardware Mod Needed",
    description:
      "Uses native Windows Phone Link and Bluetooth HFP/SCO to turn your PC into an enterprise-grade AI voice gateway.",
  },
];

export default function WalkthroughSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(YOUTUBE_WALKTHROUGH_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="walkthrough"
      className="section-pad"
      style={{ position: "relative", overflow: "hidden" }}
      aria-label="Callink project walkthrough video"
    >
      {/* Ambient background glows */}
      <div
        className="ambient-orb orb-violet"
        style={{
          width: "600px",
          height: "600px",
          top: "10%",
          left: "-180px",
          opacity: 0.45,
        }}
        aria-hidden="true"
      />
      <div
        className="ambient-orb orb-cyan"
        style={{
          width: "550px",
          height: "550px",
          bottom: "10%",
          right: "-160px",
          opacity: 0.35,
        }}
        aria-hidden="true"
      />

      <div
        className="section-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div className="section-eyebrow" style={{ margin: "0 auto 20px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#EF4444",
                boxShadow: "0 0 10px #EF4444",
                display: "inline-block",
              }}
            />
            Official Video Walkthrough
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 48px)",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            See Callink in{" "}
            <span className="text-gradient-hero">action.</span>
          </h2>

          <p
            style={{
              fontSize: "clamp(15px, 2.5vw, 18px)",
              color: "var(--text-secondary)",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Watch how Callink bridges real cellular phone calls into Gemini Live
            over Bluetooth HFP with zero telephony fees, sub-second latency, and
            natural voice interaction.
          </p>
        </motion.div>

        {/* Video Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-card"
          style={{
            maxWidth: "1000px",
            margin: "0 auto 48px",
            border: "1px solid rgba(124, 58, 237, 0.3)",
            boxShadow:
              "0 0 70px rgba(124, 58, 237, 0.18), 0 30px 80px rgba(0, 0, 0, 0.6)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Top Titlebar */}
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(0, 0, 0, 0.35)",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {/* macOS-style Dots + Title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: 0,
              }}
            >
              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
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
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {WALKTHROUGH_TITLE}
              </span>
            </div>

            {/* Direct Playback Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#FCA5A5",
                }}
              >
                <YouTube size={14} color="#EF4444" />
                YouTube 1080p
              </span>
            </div>
          </div>

          {/* Responsive 16:9 Embedded YouTube Player */}
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%", // 16:9 aspect ratio
              height: 0,
              overflow: "hidden",
              background: "#050608",
            }}
          >
            <iframe
              src={`${YOUTUBE_EMBED_URL}?rel=0&modestbranding=1&color=white`}
              title="Callink - Project Walkthrough & Demonstration Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          </div>

          {/* Action / Quick Info Strip */}
          <div
            style={{
              padding: "18px 24px",
              background: "rgba(13, 15, 24, 0.75)",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {/* Left Buttons: Watch on YouTube & Copy Link */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <a
                href={YOUTUBE_WALKTHROUGH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  fontSize: "13.5px",
                  padding: "9px 18px",
                  background: "linear-gradient(135deg, #DC2626, #991B1B)",
                  boxShadow: "0 0 20px rgba(220, 38, 38, 0.35)",
                }}
              >
                <YouTube size={16} color="#fff" />
                Watch on YouTube
                <ExternalLink size={13} style={{ marginLeft: "2px" }} />
              </a>

              <button
                onClick={handleCopyLink}
                className="btn-ghost"
                style={{
                  fontSize: "13px",
                  padding: "9px 16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                aria-label="Copy walkthrough video URL"
              >
                {copied ? (
                  <>
                    <Check size={14} color="#34D399" />
                    <span style={{ color: "#34D399" }}>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Video Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Right: Author / Channel Attribution */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "13px",
                color: "var(--text-muted)",
              }}
            >
              <span>Walkthrough by</span>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-accent-cyan)",
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                className="hover:underline"
              >
                Anup Thakur (@anupthakur489)
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* 4 Feature Takeaways from Walkthrough */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto 40px",
          }}
        >
          {walkthroughHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-card-hover"
                style={{
                  padding: "22px",
                  borderRadius: "14px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <Icon size={18} color={item.color} />
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "var(--text-primary)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA to try or view quickstart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={DOWNLOAD_URL}
            onClick={triggerDownloadEvent}
            className="btn-primary"
            style={{ fontSize: "14px", padding: "11px 22px" }}
            download
          >
            <Download size={16} />
            Download Callink (Windows x64)
          </a>
          <button
            onClick={() =>
              document
                .querySelector("#quickstart")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-secondary"
            style={{ fontSize: "14px", padding: "11px 22px" }}
          >
            <Terminal size={16} />
            Step-by-Step Setup Guide ↓
          </button>
        </motion.div>
      </div>
    </section>
  );
}
