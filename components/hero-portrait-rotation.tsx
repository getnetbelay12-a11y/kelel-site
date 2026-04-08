type PortraitItem = {
  title: string;
  image: string;
};

type SystemCard = {
  label: string;
  title: string;
  copy: string;
  variant: "dashboard" | "analytics" | "workflow" | "infrastructure";
};

type HeroPortraitRotationProps = {
  operator: PortraitItem;
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
        <div className="hero-system-bars">
          <span style={{ height: "36%" }} />
          <span style={{ height: "58%" }} />
          <span style={{ height: "48%" }} />
          <span style={{ height: "76%" }} />
          <span style={{ height: "64%" }} />
        </div>
        <div className="hero-system-lines">
          <i />
          <i />
        </div>
      </div>
    );
  }

  if (variant === "workflow") {
    return (
      <div className="hero-system-visual hero-system-visual-workflow">
        <div className="hero-system-chip-row">
          <span />
          <span />
        </div>
        <div className="hero-system-flow">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  }

  if (variant === "infrastructure") {
    return (
      <div className="hero-system-visual hero-system-visual-infrastructure">
        <div className="hero-system-node-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-system-connector" />
      </div>
    );
  }

  return (
    <div className="hero-system-visual hero-system-visual-dashboard">
      <div className="hero-system-stat-row">
        <span />
        <span />
      </div>
      <div className="hero-system-panel-grid">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export function HeroPortraitRotation({ operator, systemCards }: HeroPortraitRotationProps) {
  const backItems = duplicateItems(systemCards, 0);
  const frontItems = duplicateItems(systemCards, 1);
  const mobilePrimary = systemCards[0];
  const mobileSecondary = systemCards[1];

  return (
    <div className="hero-portrait-layer hero-system-layer" aria-hidden="true">
      <div className="hero-portrait-focus hero-system-focus" />

      <article className="hero-system-mobile-feature hero-system-card hero-system-card-feature">
        <SystemCardVisual variant={mobilePrimary.variant} />
        <small>{mobilePrimary.label}</small>
        <strong>{mobilePrimary.title}</strong>
        <span>{mobilePrimary.copy}</span>
      </article>

      <article className="hero-system-mobile-secondary hero-system-card">
        <SystemCardVisual variant={mobileSecondary.variant} />
        <small>{mobileSecondary.label}</small>
        <strong>{mobileSecondary.title}</strong>
      </article>

      <article className="hero-portrait-mobile-support hero-operator-card">
        <div
          className="hero-portrait-surface"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7, 18, 31, 0.08), rgba(7, 18, 31, 0.84)), url(${operator.image})`,
          }}
        />
        <span>{operator.title}</span>
      </article>

      <article className="hero-operator-card hero-operator-card-desktop">
        <div
          className="hero-portrait-surface"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7, 18, 31, 0.08), rgba(7, 18, 31, 0.84)), url(${operator.image})`,
          }}
        />
        <span>{operator.title}</span>
      </article>

      <div className="hero-system-marquee hero-system-marquee-back">
        <div className="hero-system-track">
          {backItems.map((card, index) => (
            <article key={`back-${index}-${card.title}`} className="hero-system-card hero-system-card-compact">
              <SystemCardVisual variant={card.variant} />
              <small>{card.label}</small>
              <strong>{card.title}</strong>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-system-marquee hero-system-marquee-front">
        <div className="hero-system-track">
          {frontItems.map((card, index) => (
            <article
              key={`front-${index}-${card.title}`}
              className={`hero-system-card ${index % systemCards.length === 1 ? "hero-system-card-prominent" : ""}`}
            >
              <SystemCardVisual variant={card.variant} />
              <small>{card.label}</small>
              <strong>{card.title}</strong>
              <span>{card.copy}</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
