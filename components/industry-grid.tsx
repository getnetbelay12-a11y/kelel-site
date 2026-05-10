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

const marketCards = [
  {
    title: 'Banks and institutions',
    desc: 'Operational platforms for approvals, reporting visibility, branch teams, and regulated internal workflows.',
    variant: 'finance',
  },
  {
    title: 'Insurance products',
    desc: 'Policy, claims, renewal, and underwriting surfaces for teams that need cleaner operating control.',
    variant: 'insurance',
  },
  {
    title: 'Logistics and operators',
    desc: 'Dispatch, fleet, field coordination, and visibility systems for organizations with moving parts.',
    variant: 'operators',
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
        <div className="ind-market-band">
          <div className="ind-market-head">
            <h3>Built for organizations operating across African markets.</h3>
            <p>
              We design systems around real operating pressure: distributed teams,
              regulated workflows, regional coordination, and growth beyond spreadsheets.
            </p>
          </div>
          <div className="ind-market-cards">
            {marketCards.map((card) => (
              <article key={card.title} className="ind-market-card">
                <div className={`ind-market-visual ind-market-visual--${card.variant}`} aria-hidden="true">
                  <div className="ind-market-topbar">
                    <span />
                    <span />
                    <span />
                  </div>
                  {card.variant === 'finance' ? (
                    <div className="ind-market-finance">
                      <div className="ind-market-ledger">
                        <em>APPROVALS</em>
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="ind-market-bars">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <strong>Branch control</strong>
                    </div>
                  ) : null}
                  {card.variant === 'insurance' ? (
                    <div className="ind-market-flow">
                      <span>Claim</span>
                      <i />
                      <span>Review</span>
                      <i />
                      <span>Settle</span>
                    </div>
                  ) : null}
                  {card.variant === 'operators' ? (
                    <div className="ind-market-map">
                      <em>Fleet route</em>
                      <svg viewBox="0 0 320 150" role="presentation">
                        <path d="M28 104 C76 42 130 58 164 88 S236 132 292 46" />
                        <circle cx="28" cy="104" r="5" />
                        <circle cx="164" cy="88" r="5" />
                        <circle cx="292" cy="46" r="5" />
                      </svg>
                      <strong>Live dispatch</strong>
                    </div>
                  ) : null}
                </div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
