type PortraitItem = {
  title: string;
  image: string;
};

type HeroPortraitRotationProps = {
  items: PortraitItem[];
};

function duplicateItems(items: PortraitItem[], offset = 0) {
  const shifted = [...items.slice(offset), ...items.slice(0, offset)];
  return [...shifted, ...shifted];
}

export function HeroPortraitRotation({ items }: HeroPortraitRotationProps) {
  const backItems = duplicateItems(items, 0);
  const frontItems = duplicateItems(items, 1);

  return (
    <div className="hero-portrait-layer" aria-hidden="true">
      <div className="hero-portrait-label">Regional operators / architects / delivery teams</div>
      <div className="hero-portrait-focus" />

      <div className="hero-portrait-marquee hero-portrait-marquee-back">
        <div className="hero-portrait-track">
          {backItems.map((portrait, index) => (
            <article
              key={`back-${index}-${portrait.image}`}
              className="hero-portrait-card hero-portrait-card-compact"
            >
              <div
                className="hero-portrait-surface"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(7, 18, 31, 0.06), rgba(7, 18, 31, 0.76)), url(${portrait.image})`,
                }}
              />
              <span>{portrait.title}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-portrait-marquee hero-portrait-marquee-front">
        <div className="hero-portrait-track">
          {frontItems.map((portrait, index) => (
            <article
              key={`front-${index}-${portrait.image}`}
              className={`hero-portrait-card ${index % items.length === 1 ? "hero-portrait-card-prominent" : ""}`}
            >
              <div
                className="hero-portrait-surface"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(7, 18, 31, 0.06), rgba(7, 18, 31, 0.8)), url(${portrait.image})`,
                }}
              />
              <span>{portrait.title}</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
