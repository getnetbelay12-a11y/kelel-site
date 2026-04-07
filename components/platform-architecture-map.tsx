type ArchitectureStep = {
  label: string;
  title: string;
  copy: string;
};

type PlatformArchitectureMapProps = {
  eyebrow: string;
  title: string;
  description: string;
  steps: ArchitectureStep[];
};

export function PlatformArchitectureMap({
  eyebrow,
  title,
  description,
  steps,
}: PlatformArchitectureMapProps) {
  return (
    <section className="section-block platform-architecture">
      <div className="platform-architecture-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p className="section-copy">{description}</p>
      </div>

      <div className="platform-architecture-grid">
        {steps.map((step, index) => (
          <article key={step.title} className="platform-architecture-card">
            <div className="platform-architecture-head">
              <span className="project-type">{step.label}</span>
              <strong>{step.title}</strong>
            </div>
            <p>{step.copy}</p>
            {index < steps.length - 1 ? (
              <span className="platform-architecture-arrow" aria-hidden="true">
                →
              </span>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
