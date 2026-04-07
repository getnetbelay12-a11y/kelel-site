import { NextResponse } from "next/server";

function isConfigured(name: string) {
  return Boolean(process.env[name]?.trim());
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "kelel-it-solution",
    timestamp: new Date().toISOString(),
    integrations: {
      inboxUsersConfigured: isConfigured("INBOX_USERS"),
      sessionSecretConfigured: isConfigured("INBOX_SESSION_SECRET"),
      smtpConfigured:
        isConfigured("SMTP_HOST") &&
        isConfigured("SMTP_PORT") &&
        isConfigured("SMTP_USER") &&
        isConfigured("SMTP_PASS") &&
        isConfigured("LEAD_NOTIFICATION_FROM"),
      googleSheetsConfigured: isConfigured("GOOGLE_SHEETS_WEBHOOK_URL"),
      reminderDigestSecretConfigured: isConfigured("REMINDER_DIGEST_SECRET"),
    },
  });
}
