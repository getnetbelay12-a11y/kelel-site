import { site } from "@/lib/site-content";

type ExecutiveContactCardProps = {
  title?: string;
  copy?: string;
  compact?: boolean;
};

export function ExecutiveContactCard({
  title = "Executive contact",
  copy = "For official communication, project discussions, and partnership inquiries.",
  compact = false,
}: ExecutiveContactCardProps) {
  return (
    <article className={`leadership-card${compact ? " compact" : ""}`}>
      <div className="leadership-card-top">
        <p className="leadership-kicker">{title}</p>
        <span className="status-pill status-contacted">Direct contact</span>
      </div>
      <div className="leadership-identity">
        <strong>{site.contactPerson}</strong>
        <span>{site.contactRole}</span>
      </div>
      <p>{copy}</p>
      <div className="leadership-contact-list">
        <a href={`mailto:${site.email}`} className="leadership-contact-item">
          <small>Email</small>
          <strong>{site.email}</strong>
        </a>
        <a href={`tel:${site.phone}`} className="leadership-contact-item">
          <small>Phone</small>
          <strong>{site.phone}</strong>
        </a>
      </div>
      <div className="leadership-actions">
        <a href={`mailto:${site.email}`} className="secondary-link">
          Email Kelel
        </a>
        <a href={`tel:${site.phone}`} className="primary-link">
          Call now
        </a>
      </div>
    </article>
  );
}
