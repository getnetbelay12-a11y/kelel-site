import Link from "next/link";

type PlatformCtaPanelProps = {
  title?: string;
  copy?: string;
};

const platformProposalShortcuts = [
  {
    title: "Dashboard brief",
    href: "/request-proposal?focus=dashboard&source=platform-cta-panel",
  },
  {
    title: "Workflow brief",
    href: "/request-proposal?focus=workflow&source=platform-cta-panel",
  },
  {
    title: "Portal brief",
    href: "/request-proposal?focus=portal&source=platform-cta-panel",
  },
  {
    title: "Reporting brief",
    href: "/request-proposal?focus=reporting&source=platform-cta-panel",
  },
];

export function PlatformCtaPanel({
  title = "Need dashboards, workflows, portals, or internal business systems?",
  copy = "The platforms path is now the clearest place to review Kelel's direction for reporting visibility, workflow systems, business portals, and database-ready digital operations.",
}: PlatformCtaPanelProps) {
  return (
    <section className="section-block platform-cta-panel">
      <div>
        <span className="eyebrow">Platform path</span>
        <h2>{title}</h2>
        <p className="section-copy">{copy}</p>
        <div className="platform-cta-shortcuts">
          {platformProposalShortcuts.map((item) => (
            <Link key={item.title} href={item.href} className="mini-chip-link">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="hero-side-links stacked">
        <Link href="/platforms" className="primary-link">
          Explore platforms
        </Link>
        <Link
          href="/request-proposal?focus=dashboard&source=platform-cta-panel"
          className="secondary-link"
        >
          Request platform proposal
        </Link>
        <Link href="/work" className="secondary-link">
          Review case studies
        </Link>
      </div>
    </section>
  );
}
