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

export function ContactForm() {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          business: formData.get("business"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          details: formData.get("details"),
        }),
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
        <select name="service" defaultValue="" required>
          <option value="" disabled>
            Select a service
          </option>
          <option>Company website</option>
          <option>Landing page</option>
          <option>Dashboard or web app</option>
          <option>Brand/UI refresh</option>
          <option>Digital growth support</option>
        </select>
      </label>
      <label className="full-width">
        <span>Project details</span>
        <textarea
          name="details"
          rows={6}
          placeholder="Tell us about your business, goals, timeline, and what you want the website to achieve."
          required
        />
      </label>
      <div className="contact-form-actions full-width">
        <button type="submit" className="primary-link button-link" disabled={isPending}>
          {isPending ? "Sending..." : "Send project brief"}
        </button>
        <p>
          Your message is validated and stored locally in this project so the site now has
          a real working submission flow.
        </p>
      </div>
      {formState.status !== "idle" ? (
        <p className={`form-feedback ${formState.status}`}>{formState.message}</p>
      ) : null}
    </form>
  );
}
