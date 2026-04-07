type InboxAuditSnapshotSearchFormProps = {
  query?: string;
  sort?: string;
  tag?: string;
  preservedFilters?: {
    q?: string;
    status?: string;
    view?: string;
    owner?: string;
    followUp?: string;
    inquiryType?: string;
    decisionStage?: string;
    page?: string;
    auditAction?: string;
    auditActor?: string;
    auditRange?: string;
    auditStart?: string;
    auditEnd?: string;
    auditPage?: string;
  };
};

export function InboxAuditSnapshotSearchForm({
  query = "",
  sort = "newest",
  tag = "all",
  preservedFilters,
}: InboxAuditSnapshotSearchFormProps) {
  return (
    <form className="audit-filter-form" method="GET">
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
        <input type="hidden" name="decisionStage" value={preservedFilters.decisionStage} />
      ) : null}
      {preservedFilters?.page ? (
        <input type="hidden" name="page" value={preservedFilters.page} />
      ) : null}
      {preservedFilters?.auditAction ? (
        <input type="hidden" name="auditAction" value={preservedFilters.auditAction} />
      ) : null}
      {preservedFilters?.auditActor ? (
        <input type="hidden" name="auditActor" value={preservedFilters.auditActor} />
      ) : null}
      {preservedFilters?.auditRange ? (
        <input type="hidden" name="auditRange" value={preservedFilters.auditRange} />
      ) : null}
      {preservedFilters?.auditStart ? (
        <input type="hidden" name="auditStart" value={preservedFilters.auditStart} />
      ) : null}
      {preservedFilters?.auditEnd ? (
        <input type="hidden" name="auditEnd" value={preservedFilters.auditEnd} />
      ) : null}
      {preservedFilters?.auditPage ? (
        <input type="hidden" name="auditPage" value={preservedFilters.auditPage} />
      ) : null}
      <label>
        <span>Search saved snapshots</span>
        <input
          type="search"
          name="snapshotQ"
          defaultValue={query}
          placeholder="Title, purpose, or note"
        />
      </label>
      <label>
        <span>Sort snapshots</span>
        <select name="snapshotSort" defaultValue={sort}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A-Z</option>
        </select>
      </label>
      <label>
        <span>Tag</span>
        <select name="snapshotTag" defaultValue={tag}>
          <option value="all">All tags</option>
          <option value="compliance">Compliance</option>
          <option value="operations">Operations</option>
          <option value="security">Security</option>
          <option value="leadership">Leadership</option>
        </select>
      </label>
      <div className="audit-filter-actions">
        <button type="submit" className="secondary-link button-link">
          Search snapshots
        </button>
        <a href="/inbox" className="secondary-link">
          Clear
        </a>
      </div>
    </form>
  );
}
