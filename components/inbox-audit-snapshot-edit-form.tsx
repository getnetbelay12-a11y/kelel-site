"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type InboxAuditSnapshotEditFormProps = {
  id: string;
  initialTitle: string;
  initialPurpose: string;
  initialNote: string;
  initialTags: string[];
  disabled?: boolean;
};

type EditState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: EditState = {
  status: "idle",
  message: "",
};

const availableSnapshotTags = [
  { value: "compliance", label: "Compliance" },
  { value: "operations", label: "Operations" },
  { value: "security", label: "Security" },
  { value: "leadership", label: "Leadership" },
];

export function InboxAuditSnapshotEditForm({
  id,
  initialTitle,
  initialPurpose,
  initialNote,
  initialTags,
  disabled = false,
}: InboxAuditSnapshotEditFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [purpose, setPurpose] = useState(initialPurpose);
  const [note, setNote] = useState(initialNote);
  const [tags, setTags] = useState(initialTags);
  const [isPending, setIsPending] = useState(false);
  const [editState, setEditState] = useState<EditState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setEditState({
        status: "error",
        message: "Enter a title before updating the snapshot.",
      });
      return;
    }

    setIsPending(true);
    setEditState(initialState);

    try {
      const response = await fetch(`/api/inbox-audit/snapshots/${id}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          purpose,
          note,
          tags,
        }),
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to update audit snapshot.");
      }

      setEditState({
        status: "success",
        message: payload.message || "Audit snapshot updated successfully.",
      });
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      setEditState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not update the audit snapshot right now.",
      });
    } finally {
      setIsPending(false);
    }
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        className="secondary-link button-link"
        disabled={disabled}
        onClick={() => setIsEditing(true)}
      >
        Edit snapshot
      </button>
    );
  }

  return (
    <form className="audit-save-form" onSubmit={handleSubmit}>
      <label>
        <span>Snapshot title</span>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={disabled || isPending}
        />
      </label>
      <label>
        <span>Purpose label</span>
        <input
          type="text"
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
          disabled={disabled || isPending}
        />
      </label>
      <label>
        <span>Internal note</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={3}
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
          {isPending ? "Saving..." : "Save changes"}
        </button>
        <button
          type="button"
          className="secondary-link button-link"
          disabled={disabled || isPending}
          onClick={() => {
            setTitle(initialTitle);
            setPurpose(initialPurpose);
            setNote(initialNote);
            setTags(initialTags);
            setEditState(initialState);
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
      </div>
      {editState.status !== "idle" ? (
        <p className={`form-feedback ${editState.status}`}>{editState.message}</p>
      ) : null}
    </form>
  );
}
