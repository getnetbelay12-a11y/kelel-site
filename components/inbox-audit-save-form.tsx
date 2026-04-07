"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type InboxAuditSaveFormProps = {
  auditAction?: string;
  auditActor?: string;
  auditRange?: string;
  auditStart?: string;
  auditEnd?: string;
  disabled?: boolean;
};

type SaveState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: SaveState = {
  status: "idle",
  message: "",
};

const availableSnapshotTags = [
  { value: "compliance", label: "Compliance" },
  { value: "operations", label: "Operations" },
  { value: "security", label: "Security" },
  { value: "leadership", label: "Leadership" },
];

export function InboxAuditSaveForm({
  auditAction = "all",
  auditActor = "all",
  auditRange = "all",
  auditStart = "",
  auditEnd = "",
  disabled = false,
}: InboxAuditSaveFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setSaveState({
        status: "error",
        message: "Enter a title before saving the audit snapshot.",
      });
      return;
    }

    setIsPending(true);
    setSaveState(initialState);

    try {
      const response = await fetch("/api/inbox-audit/snapshots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          purpose,
          note,
          tags,
          auditAction,
          auditActor,
          auditRange,
          auditStart,
          auditEnd,
        }),
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to save audit snapshot.");
      }

      setTitle("");
      setPurpose("");
      setNote("");
      setTags([]);
      setSaveState({
        status: "success",
        message: payload.message || "Audit snapshot saved successfully.",
      });
      router.refresh();
    } catch (error) {
      setSaveState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not save the audit snapshot right now.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className="audit-save-form" onSubmit={handleSubmit}>
      <label>
        <span>Save snapshot</span>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="For example: Weekly audit review"
          disabled={disabled || isPending}
        />
      </label>
      <label>
        <span>Purpose label</span>
        <input
          type="text"
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
          placeholder="For example: Weekly compliance review"
          disabled={disabled || isPending}
        />
      </label>
      <label>
        <span>Internal note</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={3}
          placeholder="Optional context about why this snapshot was saved."
          disabled={disabled || isPending}
        />
      </label>
      <label>
        <span>Snapshot tag</span>
        <select
          value={tags[0] || ""}
          onChange={(event) =>
            setTags(event.target.value ? [event.target.value] : [])
          }
          disabled={disabled || isPending}
        >
          <option value="">No tag</option>
          {availableSnapshotTags.map((tag) => (
            <option key={tag.value} value={tag.value}>
              {tag.label}
            </option>
          ))}
        </select>
      </label>
      <div className="audit-filter-actions">
        <button
          type="submit"
          className="secondary-link button-link"
          disabled={disabled || isPending}
        >
          {isPending ? "Saving..." : "Save named snapshot"}
        </button>
      </div>
      {saveState.status !== "idle" ? (
        <p className={`form-feedback ${saveState.status}`}>{saveState.message}</p>
      ) : null}
    </form>
  );
}
