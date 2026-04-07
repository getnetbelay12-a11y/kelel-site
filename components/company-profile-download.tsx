type CompanyProfileDownloadProps = {
  title?: string;
  copy?: string;
};

export function CompanyProfileDownload({
  title = "Download the Kelel company profile",
  copy = "Get a branded PDF with company overview, solution areas, readiness points, and official contact details for sharing with partners and clients.",
}: CompanyProfileDownloadProps) {
  return (
    <article className="profile-download-card">
      <div className="profile-download-top">
        <span className="eyebrow">Company profile</span>
        <span className="status-pill status-contacted">Ready to share</span>
      </div>
      <h3>{title}</h3>
      <p>{copy}</p>
      <div className="profile-download-meta">
        <article>
          <span>Format</span>
          <strong>PDF</strong>
        </article>
        <article>
          <span>Use case</span>
          <strong>Formal review</strong>
        </article>
        <article>
          <span>Includes</span>
          <strong>Contact + capability</strong>
        </article>
      </div>
      <div className="profile-download-actions">
        <a
          href="/downloads/kelel-company-profile.pdf"
          className="primary-link"
          download
        >
          Download PDF
        </a>
        <a
          href="/downloads/kelel-company-profile.pdf"
          className="secondary-link"
          target="_blank"
          rel="noreferrer"
        >
          Open in browser
        </a>
      </div>
    </article>
  );
}
