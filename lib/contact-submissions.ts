import { promises as fs } from "fs";
import path from "path";

export type SubmissionAttachment = {
  id: string;
  originalName: string;
  storedName: string;
  contentType: string;
  size: number;
  uploadedAt: string;
};

export type ContactPayload = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  service?: string;
  details?: string;
  inquiryType?: string;
  timeline?: string;
  budgetRange?: string;
  decisionStage?: string;
  sourcePage?: string;
  requestFocus?: string;
};

export type SubmissionStatus = "new" | "contacted" | "closed";

export type SubmissionActivityType =
  | "created"
  | "status_changed"
  | "notes_updated"
  | "archived"
  | "restored"
  | "owner_changed"
  | "follow_up_changed"
  | "attachment_added"
  | "attachment_removed";

export type SubmissionActivityActor = {
  username: string;
  name: string;
  role: string;
};

export type SubmissionActivity = {
  type: SubmissionActivityType;
  message: string;
  createdAt: string;
  actor?: SubmissionActivityActor;
};

export type StoredSubmission = Required<ContactPayload> & {
  id: string;
  createdAt: string;
  status: SubmissionStatus;
  notes: string;
  notesUpdatedAt?: string;
  archived: boolean;
  archivedAt?: string;
  owner: string;
  followUpDate?: string;
  attachments: SubmissionAttachment[];
  history: SubmissionActivity[];
};

type PersistedSubmission = Omit<
  StoredSubmission,
  "status" | "notes" | "history" | "archived" | "owner" | "followUpDate" | "attachments"
> & {
  status?: string;
  notes?: string;
  history?: SubmissionActivity[];
  notesUpdatedAt?: string;
  archived?: boolean;
  archivedAt?: string;
  owner?: string;
  followUpDate?: string;
  attachments?: SubmissionAttachment[];
};

export const submissionsPath = path.join(
  process.cwd(),
  "data",
  "contact-submissions.json",
);
export const attachmentsDirectoryPath = path.join(process.cwd(), "data", "proposal-attachments");
export const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
export const allowedAttachmentTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function sanitizeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeInquiryType(value: unknown) {
  const normalized = normalize(value).toLowerCase();
  return normalized === "proposal" ? "proposal" : "general";
}

function normalizeAttachments(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as SubmissionAttachment[];
  }

  return value.filter((item): item is SubmissionAttachment => {
    if (!item || typeof item !== "object") {
      return false;
    }

    const candidate = item as SubmissionAttachment;

    return (
      typeof candidate.id === "string" &&
      typeof candidate.originalName === "string" &&
      typeof candidate.storedName === "string" &&
      typeof candidate.contentType === "string" &&
      typeof candidate.size === "number" &&
      typeof candidate.uploadedAt === "string"
    );
  });
}

function isValidStatus(value: unknown): value is SubmissionStatus {
  return value === "new" || value === "contacted" || value === "closed";
}

function normalizeFollowUpDate(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return undefined;
  }

  return trimmed;
}

function createActivity(
  type: SubmissionActivityType,
  message: string,
  actor?: SubmissionActivityActor,
): SubmissionActivity {
  return {
    type,
    message,
    createdAt: new Date().toISOString(),
    actor,
  };
}

