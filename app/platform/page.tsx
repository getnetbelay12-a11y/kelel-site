import type { Metadata } from "next";
import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";

export const metadata: Metadata = {
  title: "Platform | Kelel IT Solution",
  description:
    "Modern API-first architecture built for secure regional operations across Africa. Modular deployment, 99.99% uptime, sub-45ms latency.",
};

export default function PlatformPage() {
  return (
    <main className="stitch-page">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <RevealSection className="stitch-hero">
        <div className="stitch-container">
          <span className="stitch-kicker">PLATFORM CORE</span>
          <h1 className="stitch-h1">
            Modern architecture built for secure regional operations.
          </h1>
          <p className="stitch-body">
            API-first systems, modular deployment, and clear reporting
            structures designed for high-stakes financial environments across
            Africa.
          </p>

          <div className="stitch-metrics-row">
            {/* UPTIME */}
            <div className="stitch-metric-card stitch-glass">
              <span className="stitch-metric-label">UPTIME</span>
              <span className="stitch-metric-val">99.99%</span>
              <div className="stitch-progress">
                <div
                  className="stitch-progress-fill"
                  style={{ width: "99.99%", background: "#10b981" }}
                />
              </div>
            </div>

            {/* LATENCY */}
            <div className="stitch-metric-card stitch-glass">
              <span className="stitch-metric-label">LATENCY</span>
              <span className="stitch-metric-val">&lt;&nbsp;45ms</span>
              <div className="stitch-progress">
                <div
                  className="stitch-progress-fill"
                  style={{ width: "22%", background: "#3b82f6" }}
                />
              </div>
            </div>

            {/* REGIONS */}
            <div className="stitch-metric-card stitch-glass">
              <span className="stitch-metric-label">REGIONS</span>
              <span className="stitch-metric-val">12 Nodes</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#10b981",
                  }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#3b82f6",
                  }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#8b5cf6",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "monospace",
                    opacity: 0.6,
                    marginLeft: "2px",
                  }}
                >
                  +9
                </span>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Technical Capabilities Bento ─────────────────────────────── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-tech-bento">
            {/* API-first systems — wide */}
            <div className="stitch-tech-wide stitch-glass">
              <h3>API-first systems</h3>
              <p className="stitch-body">
                Integration-ready services built for extensibility across teams
                and platforms.
              </p>
              <div className="stitch-code-block">
                <pre>
                  <span className="stitch-code-method">GET</span>
                  {" /v2/nodes/active_status\n"}
                  {"Authorization: Bearer {{AUTH_TOKEN}}\n"}
                  {"{\n"}
                  {"  "}
                  <span className="stitch-code-key">&quot;status&quot;</span>
                  {": &quot;synced&quot;,\n"}
                  {"  "}
                  <span className="stitch-code-key">&quot;throughput&quot;</span>
                  {": 842.1,\n"}
                  {"  "}
                  <span className="stitch-code-key">&quot;health_score&quot;</span>
                  {": 0.99\n"}
                  {"}"}
                </pre>
              </div>
            </div>

            {/* Secure workflows — narrow */}
            <div className="stitch-tech-narrow stitch-glass">
              <h3>Secure workflows</h3>
              <p className="stitch-body">
                End-to-end enforcement policies built into every approval chain
                and authentication layer.
              </p>
              <ul className="stitch-enforce-list">
                <li className="stitch-enforce-item">
                  <span>Multi-Sig Approval</span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "monospace",
                      color: "#10b981",
                      border: "1px solid #10b981",
                      borderRadius: "4px",
                      padding: "2px 6px",
                    }}
                  >
                    ENFORCED
                  </span>
                </li>
                <li className="stitch-enforce-item">
                  <span>Hardware Auth</span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "monospace",
                      color: "#3b82f6",
                      border: "1px solid #3b82f6",
                      borderRadius: "4px",
                      padding: "2px 6px",
                    }}
                  >
                    REQUIRED
                  </span>
                </li>
              </ul>
            </div>

            {/* Modular deployment — narrow */}
            <div className="stitch-tech-narrow stitch-glass">
              <h3>Modular deployment</h3>
              <p className="stitch-body">
                Phased rollouts that support maintainability and business
                continuity.
              </p>
              <div className="stitch-modules-visual">
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.4)",
                    borderRadius: "6px",
                    transform: "rotate(-6deg) translateY(8px)",
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    marginLeft: "-32px",
                  }}
                />
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(59,130,246,0.4)",
                    borderRadius: "6px",
                    transform: "rotate(3deg) translateY(4px)",
                    position: "absolute",
                    bottom: "12px",
                    left: "50%",
                    marginLeft: "-32px",
                  }}
                />
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.4)",
                    borderRadius: "6px",
                    transform: "rotate(0deg)",
                    position: "absolute",
                    bottom: "24px",
                    left: "50%",
                    marginLeft: "-32px",
                  }}
                />
              </div>
            </div>

            {/* Reporting & visibility — wide */}
            <div className="stitch-tech-wide stitch-glass">
              <h3>Reporting &amp; visibility</h3>
              <p className="stitch-body">
                Dashboards, KPIs, and operational oversight for faster
                decision-making.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    fontFamily: "monospace",
                    fontSize: "13px",
                  }}
                >
                  <div style={{ opacity: 0.5, fontSize: "11px", marginBottom: "4px" }}>
                    NODE A
                  </div>
                  <div style={{ color: "#10b981", fontWeight: 600 }}>STABLE</div>
                </div>
                <div
                  style={{
                    background: "rgba(59,130,246,0.08)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    fontFamily: "monospace",
                    fontSize: "13px",
                  }}
                >
                  <div style={{ opacity: 0.5, fontSize: "11px", marginBottom: "4px" }}>
                    NODE B
                  </div>
                  <div style={{ color: "#3b82f6", fontWeight: 600 }}>STABLE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Architecture Schema ───────────────────────────────────────── */}
      <RevealSection className="stitch-section stitch-arch-schema">
        <div className="stitch-container">
          <h2 style={{ textAlign: "center", marginBottom: "56px" }}>
            System Architecture Schema
          </h2>

          {/* Step 1 */}
          <div className="stitch-arch-step">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                className="stitch-arch-circle"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  border: "2px solid #10b981",
                  color: "#10b981",
                }}
              >
                1
              </div>
              <div
                className="stitch-arch-line"
                style={{
                  background:
                    "linear-gradient(to bottom, #10b981, #3b82f6)",
                }}
              />
            </div>
            <div className="stitch-glass" style={{ flex: 1, padding: "24px" }}>
              <h3 style={{ marginBottom: "8px" }}>Core Ledger Layer</h3>
              <p className="stitch-body">
                The foundation of our financial infrastructure, providing
                immutable, high-concurrency transaction processing.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="stitch-arch-step">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                className="stitch-arch-circle"
                style={{
                  background: "rgba(59,130,246,0.15)",
                  border: "2px solid #3b82f6",
                  color: "#3b82f6",
                }}
              >
                2
              </div>
              <div
                className="stitch-arch-line"
                style={{
                  background:
                    "linear-gradient(to bottom, #3b82f6, #64748b)",
                }}
              />
            </div>
            <div className="stitch-glass" style={{ flex: 1, padding: "24px" }}>
              <h3 style={{ marginBottom: "8px" }}>Service Mesh Gateway</h3>
              <p className="stitch-body">
                Secure communication protocol between microservices, ensuring
                low-latency data flow with 256-bit encryption.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="stitch-arch-step">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                className="stitch-arch-circle"
                style={{
                  background: "rgba(100,116,139,0.15)",
                  border: "2px solid #64748b",
                  color: "#94a3b8",
                }}
              >
                3
              </div>
            </div>
            <div className="stitch-glass" style={{ flex: 1, padding: "24px" }}>
              <h3 style={{ marginBottom: "8px" }}>Reporting Engine</h3>
              <p className="stitch-body">
                Automated intelligence that distills complex operational data
                into actionable executive-ready reporting interfaces.
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <RevealSection className="stitch-section">
        <div className="stitch-container">
          <div className="stitch-cta-glass stitch-glass">
            <h2>Ready to deploy your infrastructure?</h2>
            <p className="stitch-body">
              Our team designs and delivers production-grade platforms built for
              African financial environments — from initial scoping through live
              deployment and beyond.
            </p>
            <div className="stitch-cta-btns">
              <Link href="/contact" className="stitch-btn-primary">
                Book a Call
              </Link>
              <Link href="/company-profile" className="stitch-btn-ghost">
                Download Specs
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
