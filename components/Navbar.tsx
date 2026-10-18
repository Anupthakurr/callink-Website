"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Phone } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { triggerDownloadEvent } from "@/components/ui/LiveDownloadBadge";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benchmark", href: "#benchmark" },
  { label: "Demo", href: "#demo" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle smooth scrolling when navigating to an anchor from another page
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      };
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMobileOpen(false);
    if (typeof window !== "undefined") {
      const isHome = window.location.pathname === "/" || window.location.pathname === "";
      if (isHome) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
          return;
        }
      }
      // If not on homepage or target element not on this page, let normal anchor navigation take user to /#target
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 24px",
          transition: "all 0.3s ease",
          background: scrolled
            ? "rgba(7, 8, 12, 0.85)"
            : "rgba(7, 8, 12, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
            aria-label="Callink home"
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px rgba(124,58,237,0.5)",
              }}
            >
              <Phone size={18} color="#fff" strokeWidth={2.5} />
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
          </a>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Site sections"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
            className="hidden-mobile"
          >
            <a
              href="https://github.com/Anupthakurr/callink"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="View Callink on GitHub"
              style={{ fontSize: "13px", padding: "8px 16px" }}
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href="https://pub-fd660d9dc0a946a0b983b5f725bba3ea.r2.dev/Callink_v2.1.exe"
              onClick={triggerDownloadEvent}
              className="btn-primary"
              style={{ fontSize: "14px", padding: "9px 20px" }}
              download
            >
              <Download size={15} />
              Download v2.1
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "1px solid var(--border-glass)",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
            className="show-mobile"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(7,8,12,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border-glass)",
              padding: "16px 24px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={`/${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "12px",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--border-subtle)",
                }}
              >
                <a
                  href="https://github.com/Anupthakurr/callink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href="https://pub-fd660d9dc0a946a0b983b5f725bba3ea.r2.dev/Callink_v2.1.exe"
                  onClick={triggerDownloadEvent}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: "center" }}
                  download
                >
                  <Download size={16} />
                  Download v2.1
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive style injection */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