export function validateContactPayload(payload: ContactPayload) {
  const name = normalize(payload.name);
  const business = normalize(payload.business);
  const email = normalize(payload.email);
  const phone = normalize(payload.phone);
  const service = normalize(payload.service);
  const details = normalize(payload.details);
  const inquiryType = normalizeInquiryType(payload.inquiryType);
  const timeline = normalize(payload.timeline);
  const budgetRange = normalize(payload.budgetRange);
  const decisionStage = normalize(payload.decisionStage);
  const sourcePage = normalize(payload.sourcePage);
  const requestFocus = normalize(payload.requestFocus).toLowerCase();

  if (!name || !email || !phone || !service || !details) {
    return { error: "Please fill in all required fields before sending your message." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (details.length < 20) {
    return { error: "Please add a little more detail so we can understand the project well." };
  }

  return {
    value: {
      name,
      business,
      email,
      phone,
      service,
      details,
      inquiryType,
      timeline,
      budgetRange,
      decisionStage,
      sourcePage,
      requestFocus,
    },
  };
}

function normalizeStoredSubmission(input: PersistedSubmission | StoredSubmission): StoredSubmission {
  const status = isValidStatus(input.status) ? input.status : "new";
  const history =
    Array.isArray(input.history) && input.history.length > 0
      ? input.history
      : [createActivity("created", "Lead created from website contact form.")];

  return {
    ...input,
    status,
    notes: typeof input.notes === "string" ? input.notes : "",
    archived: input.archived === true,
    owner: typeof input.owner === "string" ? input.owner : "",
    followUpDate: normalizeFollowUpDate(input.followUpDate),
    inquiryType: normalizeInquiryType(input.inquiryType),
    sourcePage: typeof input.sourcePage === "string" ? input.sourcePage : "",
    requestFocus:
      typeof input.requestFocus === "string" ? input.requestFocus : "",
    attachments: normalizeAttachments(input.attachments),
    history,
  };
}

export async function readContactSubmissions() {
  try {
    const raw = await fs.readFile(submissionsPath, "utf8");
    const parsed = JSON.parse(raw) as Array<PersistedSubmission | StoredSubmission>;

    return parsed.map(normalizeStoredSubmission);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function writeContactSubmissions(submissions: StoredSubmission[]) {
  await fs.mkdir(path.dirname(submissionsPath), { recursive: true });
  await fs.writeFile(submissionsPath, JSON.stringify(submissions, null, 2), "utf8");
}

export function getSubmissionAttachmentPath(submissionId: string, storedName: string) {
  return path.join(attachmentsDirectoryPath, submissionId, storedName);
}

export async function saveAttachmentFiles(submissionId: string, files: File[]) {
  if (files.length === 0) {
    return [] as SubmissionAttachment[];
  }

  await fs.mkdir(path.join(attachmentsDirectoryPath, submissionId), { recursive: true });

  const attachments: SubmissionAttachment[] = [];

  for (const file of files) {
    if (file.size > MAX_ATTACHMENT_SIZE) {
      throw new Error(`Attachment "${file.name}" exceeds the 5 MB limit.`);
    }

    if (!allowedAttachmentTypes.has(file.type)) {
      throw new Error(`Attachment "${file.name}" is not a supported format.`);
    }

    const attachmentId = crypto.randomUUID();
    const storedName = `${attachmentId}-${sanitizeFileName(file.name)}`;
    const filePath = getSubmissionAttachmentPath(submissionId, storedName);
    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);
    attachments.push({
      id: attachmentId,
      originalName: file.name,
      storedName,
      contentType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    });
  }

  return attachments;
}

export async function addSubmissionAttachments(
  id: string,
  attachments: SubmissionAttachment[],
  actor?: SubmissionActivityActor,
) {
  if (attachments.length === 0) {
    return null;
  }

  const submissions = await readContactSubmissions();
  const next = submissions.map((submission) => {
    if (submission.id !== id) {
      return submission;
    }

    return {
      ...submission,
      attachments: [...submission.attachments, ...attachments],
      history: [
        createActivity(
          "attachment_added",
          `${attachments.length} attachment${attachments.length === 1 ? "" : "s"} added to lead.`,
          actor,
        ),
        ...submission.history,
      ],
    };
  });

  const updated = next.find((submission) => submission.id === id);

  if (!updated) {
    return null;
  }

  await writeContactSubmissions(next);
  return updated;
}

export async function deleteSubmissionAttachment(
  submissionId: string,
  attachmentId: string,
  actor?: SubmissionActivityActor,
) {
  const submissions = await readContactSubmissions();
  const submission = submissions.find((item) => item.id === submissionId);

  if (!submission) {
    return { status: "submission_not_found" as const };
  }

  const attachment = submission.attachments.find((item) => item.id === attachmentId);

  if (!attachment) {
    return { status: "attachment_not_found" as const };
  }

  try {
    await fs.unlink(getSubmissionAttachmentPath(submissionId, attachment.storedName));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  const attachmentDirectory = path.join(attachmentsDirectoryPath, submissionId);

  try {
    const remainingFiles = await fs.readdir(attachmentDirectory);

    if (remainingFiles.length === 0) {
      await fs.rmdir(attachmentDirectory);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  const next = submissions.map((item) => {
    if (item.id !== submissionId) {
      return item;
    }

    return {
      ...item,
      attachments: item.attachments.filter((candidate) => candidate.id !== attachmentId),
      history: [
        createActivity(
          "attachment_removed",
          `Attachment removed: ${attachment.originalName}.`,
          actor,
        ),
        ...item.history,
      ],
    };
  });

  const updated = next.find((item) => item.id === submissionId);

  if (!updated) {
    return { status: "submission_not_found" as const };
  }

  await writeContactSubmissions(next);

  return {
    status: "deleted" as const,
    submission: updated,
    attachment,
  };
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  actor?: SubmissionActivityActor,
) {
  const submissions = await readContactSubmissions();
  const next = submissions.map((submission) => {
    if (submission.id !== id || submission.status === status) {
      return submission;
    }

    return {
      ...submission,
      status,
      history: [
        createActivity("status_changed", `Lead status changed to ${status}.`, actor),
        ...submission.history,
      ],
    };
  });

  const updated = next.find((submission) => submission.id === id);

  if (!updated) {
    return null;
  }

  await writeContactSubmissions(next);
  return updated;
}

export async function updateSubmissionNotes(
  id: string,
  notes: string,
  actor?: SubmissionActivityActor,
) {
  const submissions = await readContactSubmissions();
  const next = submissions.map((submission) => {
    if (submission.id !== id || submission.notes === notes) {
      return submission;
    }

    return {
      ...submission,
      notes,
      notesUpdatedAt: notes ? new Date().toISOString() : undefined,
      history: [
        createActivity(
          "notes_updated",
          notes ? "Internal notes updated." : "Internal notes cleared.",
          actor,
        ),
        ...submission.history,
      ],
    };
  });

  const updated = next.find((submission) => submission.id === id);

  if (!updated) {
    return null;
  }

  await writeContactSubmissions(next);
  return updated;
}

export async function updateSubmissionArchived(
  id: string,
  archived: boolean,
  actor?: SubmissionActivityActor,
) {
  const submissions = await readContactSubmissions();
  const next = submissions.map((submission) => {
    if (submission.id !== id || submission.archived === archived) {
      return submission;
    }

    return {
      ...submission,
      archived,
      archivedAt: archived ? new Date().toISOString() : undefined,
      history: [
        createActivity(
          archived ? "archived" : "restored",
          archived ? "Lead archived from active inbox." : "Lead restored to active inbox.",
          actor,
        ),
        ...submission.history,
      ],
    };
  });

  const updated = next.find((submission) => submission.id === id);

  if (!updated) {
    return null;
  }

  await writeContactSubmissions(next);
  return updated;
}

export async function updateSubmissionOwner(
  id: string,
  owner: string,
  actor?: SubmissionActivityActor,
) {
  const submissions = await readContactSubmissions();
  const next = submissions.map((submission) => {
    if (submission.id !== id || submission.owner === owner) {
      return submission;
    }

    const message = owner
      ? `Lead assigned to ${owner}.`
      : "Lead owner cleared.";

    return {
      ...submission,
      owner,
      history: [
        createActivity("owner_changed", message, actor),
        ...submission.history,
      ],
    };
  });

  const updated = next.find((submission) => submission.id === id);

  if (!updated) {
    return null;
  }

  await writeContactSubmissions(next);
  return updated;
}

export async function updateSubmissionFollowUp(
  id: string,
  followUpDate?: string,
  actor?: SubmissionActivityActor,
) {
  const normalizedFollowUpDate = normalizeFollowUpDate(followUpDate);
  const submissions = await readContactSubmissions();
  const next = submissions.map((submission) => {
    if (submission.id !== id || submission.followUpDate === normalizedFollowUpDate) {
      return submission;
    }

    const message = normalizedFollowUpDate
      ? `Follow-up date set for ${normalizedFollowUpDate}.`
      : "Follow-up date cleared.";

    return {
      ...submission,
      followUpDate: normalizedFollowUpDate,
      history: [
        createActivity("follow_up_changed", message, actor),
        ...submission.history,
      ],
    };
  });

  const updated = next.find((submission) => submission.id === id);

  if (!updated) {
    return null;
  }

  await writeContactSubmissions(next);
  return updated;
}

function escapeCsvValue(value: string) {
  if (value.includes('"') || value.includes(",") || value.includes("\n")) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

export function convertSubmissionsToCsv(submissions: StoredSubmission[]) {
  const headers = [
    "id",
    "createdAt",
    "status",
    "archived",
    "archivedAt",
    "owner",
    "followUpDate",
    "name",
    "business",
    "email",
    "phone",
    "inquiryType",
    "timeline",
    "budgetRange",
    "decisionStage",
    "sourcePage",
    "requestFocus",
    "service",
    "details",
    "attachmentCount",
    "notes",
    "notesUpdatedAt",
  ];

  const rows = submissions.map((submission) =>
    [
      submission.id,
      submission.createdAt,
      submission.status,
      String(submission.archived),
      submission.archivedAt || "",
      submission.owner,
      submission.followUpDate || "",
      submission.name,
      submission.business,
      submission.email,
      submission.phone,
      submission.inquiryType,
      submission.timeline,
      submission.budgetRange,
      submission.decisionStage,
      submission.sourcePage,
      submission.requestFocus,
      submission.service,
      submission.details,
      String(submission.attachments.length),
      submission.notes,
      submission.notesUpdatedAt || "",
    ]
      .map((value) => escapeCsvValue(value))
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}

type SubmissionFilterOptions = {
  query?: string;
  status?: string;
  view?: string;
  owner?: string;
  followUp?: string;
  inquiryType?: string;
  decisionStage?: string;
  sourcePage?: string;
  requestFocus?: string;
  currentUserName?: string;
  today?: string;
  upcomingThresholdDate?: string;
};

function getFollowUpStateForFiltering(
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

export function filterContactSubmissions(
  submissions: StoredSubmission[],
  {
    query = "",
    status = "all",
    view = "active",
    owner = "all",
    followUp = "all",
    inquiryType = "all",
    decisionStage = "all",
    sourcePage = "all",
    requestFocus = "all",
    currentUserName = "",
    today = new Date().toISOString().slice(0, 10),
    upcomingThresholdDate,
  }: SubmissionFilterOptions,
) {
  const computedUpcomingThresholdDate =
    upcomingThresholdDate ||
    (() => {
      const upcomingThreshold = new Date();
      upcomingThreshold.setDate(upcomingThreshold.getDate() + 7);
      return upcomingThreshold.toISOString().slice(0, 10);
    })();

  return submissions.filter((submission) => {
    const matchesStatus =
      status === "all" || (isValidStatus(status) && submission.status === status);
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
    const matchesText = !query || haystack.includes(query.toLowerCase());
    const matchesView =
      view === "all" || (view === "archived" ? submission.archived : !submission.archived);
    const matchesOwner =
      owner === "all" ||
      (owner === "mine" ? submission.owner === currentUserName : false) ||
      (owner === "unassigned" ? !submission.owner : submission.owner === owner);
    const followUpState = getFollowUpStateForFiltering(
      submission.followUpDate,
      today,
      computedUpcomingThresholdDate,
    );
    const matchesFollowUp = followUp === "all" || followUpState === followUp;
    const matchesInquiryType =
      inquiryType === "all" || submission.inquiryType === inquiryType;
    const matchesDecisionStage =
      decisionStage === "all" ||
      (decisionStage === "none"
        ? !submission.decisionStage
        : submission.decisionStage === decisionStage);
    const matchesSourcePage =
      sourcePage === "all" ||
      (sourcePage === "none"
        ? !submission.sourcePage
        : submission.sourcePage === sourcePage);
    const matchesRequestFocus =
      requestFocus === "all" ||
      (requestFocus === "none"
        ? !submission.requestFocus
        : submission.requestFocus === requestFocus);

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
}

export function createNewSubmission(
  payload: Required<ContactPayload>,
  id: string,
): StoredSubmission {
  const creationMessage = payload.sourcePage
    ? `Lead created from website contact form (${payload.sourcePage}).`
    : "Lead created from website contact form.";

  return {
    id,
    createdAt: new Date().toISOString(),
    status: "new",
    notes: "",
    archived: false,
    owner: "",
    followUpDate: undefined,
    attachments: [],
    history: [createActivity("created", creationMessage)],
    ...payload,
  };
}
