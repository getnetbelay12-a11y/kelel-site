type InboxAuditPaginationProps = {
  currentPage: number;
  totalPages: number;
  auditAction?: string;
  auditActor?: string;
  auditRange?: string;
  auditStart?: string;
  auditEnd?: string;
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

function buildInboxAuditPageHref({
  auditPage,
  auditAction,
  auditActor,
  auditRange,
  auditStart,
  auditEnd,
  preservedFilters,
}: {
  auditPage: number;
  auditAction?: string;
  auditActor?: string;
  auditRange?: string;
  auditStart?: string;
  auditEnd?: string;
  preservedFilters?: InboxAuditPaginationProps["preservedFilters"];
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

  if (auditAction && auditAction !== "all") {
    params.set("auditAction", auditAction);
  }

  if (auditActor && auditActor !== "all") {
    params.set("auditActor", auditActor);
  }

  if (auditRange && auditRange !== "all") {
    params.set("auditRange", auditRange);
  }

  if (auditStart) {
    params.set("auditStart", auditStart);
  }

  if (auditEnd) {
    params.set("auditEnd", auditEnd);
  }

  if (auditPage > 1) {
    params.set("auditPage", String(auditPage));
  }

  const queryString = params.toString();
  return queryString ? `/inbox?${queryString}` : "/inbox";
}

export function InboxAuditPagination({
  currentPage,
  totalPages,
  auditAction,
  auditActor,
  auditRange,
  auditStart,
  auditEnd,
  preservedFilters,
}: InboxAuditPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="inbox-pagination" aria-label="Audit pagination">
      <a
        href={buildInboxAuditPageHref({
          auditPage: Math.max(1, currentPage - 1),
          auditAction,
          auditActor,
          auditRange,
          auditStart,
          auditEnd,
          preservedFilters,
        })}
        className={`secondary-link${currentPage === 1 ? " disabled-link" : ""}`}
        aria-disabled={currentPage === 1}
      >
        Previous audit page
      </a>
      <span className="pagination-summary">
        Audit page {currentPage} of {totalPages}
      </span>
      <a
        href={buildInboxAuditPageHref({
          auditPage: Math.min(totalPages, currentPage + 1),
          auditAction,
          auditActor,
          auditRange,
          auditStart,
          auditEnd,
          preservedFilters,
        })}
        className={`secondary-link${currentPage === totalPages ? " disabled-link" : ""}`}
        aria-disabled={currentPage === totalPages}
      >
        Next audit page
      </a>
    </nav>
  );
}
