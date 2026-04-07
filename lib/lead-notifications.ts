import nodemailer from "nodemailer";
import type { StoredSubmission } from "@/lib/contact-submissions";
import type { InboxDirectoryUser } from "@/lib/inbox-auth";
import { site } from "@/lib/site-content";

const publicSiteUrl = "https://kelelitsolution.com";
const emailLogoUrl = `${publicSiteUrl}/brand/kelel-logo-en.jpg`;
const emailAccent = "#c7a86a";
const emailInk = "#13211d";
const emailMuted = "#5f655f";
const emailLine = "#ded6cb";
const emailCanvas = "#f4ede3";

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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatOptionalValue(value?: string | null) {
  return value?.trim() ? escapeHtml(value) : "Not provided";
}

function formatSourceLabel(value?: string | null) {
  if (!value?.trim()) {
    return "Website form";
  }

  return value
    .trim()
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function renderDataRows(rows: Array<{ label: string; value: string }>) {
  return rows
    .map(
      (row) => `
        <tr>
          <td style="padding: 10px 0; width: 160px; font-weight: 700; color: ${emailInk}; vertical-align: top;">${escapeHtml(
            row.label,
          )}</td>
          <td style="padding: 10px 0; color: ${emailInk};">${row.value}</td>
        </tr>
      `,
    )
    .join("");
}

function renderEmailShell(options: {
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  footer?: string;
}) {
  return `
    <div style="margin: 0; padding: 24px 0; background: ${emailCanvas}; font-family: Georgia, 'Times New Roman', serif; color: ${emailInk};">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tbody>
          <tr>
            <td align="center">
              <table role="presentation" style="width: 100%; max-width: 760px; border-collapse: collapse; background: #fffdf8; border: 1px solid ${emailLine}; border-radius: 20px; overflow: hidden;">
                <tbody>
                  <tr>
                    <td style="padding: 28px 32px 18px; background: linear-gradient(135deg, #f5ede4 0%, #efe2d4 100%); border-bottom: 1px solid ${emailLine};">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tbody>
                          <tr>
                            <td style="vertical-align: middle;">
                              <img src="${emailLogoUrl}" alt="Kelel IT Solution" style="display: block; width: 140px; max-width: 100%; height: auto;" />
                            </td>
                            <td align="right" style="vertical-align: middle;">
                              <div style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: ${emailMuted};">${escapeHtml(
                                options.eyebrow,
                              )}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h1 style="margin: 18px 0 8px; font-size: 34px; line-height: 1.08; color: ${emailInk};">${escapeHtml(
                        options.title,
                      )}</h1>
                      <p style="margin: 0; max-width: 620px; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: ${emailMuted};">${escapeHtml(
                        options.intro,
                      )}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 28px 32px;">
                      ${options.body}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 32px 30px;">
                      <div style="padding-top: 18px; border-top: 1px solid ${emailLine}; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.8; color: ${emailMuted};">
                        ${options.footer ?? `Kelel IT Solution<br />${escapeHtml(site.location)}<br /><a href="mailto:${escapeHtml(
                          site.email,
                        )}" style="color: ${emailInk}; text-decoration: none;">${escapeHtml(
                          site.email,
                        )}</a> · <a href="tel:${escapeHtml(site.phone.replaceAll(" ", ""))}" style="color: ${emailInk}; text-decoration: none;">${escapeHtml(
                          site.phone,
                        )}</a>`}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
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
    `Entry source: ${formatSourceLabel(submission.sourcePage)}`,
    `Brief type: ${submission.requestFocus || "General proposal"}`,
    `Submitted: ${submission.createdAt}`,
    "",
    "Project details:",
    submission.details,
  ].join("\n");
}

function buildLeadNotificationHtml(submission: StoredSubmission) {
  const details = escapeHtml(submission.details);

  return renderEmailShell({
    eyebrow: "Lead notification",
    title: "New website inquiry",
    intro: "A new contact submission has been received through the Kelel IT Solution website.",
    body: `
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tbody>
          ${renderDataRows([
            { label: "Name", value: escapeHtml(submission.name) },
            { label: "Business", value: formatOptionalValue(submission.business) },
            { label: "Email", value: escapeHtml(submission.email) },
            { label: "Phone", value: escapeHtml(submission.phone) },
            { label: "Service", value: escapeHtml(submission.service) },
            {
              label: "Entry source",
              value: escapeHtml(formatSourceLabel(submission.sourcePage)),
            },
            {
              label: "Brief type",
              value: escapeHtml(submission.requestFocus || "General proposal"),
            },
            { label: "Submitted", value: escapeHtml(submission.createdAt) },
          ])}
        </tbody>
      </table>
      <div style="margin-top: 24px; padding: 20px; border: 1px solid ${emailLine}; border-radius: 16px; background: #fff;">
        <div style="margin-bottom: 8px; font-family: Arial, sans-serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: ${emailAccent};">Project brief</div>
        <div style="font-family: Arial, sans-serif; white-space: pre-wrap; color: ${emailInk}; line-height: 1.7;">${details}</div>
      </div>
    `,
  });
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
    `Entry source: ${formatSourceLabel(submission.sourcePage)}`,
    `Brief type: ${submission.requestFocus || "General proposal"}`,
    `Owner: ${submission.owner || "Unassigned"}`,
    `Follow-up date: ${submission.followUpDate || "Not scheduled"}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    "",
    "Project details:",
    submission.details,
  ].join("\n");
}

