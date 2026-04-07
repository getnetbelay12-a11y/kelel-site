"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type InboxArchiveButtonProps = {
  id: string;
  archived: boolean;
  disabled?: boolean;
};

export function InboxArchiveButton({
  id,
  archived,
  disabled = false,
}: InboxArchiveButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleToggle() {
    setIsPending(true);

    try {
      const response = await fetch(`/api/contact/${id}/archive`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ archived: !archived }),
      });

      if (!response.ok) {
        throw new Error("Unable to update archive state.");
      }

      router.refresh();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      className="secondary-link button-link"
      disabled={isPending || disabled}
      onClick={handleToggle}
    >
      {isPending ? "Updating..." : archived ? "Restore lead" : "Archive lead"}
    </button>
  );
}
