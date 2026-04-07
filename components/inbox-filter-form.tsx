type InboxFilterFormProps = {
  query?: string;
  status?: string;
  view?: string;
  owner?: string;
  followUp?: string;
  currentUserName?: string;
};

export function InboxFilterForm({
  query = "",
  status = "all",
  view = "active",
  owner = "all",
  followUp = "all",
  currentUserName,
}: InboxFilterFormProps) {
  return (
    <form className="inbox-filter-form" method="GET">
      <input type="hidden" name="page" value="1" />
      <label>
        <span>Search leads</span>
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Name, business, email, or service"
        />
      </label>
      <label>
        <span>Status</span>
        <select name="status" defaultValue={status}>
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </label>
      <label>
        <span>View</span>
        <select name="view" defaultValue={view}>
          <option value="active">Active leads</option>
          <option value="archived">Archived leads</option>
          <option value="all">All leads</option>
        </select>
      </label>
      <label>
        <span>Owner</span>
        <select name="owner" defaultValue={owner}>
          <option value="all">All owners</option>
          {currentUserName ? <option value="mine">My leads</option> : null}
          <option value="unassigned">Unassigned</option>
          <option value="Getnet Amdu Belay">Getnet Amdu Belay</option>
          <option value="Hewan Fantahun">Hewan Fantahun</option>
        </select>
      </label>
      <label>
        <span>Follow-up</span>
        <select name="followUp" defaultValue={followUp}>
          <option value="all">All follow-ups</option>
          <option value="overdue">Overdue</option>
          <option value="upcoming">Due soon</option>
          <option value="scheduled">Scheduled later</option>
          <option value="none">Not scheduled</option>
        </select>
      </label>
      <div className="inbox-filter-actions">
        <button type="submit" className="primary-link button-link">
          Apply filters
        </button>
        <a href="/inbox" className="secondary-link">
          Reset
        </a>
      </div>
    </form>
  );
}
