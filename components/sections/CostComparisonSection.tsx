"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const rows = [
  {
    feature: "Virtual number required",
    callink: { val: false, label: "No — use your SIM" },
    twilio: { val: true, label: "Yes, required" },
    bolna: { val: true, label: "Yes, required" },
    exotel: { val: true, label: "Yes, required" },
  },
  {
    feature: "Telephony / per-minute cost",
    callink: { val: "none", label: "$0 per min" },
    twilio: { val: true, label: "$0.005–0.05 / min" },
    bolna: { val: true, label: "Included in plan" },
    exotel: { val: true, label: "₹0.5–2 / min" },
  },
  {
    feature: "API / model cost",
    callink: { val: "neutral", label: "Gemini API only" },
    twilio: { val: "neutral", label: "AI add-on" },
    bolna: { val: "neutral", label: "LLM + TTS add-on" },
    exotel: { val: "neutral", label: "AI add-on" },
  },
  {
    feature: "Caller ID trust",
    callink: { val: false, label: "Your real number ✓" },
    twilio: { val: true, label: "Virtual — spam risk" },
    bolna: { val: true, label: "Virtual — spam risk" },
    exotel: { val: true, label: "Virtual — spam risk" },
  },
  {
    feature: "Voice latency",
    callink: { val: false, label: "~800 ms – 1.2 s" },
    twilio: { val: true, label: "~3–5 s (STT+LLM+TTS)" },
    bolna: { val: true, label: "~2–4 s" },
    exotel: { val: true, label: "~3–5 s" },
  },
  {
    feature: "Setup complexity",
    callink: { val: false, label: "1-click .exe" },
    twilio: { val: true, label: "SIP + webhooks + code" },
    bolna: { val: true, label: "API + SIP config" },
    exotel: { val: true, label: "API + SIP config" },
  },
  {
    feature: "Data locality",
    callink: { val: false, label: "100% local" },
    twilio: { val: true, label: "Cloud processed" },
    bolna: { val: true, label: "Cloud processed" },
    exotel: { val: true, label: "Cloud processed" },
  },
  {
    feature: "Source available",
    callink: { val: false, label: "Yes — GitHub" },
    twilio: { val: true, label: "Closed source" },
    bolna: { val: true, label: "Closed source" },
    exotel: { val: true, label: "Closed source" },
  },
];

function CellContent({ val, label }: { val: boolean | string; label: string }) {
  if (val === "none") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            background: "rgba(52,211,153,0.15)",
            border: "1px solid rgba(52,211,153,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Check size={12} color="#34D399" strokeWidth={3} />
        </div>
        <span style={{ fontSize: "13px", color: "#34D399", fontWeight: 600 }}>{label}</span>
      </div>
    );
  }
  if (val === "neutral") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            background: "rgba(251,191,36,0.1)",
            border: "1px solid rgba(251,191,36,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Minus size={12} color="#FBBF24" strokeWidth={3} />
        </div>
        <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{label}</span>
      </div>
    );
  }
  if (val === false) {
    // Callink advantage
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            background: "rgba(52,211,153,0.15)",
            border: "1px solid rgba(52,211,153,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Check size={12} color="#34D399" strokeWidth={3} />
        </div>
        <span style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 500 }}>{label}</span>
      </div>
    );
  }
  // Competitor disadvantage
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "6px",
          background: "rgba(248,113,113,0.1)",
          border: "1px solid rgba(248,113,113,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <X size={12} color="#F87171" strokeWidth={3} />
      </div>
      <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{label}</span>
    </div>
  );
}

export default function CostComparisonSection() {
  const headers = ["", "Callink", "Twilio AI", "Bolna AI", "Exotel AI"];

  return (
    <section
      id="pricing"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="Cost comparison"
    >
      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <div className="section-eyebrow" style={{ margin: "0 auto 20px" }}>
            Honest comparison
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            What you{" "}
            <span className="text-glow-emerald">actually pay</span>
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
            Callink&apos;s only cost is the Gemini API. No telephony markup,
            no virtual number rent, no per-minute billing. Competitor figures are
            indicative and vary by plan.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ width: "100%", maxWidth: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "600px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                {headers.map((h, i) => (
                  <th
                    key={h}
                    style={{
                      padding: "18px 20px",
                      textAlign: i === 0 ? "left" : "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: i === 1 ? "#A78BFA" : "var(--text-secondary)",
                      background: i === 1 ? "rgba(124,58,237,0.06)" : "transparent",
                      borderRight: i < headers.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    }}
                  >
                    {i === 1 && (
                      <div
                        style={{
                          fontSize: "10px",
                          fontFamily: "var(--font-mono)",
                          color: "#34D399",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "4px",
                          fontWeight: 600,
                        }}
                      >
                        ← This is you
                      </div>
                    )}
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={row.feature}
                  style={{
                    borderBottom: ri < rows.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    background: ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}
                >
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-display)",
                      borderRight: "1px solid var(--border-subtle)",
                    }}
                  >
                    {row.feature}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      background: "rgba(124,58,237,0.04)",
                      borderRight: "1px solid var(--border-subtle)",
                    }}
                  >
                    <CellContent {...row.callink} />
                  </td>
                  <td style={{ padding: "16px 20px", borderRight: "1px solid var(--border-subtle)" }}>
                    <CellContent {...row.twilio} />
                  </td>
                  <td style={{ padding: "16px 20px", borderRight: "1px solid var(--border-subtle)" }}>
                    <CellContent {...row.bolna} />
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <CellContent {...row.exotel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p
          style={{
            marginTop: "16px",
            fontSize: "12px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Competitor pricing sourced from public documentation as of Oct 2026.
          Callink is not affiliated with or endorsed by Twilio, Bolna, or Exotel.
        </p>
      </div>

      <style>{`
        .text-glow-emerald {
          background: linear-gradient(135deg, #34D399, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
