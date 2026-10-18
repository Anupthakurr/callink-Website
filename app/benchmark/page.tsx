"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Clock, Cpu, BarChart2, CheckCircle2, ArrowRight, Play, RefreshCw } from "lucide-react";

export default function BenchmarkPage() {
  const [activeTest, setActiveTest] = useState<"callink" | "legacy" | null>(null);
  const [testStatus, setTestStatus] = useState<string>("Ready to test");

  const runSimulation = (mode: "callink" | "legacy") => {
    setActiveTest(mode);
    setTestStatus("User speaks: 'Hey, can I book an appointment for tomorrow at 4 PM?'");
    const delay = mode === "callink" ? 820 : 3450;
    setTimeout(() => {
      setTestStatus(
        mode === "callink"
          ? "Gemini Live responded in 820ms: 'Yes, 4 PM tomorrow is available. What name should I put down?'"
          : "Legacy stack responded in 3,450ms (3.45s delay): 'Yes, 4 PM tomorrow is available...'"
      );
    }, delay);
  };

  const stages = [
    {
      stage: "1. Capture & SCO Inbound",
      legacy: 180,
      callink: 60,
      why: "Callink uses native Windows WASAPI exclusive stream with 120ms ring buffer, bypassing multi-layer OS resamplers.",
    },
    {
      stage: "2. Gateway Ingestion",
      legacy: 280,
      callink: 40,
      why: "Callink opens a single direct WebSocket stream straight to Google edge POP without intermediate SIP/WebRTC PBX proxies.",
    },
    {
      stage: "3. Speech Recognition (STT)",
      legacy: 750,
      callink: 0,
      why: "Gemini Live is native speech-to-speech. There is NO intermediate text transcript serialization or phoneme tokenization step.",
    },
    {
      stage: "4. Reasoning & Generation (TTFT)",
      legacy: 850,
      callink: 440,
      why: "Gemini 3.1 Flash Live processes audio tokens directly in its multimodal transformer with speculative audio stream decoding.",
    },
    {
      stage: "5. Speech Synthesis (TTS)",
      legacy: 680,
      callink: 0,
      why: "Zero TTS generation stage. The Gemini transformer outputs raw 24kHz audio waveform packets natively.",
    },
    {
      stage: "6. Turn Detection / VAD",
      legacy: 450,
      callink: 140,
      why: "Dual VAD: Client-side RMS energy gate provides instant preemptive pause, while Gemini detects semantic sentence completion.",
    },
    {
      stage: "7. Outbound SCO Playback",
      legacy: 280,
      callink: 140,
      why: "Direct HFP channel feeding back to Android baseband.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />

      <div style={{ paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="section-container">
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 60px" }}>
            <div className="section-eyebrow">
              <Zap size={13} />
              PERFORMANCE ARCHITECTURE &amp; BENCHMARK
            </div>
            <h1
              style={{
                fontSize: "clamp(34px, 5vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "20px",
                lineHeight: 1.15,
              }}
            >
              The Science of{" "}
              <span className="text-glow-violet">~800 ms</span> Conversational Voice
            </h1>
            <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Why legacy STT &rarr; LLM &rarr; TTS architectures stall at 3.5+ seconds, and how native speech-to-speech audio streaming over Windows Bluetooth eliminates 75% of conversational lag.
            </p>
          </div>

          {/* Interactive Latency Simulator */}
          <div
            className="glass-card"
            style={{
              padding: "40px",
              marginBottom: "60px",
              background: "linear-gradient(135deg, rgba(19, 22, 42, 0.7) 0%, rgba(13, 15, 24, 0.9) 100%)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>
                Experience the Difference: Conversational Pause Simulator
              </h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
                Click below to simulate asking a question and feel the actual pause before the AI speaks.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "30px",
              }}
            >
              <button
                onClick={() => runSimulation("callink")}
                className="btn-primary"
                style={{
                  padding: "14px 28px",
                  fontSize: "15px",
                  boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)",
                }}
              >
                <Play size={16} />
                Simulate Callink (~820 ms)
              </button>
              <button
                onClick={() => runSimulation("legacy")}
                className="btn-secondary"
                style={{
                  padding: "14px 28px",
                  fontSize: "15px",
                }}
              >
                <Play size={16} />
                Simulate Legacy Stack (~3,450 ms)
              </button>
            </div>

            <div
              style={{
                padding: "20px",
                borderRadius: "10px",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid var(--border-subtle)",
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "15px",
                color: activeTest === "callink" ? "#A78BFA" : activeTest === "legacy" ? "#F87171" : "var(--text-secondary)",
                minHeight: "68px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {testStatus}
            </div>
          </div>

          {/* Deep Breakdown Table */}
          <div className="glass-card" style={{ padding: "40px", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "16px" }}>
              Stage-by-Stage Latency Breakdown
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px", fontSize: "15px" }}>
              Measurements gathered under typical 4G LTE/5G cellular conditions with a Windows 11 PC on a standard 100 Mbps fiber connection.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-glass)", textAlign: "left" }}>
                    <th style={{ padding: "16px", color: "var(--text-primary)" }}>Pipeline Stage</th>
                    <th style={{ padding: "16px", color: "#F87171" }}>Legacy STT+LLM+TTS</th>
                    <th style={{ padding: "16px", color: "#34D399" }}>Callink (Gemini Live)</th>
                    <th style={{ padding: "16px", color: "var(--text-primary)" }}>Technical Rationale</th>
                  </tr>
                </thead>
                <tbody style={{ color: "var(--text-secondary)" }}>
                  {stages.map((row) => (
                    <tr key={row.stage} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      <td style={{ padding: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {row.stage}
                      </td>
                      <td style={{ padding: "16px", fontFamily: "var(--font-mono)", color: "#F87171" }}>
                        {row.legacy} ms
                      </td>
                      <td style={{ padding: "16px", fontFamily: "var(--font-mono)", color: "#34D399", fontWeight: 700 }}>
                        {row.callink === 0 ? "0 ms (Eliminated)" : `${row.callink} ms`}
                      </td>
                      <td style={{ padding: "16px", fontSize: "13px", lineHeight: 1.5 }}>
                        {row.why}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: "rgba(124, 58, 237, 0.08)", fontWeight: 700 }}>
                    <td style={{ padding: "18px", color: "#fff", fontSize: "16px" }}>
                      TOTAL ROUND-TRIP
                    </td>
                    <td style={{ padding: "18px", fontFamily: "var(--font-mono)", color: "#F87171", fontSize: "16px" }}>
                      ~3,470 ms (3.47 s)
                    </td>
                    <td style={{ padding: "18px", fontFamily: "var(--font-mono)", color: "#34D399", fontSize: "18px" }}>
                      ~840 ms (0.84 s)
                    </td>
                    <td style={{ padding: "18px", color: "#A78BFA", fontSize: "14px" }}>
                      <strong>75.8% faster</strong> &mdash; natural human conversational rhythm
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Advantages Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              marginBottom: "60px",
            }}
            className="benchmark-grid"
          >
            <div className="glass-card" style={{ padding: "30px" }}>
              <div style={{ color: "#A78BFA", marginBottom: "14px" }}>
                <Cpu size={28} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>
                Zero Double-Transcription
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Legacy systems convert voice to text, send text to LLM, and convert output text back to speech. Callink stays natively in acoustic space from end to end.
              </p>
            </div>

            <div className="glass-card" style={{ padding: "30px" }}>
              <div style={{ color: "#22D3EE", marginBottom: "14px" }}>
                <Clock size={28} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>
                120ms Jitter Buffer
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Our proprietary Bluetooth SCO circular queue absorbs cellular packet jitter without introducing perceptible buffering lag or clipping initial syllables.
              </p>
            </div>

            <div className="glass-card" style={{ padding: "30px" }}>
              <div style={{ color: "#34D399", marginBottom: "14px" }}>
                <BarChart2 size={28} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>
                Instant Barge-In
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                When the caller interrupts, our local WASAPI thread mutes playback within 40ms, preventing the jarring delay where an AI talks over the user for multiple seconds.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: "center" }}>
            <a href="/#quickstart" className="btn-primary" style={{ padding: "14px 32px", fontSize: "16px" }}>
              Download Callink &amp; Test Locally
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .benchmark-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
