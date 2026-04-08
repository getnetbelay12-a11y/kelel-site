"use client";

import { useMemo, useState } from "react";

type ChatWithKelelProps = {
  whatsappHref: string;
};

const helpOptions = [
  "I need an internal dashboard for my company",
  "I need a workflow system for operations",
  "I need a banking or insurance platform",
];

function labelForNeed(need: string) {
  if (need.includes("dashboard")) return "Internal dashboard";
  if (need.includes("workflow")) return "Workflow system";
  return "Banking or insurance platform";
}

export function ChatWithKelel({ whatsappHref }: ChatWithKelelProps) {
  const [open, setOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isReady = useMemo(
    () => phone.trim().length > 5 && email.trim().includes("@"),
    [phone, email],
  );

  function handleNeedSelect(option: string) {
    setSelectedNeed(option);
    setSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isReady) return;
    setSubmitted(true);
  }

  return (
    <>
      {open ? (
        <section className="enterprise-chat-panel" aria-label="Kelel chat support">
          <div className="enterprise-chat-panel-head">
            <div>
              <strong>Chat with Kelel</strong>
              <p>Choose the support you need and we’ll follow up shortly.</p>
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
                    <button type="submit" className="primary-link" disabled={!isReady}>
                      Send
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="enterprise-chat-message enterprise-chat-message-assistant">
                    <p>Thank you. We’ve received your details.</p>
                    <p>Our team will get back to you shortly.</p>
                  </div>

                  <div className="enterprise-chat-handoff">
                    <p>If you prefer, you can also continue directly on WhatsApp.</p>
                    <a href={whatsappHref} target="_blank" rel="noreferrer" className="secondary-link">
                      Continue on WhatsApp
                    </a>
                  </div>
                </>
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