function buildAssignmentNotificationHtml(
  submission: StoredSubmission,
  recipient: InboxDirectoryUser,
  context: "assigned" | "follow_up_changed",
) {
  const intro =
    context === "assigned"
      ? `A lead has been assigned to ${recipient.name}.`
      : `A follow-up date was updated for a lead assigned to ${recipient.name}.`;

  return renderEmailShell({
    eyebrow: context === "assigned" ? "Lead assignment" : "Follow-up update",
    title: context === "assigned" ? "Lead assigned" : "Follow-up updated",
    intro,
    body: `
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tbody>
          ${renderDataRows([
            { label: "Lead", value: escapeHtml(submission.name) },
            { label: "Business", value: formatOptionalValue(submission.business) },
            { label: "Service", value: escapeHtml(submission.service) },
            {
              label: "Entry source",
              value: escapeHtml(formatSourceLabel(submission.sourcePage)),
            },
            {
              label: "Brief type",
              value: escapeHtml(submission.requestFocus || "General proposal"),
            },
            { label: "Owner", value: formatOptionalValue(submission.owner) },
            {
              label: "Follow-up date",
              value: submission.followUpDate ? escapeHtml(formatDigestDate(submission.followUpDate)) : "Not scheduled",
            },
            { label: "Email", value: escapeHtml(submission.email) },
            { label: "Phone", value: escapeHtml(submission.phone) },
          ])}
        </tbody>
      </table>
      <div style="margin-top: 24px; padding: 20px; border: 1px solid ${emailLine}; border-radius: 16px; background: #fff;">
        <div style="margin-bottom: 8px; font-family: Arial, sans-serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: ${emailAccent};">Project details</div>
        <div style="font-family: Arial, sans-serif; white-space: pre-wrap; color: ${emailInk}; line-height: 1.7;">${escapeHtml(
          submission.details,
        )}</div>
      </div>
    `,
  });
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
      html: buildAssignmentNotificationHtml(submission, recipient, context),
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
      `Entry source: ${formatSourceLabel(submission.sourcePage)}`,
      `Brief type: ${submission.requestFocus || "General proposal"}`,
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

  return renderEmailShell({
    eyebrow: `${cadenceLabel} digest`,
    title: `${cadenceLabel} lead reminder digest`,
    intro: `Here are the assigned leads that need attention for ${recipient.name}.`,
    body: submissions
      .map(
        (submission) => `
          <div style="margin-top: 18px; padding: 20px; border: 1px solid ${emailLine}; border-radius: 16px; background: #fff;">
            <div style="margin-bottom: 10px; font-size: 20px; font-weight: 700; color: ${emailInk};">${escapeHtml(
              submission.name,
            )}</div>
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tbody>
                ${renderDataRows([
                  { label: "Business", value: formatOptionalValue(submission.business) },
                  { label: "Service", value: escapeHtml(submission.service) },
                  {
                    label: "Entry source",
                    value: escapeHtml(formatSourceLabel(submission.sourcePage)),
                  },
                  {
                    label: "Brief type",
                    value: escapeHtml(submission.requestFocus || "General proposal"),
                  },
                  { label: "Status", value: escapeHtml(submission.status) },
                  {
                    label: "Follow-up date",
                    value: submission.followUpDate ? escapeHtml(formatDigestDate(submission.followUpDate)) : "Not scheduled",
                  },
                  { label: "Email", value: escapeHtml(submission.email) },
                  { label: "Phone", value: escapeHtml(submission.phone) },
                  { label: "Notes", value: formatOptionalValue(submission.notes) },
                ])}
              </tbody>
            </table>
          </div>
        `,
      )
      .join(""),
  });
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
        sourcePage: submission.sourcePage || "",
        requestFocus: submission.requestFocus || "",
        inquiryType: submission.inquiryType,
        service: submission.service,
        contactName: submission.name,
        businessName: submission.business || "",
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
