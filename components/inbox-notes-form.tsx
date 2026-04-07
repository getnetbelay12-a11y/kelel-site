"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type InboxNotesFormProps = {
  id: string;
  notes: string;
  disabled?: boolean;
};

export function InboxNotesForm({ id, notes, disabled = false }: InboxNotesFormProps) {
  const router = useRouter();
  const [value, setValue] = useState(notes);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setIsPending(true);
    setMessage("");

    try {
      const response = await fetch(`/api/contact/${id}/notes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: value }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to save notes.");
      }

      setMessage("Notes saved.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save notes.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="notes-form">
      <label>
        <span>Internal notes</span>
        <textarea
          rows={4}
          value={value}
          disabled={disabled}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Add follow-up context, meeting notes, or next actions."
        />
      </label>
      <div className="notes-actions">
        <button
          type="button"
          className="secondary-link button-link"
          disabled={isPending || disabled}
          onClick={handleSave}
        >
          {isPending ? "Saving..." : "Save notes"}
        </button>
        {message ? <p className="notes-message">{message}</p> : null}
      </div>
    </div>
  );
}
