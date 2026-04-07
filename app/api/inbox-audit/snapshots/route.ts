import { NextResponse } from "next/server";
import { appendInboxAuditEvent } from "@/lib/inbox-audit";
import { createInboxAuditSnapshot } from "@/lib/inbox-audit-snapshots";
import { getInboxSession, hasInboxRole, isInboxAuthenticated } from "@/lib/inbox-auth";

export async function POST(request: Request) {
  try {
    if (!(await isInboxAuthenticated())) {
      return NextResponse.json({ message: "Inbox authentication required." }, { status: 401 });
    }

    if (!(await hasInboxRole("admin"))) {
      return NextResponse.json({ message: "Admin access required." }, { status: 403 });
    }

    const session = await getInboxSession();

    if (!session) {
      return NextResponse.json({ message: "Inbox session is unavailable." }, { status: 401 });
    }

    const payload = (await request.json()) as {
      title?: string;
      purpose?: string;
      note?: string;
      tags?: string[];
      auditAction?: string;
      auditActor?: string;
      auditRange?: string;
      auditStart?: string;
      auditEnd?: string;
    };

    const snapshot = await createInboxAuditSnapshot(
      payload.title || "",
      payload.purpose || "",
      payload.note || "",
      Array.isArray(payload.tags) ? payload.tags : [],
      {
        action: payload.auditAction || "all",
        actor: payload.auditActor || "all",
        range: payload.auditRange || "all",
        startDate: payload.auditStart || "",
        endDate: payload.auditEnd || "",
      },
      session,
    );

    await appendInboxAuditEvent(
      session,
      "audit_snapshot_saved",
      `Saved audit snapshot "${snapshot.title}".`,
    );

    return NextResponse.json({
      message: "Audit snapshot saved successfully.",
      snapshot,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We could not save the audit snapshot right now.",
      },
      { status: 500 },
    );
  }
}
