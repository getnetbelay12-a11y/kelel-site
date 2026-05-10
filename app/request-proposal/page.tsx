import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Start a Project | Kelel IT Solution",
  description:
    "Begin your digital transformation with Kelel IT Solution. Contact us to build enterprise infrastructure for African operations.",
};

export default function RequestProposalPage() {
  return (
    <main className="stitch-page">
      <section className="stitch-hero">
        <div className="stitch-container">

          {/* Split layout */}
          <div className="sap-layout">

            {/* ── Left column ── */}
            <div>
              <p className="stitch-kicker">Infrastructure for Sovereignty</p>
              <h1 className="stitch-h1">Start your digital transformation.</h1>
              <p className="stitch-body">
                Partner with Kelel IT Solution to design and deploy enterprise-grade
                infrastructure built for African operations — from cloud architecture
                and security to custom APIs and data platforms.
              </p>

              {/* HQ card */}
              <div className="stitch-glass sap-hq-card">
                <p className="sap-label">Headquarters</p>
                <p className="stitch-body">
                  Kirkos Subcity, Kebele 02/03<br />
                  Addis Ababa, Ethiopia
                </p>
                <p className="stitch-body">
                  <Link href="mailto:contact@kelel-it.com">contact@kelel-it.com</Link>
                </p>
              </div>

              {/* Why Kelel quote card */}
              <div className="stitch-glass sap-quote-card">
                <p className="stitch-body">
                  &ldquo;We bridge the gap between global standards and local
                  reality — delivering infrastructure that is sovereign, secure,
                  and built to scale with your business.&rdquo;
                </p>
              </div>

              {/* Feature pills */}
              <div className="sap-pills">
                <span className="sap-pill">✓ Bank Grade Security</span>
                <span className="sap-pill">⚡ Performance Optimization</span>
              </div>
            </div>

            {/* ── Right column — glass form card ── */}
            <div className="stitch-glass sap-form-card">
              <form action="" method="POST">

                {/* Full Name | Company Name */}
                <div className="sap-form-row">
                  <div className="sap-field">
                    <label className="sap-label" htmlFor="fullName">Full Name</label>
                    <input
                      className="sap-input"
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Abebe Bikila"
                      required
                    />
                  </div>
                  <div className="sap-field">
                    <label className="sap-label" htmlFor="companyName">Company Name</label>
                    <input
                      className="sap-input"
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Acme FinTech"
                      required
                    />
                  </div>
                </div>

                {/* Industry | Project Budget */}
                <div className="sap-form-row">
                  <div className="sap-field">
                    <label className="sap-label" htmlFor="industry">Industry</label>
                    <select className="sap-select" id="industry" name="industry" required>
                      <option value="">Select industry</option>
                      <option value="banking">Banking &amp; Finance</option>
                      <option value="insurance">Insurance</option>
                      <option value="logistics">Logistics</option>
                      <option value="telecom">Telecom</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sap-field">
                    <label className="sap-label" htmlFor="budget">Project Budget</label>
                    <select className="sap-select" id="budget" name="budget" required>
                      <option value="">Select budget range</option>
                      <option value="10k-50k">$10k – $50k</option>
                      <option value="50k-200k">$50k – $200k</option>
                      <option value="200k+">$200k+</option>
                      <option value="not-defined">Not Defined</option>
                    </select>
                  </div>
                </div>

                {/* Core Needs */}
                <div className="sap-field">
                  <p className="sap-label">Core Needs</p>
                  <div className="sap-needs-grid">
                    <button className="sap-need-btn" type="button">Cloud Infrastructure</button>
                    <button className="sap-need-btn" type="button">Security Audit</button>
                    <button className="sap-need-btn" type="button">Custom API</button>
                    <button className="sap-need-btn" type="button">Data Platform</button>
                  </div>
                </div>

                {/* Project Description */}
                <div className="sap-field">
                  <label className="sap-label" htmlFor="description">Project Description</label>
                  <textarea
                    className="sap-textarea"
                    id="description"
                    name="description"
                    rows={5}
                    placeholder="Tell us about the challenges you're facing and what success looks like for this project..."
                    required
                  />
                </div>

                {/* NDA checkbox */}
                <div className="sap-nda-row">
                  <input id="nda" name="nda" type="checkbox" value="yes" />
                  <label htmlFor="nda">
                    I require a Non-Disclosure Agreement (NDA) prior to technical briefing.
                  </label>
                </div>

                {/* Submit */}
                <button className="stitch-btn-primary sap-submit" type="submit">
                  Submit Inquiry →
                </button>
              </form>
            </div>
          </div>

          {/* ── Map section ── */}
          <div className="sap-map-section">
            <div className="sap-map-card">
              <div className="sap-map-badge">
                <p className="sap-label">Regional Hub</p>
                <p>Addis Ababa Node</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
