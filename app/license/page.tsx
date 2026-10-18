"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Scale, CheckCircle2, AlertCircle, ArrowRight, ExternalLink, Calendar, HelpCircle } from "lucide-react";

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />

      <div style={{ paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="section-container" style={{ maxWidth: "900px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="section-eyebrow">
              <Scale size={13} />
              BUSINESS SOURCE LICENSE 1.1
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 50px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Licensing &amp; Commercial Terms
            </h1>
            <p style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Callink is published under the Business Source License 1.1 (BSL 1.1). It is completely free for personal, academic, and non-commercial research use, and automatically converts to the permissive MIT License on January 1, 2029.
            </p>
          </div>

          {/* License Pillars */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "40px",
            }}
            className="license-pillars"
          >
            {/* Free Tier */}
            <div
              className="glass-card"
              style={{
                padding: "32px",
                border: "1px solid rgba(52, 211, 153, 0.3)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  background: "rgba(52, 211, 153, 0.15)",
                  color: "#34D399",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                100% FREE
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>
                Personal, Educational &amp; Research
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
                You may inspect, fork, modify, and run Callink on your personal devices or for research purposes without paying any software licensing fee.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <li style={{ display: "flex", gap: "8px" }}>
                  <CheckCircle2 size={16} color="#34D399" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Personal AI voice assistant for your own SIM card</span>
                </li>
                <li style={{ display: "flex", gap: "8px" }}>
                  <CheckCircle2 size={16} color="#34D399" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Academic research on speech-to-speech multimodal systems</span>
                </li>
                <li style={{ display: "flex", gap: "8px" }}>
                  <CheckCircle2 size={16} color="#34D399" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Local testing &amp; evaluation for non-revenue workflows</span>
                </li>
              </ul>
            </div>

            {/* Commercial Tier */}
            <div
              className="glass-card"
              style={{
                padding: "32px",
                border: "1px solid rgba(124, 58, 237, 0.4)",
                background: "linear-gradient(135deg, rgba(19, 22, 42, 0.8) 0%, rgba(13, 15, 24, 0.9) 100%)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  background: "rgba(124, 58, 237, 0.2)",
                  color: "#A78BFA",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginBottom: "16px",
                }}
              >
                COMMERCIAL LICENSE
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>
                Business, SaaS &amp; Client Services
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6 }}>
                Using Callink to generate revenue, provide customer service for a business, or embed into a commercial SaaS offering requires a commercial agreement.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
                <li style={{ display: "flex", gap: "8px" }}>
                  <CheckCircle2 size={16} color="#A78BFA" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Commercial call answering for clinics, salons, businesses</span>
                </li>
                <li style={{ display: "flex", gap: "8px" }}>
                  <CheckCircle2 size={16} color="#A78BFA" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>White-label distribution &amp; multi-instance deployment</span>
                </li>
                <li style={{ display: "flex", gap: "8px" }}>
                  <CheckCircle2 size={16} color="#A78BFA" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>Priority WhatsApp/Email developer support &amp; custom adapters</span>
                </li>
              </ul>
              <a href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Request Commercial License
              </a>
            </div>
          </div>

          {/* 2029 MIT Conversion Banner */}
          <div
            className="glass-card"
            style={{
              padding: "24px 30px",
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              background: "rgba(6, 182, 212, 0.05)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(6, 182, 212, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Calendar size={24} color="#22D3EE" />
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#67E8F9", marginBottom: "4px" }}>
                Automatic Conversion to MIT License on January 1, 2029
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Under BSL 1.1 terms, the license has an irrevocable Change Date of 2029-01-01. On that date, all version 1.x code automatically becomes permissible open source under the standard MIT License.
              </p>
            </div>
          </div>

          {/* FAQ on Licensing */}
          <div className="glass-card" style={{ padding: "36px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
              <HelpCircle size={20} color="#A78BFA" />
              Frequently Asked Questions About Licensing
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px" }}>
                  Can I use Callink to answer calls for my small medical clinic or local salon?
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  If you are using Callink to serve revenue-generating commercial operations, a commercial license is required. We offer extremely accessible tiers tailored for single-practitioner clinics and local shops.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px" }}>
                  Does Callink charge any per-minute telephony fees?
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Never. Callink charges $0 telephony fees. Cellular minutes are billed according to your mobile carrier plan (which is typically unlimited in India and most countries). You only pay Google directly for your Gemini Live API tokens.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px" }}>
                  Where can I read the full legal license text?
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  The full BSL 1.1 text is available in our GitHub repository at{" "}
                  <a
                    href="https://github.com/Anupthakurr/callink/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--cyan-soft)", textDecoration: "underline" }}
                  >
                    github.com/Anupthakurr/callink/LICENSE
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .license-pillars { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
