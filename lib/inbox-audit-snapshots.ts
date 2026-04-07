import crypto from "node:crypto";
import { promises as fs } from "fs";
import path from "path";
import type { InboxAuditActor, InboxAuditFilter } from "@/lib/inbox-audit";

export type SavedInboxAuditSnapshot = {
  id: string;
  title: string;
  purpose: string;
  note: string;
  tags: string[];
  createdAt: string;
  createdBy: InboxAuditActor;
  filters: Required<InboxAuditFilter>;
};

const snapshotsPath = path.join(process.cwd(), "data", "inbox-audit-snapshots.json");
const allowedSnapshotTags = new Set([
  "compliance",
  "operations",
  "security",
  "leadership",
]);

function normalizeFilterValue(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function normalizeSnapshot(
  value: SavedInboxAuditSnapshot,
): SavedInboxAuditSnapshot {
  return {
    ...value,
    title: value.title.trim(),
    purpose: value.purpose?.trim() || "General review",
    note: value.note?.trim() || "",
    tags: Array.isArray(value.tags)
      ? value.tags.filter((tag): tag is string => allowedSnapshotTags.has(tag))
      : [],
    filters: {
      action: normalizeFilterValue(value.filters?.action, "all"),
      actor: normalizeFilterValue(value.filters?.actor, "all"),
      range: normalizeFilterValue(value.filters?.range, "all"),
      startDate: normalizeFilterValue(value.filters?.startDate, ""),
      endDate: normalizeFilterValue(value.filters?.endDate, ""),
    },
  };
}

export async function readInboxAuditSnapshots() {
  try {
    const raw = await fs.readFile(snapshotsPath, "utf8");
    const parsed = JSON.parse(raw) as SavedInboxAuditSnapshot[];
    return parsed.map(normalizeSnapshot);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeInboxAuditSnapshots(snapshots: SavedInboxAuditSnapshot[]) {
  await fs.mkdir(path.dirname(snapshotsPath), { recursive: true });
  await fs.writeFile(snapshotsPath, JSON.stringify(snapshots, null, 2), "utf8");
}

export async function createInboxAuditSnapshot(
  title: string,
  purpose: string,
  note: string,
  tags: string[],
  filters: InboxAuditFilter,
  actor: InboxAuditActor,
) {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new Error("Please provide a snapshot title.");
  }

  const snapshots = await readInboxAuditSnapshots();
  const snapshot: SavedInboxAuditSnapshot = {
    id: crypto.randomUUID(),
    title: normalizedTitle,
    purpose: purpose.trim() || "General review",
    note: note.trim(),
    tags: tags.filter((tag) => allowedSnapshotTags.has(tag)),
    createdAt: new Date().toISOString(),
    createdBy: actor,
    filters: {
      action: normalizeFilterValue(filters.action, "all"),
      actor: normalizeFilterValue(filters.actor, "all"),
      range: normalizeFilterValue(filters.range, "all"),
      startDate: normalizeFilterValue(filters.startDate, ""),
      endDate: normalizeFilterValue(filters.endDate, ""),
    },
  };

  await writeInboxAuditSnapshots([snapshot, ...snapshots].slice(0, 100));
  return snapshot;
}

export async function getInboxAuditSnapshotById(id: string) {
  const snapshots = await readInboxAuditSnapshots();
  return snapshots.find((snapshot) => snapshot.id === id) || null;
}

export async function updateInboxAuditSnapshot(
  id: string,
  updates: {
    title: string;
    purpose: string;
    note: string;
    tags: string[];
  },
): Promise<SavedInboxAuditSnapshot | null> {
  const normalizedTitle = updates.title.trim();

  if (!normalizedTitle) {
    throw new Error("Please provide a snapshot title.");
  }

  const snapshots = await readInboxAuditSnapshots();
  let updatedSnapshot: SavedInboxAuditSnapshot | null = null;

  const next = snapshots.map((snapshot) => {
    if (snapshot.id !== id) {
      return snapshot;
    }

    updatedSnapshot = {
      ...snapshot,
      title: normalizedTitle,
      purpose: updates.purpose.trim() || "General review",
      note: updates.note.trim(),
      tags: updates.tags.filter((tag) => allowedSnapshotTags.has(tag)),
    };

    return updatedSnapshot;
  });

  if (!updatedSnapshot) {
    return null;
  }

  await writeInboxAuditSnapshots(next);
  return updatedSnapshot;
}

export async function deleteInboxAuditSnapshot(id: string) {
  const snapshots = await readInboxAuditSnapshots();
  const snapshot = snapshots.find((item) => item.id === id) || null;

  if (!snapshot) {
    return null;
  }

  await writeInboxAuditSnapshots(snapshots.filter((item) => item.id !== id));
  return snapshot;
}
