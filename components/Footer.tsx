"use client";

import Link from "next/link";
import { Phone, Heart, ArrowUp, ExternalLink, ShieldCheck, Cpu } from "lucide-react";
import { Github, Twitter } from "@/components/ui/Icons";
import { triggerDownloadEvent } from "@/components/ui/LiveDownloadBadge";
import { DOWNLOAD_URL } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #07080C 0%, #050608 100%)",
        borderTop: "1px solid var(--border-glass)",
        padding: "80px 0 40px",
        position: "relative",
        color: "var(--text-secondary)",
        fontFamily: "var(--font-body)",
      }}
      role="contentinfo"
      aria-label="Site Footer"
    >
      <div className="section-container">
        {/* Main Footer Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "60px",
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div style={{ maxWidth: "340px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 15px rgba(124,58,237,0.4)",
                }}
              >
                <Phone size={16} color="#fff" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "20px",
                  letterSpacing: "-0.03em",
                  color: "#F8FAFC",
                }}
              >
                Callink
              </span>
            </Link>

            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                marginBottom: "20px",
              }}
            >
              Open-source-style GSM-to-Gemini Live AI voice gateway for Windows. Bridge cellular calls over Bluetooth HFP with ~800 ms latency and $0 telephony fees.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a
                href="https://github.com/Anupthakurr/callink"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border-glass)",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                aria-label="GitHub Repository"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "var(--border-glow-violet)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border-glass)";
                }}
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com/anupthakurr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border-glass)",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                aria-label="Twitter Profile"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "var(--border-glow-cyan)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border-glass)";
                }}
              >
                <Twitter size={18} />
              </a>
              <Link
                href="/stats"
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  color: "#34D399",
                  fontFamily: "var(--font-mono)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                v2.1 Stable · Live Stats
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}
            >
              Product
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <a href="/#features" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="/#how-it-works" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Architecture Flow
                </a>
              </li>
              <li>
                <a href="/#demo" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Live Audio Demo
                </a>
              </li>
              <li>
                <a href="/#dashboard" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Web Dashboard
                </a>
              </li>
              <li>
                <a href="/#pricing" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Cost Comparison
                </a>
              </li>
              <li>
                <a
                  href={DOWNLOAD_URL}
                  onClick={triggerDownloadEvent}
                  download
                  style={{ color: "var(--text-accent-cyan)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                  className="hover:text-white"
                >
                  Download Windows (.exe)
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Docs */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}
            >
              Resources
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/docs" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/benchmark" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Latency Benchmark
                </Link>
              </li>
              <li>
                <a href="/#quickstart" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Quickstart Guide
                </a>
              </li>
              <li>
                <Link href="/changelog" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/stats" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Live Download Stats
                </Link>
              </li>
              <li>
                <a href="/#faq" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  FAQ & Troubleshooting
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & License */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}
            >
              Legal & License
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/license" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  BSL 1.1 License
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Commercial Licensing
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Anupthakurr/callink/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  className="hover:text-white"
                >
                  Raw License File <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  Converts to MIT on Jan 1, 2029
                </span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
              }}
            >
              Contact
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/contact" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} className="hover:text-white">
                  Commercial Inquiry
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Anupthakurr/callink/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  className="hover:text-white"
                >
                  Report an Issue <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Anupthakurr/callink/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  className="hover:text-white"
                >
                  Community Discussions <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  style={{
                    marginTop: "8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "var(--border-glow-violet)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.borderColor = "var(--border-glass)";
                  }}
                >
                  <ArrowUp size={12} /> Back to top
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: "32px" }} />

        {/* Bottom Disclaimers & Credits */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          <div>
            <p style={{ marginBottom: "6px" }}>
              © 2026 <strong>Anup Thakur</strong>. Released under Business Source License 1.1.
            </p>
            <p style={{ fontSize: "12px", color: "#64748B" }}>
              Disclaimer: Callink is an independent open-source project and is not affiliated with, endorsed by, or sponsored by Google LLC or Microsoft Corporation. Gemini is a registered trademark of Google LLC. Windows and Phone Link are registered trademarks of Microsoft Corporation.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)" }}>
              <Cpu size={13} color="#A78BFA" /> Built for Windows 10/11
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)" }}>
              <ShieldCheck size={13} color="#34D399" /> 100% Local Audio Routing
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
