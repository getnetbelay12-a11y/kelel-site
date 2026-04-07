"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type InboxAttachmentUploadFormProps = {
  id: string;
  disabled?: boolean;
};

type UploadState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: UploadState = {
  status: "idle",
  message: "",
};

export function InboxAttachmentUploadForm({
  id,
  disabled = false,
}: InboxAttachmentUploadFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedFiles = formData
      .getAll("attachments")
      .filter((item): item is File => item instanceof File && item.size > 0);

    if (selectedFiles.length === 0) {
      setUploadState({
        status: "error",
        message: "Choose at least one file before uploading.",
      });
      return;
    }

    setIsPending(true);
    setUploadState(initialState);

    try {
      const response = await fetch(`/api/contact/${id}/attachments`, {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to upload attachments.");
      }

      form.reset();
      setUploadState({
        status: "success",
        message: payload.message || "Attachments uploaded successfully.",
      });
      router.refresh();
    } catch (error) {
      setUploadState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not upload attachments right now.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className="attachment-upload-form" onSubmit={handleSubmit}>
      <label>
        <span>Add files</span>
        <input
          type="file"
          name="attachments"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.docx"
          disabled={disabled || isPending}
        />
      </label>
      <div className="attachment-upload-actions">
        <button
          type="submit"
          className="secondary-link button-link"
          disabled={disabled || isPending}
        >
          {isPending ? "Uploading..." : "Upload attachments"}
        </button>
        <p>PDF, JPG, PNG, WEBP, and DOCX files up to 5 MB each.</p>
      </div>
      {uploadState.status !== "idle" ? (
        <p className={`form-feedback ${uploadState.status}`}>{uploadState.message}</p>
      ) : null}
    </form>
  );
}
