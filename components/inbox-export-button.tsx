type InboxExportButtonProps = {
  disabled?: boolean;
  query?: string;
  status?: string;
  view?: string;
  owner?: string;
  followUp?: string;
  inquiryType?: string;
  decisionStage?: string;
  sourcePage?: string;
  requestFocus?: string;
};

export function InboxExportButton({
  disabled = false,
  query = "",
  status = "all",
  view = "active",
  owner = "all",
  followUp = "all",
  inquiryType = "all",
  decisionStage = "all",
  sourcePage = "all",
  requestFocus = "all",
}: InboxExportButtonProps) {
  if (disabled) {
    return (
      <span className="secondary-link disabled-link" aria-disabled="true">
        Export CSV
      </span>
    );
  }

  return (
    <form action="/api/contact/export" method="GET">
      <input type="hidden" name="q" value={query} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="view" value={view} />
      <input type="hidden" name="owner" value={owner} />
      <input type="hidden" name="followUp" value={followUp} />
      <input type="hidden" name="inquiryType" value={inquiryType} />
      <input type="hidden" name="decisionStage" value={decisionStage} />
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <input type="hidden" name="requestFocus" value={requestFocus} />
      <button type="submit" className="primary-link button-link">
        Export CSV
      </button>
    </form>
  );
}
