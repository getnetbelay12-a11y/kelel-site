import { InboxArchiveButton } from "@/components/inbox-archive-button";
import { InboxFollowUpForm } from "@/components/inbox-follow-up-form";
import { InboxFilterForm } from "@/components/inbox-filter-form";
import { InboxNotesForm } from "@/components/inbox-notes-form";
import { InboxOwnerForm } from "@/components/inbox-owner-form";
import { InboxPagination } from "@/components/inbox-pagination";
import { InboxExportButton } from "@/components/inbox-export-button";
import { InboxDigestTrigger } from "@/components/inbox-digest-trigger";
import { InboxLoginForm } from "@/components/inbox-login-form";
import { InboxLogoutButton } from "@/components/inbox-logout-button";
import { InboxStatusForm } from "@/components/inbox-status-form";
import { SubmissionActivityTimeline } from "@/components/submission-activity-timeline";
import type { Metadata } from "next";
import { SectionIntro } from "@/components/section-intro";
import {
  readContactSubmissions,
  type StoredSubmission,
  type SubmissionStatus,
} from "@/lib/contact-submissions";
import { readInboxAuditLog } from "@/lib/inbox-audit";
import {
  getInboxSession,
  hasCustomInboxUsers,
  isInboxAuthenticated,
} from "@/lib/inbox-auth";

export const metadata: Metadata = {
  title: "Inbox | Kelel IT Solution",
  description:
    "Internal lead inbox for reviewing project inquiries submitted through the Kelel IT Solution website.",
};

const LEADS_PER_PAGE = 5;
type FollowUpFilter = "all" | "overdue" | "upcoming" | "scheduled" | "none";

function isSubmissionStatus(value: string): value is SubmissionStatus {
  return value === "new" || value === "contacted" || value === "closed";
}

function matchesQuery(submission: StoredSubmission, query: string) {
  const haystack = [
    submission.name,
    submission.business,
    submission.email,
    submission.service,
    submission.details,
    submission.notes,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatFollowUpDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(`${value}T00:00:00`));
}

function getFollowUpState(
  followUpDate: string | undefined,
  today: string,
  upcomingThresholdDate: string,
) {
  if (!followUpDate) {
    return "none" as const;
  }

  if (followUpDate < today) {
    return "overdue" as const;
  }

  if (followUpDate <= upcomingThresholdDate) {
    return "upcoming" as const;
  }

  return "scheduled" as const;
}

function isFollowUpFilter(value: string): value is FollowUpFilter {
  return (
    value === "all" ||
    value === "overdue" ||
    value === "upcoming" ||
    value === "scheduled" ||
    value === "none"
  );
}

function buildInboxHref({
  followUp,
  owner,
}: {
  followUp?: FollowUpFilter;
  owner?: string;
}) {
  const params = new URLSearchParams();

  if (followUp && followUp !== "all") {
    params.set("followUp", followUp);
  }

  if (owner && owner !== "all") {
    params.set("owner", owner);
  }

  const queryString = params.toString();
  return queryString ? `/inbox?${queryString}` : "/inbox";
}

