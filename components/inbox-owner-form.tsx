"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type InboxOwnerFormProps = {
  id: string;
  owner: string;
  disabled?: boolean;
};

const ownerOptions = [
  "",
  "Getnet Amdu Belay",
  "Hewan Fantahun",
];

export function InboxOwnerForm({ id, owner, disabled = false }: InboxOwnerFormProps) {
  const router = useRouter();
  const [currentOwner, setCurrentOwner] = useState(owner);
  const [isPending, setIsPending] = useState(false);

  async function handleChange(nextOwner: string) {
    setCurrentOwner(nextOwner);
    setIsPending(true);

    try {
      const response = await fetch(`/api/contact/${id}/owner`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ owner: nextOwner }),
      });

      if (!response.ok) {
        throw new Error("Unable to update owner.");
      }

      router.refresh();
    } catch {
      setCurrentOwner(owner);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <label className="status-control">
      <span>Owner</span>
      <select
        value={currentOwner}
        disabled={isPending || disabled}
        onChange={(event) => handleChange(event.target.value)}
      >
        {ownerOptions.map((option) => (
          <option key={option || "unassigned"} value={option}>
            {option || "Unassigned"}
          </option>
        ))}
      </select>
    </label>
  );
}
