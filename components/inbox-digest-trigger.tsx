"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DigestCadence = "daily" | "weekly";

export function InboxDigestTrigger() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<false | DigestCadence>(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSend(cadence: DigestCadence) {
    setIsPending(cadence);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(`/api/reminders/digest?cadence=${cadence}`, {
        method: "POST",
      });

      const payload = (await response.json()) as { message?: string; sentCount?: number };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send reminder digest.");
      }

      setMessage(
        `${cadence === "daily" ? "Daily" : "Weekly"} digest sent to ${payload.sentCount ?? 0} assignee(s).`,
      );
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Unable to send reminder digest.",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="digest-trigger">
      <button
        type="button"
        className="secondary-link button-link"
        disabled={Boolean(isPending)}
        onClick={() => handleSend("daily")}
      >
        {isPending === "daily" ? "Sending daily..." : "Send Daily Digest"}
      </button>
      <button
        type="button"
        className="secondary-link button-link"
        disabled={Boolean(isPending)}
        onClick={() => handleSend("weekly")}
      >
        {isPending === "weekly" ? "Sending weekly..." : "Send Weekly Digest"}
      </button>
      {message ? (
        <p className={`digest-trigger-message${isError ? " error" : ""}`}>{message}</p>
      ) : null}
    </div>
  );
}
