type InboxAuditExportButtonProps = {
  disabled?: boolean;
  auditAction?: string;
  auditActor?: string;
  auditRange?: string;
  auditStart?: string;
  auditEnd?: string;
};

export function InboxAuditExportButton({
  disabled = false,
  auditAction = "all",
  auditActor = "all",
  auditRange = "all",
  auditStart = "",
  auditEnd = "",
}: InboxAuditExportButtonProps) {
  if (disabled) {
    return (
      <span className="secondary-link disabled-link" aria-disabled="true">
        Export audit CSV
      </span>
    );
  }

  return (
    <form action="/api/inbox-audit/export" method="GET">
      {auditAction !== "all" ? (
        <input type="hidden" name="auditAction" value={auditAction} />
      ) : null}
      {auditActor !== "all" ? (
        <input type="hidden" name="auditActor" value={auditActor} />
      ) : null}
      {auditRange !== "all" ? (
        <input type="hidden" name="auditRange" value={auditRange} />
      ) : null}
      {auditStart ? <input type="hidden" name="auditStart" value={auditStart} /> : null}
      {auditEnd ? <input type="hidden" name="auditEnd" value={auditEnd} /> : null}
      <button type="submit" className="secondary-link button-link">
        Export audit CSV
      </button>
    </form>
  );
}
