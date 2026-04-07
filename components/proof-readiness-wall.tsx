import { mediaReadinessPlan } from "@/lib/site-content";

type ProofReadinessWallProps = {
  title?: string;
  description?: string;
  limit?: number;
};

const readinessKinds = [
  "Leadership photo",
  "Project screenshot",
  "Certificate",
  "Meeting photo",
];

export function ProofReadinessWall({
  title = "Real Kelel proof assets ready to replace temporary visuals next.",
  description = "This wall keeps the authenticity path visible by showing exactly what kinds of original visuals and documents will strengthen the public site next.",
  limit,
}: ProofReadinessWallProps) {
  const items = typeof limit === "number" ? mediaReadinessPlan.slice(0, limit) : mediaReadinessPlan;
  const uniquePlacements = new Set(items.map((item) => item.placement)).size;
  const visualAssetCount = items.filter((item) => !item.title.toLowerCase().includes("certificate")).length;
  const formalProofCount = items.length - visualAssetCount;

  return (
    <section className="proof-readiness-wall">
      <div className="proof-readiness-copy">
        <span className="eyebrow">Proof readiness</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="proof-readiness-summary">
        <article className="proof-readiness-summary-card">
          <span>Prepared placements</span>
          <strong>{uniquePlacements}</strong>
          <p>Website areas already ready for original Kelel proof assets.</p>
        </article>
        <article className="proof-readiness-summary-card">
          <span>Visual assets</span>
          <strong>{visualAssetCount}</strong>
          <p>Photos and screenshots that can upgrade the public-facing pages first.</p>
        </article>
        <article className="proof-readiness-summary-card">
          <span>Formal proof</span>
          <strong>{formalProofCount}</strong>
          <p>Certificates and other business documents that strengthen trust reviews.</p>
        </article>
      </div>
      <div className="proof-readiness-grid">
        {items.map((item, index) => (
          <article key={item.title} className="proof-readiness-card">
            <div className="proof-readiness-visual" aria-hidden="true">
              <div className="proof-readiness-visual-top">
                <span>{readinessKinds[index % readinessKinds.length]}</span>
                <small>Awaiting original</small>
              </div>
              <div className="proof-readiness-visual-mark">
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <em>Ready</em>
              </div>
            </div>
            <div className="proof-readiness-meta">
              <span className="project-type">{item.placement}</span>
              <h4>{item.title}</h4>
              <p>{item.summary}</p>
              <div className="proof-readiness-footer">
                <span className="tag-pill alt">Prepared placement</span>
                <span className="proof-readiness-note">Use the next approved Kelel original here.</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
