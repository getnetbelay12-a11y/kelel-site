import { NextResponse } from "next/server";
import {
  addSubmissionAttachments,
  readContactSubmissions,
  saveAttachmentFiles,
} from "@/lib/contact-submissions";
import {
  getInboxSession,
  hasInboxRole,
  isInboxAuthenticated,
} from "@/lib/inbox-auth";
import { appendInboxAuditEvent } from "@/lib/inbox-audit";

export async function POST(
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
    const submissions = await readContactSubmissions();
    const submission = submissions.find((item) => item.id === id);

    if (!submission) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    const formData = await request.formData();
    const files = formData
      .getAll("attachments")
      .filter((item): item is File => item instanceof File && item.size > 0);

    if (files.length === 0) {
      return NextResponse.json(
        { message: "Please choose at least one file to upload." },
        { status: 400 },
      );
    }

    const attachments = await saveAttachmentFiles(id, files);
    const updated = await addSubmissionAttachments(id, attachments, session || undefined);

    if (!updated) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    if (session) {
      await appendInboxAuditEvent(
        session,
        "attachment_uploaded",
        `Uploaded ${attachments.length} attachment${attachments.length === 1 ? "" : "s"} to lead ${updated.name}.`,
      );
    }

    return NextResponse.json({
      message:
        attachments.length === 1
          ? "Attachment uploaded successfully."
          : "Attachments uploaded successfully.",
      submission: updated,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We could not upload attachments right now.",
      },
      { status: 500 },
    );
  }
}
