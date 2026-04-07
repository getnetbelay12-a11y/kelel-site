import { NextResponse } from "next/server";
import {
  addSubmissionAttachments,
  createNewSubmission,
  type ContactPayload,
  readContactSubmissions,
  saveAttachmentFiles,
  writeContactSubmissions,
  validateContactPayload,
} from "@/lib/contact-submissions";
import {
  sendNewLeadNotification,
  syncNewLeadToGoogleSheets,
} from "@/lib/lead-notifications";

function getTextEntry(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

async function extractPayload(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();

    return {
      payload: {
        name: getTextEntry(formData, "name"),
        business: getTextEntry(formData, "business"),
        email: getTextEntry(formData, "email"),
        phone: getTextEntry(formData, "phone"),
        service: getTextEntry(formData, "service"),
        details: getTextEntry(formData, "details"),
        inquiryType: getTextEntry(formData, "inquiryType"),
        timeline: getTextEntry(formData, "timeline"),
        budgetRange: getTextEntry(formData, "budgetRange"),
        decisionStage: getTextEntry(formData, "decisionStage"),
        sourcePage: getTextEntry(formData, "sourcePage"),
        requestFocus: getTextEntry(formData, "requestFocus"),
      } satisfies ContactPayload,
      files: formData.getAll("attachments").filter((item): item is File => item instanceof File && item.size > 0),
    };
  }

  return {
    payload: (await request.json()) as ContactPayload,
    files: [] as File[],
  };
}

export async function POST(request: Request) {
  try {
    const { payload, files } = await extractPayload(request);
    const result = validateContactPayload(payload);

    if ("error" in result) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    const submission = createNewSubmission(result.value, crypto.randomUUID());

    const submissions = await readContactSubmissions();
    await writeContactSubmissions([submission, ...submissions]);

    const attachments = await saveAttachmentFiles(submission.id, files);

    if (attachments.length > 0) {
      await addSubmissionAttachments(submission.id, attachments);
    }

    await sendNewLeadNotification(submission);
    await syncNewLeadToGoogleSheets(submission);

    return NextResponse.json({
      message:
        attachments.length > 0
          ? "Thanks. Your proposal brief and attachments have been saved successfully."
          : "Thanks. Your project brief has been saved successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "The form could not be submitted right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
