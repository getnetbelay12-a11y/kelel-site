type InboxPaginationProps = {
  currentPage: number;
  totalPages: number;
  query?: string;
  status?: string;
  view?: string;
  owner?: string;
  followUp?: string;
};

function buildInboxPageHref({
  page,
  query,
  status,
  view,
  owner,
  followUp,
}: {
  page: number;
  query?: string;
  status?: string;
  view?: string;
  owner?: string;
  followUp?: string;
}) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (status && status !== "all") {
    params.set("status", status);
  }

  if (view && view !== "active") {
    params.set("view", view);
  }

  if (owner && owner !== "all") {
    params.set("owner", owner);
  }

  if (followUp && followUp !== "all") {
    params.set("followUp", followUp);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();
  return queryString ? `/inbox?${queryString}` : "/inbox";
}

export function InboxPagination({
  currentPage,
  totalPages,
  query,
  status,
  view,
  owner,
  followUp,
}: InboxPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="inbox-pagination" aria-label="Inbox pagination">
      <a
        href={buildInboxPageHref({
          page: Math.max(1, currentPage - 1),
          query,
          status,
          view,
          owner,
          followUp,
        })}
        className={`secondary-link${currentPage === 1 ? " disabled-link" : ""}`}
        aria-disabled={currentPage === 1}
      >
        Previous
      </a>
      <span className="pagination-summary">
        Page {currentPage} of {totalPages}
      </span>
      <a
        href={buildInboxPageHref({
          page: Math.min(totalPages, currentPage + 1),
          query,
          status,
          view,
          owner,
          followUp,
        })}
        className={`secondary-link${currentPage === totalPages ? " disabled-link" : ""}`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </a>
    </nav>
  );
}
