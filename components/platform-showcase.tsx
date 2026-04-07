import Image from "next/image";

type PlatformShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  pillars: Array<{
    label: string;
    title: string;
    copy: string;
  }>;
};

export function PlatformShowcase({
  eyebrow,
  title,
  description,
  pillars,
}: PlatformShowcaseProps) {
  return (
    <section className="section-block platform-showcase">
      <div className="platform-showcase-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p className="section-copy">{description}</p>
        <div className="platform-pillars">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="platform-pillar-card">
              <span className="project-type">{pillar.label}</span>
              <strong>{pillar.title}</strong>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="platform-visual-stage">
        <article className="platform-main-visual">
          <Image
            src="/proof/company-profile-page-1.png"
            alt="Software dashboard and reporting proof visual"
            width={1400}
            height={1000}
            className="platform-stage-image"
          />
          <div className="platform-stage-overlay">
            <span className="project-type">Software and reporting</span>
            <strong>Dashboards, workflow visibility, and business-system structure.</strong>
          </div>
        </article>

        <div className="platform-side-stack">
          <article className="platform-mini-card">
            <Image
              src="/proof/company-profile-page-3.png"
              alt="Platform and digital proof visual"
              width={1200}
              height={900}
              className="platform-mini-image"
            />
            <div className="platform-mini-copy">
              <span className="project-type">Platforms</span>
              <strong>Portals, websites, and digital modernization proof.</strong>
            </div>
          </article>

          <article className="platform-mini-card accent">
            <span className="project-type">Database-ready thinking</span>
            <strong>Information flow, reporting structure, and operational clarity.</strong>
            <p>
              Kelel is presented more clearly as a team that can support business
              data visibility, internal systems, and workflow modernization.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
