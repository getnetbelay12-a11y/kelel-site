import { NextResponse } from "next/server";
import {
  convertSubmissionsToCsv,
  readContactSubmissions,
} from "@/lib/contact-submissions";
import { getInboxSession, hasInboxRole, isInboxAuthenticated } from "@/lib/inbox-auth";
import { appendInboxAuditEvent } from "@/lib/inbox-audit";

export async function GET() {
  if (!(await isInboxAuthenticated())) {
    return NextResponse.json({ message: "Inbox authentication required." }, { status: 401 });
  }

  if (!(await hasInboxRole("admin"))) {
    return NextResponse.json({ message: "Admin access required." }, { status: 403 });
  }

  const session = await getInboxSession();
  const submissions = await readContactSubmissions();
  const csv = convertSubmissionsToCsv(submissions);

  if (session) {
    await appendInboxAuditEvent(
      session,
      "lead_export_csv",
      `Exported ${submissions.length} leads to CSV.`,
    );
  }

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="kelel-leads.csv"',
      "Cache-Control": "no-store",
    },
  });
}
