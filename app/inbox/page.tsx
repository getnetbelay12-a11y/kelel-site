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
import { InboxAttachmentUploadForm } from "@/components/inbox-attachment-upload-form";
import { InboxAuditFilterForm } from "@/components/inbox-audit-filter-form";
import { InboxAuditExportButton } from "@/components/inbox-audit-export-button";
import { InboxAuditPagination } from "@/components/inbox-audit-pagination";
import { InboxAuditSaveForm } from "@/components/inbox-audit-save-form";
import { InboxAuditSnapshotButton } from "@/components/inbox-audit-snapshot-button";
import { InboxAuditSnapshotDeleteButton } from "@/components/inbox-audit-snapshot-delete-button";
import { InboxAuditSnapshotEditForm } from "@/components/inbox-audit-snapshot-edit-form";
import { InboxAuditSnapshotSearchForm } from "@/components/inbox-audit-snapshot-search-form";
import { InboxAuditSnapshotPagination } from "@/components/inbox-audit-snapshot-pagination";
import { SubmissionActivityTimeline } from "@/components/submission-activity-timeline";
import { AttachmentPreviewGallery } from "@/components/attachment-preview-gallery";
import type { Metadata } from "next";
import { SectionIntro } from "@/components/section-intro";
import {
  readContactSubmissions,
  type StoredSubmission,
  type SubmissionStatus,
  type SubmissionAttachment,
} from "@/lib/contact-submissions";
import {
  filterInboxAuditLog,
  readInboxAuditLog,
} from "@/lib/inbox-audit";
import { readInboxAuditSnapshots } from "@/lib/inbox-audit-snapshots";
import {
  getInboxDirectoryUsers,
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
const AUDIT_EVENTS_PER_PAGE = 8;
const SNAPSHOTS_PER_PAGE = 6;
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
    submission.sourcePage,
    submission.requestFocus,
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

function formatAttachmentDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function formatAttachmentSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatSourceLabel(value: string) {
  if (!value) {
    return "Website form";
  }

  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getDaysSince(value: string) {
  const createdAt = new Date(value);
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();

  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function isImageAttachment(attachment: SubmissionAttachment) {
  return attachment.contentType.startsWith("image/");
}

function isPdfAttachment(attachment: SubmissionAttachment) {
  return attachment.contentType === "application/pdf";
}

function isPreviewableAttachment(attachment: SubmissionAttachment) {
  return isImageAttachment(attachment) || isPdfAttachment(attachment);
}

function getAttachmentHref(submissionId: string, attachmentId: string) {
  return `/api/contact/${submissionId}/attachments/${attachmentId}`;
}

function getAttachmentDownloadHref(submissionId: string, attachmentId: string) {
  return `${getAttachmentHref(submissionId, attachmentId)}?download=1`;
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

function normalizeDecisionStageFilter(value: string | undefined) {
  return value?.trim() || "all";
}

function normalizeSourcePageFilter(value: string | undefined) {
  return value?.trim() || "all";
}

function normalizeRequestFocusFilter(value: string | undefined) {
  return value?.trim().toLowerCase() || "all";
}

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

function matchesSnapshotQuery(
  snapshot: Awaited<ReturnType<typeof readInboxAuditSnapshots>>[number],
  query: string,
) {
  const haystack = [snapshot.title, snapshot.purpose, snapshot.note]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function normalizeSnapshotSort(value: string | undefined) {
  const normalized = value?.trim() || "newest";
  return ["newest", "oldest", "title"].includes(normalized) ? normalized : "newest";
}

function normalizeSnapshotTag(value: string | undefined) {
  const normalized = value?.trim() || "all";
  return ["all", "compliance", "operations", "security", "leadership"].includes(
    normalized,
  )
    ? normalized
    : "all";
}

function buildSnapshotFilterHref({
  snapshotTag,
  snapshotQuery,
  snapshotSort,
  query,
  status,
  view,
  owner,
  followUp,
  inquiryType,
  decisionStage,
  page,
  auditAction,
  auditActor,
  auditRange,
  auditStart,
  auditEnd,
  auditPage,
}: {
  snapshotTag?: string;
  snapshotQuery?: string;
  snapshotSort?: string;
  query?: string;
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

  if (inquiryType && inquiryType !== "all") {
    params.set("inquiryType", inquiryType);
  }

  if (decisionStage && decisionStage !== "all") {
    params.set("decisionStage", decisionStage);
  }

  if (page && page !== "1") {
    params.set("page", page);
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

  if (auditPage && auditPage !== "1") {
    params.set("auditPage", auditPage);
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

  const queryString = params.toString();
  return queryString ? `/inbox?${queryString}` : "/inbox";
}

function buildInboxHref({
  followUp,
  owner,
  inquiryType,
  decisionStage,
  sourcePage,
  requestFocus,
}: {
  followUp?: FollowUpFilter;
  owner?: string;
  inquiryType?: string;
  decisionStage?: string;
  sourcePage?: string;
  requestFocus?: string;
}) {
  const params = new URLSearchParams();

  if (followUp && followUp !== "all") {
    params.set("followUp", followUp);
  }

  if (owner && owner !== "all") {
    params.set("owner", owner);
  }

  if (inquiryType && inquiryType !== "all") {
    params.set("inquiryType", inquiryType);
  }

  if (decisionStage && decisionStage !== "all") {
    params.set("decisionStage", decisionStage);
  }

  if (sourcePage && sourcePage !== "all") {
    params.set("sourcePage", sourcePage);
  }

  if (requestFocus && requestFocus !== "all") {
    params.set("requestFocus", requestFocus);
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
    inquiryType?: string;
    decisionStage?: string;
    sourcePage?: string;
    requestFocus?: string;
    auditAction?: string;
    auditActor?: string;
    auditRange?: string;
    auditStart?: string;
    auditEnd?: string;
    auditPage?: string;
    snapshotQ?: string;
    snapshotSort?: string;
    snapshotTag?: string;
    snapshotPage?: string;
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
  const inquiryTypeFilter = params?.inquiryType || "all";
  const decisionStageFilter = normalizeDecisionStageFilter(params?.decisionStage);
  const sourcePageFilter = normalizeSourcePageFilter(params?.sourcePage);
  const requestFocusFilter = normalizeRequestFocusFilter(params?.requestFocus);
  const auditActionFilter = normalizeAuditActionFilter(params?.auditAction);
  const auditActorFilter = normalizeAuditActorFilter(params?.auditActor);
  const auditRangeFilter = normalizeAuditRangeFilter(params?.auditRange);
  const auditStartFilter = normalizeAuditDate(params?.auditStart);
  const auditEndFilter = normalizeAuditDate(params?.auditEnd);
  const snapshotQuery = params?.snapshotQ?.trim() || "";
  const snapshotSort = normalizeSnapshotSort(params?.snapshotSort);
  const snapshotTag = normalizeSnapshotTag(params?.snapshotTag);
  const currentPage = Math.max(1, Number.parseInt(params?.page || "1", 10) || 1);
  const currentAuditPage = Math.max(
    1,
    Number.parseInt(params?.auditPage || "1", 10) || 1,
  );
  const currentSnapshotPage = Math.max(
    1,
    Number.parseInt(params?.snapshotPage || "1", 10) || 1,
  );

  const submissions = await readContactSubmissions();
  const auditLog = await readInboxAuditLog();
  const auditSnapshots = await readInboxAuditSnapshots();
  const recentAuditSnapshots = auditSnapshots.slice(0, 3);
  const filteredAuditSnapshots = auditSnapshots
    .filter(
      (snapshot) =>
        (!snapshotQuery || matchesSnapshotQuery(snapshot, snapshotQuery)) &&
        (snapshotTag === "all" || snapshot.tags.includes(snapshotTag)),
    )
    .sort((left, right) => {
      if (snapshotSort === "oldest") {
        return left.createdAt.localeCompare(right.createdAt);
      }

      if (snapshotSort === "title") {
        return left.title.localeCompare(right.title);
      }

      return right.createdAt.localeCompare(left.createdAt);
    });
  const totalSnapshotPages = Math.max(
    1,
    Math.ceil(filteredAuditSnapshots.length / SNAPSHOTS_PER_PAGE),
  );
  const safeCurrentSnapshotPage = Math.min(currentSnapshotPage, totalSnapshotPages);
  const paginatedAuditSnapshots = filteredAuditSnapshots.slice(
    (safeCurrentSnapshotPage - 1) * SNAPSHOTS_PER_PAGE,
    safeCurrentSnapshotPage * SNAPSHOTS_PER_PAGE,
  );
  const auditUsers = getInboxDirectoryUsers();
  const filteredAuditLog = filterInboxAuditLog(auditLog, {
    action: auditActionFilter,
    actor: auditActorFilter,
    range: auditRangeFilter,
    startDate: auditStartFilter,
    endDate: auditEndFilter,
  });
  const snapshotTagCounts = [
    { tag: "compliance", label: "Compliance" },
    { tag: "operations", label: "Operations" },
    { tag: "security", label: "Security" },
    { tag: "leadership", label: "Leadership" },
  ].map((item) => {
    const latestSnapshot =
      auditSnapshots.find((snapshot) => snapshot.tags.includes(item.tag)) || null;
    const daysSinceLatest = latestSnapshot
      ? getDaysSince(latestSnapshot.createdAt)
      : null;

    return {
      ...item,
      count: auditSnapshots.filter((snapshot) => snapshot.tags.includes(item.tag)).length,
      latestSnapshot,
      daysSinceLatest,
      isStale: daysSinceLatest !== null && daysSinceLatest >= 30,
    };
  });
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
    const matchesInquiryType =
      inquiryTypeFilter === "all" || submission.inquiryType === inquiryTypeFilter;
    const matchesDecisionStage =
      decisionStageFilter === "all" ||
      (decisionStageFilter === "none"
        ? !submission.decisionStage
        : submission.decisionStage === decisionStageFilter);
    const matchesSourcePage =
      sourcePageFilter === "all" ||
      (sourcePageFilter === "none"
        ? !submission.sourcePage
        : submission.sourcePage === sourcePageFilter);
    const matchesRequestFocus =
      requestFocusFilter === "all" ||
      (requestFocusFilter === "none"
        ? !submission.requestFocus
        : submission.requestFocus === requestFocusFilter);

    return (
      matchesStatus &&
      matchesText &&
      matchesView &&
      matchesOwner &&
      matchesFollowUp &&
      matchesInquiryType &&
      matchesDecisionStage &&
      matchesSourcePage &&
      matchesRequestFocus
    );
  });
  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / LEADS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedSubmissions = filteredSubmissions.slice(
    (safeCurrentPage - 1) * LEADS_PER_PAGE,
    safeCurrentPage * LEADS_PER_PAGE,
  );
  const totalAuditPages = Math.max(
    1,
    Math.ceil(filteredAuditLog.length / AUDIT_EVENTS_PER_PAGE),
  );
  const safeCurrentAuditPage = Math.min(currentAuditPage, totalAuditPages);
  const paginatedAuditLog = filteredAuditLog.slice(
    (safeCurrentAuditPage - 1) * AUDIT_EVENTS_PER_PAGE,
    safeCurrentAuditPage * AUDIT_EVENTS_PER_PAGE,
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
  const proposalCount = submissions.filter(
    (submission) => !submission.archived && submission.inquiryType === "proposal",
  ).length;
  const dashboardProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.requestFocus === "dashboard",
  ).length;
  const workflowProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.requestFocus === "workflow",
  ).length;
  const portalProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.requestFocus === "portal",
  ).length;
  const reportingProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.requestFocus === "reporting",
  ).length;
  const generalProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      !submission.requestFocus,
  ).length;
  const homePageProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.sourcePage === "home-page",
  ).length;
  const homeFinalCtaProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.sourcePage === "home-page-final-cta",
  ).length;
  const platformsSourceProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.sourcePage === "platforms-page",
  ).length;
  const platformCtaProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.sourcePage === "platform-cta-panel",
  ).length;
  const requestProposalSourceCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.sourcePage === "request-proposal-page",
  ).length;
  const contactSourceProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.sourcePage === "contact-page",
  ).length;
  const structuredProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      Boolean(submission.requestFocus),
  ).length;
  const structuredProposalRate =
    proposalCount > 0
      ? Math.round((structuredProposalCount / proposalCount) * 100)
      : 0;
  const proposalSourcePerformance = [
    {
      label: "Home page",
      source: "home-page",
      total: homePageProposalCount,
      structured: submissions.filter(
        (submission) =>
          !submission.archived &&
          submission.inquiryType === "proposal" &&
          submission.sourcePage === "home-page" &&
          Boolean(submission.requestFocus),
      ).length,
    },
    {
      label: "Home final CTA",
      source: "home-page-final-cta",
      total: homeFinalCtaProposalCount,
      structured: submissions.filter(
        (submission) =>
          !submission.archived &&
          submission.inquiryType === "proposal" &&
          submission.sourcePage === "home-page-final-cta" &&
          Boolean(submission.requestFocus),
      ).length,
    },
    {
      label: "Platforms page",
      source: "platforms-page",
      total: platformsSourceProposalCount,
      structured: submissions.filter(
        (submission) =>
          !submission.archived &&
          submission.inquiryType === "proposal" &&
          submission.sourcePage === "platforms-page" &&
          Boolean(submission.requestFocus),
      ).length,
    },
    {
      label: "Platform CTA",
      source: "platform-cta-panel",
      total: platformCtaProposalCount,
      structured: submissions.filter(
        (submission) =>
          !submission.archived &&
          submission.inquiryType === "proposal" &&
          submission.sourcePage === "platform-cta-panel" &&
          Boolean(submission.requestFocus),
      ).length,
    },
    {
      label: "Contact page",
      source: "contact-page",
      total: contactSourceProposalCount,
      structured: submissions.filter(
        (submission) =>
          !submission.archived &&
          submission.inquiryType === "proposal" &&
          submission.sourcePage === "contact-page" &&
          Boolean(submission.requestFocus),
      ).length,
    },
  ];
  const rankedProposalSources = proposalSourcePerformance
    .filter((item) => item.total > 0)
    .map((item) => ({
      ...item,
      structuredRate: Math.round((item.structured / item.total) * 100),
      general: item.total - item.structured,
    }))
    .sort((left, right) => {
      if (right.structuredRate !== left.structuredRate) {
        return right.structuredRate - left.structuredRate;
      }

      return right.total - left.total;
    });
  const topStructuredSource = rankedProposalSources[0] ?? null;
  const weakestStructuredSource =
    rankedProposalSources.length > 1
      ? rankedProposalSources[rankedProposalSources.length - 1]
      : rankedProposalSources[0] ?? null;
  const readyProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.decisionStage === "Ready to start soon",
  ).length;
  const budgetApprovedCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.decisionStage === "Budget approved",
  ).length;
  const exploringProposalCount = submissions.filter(
    (submission) =>
      !submission.archived &&
      submission.inquiryType === "proposal" &&
      submission.decisionStage === "Early exploration",
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

  const inboxHeroStats = [
    {
      label: "Total leads",
      value: String(submissions.length),
      note: "All saved inquiries currently visible in the internal lead workflow.",
    },
    {
      label: "New leads",
      value: String(newCount),
      note: "Leads that still need an initial response or triage action.",
    },
    {
      label: "Overdue",
      value: String(overdueCount),
      note: "Open leads whose follow-up date has already passed.",
    },
    {
      label: "Proposals",
      value: String(proposalCount),
      note: "Formal proposal requests currently moving through the inbox.",
    },
    {
      label: "Contacted",
      value: String(contactedCount),
      note: "Leads that already moved past first response and into active follow-up.",
    },
  ];

  const workflowCards = [
    {
      eyebrow: "Latest lead",
      title: latest ? latest.name : "Waiting for first inquiry",
      copy: latest
        ? `${latest.service} from ${latest.business || "an unnamed business"} is the most recent submission in the queue.`
        : "The inbox will surface the latest saved inquiry here once the public form receives a submission.",
    },
    {
      eyebrow: "Assigned coverage",
      title: `${assignedCount} lead${assignedCount === 1 ? "" : "s"} currently have owners`,
      copy: "Owner assignment, notes, and follow-up dates now make the inbox easier to run as a working desk.",
    },
    {
      eyebrow: "Archived",
      title: `${archivedCount} lead${archivedCount === 1 ? "" : "s"} moved out of the active view`,
      copy: "Archive and restore actions keep the active list cleaner without losing audit history.",
    },
    {
      eyebrow: "Signed in",
      title: `${session?.name || "User"} (${session?.role || "viewer"})`,
      copy: "Permissions, export access, and editing rights all reflect the current signed-in role.",
    },
  ];

  return (
    <main className="page-shell resource-page-shell inbox-page-shell">
      <section className="section-block page-hero resource-command-hero">
        <SectionIntro
          eyebrow="Lead inbox"
          title="A clearer internal lead desk for response, proposal review, and team follow-up."
          description={`This internal workspace reads the same saved contact submissions generated by the public form, but presents them as a more structured operating dashboard.${session ? ` Signed in as ${session.name} (${session.role}).` : ""}`}
        />
        <div className="inbox-toolbar">
          {isAdmin ? <InboxDigestTrigger /> : null}
          <InboxExportButton
            disabled={!isAdmin}
            query={query}
            status={statusFilter}
            view={viewFilter}
            owner={ownerFilter}
            followUp={followUpFilter}
            inquiryType={inquiryTypeFilter}
            decisionStage={decisionStageFilter}
            sourcePage={sourcePageFilter}
            requestFocus={requestFocusFilter}
          />
          <InboxLogoutButton />
        </div>
        <div className="resource-command-metrics">
          {inboxHeroStats.map((item) => (
            <article key={item.label} className="resource-command-metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resource-command-grid compact">
        {workflowCards.map((item) => (
          <article key={item.eyebrow} className="section-block resource-command-card">
            <span className="project-type">{item.eyebrow}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>

      {proposalCount > 0 ? (
        <section className="section-block">
          <SectionIntro
            eyebrow="Proposal analytics"
            title="The inbox now shows how structured the proposal flow is becoming."
            description="These quick metrics help the team see whether visitors are using the dashboard, workflow, portal, and reporting brief paths instead of falling back to generic proposal requests."
            narrow
          />
          <div className="reminder-grid">
            <article className="reminder-card">
              <span>Structured proposals</span>
              <strong>{structuredProposalCount}</strong>
              <p>Proposal requests that used a specific dashboard, workflow, portal, or reporting brief.</p>
            </article>
            <article className="reminder-card">
              <span>General proposals</span>
              <strong>{generalProposalCount}</strong>
              <p>Requests that still came through without a specific platform brief type.</p>
            </article>
            <article className="reminder-card">
              <span>Structured adoption</span>
              <strong>{structuredProposalRate}%</strong>
              <p>Share of proposal requests already using the more guided structured brief flow.</p>
            </article>
          </div>
          {topStructuredSource ? (
            <div className="highlight-grid">
              <article>
                <h3>Best structured source</h3>
                <p>
                  <strong>{topStructuredSource.label}</strong> is currently the strongest
                  entry point, with {topStructuredSource.structuredRate}% of its proposal
                  requests using a structured brief.
                </p>
              </article>
              {weakestStructuredSource ? (
                <article>
                  <h3>Needs attention</h3>
                  <p>
                    <strong>{weakestStructuredSource.label}</strong> has the weakest
                    structure rate right now at {weakestStructuredSource.structuredRate}%,
                    with {weakestStructuredSource.general} generic proposal
                    {weakestStructuredSource.general === 1 ? "" : "s"} still coming through.
                  </p>
                </article>
              ) : null}
            </div>
          ) : null}
          <div className="resource-grid">
            {proposalSourcePerformance.map((item) => (
              <a
                key={item.source}
                href={buildInboxHref({ inquiryType: "proposal", sourcePage: item.source })}
                className="resource-card"
              >
                <span className="project-type">Source quality</span>
                <h3>{item.label}</h3>
                <p>
                  {item.structured} of {item.total} proposal request
                  {item.total === 1 ? "" : "s"} used a structured brief.
                </p>
                <p className="project-detail">
                  <strong>Structured share:</strong>{" "}
                  {item.total > 0 ? `${Math.round((item.structured / item.total) * 100)}%` : "0%"}
                </p>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {proposalCount > 0 ? (
        <section className="section-block">
          <SectionIntro
            eyebrow="Proposal pipeline"
            title="Formal proposal requests can now be reviewed by decision stage."
            description="This helps the team distinguish exploratory requests from budget-approved or ready-to-start opportunities."
            narrow
          />
          <div className="reminder-grid">
            <a
              href={buildInboxHref({
                inquiryType: "proposal",
                decisionStage: "Early exploration",
              })}
              className="reminder-card"
            >
              <span>Early exploration</span>
              <strong>{exploringProposalCount}</strong>
              <p>Proposal requests still shaping scope and internal direction.</p>
            </a>
            <a
              href={buildInboxHref({
                inquiryType: "proposal",
                decisionStage: "Budget approved",
              })}
              className="reminder-card urgency-upcoming"
            >
              <span>Budget approved</span>
              <strong>{budgetApprovedCount}</strong>
              <p>Requests with stronger funding confidence and commercial momentum.</p>
            </a>
            <a
              href={buildInboxHref({
                inquiryType: "proposal",
                decisionStage: "Ready to start soon",
              })}
              className="reminder-card urgency-overdue"
            >
              <span>Ready to start</span>
              <strong>{readyProposalCount}</strong>
              <p>Highest-readiness proposal requests that may need faster response.</p>
            </a>
          </div>
        </section>
      ) : null}

      {proposalCount > 0 ? (
        <section className="section-block">
          <SectionIntro
            eyebrow="Proposal brief mix"
            title="Proposal requests can now be reviewed by brief type."
            description="This helps the team see whether new demand is clustering around dashboards, workflows, portals, or reporting visibility."
            narrow
          />
          <div className="reminder-grid">
            <a
              href={buildInboxHref({ inquiryType: "proposal", requestFocus: "dashboard" })}
              className="reminder-card"
            >
              <span>Dashboard briefs</span>
              <strong>{dashboardProposalCount}</strong>
              <p>Requests focused on reporting views and management dashboards.</p>
            </a>
            <a
              href={buildInboxHref({ inquiryType: "proposal", requestFocus: "workflow" })}
              className="reminder-card"
            >
              <span>Workflow briefs</span>
              <strong>{workflowProposalCount}</strong>
              <p>Requests for structured process tools and operational coordination.</p>
            </a>
            <a
              href={buildInboxHref({ inquiryType: "proposal", requestFocus: "portal" })}
              className="reminder-card"
            >
              <span>Portal briefs</span>
              <strong>{portalProposalCount}</strong>
              <p>Requests centered on staff, client, or partner portal experiences.</p>
            </a>
            <a
              href={buildInboxHref({ inquiryType: "proposal", requestFocus: "reporting" })}
              className="reminder-card"
            >
              <span>Reporting briefs</span>
              <strong>{reportingProposalCount}</strong>
              <p>Requests focused on operational visibility and decision-ready reporting.</p>
            </a>
          </div>
        </section>
      ) : null}

      {proposalCount > 0 ? (
        <section className="section-block">
          <SectionIntro
            eyebrow="Proposal sources"
            title="Proposal requests can now be reviewed by entry page."
            description="This helps the team see which parts of the website are producing more structured platform demand."
            narrow
          />
          <div className="reminder-grid">
            <a
              href={buildInboxHref({ inquiryType: "proposal", sourcePage: "home-page" })}
              className="reminder-card"
            >
              <span>Home page</span>
              <strong>{homePageProposalCount}</strong>
              <p>Briefs started from the main homepage hero and shortcut entry paths.</p>
            </a>
            <a
              href={buildInboxHref({
                inquiryType: "proposal",
                sourcePage: "home-page-final-cta",
              })}
              className="reminder-card"
            >
              <span>Home final CTA</span>
              <strong>{homeFinalCtaProposalCount}</strong>
              <p>Briefs started from the final homepage conversion block.</p>
            </a>
            <a
              href={buildInboxHref({ inquiryType: "proposal", sourcePage: "platforms-page" })}
              className="reminder-card"
            >
              <span>Platforms page</span>
              <strong>{platformsSourceProposalCount}</strong>
              <p>Briefs coming from the dedicated dashboards, workflows, and portals page.</p>
            </a>
            <a
              href={buildInboxHref({
                inquiryType: "proposal",
                sourcePage: "platform-cta-panel",
              })}
              className="reminder-card"
            >
              <span>Shared platform CTA</span>
              <strong>{platformCtaProposalCount}</strong>
              <p>Requests started from the reusable platform conversion panels across the site.</p>
            </a>
            <a
              href={buildInboxHref({
                inquiryType: "proposal",
                sourcePage: "request-proposal-page",
              })}
              className="reminder-card"
            >
              <span>Proposal page</span>
              <strong>{requestProposalSourceCount}</strong>
              <p>Briefs started directly inside the formal request-proposal page.</p>
            </a>
            <a
              href={buildInboxHref({ inquiryType: "proposal", sourcePage: "contact-page" })}
              className="reminder-card"
            >
              <span>Contact page</span>
              <strong>{contactSourceProposalCount}</strong>
              <p>Structured platform briefs started from the general contact experience.</p>
            </a>
            <a
              href={buildInboxHref({ inquiryType: "proposal", requestFocus: "none" })}
              className="reminder-card"
            >
              <span>General proposals</span>
              <strong>{generalProposalCount}</strong>
              <p>Proposal requests that did not use a specific dashboard, workflow, portal, or reporting brief.</p>
            </a>
          </div>
        </section>
      ) : null}

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
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Audit trail"
            title="Recent inbox actions are now recorded by signed-in user."
            description="Exports and lead changes keep a visible trail so the team can see who acted and when."
            narrow
          />
          <div className="audit-top-grid">
            <section className="audit-control-panel">
              <InboxAuditFilterForm
                action={auditActionFilter}
                actor={auditActorFilter}
                range={auditRangeFilter}
                startDate={auditStartFilter}
                endDate={auditEndFilter}
                users={auditUsers}
                preservedFilters={{
                  q: query,
                  status: statusFilter,
                  view: viewFilter,
                  owner: ownerFilter,
                  followUp: followUpFilter,
                  inquiryType: inquiryTypeFilter,
                  decisionStage: decisionStageFilter,
                  page: String(safeCurrentPage),
                }}
              />
            </section>
            <section className="audit-control-panel audit-action-panel">
              <span className="project-type">Audit actions</span>
              <h3>Save, export, or snapshot the current filtered review.</h3>
              <p>
                These actions keep the audit workflow usable for compliance, leadership,
                and internal operations review.
              </p>
              <div className="audit-actions">
                <InboxAuditSaveForm
                  auditAction={auditActionFilter}
                  auditActor={auditActorFilter}
                  auditRange={auditRangeFilter}
                  auditStart={auditStartFilter}
                  auditEnd={auditEndFilter}
                  disabled={!isAdmin}
                />
                <InboxAuditSnapshotButton
                  auditAction={auditActionFilter}
                  auditActor={auditActorFilter}
                  auditRange={auditRangeFilter}
                  auditStart={auditStartFilter}
                  auditEnd={auditEndFilter}
                />
                <InboxAuditExportButton
                  disabled={!isAdmin}
                  auditAction={auditActionFilter}
                  auditActor={auditActorFilter}
                  auditRange={auditRangeFilter}
                  auditStart={auditStartFilter}
                  auditEnd={auditEndFilter}
                />
              </div>
            </section>
          </div>
          {auditSnapshots.length > 0 ? (
            <>
              {recentAuditSnapshots.length > 0 ? (
                <div className="recent-snapshot-strip">
                  {recentAuditSnapshots.map((snapshot) => (
                    <article key={snapshot.id} className="recent-snapshot-card">
                      <span className="project-type">Recent snapshot</span>
                      <strong>{snapshot.title}</strong>
                      <p>
                        Saved by {snapshot.createdBy.name} on{" "}
                        {formatDate(snapshot.createdAt)}.
                      </p>
                      {snapshot.tags.length > 0 ? (
                        <div className="tag-cloud compact-tags">
                          {snapshot.tags.map((tag) => (
                            <span key={tag} className="tag-pill alt">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <a
                        href={`/inbox/audit-snapshot?snapshotId=${snapshot.id}`}
                        className="secondary-link"
                      >
                        Open latest snapshot
                      </a>
                    </article>
                  ))}
                </div>
              ) : null}
              <section className="audit-snapshot-panel">
                <SectionIntro
                  eyebrow="Saved snapshots"
                  title="Review tags, search snapshots, and reopen saved audit windows."
                  description="This turns the audit area into a more usable review library instead of a single long activity stream."
                  narrow
                />
                <div className="reminder-grid">
                  {snapshotTagCounts.map((item) => (
                    <a
                      key={item.tag}
                      href={buildSnapshotFilterHref({
                        snapshotTag: item.tag,
                        snapshotQuery,
                        snapshotSort,
                        query,
                        status: statusFilter,
                        view: viewFilter,
                        owner: ownerFilter,
                        followUp: followUpFilter,
                        inquiryType: inquiryTypeFilter,
                        decisionStage: decisionStageFilter,
                        page: String(safeCurrentPage),
                        auditAction: auditActionFilter,
                        auditActor: auditActorFilter,
                        auditRange: auditRangeFilter,
                        auditStart: auditStartFilter,
                        auditEnd: auditEndFilter,
                        auditPage: String(safeCurrentAuditPage),
                      })}
                      className={`reminder-card${
                        snapshotTag === item.tag
                          ? " urgency-upcoming"
                          : item.isStale
                            ? " urgency-overdue"
                            : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <strong>{item.count}</strong>
                      <p>Saved audit snapshots tagged for {item.label.toLowerCase()} review.</p>
                      {item.latestSnapshot ? (
                        <div className="snapshot-tag-summary">
                          <strong>{item.latestSnapshot.title}</strong>
                          <small>
                            Latest saved {formatDate(item.latestSnapshot.createdAt)}
                          </small>
                          {item.daysSinceLatest !== null ? (
                            <small
                              className={`snapshot-tag-freshness${
                                item.isStale ? " is-stale" : ""
                              }`}
                            >
                              {item.isStale
                                ? `Needs refresh: ${item.daysSinceLatest} days old`
                                : `${item.daysSinceLatest} day${
                                    item.daysSinceLatest === 1 ? "" : "s"
                                  } since last save`}
                            </small>
                          ) : null}
                        </div>
                      ) : (
                        <div className="snapshot-tag-summary">
                          <strong>No saved snapshot yet</strong>
                          <small>Create one from the current audit filter view.</small>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
                <InboxAuditSnapshotSearchForm
                  query={snapshotQuery}
                  sort={snapshotSort}
                  tag={snapshotTag}
                  preservedFilters={{
                    q: query,
                    status: statusFilter,
                    view: viewFilter,
                    owner: ownerFilter,
                    followUp: followUpFilter,
                    inquiryType: inquiryTypeFilter,
                    decisionStage: decisionStageFilter,
                    page: String(safeCurrentPage),
                    auditAction: auditActionFilter,
                    auditActor: auditActorFilter,
                    auditRange: auditRangeFilter,
                    auditStart: auditStartFilter,
                    auditEnd: auditEndFilter,
                    auditPage: String(safeCurrentAuditPage),
                  }}
                />
              </section>
              {filteredAuditSnapshots.length > 0 ? (
                <>
                  <div className="resource-grid">
                    {paginatedAuditSnapshots.map((snapshot) => (
                      <article key={snapshot.id} className="resource-card">
                        <span className="project-type">Saved snapshot</span>
                        <h3>{snapshot.title}</h3>
                        <span className="resource-note">{snapshot.purpose}</span>
                        {snapshot.tags.length > 0 ? (
                          <div className="tag-cloud compact-tags">
                            {snapshot.tags.map((tag) => (
                              <span key={tag} className="tag-pill alt">
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <p>
                          Saved by {snapshot.createdBy.name} on {formatDate(snapshot.createdAt)}.
                        </p>
                        {snapshot.note ? <p>{snapshot.note}</p> : null}
                        <div className="audit-actions">
                          <a
                            href={`/inbox/audit-snapshot?snapshotId=${snapshot.id}`}
                            className="secondary-link"
                          >
                            Open snapshot
                          </a>
                          <InboxAuditSnapshotEditForm
                            id={snapshot.id}
                            initialTitle={snapshot.title}
                            initialPurpose={snapshot.purpose}
                            initialNote={snapshot.note}
                            initialTags={snapshot.tags}
                            disabled={!isAdmin}
                          />
                          <InboxAuditSnapshotDeleteButton
                            id={snapshot.id}
                            title={snapshot.title}
                            disabled={!isAdmin}
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                <InboxAuditSnapshotPagination
                  currentPage={safeCurrentSnapshotPage}
                  totalPages={totalSnapshotPages}
                  snapshotQuery={snapshotQuery}
                  snapshotSort={snapshotSort}
                  snapshotTag={snapshotTag}
                  preservedFilters={{
                    q: query,
                    status: statusFilter,
                    view: viewFilter,
                    owner: ownerFilter,
                    followUp: followUpFilter,
                    inquiryType: inquiryTypeFilter,
                    decisionStage: decisionStageFilter,
                    page: String(safeCurrentPage),
                    auditAction: auditActionFilter,
                    auditActor: auditActorFilter,
                    auditRange: auditRangeFilter,
                    auditStart: auditStartFilter,
                    auditEnd: auditEndFilter,
                    auditPage: String(safeCurrentAuditPage),
                  }}
                />
                </>
              ) : (
                <div className="empty-state">
                  <strong>No saved snapshots match this search.</strong>
                  <p>Try a different title, purpose label, or note keyword.</p>
                </div>
              )}
            </>
          ) : null}
          <section className="audit-event-panel">
            <span className="project-type">Activity stream</span>
            <div className="activity-list">
              {paginatedAuditLog.map((event) => (
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
          <InboxAuditPagination
            currentPage={safeCurrentAuditPage}
            totalPages={totalAuditPages}
            auditAction={auditActionFilter}
            auditActor={auditActorFilter}
            auditRange={auditRangeFilter}
            auditStart={auditStartFilter}
            auditEnd={auditEndFilter}
            preservedFilters={{
              q: query,
              status: statusFilter,
              view: viewFilter,
              owner: ownerFilter,
              followUp: followUpFilter,
              inquiryType: inquiryTypeFilter,
              decisionStage: decisionStageFilter,
              page: String(safeCurrentPage),
            }}
          />
          {filteredAuditLog.length === 0 ? (
            <div className="empty-state">
              <strong>No audit events match the current filter.</strong>
              <p>Try another action, actor, or date filter, or clear the filters to review all recent inbox activity.</p>
            </div>
          ) : null}
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
          inquiryType={inquiryTypeFilter}
          decisionStage={decisionStageFilter}
          sourcePage={sourcePageFilter}
          requestFocus={requestFocusFilter}
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
                    <div className="inbox-card-main">
                      <h3>{submission.name}</h3>
                      <p>{submission.business || "No business name provided"}</p>
                    </div>
                    <div className="inbox-card-side">
                      <span className="project-type">{submission.service}</span>
                      <span
                        className={`status-pill ${
                          submission.inquiryType === "proposal"
                            ? "status-upcoming"
                            : "status-contacted"
                        }`}
                      >
                        {submission.inquiryType}
                      </span>
                      <span className={`status-pill status-${submission.status}`}>
                        {submission.status}
                      </span>
                      {submission.archived ? (
                        <span className="status-pill status-archived">archived</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="inbox-overview-grid">
                    <div className="inbox-meta">
                      <article className="inbox-meta-card">
                        <span className="owner-label">Email</span>
                        <a href={`mailto:${submission.email}`}>{submission.email}</a>
                      </article>
                      <article className="inbox-meta-card">
                        <span className="owner-label">Phone</span>
                        <a href={`tel:${submission.phone}`}>{submission.phone}</a>
                      </article>
                      <article className="inbox-meta-card">
                        <span className="owner-label">Submitted</span>
                        <strong>{formatDate(submission.createdAt)}</strong>
                      </article>
                    </div>
                    <div className="inbox-summary-grid">
                      <article className="inbox-summary-card">
                        <span className="owner-label">Owner</span>
                        <strong>{submission.owner || "Unassigned"}</strong>
                      </article>
                      <article className="inbox-summary-card">
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
                      </article>
                      <article className="inbox-summary-card">
                        <span className="owner-label">Source</span>
                        <strong>{formatSourceLabel(submission.sourcePage)}</strong>
                      </article>
                    </div>
                  </div>
                  {submission.inquiryType === "proposal" ? (
                    <div className="proposal-meta proposal-section">
                      <article>
                        <span className="owner-label">Timeline</span>
                        <strong>{submission.timeline || "Not provided"}</strong>
                      </article>
                      <article>
                        <span className="owner-label">Budget range</span>
                        <strong>{submission.budgetRange || "Not provided"}</strong>
                      </article>
                      <article>
                        <span className="owner-label">Decision stage</span>
                        <strong>{submission.decisionStage || "Not provided"}</strong>
                      </article>
                      <article>
                        <span className="owner-label">Brief type</span>
                        <strong>{submission.requestFocus || "General proposal"}</strong>
                      </article>
                      <article>
                        <span className="owner-label">Source</span>
                        <strong>{formatSourceLabel(submission.sourcePage)}</strong>
                      </article>
                    </div>
                  ) : null}
                  <div className="inbox-detail-copy">
                    <span className="owner-label">Request details</span>
                    <p>{submission.details}</p>
                  </div>
                  <div className="attachment-section inbox-section-card">
                    <div className="inbox-section-heading">
                      <span className="project-type">Attachments</span>
                      <p>Proposal files, PDFs, screenshots, and related documents linked to this lead.</p>
                    </div>
                    {canEditLeads ? (
                      <InboxAttachmentUploadForm
                        id={submission.id}
                        disabled={!canEditLeads}
                      />
                    ) : null}
                    {submission.attachments.length > 0 ? (
                      <>
                      <div className="attachment-list">
                        {submission.attachments.map((attachment) => (
                          <article key={attachment.id} className="attachment-chip">
                            <a
                              href={getAttachmentDownloadHref(
                                submission.id,
                                attachment.id,
                              )}
                              className="secondary-link"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {attachment.originalName}
                            </a>
                            <span className="attachment-chip-meta">
                              {formatAttachmentSize(attachment.size)} | Uploaded{" "}
                              {formatAttachmentDate(attachment.uploadedAt)}
                            </span>
                          </article>
                        ))}
                      </div>
                      {submission.attachments.some(isPreviewableAttachment) ? (
                        <AttachmentPreviewGallery
                          submissionId={submission.id}
                          attachments={submission.attachments
                            .filter(isPreviewableAttachment)
                            .map((attachment) => ({
                              id: attachment.id,
                              originalName: attachment.originalName,
                              contentType: attachment.contentType,
                              size: attachment.size,
                              uploadedAt: attachment.uploadedAt,
                              href: getAttachmentHref(submission.id, attachment.id),
                              downloadHref: getAttachmentDownloadHref(
                                submission.id,
                                attachment.id,
                              ),
                            }))}
                          canDelete={isAdmin}
                        />
                      ) : null}
                      </>
                    ) : (
                      <p className="attachment-empty-copy">
                        No files uploaded yet for this lead.
                      </p>
                    )}
                  </div>
                  <div className="inbox-actions inbox-section-card">
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
                  <div className="inbox-section-card">
                    <SubmissionActivityTimeline history={submission.history} />
                  </div>
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
          inquiryType={inquiryTypeFilter}
          decisionStage={decisionStageFilter}
          sourcePage={sourcePageFilter}
          requestFocus={requestFocusFilter}
        />
      </section>
    </main>
  );
}
