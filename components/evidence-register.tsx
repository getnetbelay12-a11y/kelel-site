import { evidenceRegister } from "@/lib/site-content";

export function EvidenceRegister() {
  return (
    <div className="evidence-grid">
      {evidenceRegister.map((item) => (
        <article key={item.title} className="evidence-card">
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
        </article>
      ))}
    </div>
  );
}
