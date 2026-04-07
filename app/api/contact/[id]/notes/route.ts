import { NextResponse } from "next/server";
import { updateSubmissionNotes } from "@/lib/contact-submissions";
import { getInboxSession, hasInboxRole, isInboxAuthenticated } from "@/lib/inbox-auth";

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
    const payload = (await request.json()) as { notes?: string };

    if (typeof payload.notes !== "string") {
      return NextResponse.json({ message: "Please provide notes as text." }, { status: 400 });
    }

    const updated = await updateSubmissionNotes(id, payload.notes.trim(), session || undefined);

    if (!updated) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Lead notes updated successfully.",
      submission: updated,
    });
  } catch {
    return NextResponse.json(
      { message: "We could not update lead notes right now." },
      { status: 500 },
    );
  }
}
