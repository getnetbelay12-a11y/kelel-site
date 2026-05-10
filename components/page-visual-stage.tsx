type PageVisualStageProps = {
  badge: string;
  badgeWithPulse?: boolean;
  cardKicker: string;
  cardTitle: string;
  className?: string;
};

export function PageVisualStage({
  badge,
  badgeWithPulse = false,
  cardKicker,
  cardTitle,
  className = "",
}: PageVisualStageProps) {
  return (
    <div className={`page-visual-stage${className ? ` ${className}` : ""}`}>
      <div className="page-visual-scan" aria-hidden="true" />
      <div className="page-visual-screen page-visual-screen--main">
        <div className="page-visual-ui">
          <div className="page-visual-ui-top">
            <span>Operations console</span>
            <strong>99.9%</strong>
          </div>
          <div className="page-visual-ui-grid">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="page-visual-ui-chart">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="page-visual-screen page-visual-screen--secondary">
        <div className="page-visual-mini">
          <div className="page-visual-mini-ring" />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="page-visual-badge">
        {badgeWithPulse ? <span className="page-visual-badge-dot" /> : null}
        {badge}
      </div>
      <div className="page-visual-card">
        <span className="page-visual-card-kicker">{cardKicker}</span>
        <strong>{cardTitle}</strong>
        <div className="page-visual-card-bars">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
