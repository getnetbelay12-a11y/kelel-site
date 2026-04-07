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
