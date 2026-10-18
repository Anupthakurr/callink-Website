"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Calendar,
  PhoneCall,
  Package,
  HeadphonesIcon,
  Clock,
} from "lucide-react";

const useCases = [
  {
    icon: Stethoscope,
    title: "Clinic Receptionist",
    color: "#06B6D4",
    prompt: "You are Priya, receptionist at Dr Mehta's clinic. Answer in Hindi or English based on the caller's preference. Book appointments, confirm slots, and answer FAQs.",
    snippet: [
      { side: "caller", text: "Kal 11 baje appointment milegi?" },
      { side: "ai", text: "Bilkul! Name aur contact number bataiye — 11 AM slot confirm karta hun." },
    ],
  },
  {
    icon: Calendar,
    title: "Appointment Reminders",
    color: "#A78BFA",
    prompt: "Outbound reminder agent: call patients 24 hours before their appointment. Confirm, reschedule, or cancel based on patient response.",
    snippet: [
      { side: "ai", text: "Hello! Kal subah 10 baje aapki appointment hai Dr Sharma ke saath — kya aap aa payenge?" },
      { side: "caller", text: "Haan, main aa jaaunga." },
    ],
  },
  {
    icon: PhoneCall,
    title: "Sales Follow-up",
    color: "#FBBF24",
    prompt: "You are Alex, a friendly sales rep for TechGadgets. Follow up on demo requests. Answer product questions. Schedule a live demo call if interested.",
    snippet: [
      { side: "ai", text: "Hi! I'm calling about your TechGadgets demo request — do you have 2 minutes?" },
      { side: "caller", text: "Sure, what's the pricing like?" },
    ],
  },
  {
    icon: Package,
    title: "Order & Delivery Updates",
    color: "#34D399",
    prompt: "Outbound delivery update agent. Inform customers about order status, expected delivery window, and collect delivery instructions if needed.",
    snippet: [
      { side: "ai", text: "Namaste! Aapka order #4521 kal 2–4 PM ke beech deliver hoga. Koi special instructions?" },
      { side: "caller", text: "Gate ke bahar rakh dena." },
    ],
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Support",
    color: "#F472B6",
    prompt: "Tier-1 support agent for QuickPay app. Handle FAQs, transaction issues, and KYC queries. Escalate to human for complaints.",
    snippet: [
      { side: "caller", text: "Mera transaction fail hua, refund kab milega?" },
      { side: "ai", text: "I'm checking your transaction ID now. Refunds take 3–5 business days — I'll send an SMS confirmation." },
    ],
  },
  {
    icon: Clock,
    title: "Restaurant Scheduling",
    color: "#FB923C",
    prompt: "Reservation agent for Spice Garden restaurant. Book tables, note special requests, confirm by SMS. Answer in Hindi, English, or both.",
    snippet: [
      { side: "caller", text: "Tonight at 8 for 4 people, any vegetarian menu?" },
      { side: "ai", text: "Absolutely! Table for 4 at 8 PM tonight. We have a full vegetarian thaali — shall I note that preference?" },
    ],
  },
];

function UseCaseCard({
  uc,
  index,
}: {
  uc: (typeof useCases)[0];
  index: number;
}) {
  const Icon = uc.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card glass-card-hover"
      style={{
        padding: "28px",
        border: `1px solid ${uc.color}25`,
        cursor: "default",
      }}
    >
      {/* Icon + title */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: `${uc.color}18`,
            border: `1px solid ${uc.color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={20} color={uc.color} strokeWidth={2} />
        </div>
        <h3
          style={{
            fontSize: "16px",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
          }}
        >
          {uc.title}
        </h3>
      </div>

      {/* Example prompt */}
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "10px",
          padding: "14px",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: "18px",
          fontStyle: "italic",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontStyle: "normal",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            marginBottom: "6px",
            fontWeight: 600,
          }}
        >
          System prompt excerpt
        </div>
        &ldquo;{uc.prompt}&rdquo;
      </div>

      {/* Call snippet */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
          }}
        >
          Example exchange
        </div>
        {uc.snippet.map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: line.side === "ai" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "90%",
                padding: "8px 12px",
                borderRadius:
                  line.side === "ai"
                    ? "12px 12px 2px 12px"
                    : "12px 12px 12px 2px",
                background:
                  line.side === "ai"
                    ? `${uc.color}22`
                    : "rgba(255,255,255,0.05)",
                border:
                  line.side === "ai"
                    ? `1px solid ${uc.color}44`
                    : "1px solid rgba(255,255,255,0.07)",
                fontSize: "12px",
                lineHeight: 1.5,
                color: "var(--text-primary)",
              }}
            >
              {line.text}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="Use cases"
    >
      {/* Ambient */}
      <div
        className="ambient-orb orb-violet"
        style={{ width: "500px", height: "500px", top: "0", left: "-100px", opacity: 0.4 }}
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
            Use cases
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            Built for{" "}
            <span className="text-glow-cyan">real businesses</span>
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
            From clinics to restaurants, from follow-ups to support — Callink
            handles it on your own number, in any language.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
          className="usecases-grid"
        >
          {useCases.map((uc, i) => (
            <UseCaseCard key={uc.title} uc={uc} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .usecases-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .usecases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
