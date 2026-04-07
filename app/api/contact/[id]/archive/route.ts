import { NextResponse } from "next/server";
import { updateSubmissionArchived } from "@/lib/contact-submissions";
import { getInboxSession, hasInboxRole, isInboxAuthenticated } from "@/lib/inbox-auth";
import { appendInboxAuditEvent } from "@/lib/inbox-audit";

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

    const { id } = await context.params;
    const session = await getInboxSession();
    const payload = (await request.json()) as { archived?: boolean };

    if (typeof payload.archived !== "boolean") {
      return NextResponse.json(
        { message: "Please provide an archived true/false value." },
        { status: 400 },
      );
    }

    const updated = await updateSubmissionArchived(id, payload.archived, session || undefined);

    if (!updated) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    if (session) {
      await appendInboxAuditEvent(
        session,
        payload.archived ? "lead_archived" : "lead_restored",
        payload.archived
          ? `Archived lead ${updated.name}.`
          : `Restored lead ${updated.name}.`,
      );
    }

    return NextResponse.json({
      message: "Lead archive state updated successfully.",
      submission: updated,
    });
  } catch {
    return NextResponse.json(
      { message: "We could not update the archive state right now." },
      { status: 500 },
    );
  }
}
