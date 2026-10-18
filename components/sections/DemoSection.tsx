"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  Download,
  Clock,
  Globe,
  Zap,
  Phone,
} from "lucide-react";

const callChips = [
  { icon: Phone, label: "Outbound Call" },
  { icon: Clock, label: "9:16 duration" },
  { icon: Globe, label: "Hindi + Hinglish" },
  { icon: Zap, label: "~800 ms latency" },
];

/* ---- Waveform visualizer (CSS-only) ---- */
function StaticWaveform({
  progress,
  onClick,
}: {
  progress: number;
  onClick: (pct: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barCount = 80;
  const bars = Array.from({ length: barCount }, (_, i) => {
    const angle = (i / barCount) * Math.PI * 8;
    const h = 8 + Math.abs(Math.sin(angle) * 24) + ((i * 11) % 12);
    return Math.min(h, 36);
  });

  const handleClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = (e.clientX - rect.left) / rect.width;
    onClick(Math.max(0, Math.min(1, pct)));
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      role="slider"
      aria-label="Audio scrubber"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2px",
        height: "48px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {bars.map((h, i) => {
        const isPlayed = i / barCount < progress;
        return (
          <div
            key={i}
            style={{
              flex: "1",
              height: `${h}px`,
              borderRadius: "2px",
              background: isPlayed
                ? "linear-gradient(180deg, #A78BFA, #7C3AED)"
                : "rgba(255,255,255,0.1)",
              transition: "background 0.1s ease",
              minWidth: "2px",
            }}
          />
        );
      })}
    </div>
  );
}

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(556); // 9:16 in seconds
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (sec: number) => {
    if (isNaN(sec) || !isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Playback error:", err);
        });
      }
    }
  };

  const handleScrub = (pct: number) => {
    setProgress(pct);
    const target = pct * duration;
    setCurrentTime(target);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
    }
  };

  return (
    <section
      id="demo"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="Live call demo"
    >
      {/* Ambient */}
      <div
        className="ambient-orb orb-violet"
        style={{ width: "600px", height: "600px", bottom: "-100px", left: "-150px", opacity: 0.5 }}
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
            <span className="live-dot" />
            Real call recording
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            Hear it for yourself
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
            A real 9-minute outbound call in Hindi and Hinglish, recorded by
            Callink over cellular Bluetooth HFP.
          </p>
        </motion.div>

        {/* Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card demo-card"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "36px",
            border: "1px solid rgba(124,58,237,0.25)",
            boxShadow: "0 0 60px rgba(124,58,237,0.1), 0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* Call chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "28px",
            }}
          >
            {callChips.map((chip) => {
              const Icon = chip.icon;
              return (
                <div
                  key={chip.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    borderRadius: "999px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--text-accent-violet)",
                  }}
                >
                  <Icon size={12} />
                  {chip.label}
                </div>
              );
            })}
          </div>

          {/* Waveform */}
          <div style={{ marginBottom: "16px" }}>
            <StaticWaveform progress={progress} onClick={handleScrub} />
          </div>

          {/* Time */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "24px",
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {/* Play/Pause */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 25px rgba(124,58,237,0.5)",
                  transition: "transform 0.15s ease",
                  color: "#fff",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
                }
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              </button>
              <Volume2 size={18} color="var(--text-muted)" />
            </div>

            {/* Download */}
            <a
              href="/assets/call_demo_outbound.mp3"
              download
              className="btn-ghost"
              style={{ fontSize: "13px" }}
              aria-label="Download call recording"
            >
              <Download size={15} />
              Download audio
            </a>
          </div>

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src="/assets/call_demo_outbound.mp3"
            onLoadedMetadata={(e) => {
              const d = e.currentTarget.duration;
              if (d && !isNaN(d) && isFinite(d)) {
                setDuration(d);
              }
            }}
            onTimeUpdate={(e) => {
              const ct = e.currentTarget.currentTime;
              const d = e.currentTarget.duration || duration;
              setCurrentTime(ct);
              if (d > 0) setProgress(ct / d);
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
              setProgress(0);
              setCurrentTime(0);
            }}
            preload="metadata"
          />

          {/* Note */}
          <p
            style={{
              marginTop: "20px",
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              fontStyle: "italic",
            }}
          >
            Audio file: assets/call_demo_outbound.mp3 — place your recording
            here. Personal data redacted. Caller consented to recording.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .demo-card {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
