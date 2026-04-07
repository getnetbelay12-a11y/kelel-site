import { promises as fs } from "fs";
import path from "path";

export type ContactPayload = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  service?: string;
  details?: string;
};

export type SubmissionStatus = "new" | "contacted" | "closed";

export type SubmissionActivityType =
  | "created"
  | "status_changed"
  | "notes_updated"
  | "archived"
  | "restored"
  | "owner_changed"
  | "follow_up_changed";

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
  history: SubmissionActivity[];
};

type PersistedSubmission = Omit<
  StoredSubmission,
  "status" | "notes" | "history" | "archived" | "owner" | "followUpDate"
> & {
  status?: string;
  notes?: string;
  history?: SubmissionActivity[];
  notesUpdatedAt?: string;
  archived?: boolean;
  archivedAt?: string;
  owner?: string;
  followUpDate?: string;
};

export const submissionsPath = path.join(
  process.cwd(),
  "data",
  "contact-submissions.json",
);

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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
    "service",
    "details",
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
      submission.service,
      submission.details,
      submission.notes,
      submission.notesUpdatedAt || "",
    ]
      .map((value) => escapeCsvValue(value))
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}

export function createNewSubmission(
  payload: Required<ContactPayload>,
  id: string,
): StoredSubmission {
  return {
    id,
    createdAt: new Date().toISOString(),
    status: "new",
    notes: "",
    archived: false,
    owner: "",
    followUpDate: undefined,
    history: [createActivity("created", "Lead created from website contact form.")],
    ...payload,
  };
}
