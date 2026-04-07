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
      <p className="leadership-kicker">{title}</p>
      <strong>{site.contactPerson}</strong>
      <span>{site.contactRole}</span>
      <p>{copy}</p>
      <div className="leadership-actions">
        <a href={`mailto:${site.email}`} className="secondary-link">
          {site.email}
        </a>
        <a href={`tel:${site.phone}`} className="primary-link">
          {site.phone}
        </a>
      </div>
    </article>
  );
}
