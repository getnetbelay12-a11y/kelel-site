import { NextResponse } from "next/server";
import { updateSubmissionOwner } from "@/lib/contact-submissions";
import {
  getInboxSession,
  getInboxUserByName,
  hasInboxRole,
  isInboxAuthenticated,
} from "@/lib/inbox-auth";
import { sendLeadAssignmentNotification } from "@/lib/lead-notifications";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await isInboxAuthenticated())) {
      return NextResponse.json({ message: "Inbox authentication required." }, { status: 401 });
    }

    if (!(await hasInboxRole("editor"))) {
      return NextResponse.json({ message: "Editor access required." }, { status: 403 });
    }

    const { id } = await context.params;
    const session = await getInboxSession();
    const payload = (await request.json()) as { owner?: string };

    if (typeof payload.owner !== "string") {
      return NextResponse.json({ message: "Please provide an owner value." }, { status: 400 });
    }

    const updated = await updateSubmissionOwner(id, payload.owner.trim(), session || undefined);

    if (!updated) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    const assignedUser = updated.owner ? getInboxUserByName(updated.owner) : null;

    if (assignedUser) {
      await sendLeadAssignmentNotification(updated, assignedUser, "assigned");
    }

    return NextResponse.json({
      message: "Lead owner updated successfully.",
      submission: updated,
    });
  } catch {
    return NextResponse.json(
      { message: "We could not update lead owner right now." },
      { status: 500 },
    );
  }
}
