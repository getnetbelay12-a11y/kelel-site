import { NextResponse } from "next/server";
import { readContactSubmissions } from "@/lib/contact-submissions";
import { appendInboxAuditEvent } from "@/lib/inbox-audit";
import {
  getInboxDirectoryUsers,
  getInboxSession,
  hasInboxRole,
  isInboxAuthenticated,
} from "@/lib/inbox-auth";
import { sendLeadReminderDigest } from "@/lib/lead-notifications";

function getDigestSecret() {
  return process.env.REMINDER_DIGEST_SECRET?.trim() || "";
}

function hasValidDigestSecret(request: Request) {
  const secret = getDigestSecret();

  if (!secret) {
    return false;
  }

  const url = new URL(request.url);

  return (
    request.headers.get("x-reminder-secret") === secret ||
    url.searchParams.get("secret") === secret
  );
}

function normalizeCadence(value: string | null) {
  return value === "weekly" ? "weekly" : "daily";
}

function getFollowUpState(
  followUpDate: string | undefined,
  today: string,
  upcomingThresholdDate: string,
) {
  if (!followUpDate) {
    return "none" as const;
  }

  if (followUpDate < today) {
    return "overdue" as const;
  }

  if (followUpDate <= upcomingThresholdDate) {
    return "upcoming" as const;
  }

  return "scheduled" as const;
}

export async function POST(request: Request) {
  try {
    const authorizedBySecret = hasValidDigestSecret(request);
    const authenticated = await isInboxAuthenticated();
    const authorizedBySession = authenticated && (await hasInboxRole("admin"));

    if (!authorizedBySecret && !authorizedBySession) {
      return NextResponse.json(
        { message: "Admin session or valid reminder secret required." },
        { status: 401 },
      );
    }

    const cadence = normalizeCadence(new URL(request.url).searchParams.get("cadence"));
    const submissions = await readContactSubmissions();
    const users = getInboxDirectoryUsers().filter((user) => Boolean(user.email));
    const today = new Date().toISOString().slice(0, 10);
    const upcomingThreshold = new Date();
    upcomingThreshold.setDate(upcomingThreshold.getDate() + (cadence === "daily" ? 1 : 7));
    const upcomingThresholdDate = upcomingThreshold.toISOString().slice(0, 10);

    let sentCount = 0;

    for (const user of users) {
      const assignedSubmissions = submissions.filter((submission) => {
        if (submission.archived || submission.owner !== user.name) {
          return false;
        }

        const state = getFollowUpState(
          submission.followUpDate,
          today,
          upcomingThresholdDate,
        );

        return state === "overdue" || state === "upcoming";
      });

      const sent = await sendLeadReminderDigest(user, assignedSubmissions, cadence);

      if (sent) {
        sentCount += 1;
      }
    }

    const session = authorizedBySession ? await getInboxSession() : null;

    await appendInboxAuditEvent(
      session || {
        username: "system",
        name: "Reminder Scheduler",
        role: "admin",
      },
      cadence === "daily" ? "daily_digest_sent" : "weekly_digest_sent",
      `Reminder digest run completed. ${sentCount} assignee digest emails sent.`,
    );

    return NextResponse.json({
      message: "Reminder digest run completed.",
      cadence,
      sentCount,
    });
  } catch {
    return NextResponse.json(
      { message: "We could not send reminder digests right now." },
      { status: 500 },
    );
  }
}
