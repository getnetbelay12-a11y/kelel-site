import { NextResponse } from "next/server";
import {
  createNewSubmission,
  type ContactPayload,
  readContactSubmissions,
  writeContactSubmissions,
  validateContactPayload,
} from "@/lib/contact-submissions";
import {
  sendNewLeadNotification,
  syncNewLeadToGoogleSheets,
} from "@/lib/lead-notifications";

async function readContactPayload(request: Request): Promise<ContactPayload> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await request.json()) as ContactPayload;
  }

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData();

    return {
      name: String(formData.get("name") || ""),
      business: String(formData.get("business") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      service: String(formData.get("service") || ""),
      details: String(formData.get("details") || ""),
    };
  }

  return (await request.json()) as ContactPayload;
}

export async function POST(request: Request) {
  try {
    const payload = await readContactPayload(request);
    const result = validateContactPayload(payload);

    if ("error" in result) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    const submission = createNewSubmission(result.value, crypto.randomUUID());

    try {
      const submissions = await readContactSubmissions();
      await writeContactSubmissions([submission, ...submissions]);
    } catch (error) {
      console.error("Lead could not be persisted to local storage.", error);
    }

    await sendNewLeadNotification(submission);
    await syncNewLeadToGoogleSheets(submission);

    return NextResponse.json({
      message: "Thanks. Your project brief has been saved successfully.",
    });
  } catch (error) {
    console.error("Contact submission failed.", error);
    return NextResponse.json(
      { message: "The form could not be submitted right now. Please try again." },
      { status: 500 },
    );
  }
}
