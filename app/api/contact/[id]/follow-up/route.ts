import { NextResponse } from "next/server";
import { updateSubmissionFollowUp } from "@/lib/contact-submissions";
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
    const payload = (await request.json()) as { followUpDate?: string };

    if (
      typeof payload.followUpDate !== "string" &&
      typeof payload.followUpDate !== "undefined"
    ) {
      return NextResponse.json(
        { message: "Please provide a valid follow-up date value." },
        { status: 400 },
      );
    }

    const updated = await updateSubmissionFollowUp(id, payload.followUpDate, session || undefined);

    if (!updated) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    const assignedUser = updated.owner ? getInboxUserByName(updated.owner) : null;

    if (assignedUser && updated.followUpDate) {
      await sendLeadAssignmentNotification(updated, assignedUser, "follow_up_changed");
    }

    return NextResponse.json({
      message: "Follow-up date updated successfully.",
      submission: updated,
    });
  } catch {
    return NextResponse.json(
      { message: "We could not update the follow-up date right now." },
      { status: 500 },
    );
  }
}
