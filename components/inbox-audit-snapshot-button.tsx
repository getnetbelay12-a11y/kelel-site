type InboxAuditSnapshotButtonProps = {
  auditAction?: string;
  auditActor?: string;
  auditRange?: string;
  auditStart?: string;
  auditEnd?: string;
};

export function InboxAuditSnapshotButton({
  auditAction = "all",
  auditActor = "all",
  auditRange = "all",
  auditStart = "",
  auditEnd = "",
}: InboxAuditSnapshotButtonProps) {
  return (
    <form action="/inbox/audit-snapshot" method="GET">
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
        Open audit snapshot
      </button>
    </form>
  );
}
