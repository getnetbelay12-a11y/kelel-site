import Image from "next/image";

const proofItems = [
  {
    src: "/proof/company-profile-page-1.png",
    alt: "Kelel company profile cover page preview",
    title: "Formal company profile cover",
    copy: "A polished front page for procurement, introductions, and partnership conversations.",
  },
  {
    src: "/proof/company-profile-page-2.png",
    alt: "Kelel company profile overview page preview",
    title: "Operational overview pages",
    copy: "Readable sections that package strengths, process, and service structure in a more formal format.",
  },
  {
    src: "/proof/company-profile-page-3.png",
    alt: "Kelel company profile solutions page preview",
    title: "Service and proof packaging",
    copy: "Service areas and case-study style content that help the business feel more prepared for serious review.",
  },
];

export function ProofGallery() {
  return (
    <div className="proof-gallery">
      {proofItems.map((item) => (
        <article key={item.src} className="proof-card">
          <Image
            src={item.src}
            alt={item.alt}
            width={953}
            height={1348}
            className="proof-card-image"
          />
          <div className="proof-card-copy">
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
