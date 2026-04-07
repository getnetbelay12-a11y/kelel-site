"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type InboxFollowUpFormProps = {
  id: string;
  followUpDate?: string;
  disabled?: boolean;
};

export function InboxFollowUpForm({
  id,
  followUpDate = "",
  disabled = false,
}: InboxFollowUpFormProps) {
  const router = useRouter();
  const [currentFollowUpDate, setCurrentFollowUpDate] = useState(followUpDate);
  const [isPending, setIsPending] = useState(false);

  async function handleChange(nextFollowUpDate: string) {
    setCurrentFollowUpDate(nextFollowUpDate);
    setIsPending(true);

    try {
      const response = await fetch(`/api/contact/${id}/follow-up`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followUpDate: nextFollowUpDate || undefined }),
      });

      if (!response.ok) {
        throw new Error("Unable to update follow-up date.");
      }

      router.refresh();
    } catch {
      setCurrentFollowUpDate(followUpDate);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <label className="status-control">
      <span>Follow-up date</span>
      <input
        type="date"
        value={currentFollowUpDate}
        disabled={isPending || disabled}
        onChange={(event) => handleChange(event.target.value)}
      />
    </label>
  );
}
