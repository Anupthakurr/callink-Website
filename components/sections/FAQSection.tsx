"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

/* ---- FAQ Data ---- */
const faqItems = [
  {
    q: "Do I need a virtual phone number?",
    a: "No. Callink uses your existing Android SIM and phone number. Incoming calls ring your real phone; outbound calls show your real caller ID. No virtual number, no SIP DID, no number rental.",
  },
  {
    q: "Does it work on iPhone or Mac?",
    a: "Currently, Callink supports Android phones paired with a Windows PC only. Bluetooth HFP/SCO access on iOS and macOS is restricted by Apple's APIs. We have no plans to announce iOS or Mac support at this time.",
  },
  {
    q: "Which languages are supported?",
    a: "Callink relies on Gemini Live's multilingual capabilities: Hindi, Hinglish, English, Spanish, French, German, Japanese, Portuguese, Arabic, and more. The model auto-detects the caller's language and code-switches mid-sentence. Language support depends on Gemini API and may expand over time.",
  },
  {
    q: "What does Callink cost?",
    a: "The Callink software is free for personal, educational, and research use under the BSL 1.1 license. Your only ongoing cost is the Google Gemini API, which you use with your own key. A commercial license is required for business use — see the License section.",
  },
  {
    q: "Can I use it commercially?",
    a: "Commercial use (including SaaS products, agencies, resellers, and customer-facing deployments) requires a commercial license. Contact us via the 'Request a commercial license' link. The BSL 1.1 converts to MIT on 2029-01-01, after which all use is free.",
  },
  {
    q: "Does it work with the laptop lid closed?",
    a: "Yes. Callink includes a Windows Stay-Awake guard that prevents the system from sleeping during active calls. It uses the Windows SetThreadExecutionState API to maintain an 'AWAY_MODE_REQUIRED' state. You can also configure Windows sleep settings manually as a backup.",
  },
  {
    q: "Is my call data private?",
    a: "Audio recordings are stored locally on your PC in the Callink recordings directory — nothing is uploaded to Callink servers. Audio is sent to Google's Gemini Live API per Google's standard privacy policy. Transcripts are stored as local JSON files.",
  },
  {
    q: "How do I stop the AI from echoing or talking over itself?",
    a: "Echo is usually caused by incorrect audio routing. In Windows Sound settings, ensure your Bluetooth headset/phone is set as both the playback and recording device for Callink. The SCO channel should handle echo cancellation at the hardware level. If you still hear echo, lower your speaker volume or use a headset for monitoring.",
  },
  {
    q: "What Gemini model does it use?",
    a: "Callink uses gemini-2.5-flash-preview-native-audio-dialog by default — Google's latest speech-to-speech Gemini Live model. You can configure the model string in your .env file.",
  },
  {
    q: "What happens if Bluetooth disconnects mid-call?",
    a: "Callink detects SCO audio interruptions and attempts to reconnect. If reconnection fails, the call gracefully terminates and is logged. The 120 ms jitter buffer handles short packet drops typical of Bluetooth.",
  },
];

/* ---- Barge-in Tuning Slider ---- */
const environments = [
  { label: "Quiet room", min: 200, max: 500 },
  { label: "Home office (some noise)", min: 400, max: 700 },
  { label: "Open office", min: 600, max: 900 },
  { label: "Café / street", min: 800, max: 1200 },
  { label: "Very noisy environment", min: 1000, max: 1500 },
];

function BargeinTuner() {
  const [envIdx, setEnvIdx] = useState(1);
  const env = environments[envIdx];

  return (
    <div className="glass-card" style={{ padding: "32px", marginBottom: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <SlidersHorizontal size={18} color="#A78BFA" />
        <h3
          style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 600 }}
        >
          Barge-in RMS Threshold Guide
        </h3>
      </div>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: 1.6 }}>
        The RMS threshold controls how much ambient noise triggers a barge-in (user interruption). Too low = AI gets interrupted by background noise. Too high = caller has to shout to interrupt.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="env-slider"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            display: "block",
            marginBottom: "10px",
          }}
        >
          Environment
        </label>
        <input
          id="env-slider"
          type="range"
          min={0}
          max={environments.length - 1}
          value={envIdx}
          onChange={(e) => setEnvIdx(Number(e.target.value))}
          style={{
            width: "100%",
            accentColor: "#7C3AED",
            cursor: "pointer",
          }}
          aria-label="Select environment for RMS threshold recommendation"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "6px",
          }}
        >
          {environments.map((e, i) => (
            <span
              key={e.label}
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                color: i === envIdx ? "#A78BFA" : "var(--text-muted)",
                fontWeight: i === envIdx ? 700 : 400,
              }}
            >
              {i === 0 ? "Quiet" : i === environments.length - 1 ? "Loud" : ""}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.25)",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "4px",
            }}
          >
            Environment
          </div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
            {env.label}
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "4px",
            }}
          >
            Recommended RMS range
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "22px",
              fontWeight: 700,
              color: "#A78BFA",
            }}
          >
            {env.min}–{env.max}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "6px",
            }}
          >
            .env setting
          </div>
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "#86EFAC",
              background: "rgba(0,0,0,0.4)",
              padding: "6px 12px",
              borderRadius: "6px",
              display: "inline-block",
            }}
          >
            BARGE_IN_RMS_THRESHOLD={env.min}
          </code>
        </div>
      </div>

      <a
        href="/docs/barge-in-tuning"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "16px",
          fontSize: "13px",
          color: "var(--text-accent-violet)",
          textDecoration: "none",
          fontFamily: "var(--font-mono)",
        }}
      >
        → Full barge-in tuning guide in docs
      </a>
    </div>
  );
}

/* ---- Accordion Item ---- */
function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof faqItems)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      style={{
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "16px",
            fontWeight: 600,
            color: isOpen ? "var(--text-primary)" : "var(--text-secondary)",
            lineHeight: 1.4,
            flex: 1,
            transition: "color 0.2s",
          }}
        >
          {item.q}
        </span>
        <ChevronDown
          size={18}
          color={isOpen ? "#A78BFA" : "var(--text-muted)"}
          style={{
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.3s ease, color 0.2s",
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontSize: "15px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                paddingBottom: "20px",
                paddingRight: "40px",
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="Frequently asked questions"
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
            FAQ
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            Common questions
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Honest answers, no marketing fluff.
          </p>
        </motion.div>

        {/* Barge-in tuner */}
        <BargeinTuner />

        {/* FAQ Accordion */}
        <div
          className="glass-card"
          style={{ padding: "8px 32px" }}
        >
          {faqItems.map((item, i) => (
            <AccordionItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
