import { NextResponse } from "next/server";
import { appendInboxAuditEvent } from "@/lib/inbox-audit";
import { deleteInboxAuditSnapshot } from "@/lib/inbox-audit-snapshots";
import { getInboxSession, hasInboxRole, isInboxAuthenticated } from "@/lib/inbox-auth";

export async function DELETE(
  _request: Request,
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
    const snapshot = await deleteInboxAuditSnapshot(id);

    if (!snapshot) {
      return NextResponse.json({ message: "Snapshot not found." }, { status: 404 });
    }

    await appendInboxAuditEvent(
      session,
      "audit_snapshot_deleted",
      `Deleted audit snapshot "${snapshot.title}".`,
    );

    return NextResponse.json({
      message: "Audit snapshot deleted successfully.",
      snapshot,
    });
  } catch {
    return NextResponse.json(
      { message: "We could not delete the audit snapshot right now." },
      { status: 500 },
    );
  }
}
