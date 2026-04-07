"use client";

import { FormEvent, startTransition, useState } from "react";

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: FormState = {
  status: "idle",
  message: "",
};

type ContactFormProps = {
  initialService?: string;
  initialDetails?: string;
  inquiryType?: "general" | "proposal";
  showProposalFields?: boolean;
  submitLabel?: string;
  helperCopy?: string;
  sourcePage?: string;
  requestFocus?: string;
};

export function ContactForm({
  initialService = "",
  initialDetails = "",
  inquiryType = "general",
  showProposalFields = false,
  submitLabel = "Send project brief",
  helperCopy = "Your message is validated and stored locally in this project so the site now has a real working submission flow.",
  sourcePage = "",
  requestFocus = "",
}: ContactFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [formState, setFormState] = useState<FormState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsPending(true);
    setFormState(initialState);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Something went wrong while sending your message.");
      }

      startTransition(() => {
        form.reset();
        setFormState({
          status: "success",
          message:
            payload.message ||
            "Your message was sent successfully. Kelel IT Solution can review it from the project inbox.",
        });
      });
    } catch (error) {
      setFormState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your message right now. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="inquiryType" value={inquiryType} />
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <input type="hidden" name="requestFocus" value={requestFocus} />
      <label>
        <span>Your name</span>
        <input type="text" name="name" placeholder="Your full name" required />
      </label>
      <label>
        <span>Business name</span>
        <input type="text" name="business" placeholder="Your company or brand" />
      </label>
      <label>
        <span>Email address</span>
        <input type="email" name="email" placeholder="you@example.com" required />
      </label>
      <label>
        <span>Phone number</span>
        <input type="tel" name="phone" placeholder="+251 ..." required />
      </label>
      <label className="full-width">
        <span>What do you need?</span>
        <select name="service" defaultValue={initialService} required>
          <option value="" disabled>
            Select a service
          </option>
          <option>Company website</option>
          <option>Landing page</option>
          <option>Dashboard or web app</option>
          <option>Workflow system</option>
          <option>Business portal</option>
          <option>Reporting and visibility system</option>
          <option>Brand/UI refresh</option>
          <option>Digital growth support</option>
          <option>Managed IT support</option>
          <option>Network and infrastructure</option>
          <option>Proposal request</option>
        </select>
      </label>
      <label className="full-width">
        <span>Project details</span>
        <textarea
          name="details"
          rows={6}
          placeholder="Tell us about your business, goals, timeline, and what you want the website to achieve."
          defaultValue={initialDetails}
          required
        />
      </label>
      {showProposalFields ? (
        <>
          <label>
            <span>Preferred timeline</span>
            <input
              type="text"
              name="timeline"
              placeholder="For example: This quarter or within 6 weeks"
            />
          </label>
          <label>
            <span>Budget range</span>
            <input
              type="text"
              name="budgetRange"
              placeholder="For example: To be discussed or 5,000 - 15,000 USD"
            />
          </label>
          <label className="full-width">
            <span>Decision stage</span>
            <select name="decisionStage" defaultValue="">
              <option value="">Select current stage</option>
              <option>Early exploration</option>
              <option>Comparing vendors</option>
              <option>Internal approval in progress</option>
              <option>Budget approved</option>
              <option>Ready to start soon</option>
            </select>
          </label>
          <label className="full-width">
            <span>Supporting files</span>
            <input
              type="file"
              name="attachments"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.webp,.docx"
            />
          </label>
        </>
      ) : null}
      <div className="contact-form-actions full-width">
        <button type="submit" className="primary-link button-link" disabled={isPending}>
          {isPending ? "Sending..." : submitLabel}
        </button>
        <p>{helperCopy}</p>
      </div>
      {formState.status !== "idle" ? (
        <p className={`form-feedback ${formState.status}`}>{formState.message}</p>
      ) : null}
    </form>
  );
}
