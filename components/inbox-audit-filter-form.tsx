import type { InboxDirectoryUser } from "@/lib/inbox-auth";

type InboxAuditFilterFormProps = {
  action?: string;
  actor?: string;
  range?: string;
  startDate?: string;
  endDate?: string;
  users: InboxDirectoryUser[];
  preservedFilters?: {
    q?: string;
    status?: string;
    view?: string;
    owner?: string;
    followUp?: string;
    inquiryType?: string;
    decisionStage?: string;
    page?: string;
  };
};

export function InboxAuditFilterForm({
  action = "all",
  actor = "all",
  range = "all",
  startDate = "",
  endDate = "",
  users,
  preservedFilters,
}: InboxAuditFilterFormProps) {
  return (
    <form className="audit-filter-form" method="GET">
      <input type="hidden" name="auditPage" value="1" />
      {preservedFilters?.q ? <input type="hidden" name="q" value={preservedFilters.q} /> : null}
      {preservedFilters?.status ? (
        <input type="hidden" name="status" value={preservedFilters.status} />
      ) : null}
      {preservedFilters?.view ? (
        <input type="hidden" name="view" value={preservedFilters.view} />
      ) : null}
      {preservedFilters?.owner ? (
        <input type="hidden" name="owner" value={preservedFilters.owner} />
      ) : null}
      {preservedFilters?.followUp ? (
        <input type="hidden" name="followUp" value={preservedFilters.followUp} />
      ) : null}
      {preservedFilters?.inquiryType ? (
        <input type="hidden" name="inquiryType" value={preservedFilters.inquiryType} />
      ) : null}
      {preservedFilters?.decisionStage ? (
        <input
          type="hidden"
          name="decisionStage"
          value={preservedFilters.decisionStage}
        />
      ) : null}
      {preservedFilters?.page ? (
        <input type="hidden" name="page" value={preservedFilters.page} />
      ) : null}
      <label>
        <span>Audit action</span>
        <select name="auditAction" defaultValue={action}>
          <option value="all">All audit actions</option>
          <option value="attachment_downloaded">Attachment downloads</option>
          <option value="attachment_uploaded">Attachment uploads</option>
          <option value="attachment_deleted">Attachment deletions</option>
          <option value="lead_archived">Lead archived</option>
          <option value="lead_restored">Lead restored</option>
          <option value="csv_exported">CSV exports</option>
          <option value="digest_sent">Reminder digests</option>
        </select>
      </label>
      <label>
        <span>Actor</span>
        <select name="auditActor" defaultValue={actor}>
          <option value="all">All users</option>
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Date range</span>
        <select name="auditRange" defaultValue={range}>
          <option value="all">All time</option>
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
          <option value="custom">Custom range</option>
        </select>
      </label>
      <label>
        <span>Start date</span>
        <input type="date" name="auditStart" defaultValue={startDate} />
      </label>
      <label>
        <span>End date</span>
        <input type="date" name="auditEnd" defaultValue={endDate} />
      </label>
      <div className="audit-filter-actions">
        <button type="submit" className="primary-link button-link">
          Filter audit
        </button>
        <a href="/inbox" className="secondary-link">
          Clear
        </a>
      </div>
    </form>
  );
}
