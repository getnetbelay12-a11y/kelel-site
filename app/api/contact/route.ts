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

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const result = validateContactPayload(payload);

    if ("error" in result) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    const submission = createNewSubmission(result.value, crypto.randomUUID());

    const submissions = await readContactSubmissions();
    await writeContactSubmissions([submission, ...submissions]);
    await sendNewLeadNotification(submission);
    await syncNewLeadToGoogleSheets(submission);

    return NextResponse.json({
      message: "Thanks. Your project brief has been saved successfully.",
    });
  } catch {
    return NextResponse.json(
      { message: "The form could not be submitted right now. Please try again." },
      { status: 500 },
    );
  }
}
