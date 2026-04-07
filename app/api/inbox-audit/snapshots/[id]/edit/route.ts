import { NextResponse } from "next/server";
import { appendInboxAuditEvent } from "@/lib/inbox-audit";
import { updateInboxAuditSnapshot } from "@/lib/inbox-audit-snapshots";
import { getInboxSession, hasInboxRole, isInboxAuthenticated } from "@/lib/inbox-auth";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
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

    const { id } = await context.params;
    const payload = (await request.json()) as {
      title?: string;
      purpose?: string;
      note?: string;
      tags?: string[];
    };

    const snapshot = await updateInboxAuditSnapshot(id, {
      title: payload.title || "",
      purpose: payload.purpose || "",
      note: payload.note || "",
      tags: Array.isArray(payload.tags) ? payload.tags : [],
    });

    if (!snapshot) {
      return NextResponse.json({ message: "Snapshot not found." }, { status: 404 });
    }

    await appendInboxAuditEvent(
      session,
      "audit_snapshot_updated",
      `Updated audit snapshot "${snapshot.title}".`,
    );

    return NextResponse.json({
      message: "Audit snapshot updated successfully.",
      snapshot,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We could not update the audit snapshot right now.",
      },
      { status: 500 },
    );
  }
}
