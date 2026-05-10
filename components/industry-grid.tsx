import Link from 'next/link'

const industries = [
  {
    name: 'Banking & Financial',
    desc: 'Multi-branch operations platforms, digital workflows, reporting visibility, and compliance-ready architectures for banks and microfinance institutions.',
    tags: ['Core Banking', 'Compliance', 'Branch Ops'],
    href: '/industries/operations-heavy-organizations',
  },
  {
    name: 'Insurance',
    desc: 'Policy administration, claims workflow, renewal automation, and AI-assisted underwriting for regional insurance providers.',
    tags: ['Claims Ops', 'Policy Systems', 'AI Workflows'],
    href: '/industries/teams-modernizing-internal-workflows',
  },
  {
    name: 'Logistics',
    desc: 'Fleet management, supply chain visibility, live tracking, and coordination systems for operations-heavy logistics companies.',
    tags: ['Fleet Tracking', 'Supply Chain', 'Live Ops'],
    href: '/industries/operations-heavy-organizations',
  },
  {
    name: 'Enterprise',
    desc: 'Custom platforms that replace spreadsheets and email with proper digital operations — designed to scale with your team.',
    tags: ['Workflow Automation', 'Internal Tools', 'Integrations'],
    href: '/industries/smes-and-growing-enterprises',
  },
]

export function IndustryGrid() {
  return (
    <section className="hp-industries">
      <div className="hp-section-inner">
        <div className="hp-section-label">Industries</div>
        <h2 className="hp-section-title">
          Banking. Insurance. <em>Enterprise. All three.</em>
        </h2>
        <p className="hp-section-intro">
          Purpose-built for African financial institutions and operations-heavy organizations.
        </p>
        <div className="ind-grid">
          {industries.map((ind) => (
            <Link key={ind.name} href={ind.href} className="ind-card-link">
              <article className="ind-card">
                <h3 className="ind-name">{ind.name}</h3>
                <p className="ind-desc">{ind.desc}</p>
                <div className="ind-tags">
                  {ind.tags.map((t) => <span key={t} className="ind-tag">{t}</span>)}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
