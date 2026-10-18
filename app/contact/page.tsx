"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Building, Send, CheckCircle2, Shield, MessageSquare, ExternalLink } from "lucide-react";
import { Github, Twitter } from "@/components/ui/Icons";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    volume: "500-2,500 calls/mo",
    useCase: "Clinic / Salon Receptionist",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />

      <div style={{ paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="section-container" style={{ maxWidth: "960px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="section-eyebrow">
              <Mail size={13} />
              COMMERCIAL INQUIRIES &amp; SUPPORT
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 50px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Get in Touch
            </h1>
            <p style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "680px", margin: "0 auto" }}>
              Request a commercial license for business use, discuss white-label deployment, or ask technical integration questions.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "40px",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Form */}
            <div className="glass-card" style={{ padding: "36px" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <CheckCircle2 size={32} color="#10B981" />
                  </div>
                  <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>
                    Inquiry Received!
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>
                    Thank you, <strong>{formData.name}</strong>. Anup Thakur will review your requirements and respond to <strong>{formData.email}</strong> within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                    style={{ fontSize: "14px", padding: "10px 20px" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>
                    Commercial License Request
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-secondary)" }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Rajesh Sharma"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border-glass)",
                          color: "#fff",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-secondary)" }}>
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@cityclinic.in"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border-glass)",
                          color: "#fff",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-secondary)" }}>
                        Business / Organization Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="City Dental & Care"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border-glass)",
                          color: "#fff",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-secondary)" }}>
                          Primary Use Case
                        </label>
                        <select
                          value={formData.useCase}
                          onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            background: "#0D0F18",
                            border: "1px solid var(--border-glass)",
                            color: "#fff",
                            fontSize: "13px",
                            outline: "none",
                          }}
                        >
                          <option value="Clinic / Salon Receptionist">Clinic / Salon Receptionist</option>
                          <option value="Customer Support Desk">Customer Support Desk</option>
                          <option value="Outbound Sales Calls">Outbound Sales Follow-ups</option>
                          <option value="Delivery / Orders">Order &amp; Delivery Updates</option>
                          <option value="White-Label / SaaS">Embedding in Commercial SaaS</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-secondary)" }}>
                          Expected Monthly Calls
                        </label>
                        <select
                          value={formData.volume}
                          onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            background: "#0D0F18",
                            border: "1px solid var(--border-glass)",
                            color: "#fff",
                            fontSize: "13px",
                            outline: "none",
                          }}
                        >
                          <option value="<500 calls/mo">&lt; 500 calls / month</option>
                          <option value="500-2,500 calls/mo">500 – 2,500 calls / month</option>
                          <option value="2,500-10,000 calls/mo">2,500 – 10,000 calls / month</option>
                          <option value="10,000+ calls/mo">10,000+ calls / month</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-secondary)" }}>
                        Project Details / Notes
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your setup: number of SIM lines, Windows hardware, special integrations..."
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border-glass)",
                          color: "#fff",
                          fontSize: "14px",
                          outline: "none",
                          resize: "vertical",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        padding: "14px",
                        fontSize: "15px",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Send size={16} />
                      Submit Commercial Request
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="glass-card" style={{ padding: "28px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Shield size={18} color="#34D399" />
                  Commercial Benefits
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--text-secondary)" }}>
                  <li style={{ display: "flex", gap: "8px" }}>
                    <CheckCircle2 size={15} color="#34D399" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>Legally compliant commercial use for businesses &amp; clinics</span>
                  </li>
                  <li style={{ display: "flex", gap: "8px" }}>
                    <CheckCircle2 size={15} color="#34D399" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>White-label permission to brand as your own voice portal</span>
                  </li>
                  <li style={{ display: "flex", gap: "8px" }}>
                    <CheckCircle2 size={15} color="#34D399" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>Direct access to custom audio DSP tuning &amp; prompt optimization</span>
                  </li>
                  <li style={{ display: "flex", gap: "8px" }}>
                    <CheckCircle2 size={15} color="#34D399" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>Invoice and GST receipt support for Indian businesses</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card" style={{ padding: "28px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <MessageSquare size={18} color="#67E8F9" />
                  Open Source &amp; Community
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                  For bugs, feature requests, or personal research discussions, please participate on GitHub:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a
                    href="https://github.com/Anupthakurr/callink/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ fontSize: "13px", justifyContent: "flex-start", padding: "8px 14px" }}
                  >
                    <Github size={15} />
                    GitHub Issues
                    <ExternalLink size={12} style={{ marginLeft: "auto" }} />
                  </a>
                  <a
                    href="https://twitter.com/anupthakurr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ fontSize: "13px", justifyContent: "flex-start", padding: "8px 14px" }}
                  >
                    <Twitter size={15} />
                    @anupthakurr on X / Twitter
                    <ExternalLink size={12} style={{ marginLeft: "auto" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 800px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
