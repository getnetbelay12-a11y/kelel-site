"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type InboxAuditSnapshotDeleteButtonProps = {
  id: string;
  title: string;
  disabled?: boolean;
};

export function InboxAuditSnapshotDeleteButton({
  id,
  title,
  disabled = false,
}: InboxAuditSnapshotDeleteButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete the saved audit snapshot "${title}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch(`/api/inbox-audit/snapshots/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete audit snapshot.");
      }

      router.refresh();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      className="secondary-link button-link danger-link"
      disabled={disabled || isPending}
      onClick={() => void handleDelete()}
    >
      {isPending ? "Deleting..." : "Delete snapshot"}
    </button>
  );
}
