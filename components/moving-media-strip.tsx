import Image from "next/image";

type MovingMediaItem = {
  title: string;
  label: string;
  description: string;
  image: string;
  alt: string;
};

type MovingMediaStripProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: MovingMediaItem[];
};

export function MovingMediaStrip({
  eyebrow,
  title,
  description,
  items,
}: MovingMediaStripProps) {
  const loopItems = [...items, ...items];

  return (
    <section className="section-block moving-media-section">
      <div className="moving-media-header">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p className="section-copy">{description}</p>
      </div>
      <div className="moving-media-marquee">
        <div className="moving-media-track">
          {loopItems.map((item, index) => (
            <article
              key={`${item.title}-${item.image}-${index}`}
              className="moving-media-card"
            >
              <div className="moving-media-visual">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1600}
                  height={1067}
                  className="moving-media-image"
                />
                <div className="moving-media-badge-row">
                  <span className="moving-media-badge">Kelel IT Solution</span>
                  <span className="moving-media-badge alt">{item.label}</span>
                </div>
              </div>
              <div className="moving-media-copy">
                <span className="project-type">{item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
