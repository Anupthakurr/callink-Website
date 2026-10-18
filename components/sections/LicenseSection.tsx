"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";

const plans = [
  {
    label: "Personal / Research",
    color: "#34D399",
    badge: "Free",
    badgeColor: "rgba(52,211,153,0.15)",
    badgeBorderColor: "rgba(52,211,153,0.4)",
    badgeTextColor: "#34D399",
    items: [
      "Personal side projects",
      "Educational use",
      "Academic research",
      "Open-source contributions",
      "Attribution required",
    ],
    cta: { label: "Download Free", href: "#quickstart" },
    note: "BSL 1.1 — converts to MIT on 2029-01-01",
  },
  {
    label: "Commercial / SaaS",
    color: "#A78BFA",
    badge: "License required",
    badgeColor: "rgba(124,58,237,0.15)",
    badgeBorderColor: "rgba(124,58,237,0.4)",
    badgeTextColor: "#A78BFA",
    highlight: true,
    items: [
      "Customer-facing deployments",
      "SaaS / white-label products",
      "Agencies and resellers",
      "Internal enterprise tooling",
      "Priority support included",
    ],
    cta: { label: "Request a commercial license", href: "#contact" },
    note: "Contact us to discuss pricing and terms",
  },
  {
    label: "After 2029-01-01",
    color: "#67E8F9",
    badge: "MIT",
    badgeColor: "rgba(6,182,212,0.12)",
    badgeBorderColor: "rgba(6,182,212,0.4)",
    badgeTextColor: "#67E8F9",
    items: [
      "All uses permitted",
      "Commercial and SaaS",
      "No attribution required",
      "Full MIT freedoms",
      "Community edition",
    ],
    cta: { label: "View License", href: "https://github.com/Anupthakurr/callink/blob/main/LICENSE" },
    note: "BSL 1.1 automatically converts to MIT",
  },
];

export default function LicenseSection() {
  return (
    <section
      id="license"
      className="section-pad"
      style={{ position: "relative" }}
      aria-label="License plans"
    >
      {/* Ambient */}
      <div
        className="ambient-orb orb-cyan"
        style={{ width: "500px", height: "500px", top: "0", left: "-150px", opacity: 0.4 }}
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
            License
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: "16px" }}>
            Simple, honest licensing
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
            Callink uses the{" "}
            <a
              href="https://mariadb.com/bsl11/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-accent-cyan)", textDecoration: "none" }}
            >
              Business Source License 1.1 (BSL 1.1)
            </a>
            . Free for personal and research use. Commercial use needs a license.
            Converts to MIT on 2029-01-01.
          </p>
        </motion.div>

        {/* Plans */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            alignItems: "start",
          }}
          className="license-grid"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: "32px",
                border: plan.highlight
                  ? `1px solid rgba(124,58,237,0.4)`
                  : `1px solid ${plan.color}22`,
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(124,58,237,0.12)"
                  : "none",
                position: "relative",
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "4px 16px",
                    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                    borderRadius: "999px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    whiteSpace: "nowrap",
                  }}
                >
                  Current commercial
                </div>
              )}

              {/* Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 14px",
                  background: plan.badgeColor,
                  border: `1px solid ${plan.badgeBorderColor}`,
                  borderRadius: "999px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: plan.badgeTextColor,
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {plan.badge}
              </div>

              <h3
                style={{
                  fontSize: "20px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  marginBottom: "24px",
                  color: "var(--text-primary)",
                }}
              >
                {plan.label}
              </h3>

              <ul style={{ listStyle: "none", marginBottom: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {plan.items.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "6px",
                        background: `${plan.color}18`,
                        border: `1px solid ${plan.color}44`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      <Check size={11} color={plan.color} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.cta.href}
                {...(plan.cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={
                  !plan.cta.href.startsWith("http")
                    ? (e) => {
                        e.preventDefault();
                        document.querySelector(plan.cta.href)?.scrollIntoView({ behavior: "smooth" });
                      }
                    : undefined
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: plan.highlight
                    ? "none"
                    : `1px solid ${plan.color}44`,
                  background: plan.highlight
                    ? "linear-gradient(135deg, #7C3AED, #5B21B6)"
                    : `${plan.color}12`,
                  color: plan.highlight ? "#fff" : plan.color,
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  boxShadow: plan.highlight
                    ? "0 0 25px rgba(124,58,237,0.4)"
                    : "none",
                }}
              >
                {plan.cta.label}
                {plan.cta.href.startsWith("http") && <ExternalLink size={14} />}
              </a>

              <p
                style={{
                  marginTop: "14px",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {plan.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .license-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
