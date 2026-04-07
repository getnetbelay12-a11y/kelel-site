"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function InboxLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage("");

    try {
      const response = await fetch("/api/inbox-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to unlock inbox.");
      }

      setUsername("");
      setPassword("");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to unlock inbox.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className="inbox-login-form" onSubmit={handleSubmit}>
      <label>
        <span>Username</span>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter inbox username"
          autoComplete="username"
          required
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter inbox password"
          autoComplete="current-password"
          required
        />
      </label>
      <button type="submit" className="primary-link button-link" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </button>
      {message ? <p className="form-feedback error">{message}</p> : null}
    </form>
  );
}
