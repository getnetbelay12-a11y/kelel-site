import { NextResponse } from "next/server";
import {
  appendInboxAuditEvent,
  convertAuditEventsToCsv,
  filterInboxAuditLog,
  readInboxAuditLog,
} from "@/lib/inbox-audit";
import { getInboxSession, hasInboxRole, isInboxAuthenticated } from "@/lib/inbox-auth";

export async function GET(request: Request) {
  if (!(await isInboxAuthenticated())) {
    return NextResponse.json({ message: "Inbox authentication required." }, { status: 401 });
  }

  if (!(await hasInboxRole("admin"))) {
    return NextResponse.json({ message: "Admin access required." }, { status: 403 });
  }

  const session = await getInboxSession();
  const requestUrl = new URL(request.url);
  const filters = {
    action: requestUrl.searchParams.get("auditAction") || "all",
    actor: requestUrl.searchParams.get("auditActor") || "all",
    range: requestUrl.searchParams.get("auditRange") || "all",
    startDate: requestUrl.searchParams.get("auditStart") || "",
    endDate: requestUrl.searchParams.get("auditEnd") || "",
  };
  const events = filterInboxAuditLog(await readInboxAuditLog(), filters);
  const csv = convertAuditEventsToCsv(events);

  if (session) {
    await appendInboxAuditEvent(
      session,
      "audit_export_csv",
      `Exported ${events.length} audit events to CSV.`,
    );
  }

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="kelel-audit-log.csv"',
      "Cache-Control": "no-store",
    },
  });
}
