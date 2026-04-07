import Image from "next/image";

type BrandShowcaseProps = {
  title: string;
  description: string;
};

export function BrandShowcase({ title, description }: BrandShowcaseProps) {
  return (
    <div className="brand-showcase">
      <div className="brand-showcase-copy">
        <span className="eyebrow">Brand identity</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="brand-showcase-visuals">
        <article className="brand-visual-card">
          <Image
            src="/brand/kelel-logo-en.jpg"
            alt="Kelel logo in English"
            width={900}
            height={600}
            className="brand-visual-image"
          />
          <span>Primary English mark</span>
        </article>
        <article className="brand-visual-card">
          <Image
            src="/brand/kelel-logo-am.jpg"
            alt="Kelel logo in Amharic"
            width={900}
            height={600}
            className="brand-visual-image"
          />
          <span>Amharic brand version</span>
        </article>
      </div>
    </div>
  );
}
