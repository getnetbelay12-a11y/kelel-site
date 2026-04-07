import { evidenceRegister } from "@/lib/site-content";

export function EvidenceRegister() {
  const availableCount = evidenceRegister.filter((item) => item.status === "available").length;
  const pendingCount = evidenceRegister.length - availableCount;

  return (
    <div className="evidence-register">
      <div className="evidence-register-summary">
        <article className="evidence-register-summary-card">
          <span>Available now</span>
          <strong>{availableCount}</strong>
          <p>Materials already usable in company, trust, and procurement review.</p>
        </article>
        <article className="evidence-register-summary-card">
          <span>Prepared next</span>
          <strong>{pendingCount}</strong>
          <p>Proof areas reserved for the next approved Kelel documents and assets.</p>
        </article>
        <article className="evidence-register-summary-card">
          <span>Review purpose</span>
          <strong>Clarity</strong>
          <p>Separate what is live today from what is intentionally waiting on external proof.</p>
        </article>
      </div>
      <div className="evidence-grid">
        {evidenceRegister.map((item) => (
          <article
            key={item.title}
            className={`evidence-card ${
              item.status === "available" ? "evidence-card-available" : "evidence-card-pending"
            }`}
          >
            <div className="evidence-card-top">
              <span className="project-type">{item.category}</span>
              <span
                className={`status-pill ${
                  item.status === "available" ? "status-contacted" : "status-upcoming"
                }`}
              >
                {item.status === "available" ? "Available now" : "Prepared next"}
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="evidence-card-footer">
              <span className="tag-pill alt">
                {item.status === "available" ? "Review ready" : "Awaiting external proof"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
