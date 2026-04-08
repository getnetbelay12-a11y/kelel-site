type SystemCard = {
  label: string;
  title: string;
  copy: string;
  variant: "dashboard" | "analytics" | "workflow" | "infrastructure";
};

type HeroPortraitRotationProps = {
  systemCards: SystemCard[];
};

function duplicateItems<T>(items: T[], offset = 0) {
  const shifted = [...items.slice(offset), ...items.slice(0, offset)];
  return [...shifted, ...shifted];
}

function SystemCardVisual({ variant }: Pick<SystemCard, "variant">) {
  if (variant === "analytics") {
    return (
      <div className="hero-system-visual hero-system-visual-analytics">
        <div className="hero-system-visual-head">
          <small>Performance</small>
          <strong>248 active flows</strong>
        </div>
        <div className="hero-system-bars">
          <span style={{ height: "36%" }} />
          <span style={{ height: "58%" }} />
          <span style={{ height: "48%" }} />
          <span style={{ height: "76%" }} />
          <span style={{ height: "64%" }} />
        </div>
        <div className="hero-system-lines">
          <i>Latency stable</i>
          <i>Regional throughput live</i>
        </div>
      </div>
    );
  }

  if (variant === "workflow") {
    return (
      <div className="hero-system-visual hero-system-visual-workflow">
        <div className="hero-system-visual-head">
          <small>Workflow</small>
          <strong>Approval routing</strong>
        </div>
        <div className="hero-system-chip-row">
          <span>KYC review</span>
          <span>Priority</span>
        </div>
        <div className="hero-system-flow">
          <i>Submit</i>
          <i>Approve</i>
          <i>Deploy</i>
        </div>
      </div>
    );
  }

  if (variant === "infrastructure") {
    return (
      <div className="hero-system-visual hero-system-visual-infrastructure">
        <div className="hero-system-visual-head">
          <small>Infrastructure</small>
          <strong>Regional topology</strong>
        </div>
        <div className="hero-system-node-grid">
          <span>API</span>
          <span>Core</span>
          <span>Data</span>
          <span>Ops</span>
        </div>
        <div className="hero-system-connector" />
      </div>
    );
  }

  return (
    <div className="hero-system-visual hero-system-visual-dashboard">
      <div className="hero-system-visual-head">
        <small>Dashboard</small>
        <strong>Operational visibility</strong>
      </div>
      <div className="hero-system-screen hero-system-screen-dashboard">
        <div className="hero-system-screen-sidebar">
          <i />
          <i />
          <i />
        </div>
        <div className="hero-system-screen-main">
          <div className="hero-system-stat-row">
            <span>99.9%</span>
            <span>12 live</span>
          </div>
          <div className="hero-system-screen-chart" />
        </div>
      </div>
      <div className="hero-system-panel-grid">
        <i>Auth</i>
        <i>Reporting</i>
        <i>Controls</i>
      </div>
    </div>
  );
}

export function HeroPortraitRotation({ systemCards }: HeroPortraitRotationProps) {
  const frontItems = duplicateItems(systemCards, 0);
  const mobilePrimary = systemCards[0];
  const mobileSecondary = systemCards[1];

  return (
    <div className="hero-portrait-layer hero-system-layer" aria-hidden="true">
      <div className="hero-portrait-focus hero-system-focus" />

      <article className="hero-system-mobile-feature hero-system-card hero-system-card-feature">
        <SystemCardVisual variant={mobilePrimary.variant} />
        <strong>{mobilePrimary.title}</strong>
        <span>{mobilePrimary.copy}</span>
      </article>

      <article className="hero-system-mobile-secondary hero-system-card">
        <SystemCardVisual variant={mobileSecondary.variant} />
        <strong>{mobileSecondary.title}</strong>
      </article>

      <div className="hero-system-marquee hero-system-marquee-front">
        <div className="hero-system-track">
          {frontItems.map((card, index) => (
            <article
              key={`front-${index}-${card.title}`}
              className={`hero-system-card ${index % systemCards.length === 1 ? "hero-system-card-prominent" : ""}`}
            >
              <SystemCardVisual variant={card.variant} />
              <strong>{card.title}</strong>
              <span>{card.copy}</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
