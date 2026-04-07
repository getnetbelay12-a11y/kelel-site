import { InboxLoginForm } from "@/components/inbox-login-form";
import { PrintPackButton } from "@/components/print-pack-button";
import { SectionIntro } from "@/components/section-intro";
import { filterInboxAuditLog, readInboxAuditLog } from "@/lib/inbox-audit";
import { getInboxAuditSnapshotById } from "@/lib/inbox-audit-snapshots";
import {
  getInboxDirectoryUsers,
  getInboxSession,
  hasCustomInboxUsers,
  hasInboxRole,
  isInboxAuthenticated,
} from "@/lib/inbox-auth";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Audit Snapshot | Kelel IT Solution",
  description:
    "A print-friendly filtered audit snapshot for internal Kelel inbox review.",
};

function normalizeAuditActionFilter(value: string | undefined) {
  return value?.trim() || "all";
}

function normalizeAuditActorFilter(value: string | undefined) {
  return value?.trim() || "all";
}

function normalizeAuditRangeFilter(value: string | undefined) {
  const normalized = value?.trim() || "all";

  return ["all", "today", "week", "month", "custom"].includes(normalized)
    ? normalized
    : "all";
}

function normalizeAuditDate(value: string | undefined) {
  if (!value) {
    return "";
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(value.trim()) ? value.trim() : "";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getFilterLabel(
  actor: string,
  action: string,
  range: string,
  startDate: string,
  endDate: string,
) {
  const labels = [];

  labels.push(action === "all" ? "All actions" : action.replaceAll("_", " "));
  labels.push(actor === "all" ? "All users" : actor);

  if (range === "custom") {
    labels.push(
      startDate || endDate
        ? `Custom range${startDate ? ` from ${startDate}` : ""}${endDate ? ` to ${endDate}` : ""}`
        : "Custom range",
    );
  } else {
    labels.push(range === "all" ? "All time" : range);
  }

  return labels;
}

export default async function InboxAuditSnapshotPage({
  searchParams,
}: {
  searchParams?: Promise<{
    auditAction?: string;
    auditActor?: string;
    auditRange?: string;
    auditStart?: string;
    auditEnd?: string;
    snapshotId?: string;
  }>;
}) {
  const authenticated = await isInboxAuthenticated();

  if (!authenticated) {
    return (
      <main className="page-shell">
        <section className="section-block page-hero">
          <SectionIntro
            eyebrow="Protected audit snapshot"
            title="This audit snapshot requires inbox sign-in before it can be reviewed."
            description="Use named inbox credentials for internal access."
          />
        </section>
        <section className="section-block">
          <div className="empty-state">
            <strong>Inbox authentication required</strong>
            <p>
              {hasCustomInboxUsers()
                ? "Custom inbox users are configured for this environment."
                : "No custom INBOX_USERS are configured yet, so the project is using its local fallback admin user."}
            </p>
          </div>
          <InboxLoginForm />
        </section>
      </main>
    );
  }

  if (!(await hasInboxRole("admin"))) {
    return (
      <main className="page-shell">
        <section className="section-block page-hero">
          <SectionIntro
            eyebrow="Admin access"
            title="Only admins can open the audit snapshot view."
            description="This print-friendly review page is restricted because it can expose sensitive internal audit history."
          />
        </section>
      </main>
    );
  }

  const params = await searchParams;
  const savedSnapshot = params?.snapshotId
    ? await getInboxAuditSnapshotById(params.snapshotId)
    : null;
  const auditActionFilter = normalizeAuditActionFilter(
    savedSnapshot?.filters.action || params?.auditAction,
  );
  const auditActorFilter = normalizeAuditActorFilter(
    savedSnapshot?.filters.actor || params?.auditActor,
  );
  const auditRangeFilter = normalizeAuditRangeFilter(
    savedSnapshot?.filters.range || params?.auditRange,
  );
  const auditStartFilter = normalizeAuditDate(
    savedSnapshot?.filters.startDate || params?.auditStart,
  );
  const auditEndFilter = normalizeAuditDate(
    savedSnapshot?.filters.endDate || params?.auditEnd,
  );
  const session = await getInboxSession();
  const users = getInboxDirectoryUsers();
  const actorName =
    auditActorFilter === "all"
      ? "all"
      : users.find((user) => user.username === auditActorFilter)?.name || auditActorFilter;
  const events = filterInboxAuditLog(await readInboxAuditLog(), {
    action: auditActionFilter,
    actor: auditActorFilter,
    range: auditRangeFilter,
    startDate: auditStartFilter,
    endDate: auditEndFilter,
  });
  const labels = getFilterLabel(
    actorName,
    auditActionFilter,
    auditRangeFilter,
    auditStartFilter,
    auditEndFilter,
  );

  return (
    <main className="page-shell print-pack">
      <section className="section-block page-hero print-section">
        <SectionIntro
          eyebrow="Audit snapshot"
          title="A print-friendly internal review view for filtered inbox audit activity."
          description={
            savedSnapshot
              ? `Prepared for ${session?.name || "signed-in admin"} using the saved snapshot "${savedSnapshot.title}".`
              : `Prepared for ${session?.name || "signed-in admin"} using the current audit filters.`
          }
        />
        <div className="profile-page-actions print-hide">
          <Link href="/inbox" className="secondary-link">
            Back to inbox
          </Link>
          <PrintPackButton />
        </div>
      </section>

      <section className="stats-grid print-section">
        <article>
          <span>Total events</span>
          <strong>{events.length}</strong>
        </article>
        <article>
          <span>Latest event</span>
          <strong>{events[0] ? formatDate(events[0].createdAt) : "No matching events"}</strong>
        </article>
        <article>
          <span>Snapshot generated</span>
          <strong>{formatDate(new Date().toISOString())}</strong>
        </article>
        {savedSnapshot ? (
          <article>
            <span>Saved snapshot</span>
            <strong>{savedSnapshot.title}</strong>
          </article>
        ) : null}
        {savedSnapshot ? (
          <article>
            <span>Purpose</span>
            <strong>{savedSnapshot.purpose}</strong>
          </article>
        ) : null}
      </section>

      {savedSnapshot?.note ? (
        <section className="section-block print-section">
          <SectionIntro
            eyebrow="Snapshot note"
            title="Why this saved audit view exists."
            narrow
          />
          <p>{savedSnapshot.note}</p>
        </section>
      ) : null}

      {savedSnapshot && savedSnapshot.tags.length > 0 ? (
        <section className="section-block print-section">
          <SectionIntro
            eyebrow="Snapshot tags"
            title="Structured labels for this saved review."
            narrow
          />
          <div className="tag-cloud compact-tags">
            {savedSnapshot.tags.map((tag) => (
              <span key={tag} className="tag-pill alt">
                {tag}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-block print-section">
        <SectionIntro
          eyebrow="Applied filters"
          title="This snapshot reflects the following audit view."
          narrow
        />
        <div className="tag-cloud compact-tags">
          {labels.map((label) => (
            <span key={label} className="tag-pill">
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="section-block print-section">
        <SectionIntro
          eyebrow="Audit events"
          title="Filtered audit timeline"
          narrow
        />
        {events.length > 0 ? (
          <div className="activity-list snapshot-activity-list">
            {events.map((event) => (
              <article key={event.id} className="activity-item">
                <strong>{event.message}</strong>
                <span className="activity-actor">
                  {event.actor.name} ({event.actor.role})
                </span>
                <span>{event.action.replaceAll("_", " ")}</span>
                <span>{formatDate(event.createdAt)}</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <strong>No audit events matched this snapshot.</strong>
            <p>Adjust the audit filters in the inbox and reopen the snapshot if you need a different review window.</p>
          </div>
        )}
      </section>
    </main>
  );
}
