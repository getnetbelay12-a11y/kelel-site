import crypto from "node:crypto";
import { promises as fs } from "fs";
import path from "path";
import type { InboxRole } from "@/lib/inbox-auth";

export type InboxAuditActor = {
  username: string;
  name: string;
  role: InboxRole;
};

export type InboxAuditEvent = {
  id: string;
  action: string;
  message: string;
  createdAt: string;
  actor: InboxAuditActor;
};

export type InboxAuditFilter = {
  action?: string;
  actor?: string;
  range?: string;
  startDate?: string;
  endDate?: string;
};

const auditLogPath = path.join(process.cwd(), "data", "inbox-audit-log.json");

export async function readInboxAuditLog() {
  try {
    const raw = await fs.readFile(auditLogPath, "utf8");
    return JSON.parse(raw) as InboxAuditEvent[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeInboxAuditLog(events: InboxAuditEvent[]) {
  await fs.mkdir(path.dirname(auditLogPath), { recursive: true });
  await fs.writeFile(auditLogPath, JSON.stringify(events, null, 2), "utf8");
}

export async function appendInboxAuditEvent(
  actor: InboxAuditActor,
  action: string,
  message: string,
) {
  const current = await readInboxAuditLog();
  const event: InboxAuditEvent = {
    id: crypto.randomUUID(),
    action,
    message,
    createdAt: new Date().toISOString(),
    actor,
  };

  await writeInboxAuditLog([event, ...current].slice(0, 1000));
  return event;
}

function escapeCsvValue(value: string) {
  if (value.includes('"') || value.includes(",") || value.includes("\n")) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

function getStartOfWeek(date: Date) {
  const next = new Date(date);
  const day = next.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + diff);
  next.setHours(0, 0, 0, 0);
  return next;
}

function matchesAuditDateRange(
  event: InboxAuditEvent,
  range: string,
  startDate: string,
  endDate: string,
  now: Date,
) {
  const createdAt = new Date(event.createdAt);

  if (Number.isNaN(createdAt.getTime())) {
    return false;
  }

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);

  if (range === "today") {
    return createdAt >= todayStart && createdAt < tomorrowStart;
  }

  if (range === "week") {
    const weekStart = getStartOfWeek(now);
    return createdAt >= weekStart;
  }

  if (range === "month") {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthStart.setHours(0, 0, 0, 0);
    return createdAt >= monthStart;
  }

  if (range === "custom") {
    const start = startDate ? new Date(`${startDate}T00:00:00`) : null;
    const end = endDate ? new Date(`${endDate}T23:59:59.999`) : null;

    if (start && createdAt < start) {
      return false;
    }

    if (end && createdAt > end) {
      return false;
    }
  }

  return true;
}

export function filterInboxAuditLog(
  events: InboxAuditEvent[],
  filters: InboxAuditFilter,
  now = new Date(),
) {
  const action = filters.action?.trim() || "all";
  const actor = filters.actor?.trim() || "all";
  const range = filters.range?.trim() || "all";
  const startDate = filters.startDate?.trim() || "";
  const endDate = filters.endDate?.trim() || "";

  return events.filter((event) => {
    const matchesAction = action === "all" || event.action === action;
    const matchesActor = actor === "all" || event.actor.username === actor;
    const matchesDate = matchesAuditDateRange(
      event,
      range,
      startDate,
      endDate,
      now,
    );

    return matchesAction && matchesActor && matchesDate;
  });
}

export function convertAuditEventsToCsv(events: InboxAuditEvent[]) {
  const headers = [
    "id",
    "createdAt",
    "action",
    "message",
    "actorUsername",
    "actorName",
    "actorRole",
  ];

  const rows = events.map((event) =>
    [
      event.id,
      event.createdAt,
      event.action,
      event.message,
      event.actor.username,
      event.actor.name,
      event.actor.role,
    ]
      .map((value) => escapeCsvValue(value))
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}
