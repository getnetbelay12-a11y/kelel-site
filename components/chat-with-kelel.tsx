"use client";

import { useMemo, useState } from "react";

const helpOptions = [
  "I need a new system built for my business",
  "I need database management or data infrastructure support",
  "I need to improve the performance of an existing platform",
  "I need an internal dashboard or reporting system",
  "I need a workflow system for operations",
  "I need a banking or insurance platform",
];

function labelForNeed(need: string) {
  if (need.includes("new system")) return "System building";
  if (need.includes("database") || need.includes("data infrastructure")) return "Database management";
  if (need.includes("performance")) return "Performance improvement";
  if (need.includes("dashboard")) return "Internal dashboard";
  if (need.includes("workflow")) return "Workflow system";
  return "Banking or insurance platform";
}

export function ChatWithKelel() {
  const [open, setOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isReady = useMemo(
    () => phone.trim().length > 5 && email.trim().includes("@"),
    [phone, email],
  );

  function handleNeedSelect(option: string) {
    setSelectedNeed(option);
    setSubmitted(false);
    setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isReady || submitting) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Website chat lead",
          business: "Not provided",
          email: email.trim(),
          phone: phone.trim(),
          service: labelForNeed(selectedNeed),
          details: `Submitted via Chat with Kelel. Request type: ${selectedNeed}. Please follow up with this lead directly.`,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(
          payload?.message || "The request could not be submitted right now. Please try again.",
        );
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "The request could not be submitted right now. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {open ? (
        <section className="enterprise-chat-panel" aria-label="Kelel chat support">
          <div className="enterprise-chat-panel-head">
            <div>
              <strong>Chat with Kelel</strong>
              <p>Choose the support you need and we&apos;ll follow up shortly.</p>
            </div>
            <button
              type="button"
              className="enterprise-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {!selectedNeed ? (
            <>
              <div className="enterprise-chat-message enterprise-chat-message-assistant">
                <p>Hello — thank you for reaching out to Kelel IT Solution.</p>
                <p>Please choose the type of help you need below.</p>
              </div>

              <div className="enterprise-chat-quickprompts enterprise-chat-quickprompts-stacked">
                {helpOptions.map((option) => (
                  <button key={option} type="button" onClick={() => handleNeedSelect(option)}>
                    {labelForNeed(option)}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="enterprise-chat-message enterprise-chat-message-user">
                <p>{selectedNeed}</p>
              </div>

              {!submitted ? (
                <>
                  <div className="enterprise-chat-message enterprise-chat-message-assistant">
                    <p>Thank you. Please share your phone number and email address.</p>
                    <p>Our team will review your request and get back to you shortly.</p>
                  </div>

                  <form className="enterprise-chat-contact-form" onSubmit={handleSubmit}>
                    <label>
                      <span>Phone number</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="+251..."
                      />
                    </label>
                    <label>
                      <span>Email address</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="name@company.com"
                      />
                    </label>
                    <button type="submit" className="primary-link" disabled={!isReady || submitting}>
                      {submitting ? "Sending..." : "Send"}
                    </button>
                    {error ? <p className="enterprise-chat-error">{error}</p> : null}
                  </form>
                </>
              ) : (
                <div className="enterprise-chat-message enterprise-chat-message-assistant">
                  <p>Thank you. Your details have been sent to our team.</p>
                  <p>Our team will reach out to you shortly.</p>
                </div>
              )}
            </>
          )}
        </section>
      ) : null}

      {!open ? (
        <button
          type="button"
          className="enterprise-chat-float"
          onClick={() => setOpen(true)}
          aria-label="Open chat with Kelel"
        >
          Chat with Kelel
        </button>
      ) : null}
    </>
  );
}
