import nodemailer from "nodemailer";
import type { StoredSubmission } from "@/lib/contact-submissions";
import type { InboxDirectoryUser } from "@/lib/inbox-auth";
import { site } from "@/lib/site-content";

function readRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function readOptionalBoolean(name: string) {
  const value = process.env[name]?.trim().toLowerCase();

  if (!value) {
    return undefined;
  }

  return value === "true";
}

function getNotificationConfig() {
  const host = readRequiredEnv("SMTP_HOST");
  const portValue = readRequiredEnv("SMTP_PORT");
  const user = readRequiredEnv("SMTP_USER");
  const pass = readRequiredEnv("SMTP_PASS");
  const from = readRequiredEnv("LEAD_NOTIFICATION_FROM");
  const to = readRequiredEnv("LEAD_NOTIFICATION_TO") || site.email;

  if (!host || !portValue || !user || !pass || !from) {
    return null;
  }

  const port = Number.parseInt(portValue, 10);

  if (Number.isNaN(port)) {
    return null;
  }

  return {
    host,
    port,
    secure: readOptionalBoolean("SMTP_SECURE") ?? port === 465,
    user,
    pass,
    from,
    to,
  };
}

function getGoogleSheetsConfig() {
  const webhookUrl = readRequiredEnv("GOOGLE_SHEETS_WEBHOOK_URL");

  if (!webhookUrl) {
    return null;
  }

  return {
    webhookUrl,
    secret: readRequiredEnv("GOOGLE_SHEETS_WEBHOOK_SECRET"),
  };
}

function createTransporter() {
  const config = getNotificationConfig();

  if (!config) {
    return null;
  }

  return {
    config,
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    }),
  };
}

