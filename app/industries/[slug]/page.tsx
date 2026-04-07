import { CompanyProfileDownload } from "@/components/company-profile-download";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sectorPages } from "@/lib/site-content";

type IndustryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return sectorPages.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectorPages.find((item) => item.slug === slug);

  if (!sector) {
    return { title: "Industries | Kelel IT Solution" };
  }

  return {
    title: `${sector.name} | Kelel IT Solution`,
    description: sector.summary,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const sector = sectorPages.find((item) => item.slug === slug);

  if (!sector) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Industry focus"
          title={sector.name}
          description={sector.summary}
        />
        <div className="profile-page-actions">
          <Link href="/services" className="secondary-link">
            Back to solutions
          </Link>
          <Link href="/contact" className="primary-link">
            Discuss this sector
          </Link>
        </div>
      </section>

      <section className="sector-layout">
        <article className="section-block">
          <SectionIntro
            eyebrow="Common challenges"
            title="The kinds of issues Kelel can help clarify and improve."
            narrow
          />
          <div className="case-study-list">
            {sector.challenges.map((item) => (
              <article key={item}>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </article>

        <ExecutiveContactCard
          compact
          title="Sector contact"
          copy="Use this route when your organization wants a more sector-specific conversation about systems, support, or digital modernization."
        />
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Solution fit"
          title="How Kelel's current offer maps to this type of organization."
          narrow
        />
        <div className="pillars-list">
          {sector.solutions.map((item) => (
            <article key={item}>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Expected value"
          title="The conversation should stay focused on business outcomes, not only technology activity."
          narrow
        />
        <div className="highlight-grid">
          {sector.outcomes.map((item) => (
            <article key={item}>
              <h3>{item}</h3>
              <p>
                Kelel can frame this kind of improvement as part of a practical,
                staged delivery conversation rather than an abstract technical plan.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <CompanyProfileDownload copy="Pair this sector page with the formal company profile when introducing Kelel to buyers, partners, or internal decision-makers." />
      </section>
    </main>
  );
}