export default async function InboxPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    view?: string;
    owner?: string;
    followUp?: string;
    page?: string;
  }>;
}) {
  const authenticated = await isInboxAuthenticated();

  if (!authenticated) {
    return (
      <main className="page-shell">
        <section className="section-block page-hero">
          <SectionIntro
            eyebrow="Protected inbox"
            title="This internal lead inbox now requires a user sign-in before submissions can be reviewed."
            description="Use named inbox credentials for internal access. Configure additional users with the INBOX_USERS environment variable before deployment."
          />
        </section>

        <section className="section-block">
          <div className="empty-state">
            <strong>Inbox authentication required</strong>
            <p>
              This internal area is protected with named user credentials. Sign in to
              review leads and update statuses.
            </p>
            <p>
              {hasCustomInboxUsers()
                ? "Custom inbox users are configured for this environment."
                : "No custom INBOX_USERS are configured yet, so the project is using its local fallback admin user. Set INBOX_USERS before any shared or production deployment."}
            </p>
          </div>
          <InboxLoginForm />
        </section>
      </main>
    );
  }

  const session = await getInboxSession();
  const canEditLeads = session?.role === "editor" || session?.role === "admin";
  const isAdmin = session?.role === "admin";
  const currentUserName = session?.name || "";

  const params = await searchParams;
  const query = params?.q?.trim() || "";
  const statusFilter = params?.status || "all";
  const viewFilter = params?.view || "active";
  const ownerFilter = params?.owner || "all";
  const followUpFilter = isFollowUpFilter(params?.followUp || "all")
    ? params?.followUp || "all"
    : "all";
  const currentPage = Math.max(1, Number.parseInt(params?.page || "1", 10) || 1);

  const submissions = await readContactSubmissions();
  const auditLog = await readInboxAuditLog();
  const today = new Date().toISOString().slice(0, 10);
  const upcomingThreshold = new Date();
  upcomingThreshold.setDate(upcomingThreshold.getDate() + 7);
  const upcomingThresholdDate = upcomingThreshold.toISOString().slice(0, 10);
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesStatus =
      statusFilter === "all" || (isSubmissionStatus(statusFilter) && submission.status === statusFilter);
    const matchesText = !query || matchesQuery(submission, query);
    const matchesView =
      viewFilter === "all" ||
      (viewFilter === "archived" ? submission.archived : !submission.archived);
    const matchesOwner =
      ownerFilter === "all" ||
      (ownerFilter === "mine" ? submission.owner === currentUserName : false) ||
      (ownerFilter === "unassigned" ? !submission.owner : submission.owner === ownerFilter);
    const followUpState = getFollowUpState(
      submission.followUpDate,
      today,
      upcomingThresholdDate,
    );
    const matchesFollowUp = followUpFilter === "all" || followUpState === followUpFilter;

    return matchesStatus && matchesText && matchesView && matchesOwner && matchesFollowUp;
  });
  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / LEADS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedSubmissions = filteredSubmissions.slice(
    (safeCurrentPage - 1) * LEADS_PER_PAGE,
    safeCurrentPage * LEADS_PER_PAGE,
  );
  const latest = submissions[0];
  const newCount = submissions.filter((submission) => submission.status === "new").length;
  const contactedCount = submissions.filter(
    (submission) => submission.status === "contacted",
  ).length;
  const archivedCount = submissions.filter((submission) => submission.archived).length;
  const assignedCount = submissions.filter((submission) => Boolean(submission.owner)).length;
  const overdueCount = submissions.filter(
    (submission) => !submission.archived && getFollowUpState(submission.followUpDate, today, upcomingThresholdDate) === "overdue",
  ).length;
  const upcomingCount = submissions.filter(
    (submission) => !submission.archived && getFollowUpState(submission.followUpDate, today, upcomingThresholdDate) === "upcoming",
  ).length;
  const myLeads = submissions.filter(
    (submission) => !submission.archived && submission.owner === currentUserName,
  );
  const myLeadCount = myLeads.length;
  const myOverdueCount = myLeads.filter(
    (submission) => getFollowUpState(submission.followUpDate, today, upcomingThresholdDate) === "overdue",
  ).length;
  const myUpcomingCount = myLeads.filter(
    (submission) => getFollowUpState(submission.followUpDate, today, upcomingThresholdDate) === "upcoming",
  ).length;
  const myOpenCount = myLeads.filter((submission) => submission.status !== "closed").length;
  const urgentReminders = submissions
    .filter((submission) => {
      if (submission.archived) {
        return false;
      }

      const followUpState = getFollowUpState(
        submission.followUpDate,
        today,
        upcomingThresholdDate,
      );

      return followUpState === "overdue" || followUpState === "upcoming";
    })
    .slice(0, 4);
  const unassignedReminders = submissions.filter((submission) => {
    if (submission.archived || submission.owner) {
      return false;
    }

    const followUpState = getFollowUpState(
      submission.followUpDate,
      today,
      upcomingThresholdDate,
    );

    return followUpState === "overdue" || followUpState === "upcoming";
  }).length;

  return (
    <main className="page-shell">
      <section className="section-block page-hero">
        <SectionIntro
          eyebrow="Lead inbox"
          title="Website inquiries can now be reviewed inside the project, not only in the JSON file."
          description={`This internal page reads the same saved contact submissions generated by the public form.${session ? ` Signed in as ${session.name} (${session.role}).` : ""}`}
        />
        <div className="inbox-toolbar">
          {isAdmin ? <InboxDigestTrigger /> : null}
          <InboxExportButton disabled={!isAdmin} />
          <InboxLogoutButton />
        </div>
      </section>

      <section className="stats-grid">
        <article>
          <span>Total leads</span>
          <strong>{submissions.length}</strong>
        </article>
        <article>
          <span>New leads</span>
          <strong>{newCount}</strong>
        </article>
        <article>
          <span>Contacted</span>
          <strong>{contactedCount}</strong>
        </article>
        <article>
          <span>Latest contact</span>
          <strong>{latest ? latest.name : "Waiting for first inquiry"}</strong>
        </article>
        <article>
          <span>Archived</span>
          <strong>{archivedCount}</strong>
        </article>
        <article>
          <span>Assigned</span>
          <strong>{assignedCount}</strong>
        </article>
        <article>
          <span>Overdue follow-ups</span>
          <strong>{overdueCount}</strong>
        </article>
        <article>
          <span>Due this week</span>
          <strong>{upcomingCount}</strong>
        </article>
      </section>

      {session ? (
        <section className="section-block">
          <SectionIntro
            eyebrow="My workload"
            title="Each signed-in user now gets a personal lead queue."
            description="Use these quick views to focus on the leads assigned to you and the follow-ups that need action next."
            narrow
          />
          <div className="reminder-grid">
            <a href={buildInboxHref({ owner: "mine" })} className="reminder-card">
              <span>My active leads</span>
              <strong>{myLeadCount}</strong>
              <p>Show all active leads currently assigned to {session.name}.</p>
            </a>
            <a
              href={buildInboxHref({ owner: "mine", followUp: "overdue" })}
              className="reminder-card urgency-overdue"
            >
              <span>My overdue follow-ups</span>
              <strong>{myOverdueCount}</strong>
              <p>Jump straight to assigned leads whose follow-up date has passed.</p>
            </a>
            <a
              href={buildInboxHref({ owner: "mine", followUp: "upcoming" })}
              className="reminder-card urgency-upcoming"
            >
              <span>My due soon</span>
              <strong>{myUpcomingCount}</strong>
              <p>Review assigned leads that need action within the next 7 days.</p>
            </a>
          </div>
          <div className="activity-list workload-summary">
            <article className="activity-item">
              <strong>{myOpenCount} open leads currently assigned</strong>
              <span>Includes new and contacted leads that still need to move forward.</span>
            </article>
          </div>
        </section>
      ) : null}

      {submissions.length > 0 ? (
        <section className="section-block reminder-panel">
          <SectionIntro
            eyebrow="Follow-up reminders"
            title="The inbox now shows which leads need attention first."
            description="Use these reminder cards to jump straight into overdue and due-soon follow-ups."
            narrow
          />
          <div className="reminder-grid">
            <a href={buildInboxHref({ followUp: "overdue" })} className="reminder-card urgency-overdue">
              <span>Overdue now</span>
              <strong>{overdueCount}</strong>
              <p>Open leads whose follow-up date has already passed.</p>
            </a>
            <a href={buildInboxHref({ followUp: "upcoming" })} className="reminder-card urgency-upcoming">
              <span>Due soon</span>
              <strong>{upcomingCount}</strong>
              <p>Review leads that need action within the next 7 days.</p>
            </a>
            <a
              href={buildInboxHref({ followUp: "overdue", owner: "unassigned" })}
              className="reminder-card"
            >
              <span>Unassigned urgent</span>
              <strong>{unassignedReminders}</strong>
              <p>Focus on urgent leads that still do not have an owner.</p>
            </a>
          </div>
          {urgentReminders.length > 0 ? (
            <div className="reminder-list">
              {urgentReminders.map((submission) => {
                const followUpState = getFollowUpState(
                  submission.followUpDate,
                  today,
                  upcomingThresholdDate,
                );

                return (
                  <article key={submission.id} className="reminder-list-item">
                    <div>
                      <strong>{submission.name}</strong>
                      <p>
                        {submission.service}
                        {submission.owner ? ` | ${submission.owner}` : " | Unassigned"}
                      </p>
                    </div>
                    <div className="reminder-list-side">
                      <span
                        className={`status-pill ${
                          followUpState === "overdue" ? "status-overdue" : "status-upcoming"
                        }`}
                      >
                        {followUpState === "overdue" ? "overdue" : "due soon"}
                      </span>
                      <span className="reminder-date">
                        {submission.followUpDate
                          ? formatFollowUpDate(submission.followUpDate)
                          : "Not scheduled"}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <strong>No urgent follow-ups right now.</strong>
              <p>
                Overdue and due-soon leads will appear here automatically as follow-up
                dates are added.
              </p>
            </div>
          )}
        </section>
      ) : null}

      {auditLog.length > 0 ? (
        <section className="section-block">
          <SectionIntro
            eyebrow="Audit trail"
            title="Recent inbox actions are now recorded by signed-in user."
            description="Exports and lead changes keep a visible trail so the team can see who acted and when."
            narrow
          />
          <div className="activity-list">
            {auditLog.slice(0, 8).map((event) => (
              <article key={event.id} className="activity-item">
                <strong>{event.message}</strong>
                <span className="activity-actor">
                  {event.actor.name} ({event.actor.role})
                </span>
                <span>{formatDate(event.createdAt)}</span>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-block">
        <SectionIntro
          eyebrow="Submission list"
          title="A searchable internal operations view with archive support and owner assignment."
          narrow
        />
        <InboxFilterForm
          query={query}
          status={statusFilter}
          view={viewFilter}
          owner={ownerFilter}
          followUp={followUpFilter}
          currentUserName={currentUserName}
        />

        {submissions.length === 0 ? (
          <div className="empty-state">
            <strong>No contact submissions yet.</strong>
            <p>
              Once someone submits the contact form, their inquiry will appear here with
              service, business, time, and project details.
            </p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="empty-state">
            <strong>No leads match the current filters.</strong>
            <p>
              Try a different keyword or reset the filters to see more saved
              inquiries.
            </p>
          </div>
        ) : (
          <div className="inbox-list">
            {paginatedSubmissions.map((submission) => {
              const followUpState = getFollowUpState(
                submission.followUpDate,
                today,
                upcomingThresholdDate,
              );

              return (
                <article key={submission.id} className="inbox-card">
                  <div className="inbox-card-top">
                    <div>
                      <h3>{submission.name}</h3>
                      <p>{submission.business || "No business name provided"}</p>
                    </div>
                    <div className="inbox-card-side">
                      <span className="project-type">{submission.service}</span>
                      <span className={`status-pill status-${submission.status}`}>
                        {submission.status}
                      </span>
                      {submission.archived ? (
                        <span className="status-pill status-archived">archived</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="inbox-meta">
                    <a href={`mailto:${submission.email}`}>{submission.email}</a>
                    <a href={`tel:${submission.phone}`}>{submission.phone}</a>
                    <span>{formatDate(submission.createdAt)}</span>
                  </div>
                  <div className="inbox-owner-row">
                    <span className="owner-label">Owner</span>
                    <strong>{submission.owner || "Unassigned"}</strong>
                  </div>
                  <div className="inbox-owner-row">
                    <span className="owner-label">Next follow-up</span>
                    <strong>
                      {submission.followUpDate
                        ? formatFollowUpDate(submission.followUpDate)
                        : "Not scheduled"}
                    </strong>
                    {!submission.archived && followUpState === "overdue" ? (
                      <span className="status-pill status-overdue">overdue</span>
                    ) : null}
                    {!submission.archived && followUpState === "upcoming" ? (
                      <span className="status-pill status-upcoming">due soon</span>
                    ) : null}
                  </div>
                  <p>{submission.details}</p>
                  <div className="inbox-actions">
                    <div className="inbox-management-grid">
                      <InboxStatusForm
                        id={submission.id}
                        status={submission.status}
                        disabled={!canEditLeads}
                      />
                      <InboxOwnerForm
                        id={submission.id}
                        owner={submission.owner}
                        disabled={!canEditLeads}
                      />
                      <InboxFollowUpForm
                        id={submission.id}
                        followUpDate={submission.followUpDate}
                        disabled={!canEditLeads}
                      />
                    </div>
                    <InboxNotesForm
                      id={submission.id}
                      notes={submission.notes}
                      disabled={!canEditLeads}
                    />
                  </div>
                  <div className="inbox-secondary-actions">
                    <InboxArchiveButton
                      id={submission.id}
                      archived={submission.archived}
                      disabled={!isAdmin}
                    />
                  </div>
                  {!canEditLeads ? (
                    <p className="permission-hint">
                      This account has read-only access. Editors and admins can update
                      leads.
                    </p>
                  ) : null}
                  <SubmissionActivityTimeline history={submission.history} />
                </article>
              );
            })}
          </div>
        )}
        <InboxPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          query={query}
          status={statusFilter}
          view={viewFilter}
          owner={ownerFilter}
          followUp={followUpFilter}
        />
      </section>
    </main>
  );
}
