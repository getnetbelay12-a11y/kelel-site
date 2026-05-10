const steps = [
  {
    num: '01',
    name: 'Discovery & Architecture',
    desc: 'We map your operations, constraints, and ambitions. Output: a scoped architecture brief with tradeoffs documented.',
  },
  {
    num: '02',
    name: 'Design & Specification',
    desc: 'System contracts, data models, and API specs before a line of production code. Integration is never an afterthought.',
  },
  {
    num: '03',
    name: 'Build & Integrate',
    desc: 'Incremental delivery to production-grade environments. Real observability, runbooks, and rollback paths from sprint one.',
  },
  {
    num: '04',
    name: 'Launch & Operate',
    desc: 'We stay through go-live, the first incident, and the handoff. Knowledge transfers to your team in the open.',
  },
]

const stats = [
  { val: '99.9%', lbl: 'Uptime target' },
  { val: '<45ms', lbl: 'API latency' },
  { val: '4 phases', lbl: 'Delivery model' },
  { val: '24/7', lbl: 'Operational support' },
]

export function ProcessTrack() {
  return (
    <section className="hp-process">
      <div className="hp-section-inner">
        <div className="hp-section-label">How We Work</div>
        <h2 className="hp-section-title">
          Understand. Design. <em>Build. Operate.</em>
        </h2>
        <p className="hp-section-intro">
          A structured delivery process from architecture through live operations — with your team, not for them.
        </p>

        <div className="process-track">
          {steps.map((step) => (
            <div key={step.num} className="process-step">
              <div className="process-num" aria-hidden="true">{step.num}</div>
              <div className="process-name">{step.name}</div>
              <p className="process-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="stats-band">
          {stats.map((s) => (
            <div key={s.lbl} className="stat-item">
              <div className="stat-val">{s.val}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
