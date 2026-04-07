import { NextResponse } from "next/server";
import {
  convertSubmissionsToCsv,
  filterContactSubmissions,
  readContactSubmissions,
} from "@/lib/contact-submissions";
import { getInboxSession, hasInboxRole, isInboxAuthenticated } from "@/lib/inbox-auth";
import { appendInboxAuditEvent } from "@/lib/inbox-audit";

export async function GET(request: Request) {
  if (!(await isInboxAuthenticated())) {
    return NextResponse.json({ message: "Inbox authentication required." }, { status: 401 });
  }

  if (!(await hasInboxRole("admin"))) {
    return NextResponse.json({ message: "Admin access required." }, { status: 403 });
  }

  const session = await getInboxSession();
  const requestUrl = new URL(request.url);
  const submissions = await readContactSubmissions();
  const filteredSubmissions = filterContactSubmissions(submissions, {
    query: requestUrl.searchParams.get("q") || "",
    status: requestUrl.searchParams.get("status") || "all",
    view: requestUrl.searchParams.get("view") || "active",
    owner: requestUrl.searchParams.get("owner") || "all",
    followUp: requestUrl.searchParams.get("followUp") || "all",
    inquiryType: requestUrl.searchParams.get("inquiryType") || "all",
    decisionStage: requestUrl.searchParams.get("decisionStage") || "all",
    sourcePage: requestUrl.searchParams.get("sourcePage") || "all",
    requestFocus: requestUrl.searchParams.get("requestFocus") || "all",
    currentUserName: session?.name || "",
  });
  const csv = convertSubmissionsToCsv(filteredSubmissions);

  if (session) {
    await appendInboxAuditEvent(
      session,
      "lead_export_csv",
      `Exported ${filteredSubmissions.length} filtered leads to CSV.`,
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
