"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function InboxLogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);

    try {
      await fetch("/api/inbox-auth", {
        method: "DELETE",
      });

      router.refresh();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      className="secondary-link button-link"
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
