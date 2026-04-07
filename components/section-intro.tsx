type SectionIntroProps = {
  eyebrow: string;
  title: string;
  narrow?: boolean;
  description?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  narrow = false,
  description,
}: SectionIntroProps) {
  return (
    <div className={`section-heading${narrow ? " narrow" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}
