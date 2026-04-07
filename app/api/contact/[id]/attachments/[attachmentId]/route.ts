import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import {
  deleteSubmissionAttachment,
  getSubmissionAttachmentPath,
  readContactSubmissions,
} from "@/lib/contact-submissions";
import {
  getInboxSession,
  hasInboxRole,
  isInboxAuthenticated,
} from "@/lib/inbox-auth";
import { appendInboxAuditEvent } from "@/lib/inbox-audit";

type RouteContext = {
  params: Promise<{
    id: string;
    attachmentId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  if (!(await isInboxAuthenticated())) {
    return NextResponse.json({ message: "Inbox authentication required." }, { status: 401 });
  }

  if (!(await hasInboxRole("viewer"))) {
    return NextResponse.json({ message: "Inbox access required." }, { status: 403 });
  }

  const { id, attachmentId } = await context.params;
  const submissions = await readContactSubmissions();
  const submission = submissions.find((item) => item.id === id);

  if (!submission) {
    return NextResponse.json({ message: "Lead not found." }, { status: 404 });
  }

  const attachment = submission.attachments.find((item) => item.id === attachmentId);

  if (!attachment) {
    return NextResponse.json({ message: "Attachment not found." }, { status: 404 });
  }

  try {
    const requestUrl = new URL(_request.url);
    const downloadRequested = requestUrl.searchParams.get("download") === "1";
    const session = await getInboxSession();
    const file = await fs.readFile(
      getSubmissionAttachmentPath(submission.id, attachment.storedName),
    );

    if (downloadRequested && session) {
      await appendInboxAuditEvent(
        session,
        "attachment_downloaded",
        `Downloaded attachment ${attachment.originalName} from lead ${submission.name}.`,
      );
    }

    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": attachment.contentType || "application/octet-stream",
        "Content-Disposition": `${
          downloadRequested ? "attachment" : "inline"
        }; filename="${encodeURIComponent(attachment.originalName)}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ message: "Attachment file is unavailable." }, { status: 404 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    if (!(await isInboxAuthenticated())) {
      return NextResponse.json({ message: "Inbox authentication required." }, { status: 401 });
    }

    if (!(await hasInboxRole("admin"))) {
      return NextResponse.json({ message: "Admin access required." }, { status: 403 });
    }

    const { id, attachmentId } = await context.params;
    const session = await getInboxSession();
    const result = await deleteSubmissionAttachment(id, attachmentId, session || undefined);

    if (result.status === "submission_not_found") {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    if (result.status === "attachment_not_found") {
      return NextResponse.json({ message: "Attachment not found." }, { status: 404 });
    }

    if (session) {
      await appendInboxAuditEvent(
        session,
        "attachment_deleted",
        `Deleted attachment ${result.attachment.originalName} from lead ${result.submission.name}.`,
      );
    }

    return NextResponse.json({
      message: "Attachment deleted successfully.",
      submission: result.submission,
    });
  } catch {
    return NextResponse.json(
      { message: "We could not delete this attachment right now." },
      { status: 500 },
    );
  }
}
