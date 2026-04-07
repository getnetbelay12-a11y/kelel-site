type InboxAuditSnapshotPaginationProps = {
  currentPage: number;
  totalPages: number;
  snapshotQuery?: string;
  snapshotSort?: string;
  snapshotTag?: string;
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

function buildInboxSnapshotPageHref({
  snapshotPage,
  snapshotQuery,
  snapshotSort,
  snapshotTag,
  preservedFilters,
}: {
  snapshotPage: number;
  snapshotQuery?: string;
  snapshotSort?: string;
  snapshotTag?: string;
  preservedFilters?: InboxAuditSnapshotPaginationProps["preservedFilters"];
}) {
  const params = new URLSearchParams();

  if (preservedFilters?.q) {
    params.set("q", preservedFilters.q);
  }

  if (preservedFilters?.status && preservedFilters.status !== "all") {
    params.set("status", preservedFilters.status);
  }

  if (preservedFilters?.view && preservedFilters.view !== "active") {
    params.set("view", preservedFilters.view);
  }

  if (preservedFilters?.owner && preservedFilters.owner !== "all") {
    params.set("owner", preservedFilters.owner);
  }

  if (preservedFilters?.followUp && preservedFilters.followUp !== "all") {
    params.set("followUp", preservedFilters.followUp);
  }

  if (preservedFilters?.inquiryType && preservedFilters.inquiryType !== "all") {
    params.set("inquiryType", preservedFilters.inquiryType);
  }

  if (
    preservedFilters?.decisionStage &&
    preservedFilters.decisionStage !== "all"
  ) {
    params.set("decisionStage", preservedFilters.decisionStage);
  }

  if (preservedFilters?.page && preservedFilters.page !== "1") {
    params.set("page", preservedFilters.page);
  }

  if (preservedFilters?.auditAction && preservedFilters.auditAction !== "all") {
    params.set("auditAction", preservedFilters.auditAction);
  }

  if (preservedFilters?.auditActor && preservedFilters.auditActor !== "all") {
    params.set("auditActor", preservedFilters.auditActor);
  }

  if (preservedFilters?.auditRange && preservedFilters.auditRange !== "all") {
    params.set("auditRange", preservedFilters.auditRange);
  }

  if (preservedFilters?.auditStart) {
    params.set("auditStart", preservedFilters.auditStart);
  }

  if (preservedFilters?.auditEnd) {
    params.set("auditEnd", preservedFilters.auditEnd);
  }

  if (preservedFilters?.auditPage && preservedFilters.auditPage !== "1") {
    params.set("auditPage", preservedFilters.auditPage);
  }

  if (snapshotQuery) {
    params.set("snapshotQ", snapshotQuery);
  }

  if (snapshotSort && snapshotSort !== "newest") {
    params.set("snapshotSort", snapshotSort);
  }

  if (snapshotTag && snapshotTag !== "all") {
    params.set("snapshotTag", snapshotTag);
  }

  if (snapshotPage > 1) {
    params.set("snapshotPage", String(snapshotPage));
  }

  const queryString = params.toString();
  return queryString ? `/inbox?${queryString}` : "/inbox";
}

export function InboxAuditSnapshotPagination({
  currentPage,
  totalPages,
  snapshotQuery,
  snapshotSort,
  snapshotTag,
  preservedFilters,
}: InboxAuditSnapshotPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="inbox-pagination" aria-label="Saved snapshot pagination">
      <a
        href={buildInboxSnapshotPageHref({
          snapshotPage: Math.max(1, currentPage - 1),
          snapshotQuery,
          snapshotSort,
          snapshotTag,
          preservedFilters,
        })}
        className={`secondary-link${currentPage === 1 ? " disabled-link" : ""}`}
        aria-disabled={currentPage === 1}
      >
        Previous snapshot page
      </a>
      <span className="pagination-summary">
        Snapshot page {currentPage} of {totalPages}
      </span>
      <a
        href={buildInboxSnapshotPageHref({
          snapshotPage: Math.min(totalPages, currentPage + 1),
          snapshotQuery,
          snapshotSort,
          snapshotTag,
          preservedFilters,
        })}
        className={`secondary-link${currentPage === totalPages ? " disabled-link" : ""}`}
        aria-disabled={currentPage === totalPages}
      >
        Next snapshot page
      </a>
    </nav>
  );
}
