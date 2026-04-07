"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmissionStatus } from "@/lib/contact-submissions";

type InboxStatusFormProps = {
  id: string;
  status: SubmissionStatus;
  disabled?: boolean;
};

export function InboxStatusForm({ id, status, disabled = false }: InboxStatusFormProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState<SubmissionStatus>(status);
  const [isPending, setIsPending] = useState(false);

  async function handleChange(nextStatus: SubmissionStatus) {
    setCurrentStatus(nextStatus);
    setIsPending(true);

    try {
      const response = await fetch(`/api/contact/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        throw new Error("Unable to update status.");
      }

      router.refresh();
    } catch {
      setCurrentStatus(status);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <label className="status-control">
      <span>Status</span>
      <select
        value={currentStatus}
        disabled={isPending || disabled}
        onChange={(event) => handleChange(event.target.value as SubmissionStatus)}
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="closed">Closed</option>
      </select>
    </label>
  );
}
