import { NextResponse } from "next/server";
import {
  type SubmissionStatus,
  updateSubmissionStatus,
} from "@/lib/contact-submissions";
import { getInboxSession, hasInboxRole, isInboxAuthenticated } from "@/lib/inbox-auth";

function isSubmissionStatus(value: unknown): value is SubmissionStatus {
  return value === "new" || value === "contacted" || value === "closed";
}

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
    const payload = (await request.json()) as { status?: SubmissionStatus };

    if (!isSubmissionStatus(payload.status)) {
      return NextResponse.json(
        { message: "Please provide a valid lead status." },
        { status: 400 },
      );
    }

    const updated = await updateSubmissionStatus(id, payload.status, session || undefined);

    if (!updated) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Lead status updated successfully.",
      submission: updated,
    });
  } catch {
    return NextResponse.json(
      { message: "We could not update the lead status right now." },
      { status: 500 },
    );
  }
}