function buildLeadNotificationText(submission: StoredSubmission) {
  return [
    "A new website inquiry was submitted for Kelel IT Solution.",
    "",
    `Name: ${submission.name}`,
    `Business: ${submission.business || "Not provided"}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    `Service: ${submission.service}`,
    `Submitted: ${submission.createdAt}`,
    "",
    "Project details:",
    submission.details,
  ].join("\n");
}

function buildLeadNotificationHtml(submission: StoredSubmission) {
  const details = submission.details.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #13211d;">
      <h2 style="margin-bottom: 12px;">New Website Inquiry</h2>
      <p style="margin-top: 0;">A new contact submission was received for Kelel IT Solution.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          <tr><td style="padding: 6px 0; font-weight: 700;">Name</td><td style="padding: 6px 0;">${submission.name}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 700;">Business</td><td style="padding: 6px 0;">${submission.business || "Not provided"}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 700;">Email</td><td style="padding: 6px 0;">${submission.email}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 700;">Phone</td><td style="padding: 6px 0;">${submission.phone}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 700;">Service</td><td style="padding: 6px 0;">${submission.service}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: 700;">Submitted</td><td style="padding: 6px 0;">${submission.createdAt}</td></tr>
        </tbody>
      </table>
      <div style="margin-top: 18px;">
        <strong>Project details</strong>
        <p style="white-space: pre-wrap; margin-top: 8px;">${details}</p>
      </div>
    </div>
  `;
}

export async function sendNewLeadNotification(submission: StoredSubmission) {
  const mailer = createTransporter();

  if (!mailer) {
    return;
  }

  try {
    await mailer.transporter.sendMail({
      from: mailer.config.from,
      to: mailer.config.to,
      replyTo: submission.email,
      subject: `New Kelel lead: ${submission.name} (${submission.service})`,
      text: buildLeadNotificationText(submission),
      html: buildLeadNotificationHtml(submission),
    });
  } catch (error) {
    console.error("Lead notification email could not be sent.", error);
  }
}

function buildAssignmentNotificationText(
  submission: StoredSubmission,
  recipient: InboxDirectoryUser,
  context: "assigned" | "follow_up_changed",
) {
  const intro =
    context === "assigned"
      ? `A lead has been assigned to ${recipient.name}.`
      : `A follow-up date was updated for a lead assigned to ${recipient.name}.`;

  return [
    intro,
    "",
    `Lead: ${submission.name}`,
    `Business: ${submission.business || "Not provided"}`,
    `Service: ${submission.service}`,
    `Owner: ${submission.owner || "Unassigned"}`,
    `Follow-up date: ${submission.followUpDate || "Not scheduled"}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    "",
    "Project details:",
    submission.details,
  ].join("\n");
}

export async function sendLeadAssignmentNotification(
  submission: StoredSubmission,
  recipient: InboxDirectoryUser,
  context: "assigned" | "follow_up_changed",
) {
  if (!recipient.email) {
    return;
  }

  const mailer = createTransporter();

  if (!mailer) {
    return;
  }

  const subject =
    context === "assigned"
      ? `Lead assigned: ${submission.name} (${submission.service})`
      : `Follow-up updated: ${submission.name} (${submission.service})`;

  try {
    await mailer.transporter.sendMail({
      from: mailer.config.from,
      to: recipient.email,
      replyTo: submission.email,
      subject,
      text: buildAssignmentNotificationText(submission, recipient, context),
    });
  } catch (error) {
    console.error("Lead assignee notification email could not be sent.", error);
  }
}

function formatDigestDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(`${value}T00:00:00`));
}

function buildLeadDigestText(
  recipient: InboxDirectoryUser,
  submissions: StoredSubmission[],
  cadence: "daily" | "weekly",
) {
  const intro =
    cadence === "daily"
      ? `Daily lead reminder digest for ${recipient.name}.`
      : `Weekly lead reminder digest for ${recipient.name}.`;

  return [
    intro,
    "",
    ...submissions.flatMap((submission) => [
      `Lead: ${submission.name}`,
      `Business: ${submission.business || "Not provided"}`,
      `Service: ${submission.service}`,
      `Status: ${submission.status}`,
      `Follow-up date: ${submission.followUpDate ? formatDigestDate(submission.followUpDate) : "Not scheduled"}`,
      `Email: ${submission.email}`,
      `Phone: ${submission.phone}`,
      `Notes: ${submission.notes || "No internal notes yet."}`,
      "",
    ]),
  ].join("\n");
}

function buildLeadDigestHtml(
  recipient: InboxDirectoryUser,
  submissions: StoredSubmission[],
  cadence: "daily" | "weekly",
) {
  const cadenceLabel = cadence === "daily" ? "Daily" : "Weekly";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #13211d;">
      <h2 style="margin-bottom: 12px;">${cadenceLabel} Lead Reminder Digest</h2>
      <p style="margin-top: 0;">Here are the assigned leads that need attention for ${recipient.name}.</p>
      ${submissions
        .map(
          (submission) => `
            <div style="padding: 14px 0; border-top: 1px solid #d9d2c7;">
              <strong style="font-size: 16px;">${submission.name}</strong>
              <div style="margin-top: 8px;">
                <div><strong>Business:</strong> ${submission.business || "Not provided"}</div>
                <div><strong>Service:</strong> ${submission.service}</div>
                <div><strong>Status:</strong> ${submission.status}</div>
                <div><strong>Follow-up date:</strong> ${
                  submission.followUpDate ? formatDigestDate(submission.followUpDate) : "Not scheduled"
                }</div>
                <div><strong>Email:</strong> ${submission.email}</div>
                <div><strong>Phone:</strong> ${submission.phone}</div>
                <div><strong>Notes:</strong> ${submission.notes || "No internal notes yet."}</div>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

export async function sendLeadReminderDigest(
  recipient: InboxDirectoryUser,
  submissions: StoredSubmission[],
  cadence: "daily" | "weekly",
) {
  if (!recipient.email || submissions.length === 0) {
    return false;
  }

  const mailer = createTransporter();

  if (!mailer) {
    return false;
  }

  const subject =
    cadence === "daily"
      ? `Daily lead digest for ${recipient.name}`
      : `Weekly lead digest for ${recipient.name}`;

  try {
    await mailer.transporter.sendMail({
      from: mailer.config.from,
      to: recipient.email,
      subject,
      text: buildLeadDigestText(recipient, submissions, cadence),
      html: buildLeadDigestHtml(recipient, submissions, cadence),
    });

    return true;
  } catch (error) {
    console.error("Lead digest email could not be sent.", error);
    return false;
  }
}

export async function syncNewLeadToGoogleSheets(submission: StoredSubmission) {
  const config = getGoogleSheetsConfig();

  if (!config) {
    return;
  }

  try {
    const response = await fetch(config.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(config.secret ? { "x-webhook-secret": config.secret } : {}),
      },
      body: JSON.stringify({
        source: "kelel-it-solution-website",
        submittedAt: submission.createdAt,
        lead: submission,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Google Sheets sync failed with status ${response.status}.`);
    }
  } catch (error) {
    console.error("Lead could not be synced to Google Sheets.", error);
  }
}
