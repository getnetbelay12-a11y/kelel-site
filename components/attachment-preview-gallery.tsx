"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type PreviewAttachment = {
  id: string;
  originalName: string;
  contentType: string;
  size: number;
  uploadedAt: string;
  href: string;
  downloadHref: string;
};

type AttachmentPreviewGalleryProps = {
  submissionId: string;
  attachments: PreviewAttachment[];
  canDelete?: boolean;
};

function isImageAttachment(attachment: PreviewAttachment) {
  return attachment.contentType.startsWith("image/");
}

function isPdfAttachment(attachment: PreviewAttachment) {
  return attachment.contentType === "application/pdf";
}

function formatAttachmentDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function formatAttachmentSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function AttachmentPreviewGallery({
  submissionId,
  attachments,
  canDelete = false,
}: AttachmentPreviewGalleryProps) {
  const router = useRouter();
  const [activeAttachmentId, setActiveAttachmentId] = useState<string | null>(null);
  const [deletingAttachmentId, setDeletingAttachmentId] = useState<string | null>(null);

  const activeAttachmentIndex = useMemo(
    () => attachments.findIndex((attachment) => attachment.id === activeAttachmentId),
    [activeAttachmentId, attachments],
  );

  const activeAttachment =
    activeAttachmentIndex >= 0 ? attachments[activeAttachmentIndex] : null;
  const hasMultipleAttachments = attachments.length > 1;

  const closePreview = useCallback(() => {
    setActiveAttachmentId(null);
  }, []);

  const deleteAttachment = useCallback(
    async (attachment: PreviewAttachment) => {
      if (!canDelete || deletingAttachmentId) {
        return;
      }

      const confirmed = window.confirm(
        `Delete ${attachment.originalName}? This removes the file from the lead and cannot be undone.`,
      );

      if (!confirmed) {
        return;
      }

      setDeletingAttachmentId(attachment.id);

      try {
        const response = await fetch(
          `/api/contact/${submissionId}/attachments/${attachment.id}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          throw new Error("Unable to delete attachment.");
        }

        if (activeAttachmentId === attachment.id) {
          closePreview();
        }

        router.refresh();
      } finally {
        setDeletingAttachmentId(null);
      }
    },
    [activeAttachmentId, canDelete, closePreview, deletingAttachmentId, router, submissionId],
  );

  const openPreviousAttachment = useCallback(() => {
    if (activeAttachmentIndex <= 0) {
      return;
    }

    setActiveAttachmentId(attachments[activeAttachmentIndex - 1]?.id || null);
  }, [activeAttachmentIndex, attachments]);

  const openNextAttachment = useCallback(() => {
    if (activeAttachmentIndex < 0 || activeAttachmentIndex >= attachments.length - 1) {
      return;
    }

    setActiveAttachmentId(attachments[activeAttachmentIndex + 1]?.id || null);
  }, [activeAttachmentIndex, attachments]);

  useEffect(() => {
    if (!activeAttachment) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePreview();
      }

      if (event.key === "ArrowLeft") {
        openPreviousAttachment();
      }

      if (event.key === "ArrowRight") {
        openNextAttachment();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeAttachment, closePreview, openNextAttachment, openPreviousAttachment]);

  return (
    <>
      <div className="attachment-preview-grid">
        {attachments.map((attachment) => (
          <article key={attachment.id} className="attachment-preview-card">
            <div className="attachment-preview-head">
              <strong>{attachment.originalName}</strong>
              <span>{isPdfAttachment(attachment) ? "PDF preview" : "Image preview"}</span>
              <p className="attachment-meta-copy">
                {formatAttachmentSize(attachment.size)} | Uploaded{" "}
                {formatAttachmentDate(attachment.uploadedAt)}
              </p>
            </div>
            <button
              type="button"
              className="attachment-preview-button"
              onClick={() => setActiveAttachmentId(attachment.id)}
            >
              {isImageAttachment(attachment) ? (
                <Image
                  src={attachment.href}
                  alt={attachment.originalName}
                  className="attachment-preview-image"
                  width={1200}
                  height={900}
                  unoptimized
                />
              ) : (
                <iframe
                  src={attachment.href}
                  title={attachment.originalName}
                  className="attachment-preview-frame"
                />
              )}
            </button>
            <button
              type="button"
              className="secondary-link button-link attachment-expand-link"
              onClick={() => setActiveAttachmentId(attachment.id)}
            >
              Open large preview
            </button>
            {canDelete ? (
              <button
                type="button"
                className="secondary-link button-link danger-link attachment-delete-link"
                disabled={deletingAttachmentId === attachment.id}
                onClick={() => void deleteAttachment(attachment)}
              >
                {deletingAttachmentId === attachment.id ? "Deleting..." : "Delete file"}
              </button>
            ) : null}
          </article>
        ))}
      </div>
      {activeAttachment ? (
        <div
          className="attachment-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeAttachment.originalName}
        >
          <div className="attachment-lightbox-backdrop" onClick={closePreview} />
          <div className="attachment-lightbox-panel">
            <div className="attachment-lightbox-top">
              <div>
                <strong>{activeAttachment.originalName}</strong>
                <span>
                  {isPdfAttachment(activeAttachment) ? "PDF document" : "Image attachment"}
                </span>
                <p className="attachment-meta-copy">
                  {formatAttachmentSize(activeAttachment.size)} | Uploaded{" "}
                  {formatAttachmentDate(activeAttachment.uploadedAt)}
                </p>
                {hasMultipleAttachments ? (
                  <p className="attachment-lightbox-position">
                    File {activeAttachmentIndex + 1} of {attachments.length}
                  </p>
                ) : null}
              </div>
              <div className="attachment-lightbox-actions">
                {hasMultipleAttachments ? (
                  <>
                    <button
                      type="button"
                      className="secondary-link button-link"
                      onClick={openPreviousAttachment}
                      disabled={activeAttachmentIndex <= 0}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="secondary-link button-link"
                      onClick={openNextAttachment}
                      disabled={activeAttachmentIndex >= attachments.length - 1}
                    >
                      Next
                    </button>
                  </>
                ) : null}
                <a
                  href={activeAttachment.downloadHref}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-link"
                >
                  Open file
                </a>
                <button
                  type="button"
                  className="secondary-link button-link"
                  onClick={closePreview}
                >
                  Close
                </button>
                {canDelete ? (
                  <button
                    type="button"
                    className="secondary-link button-link danger-link"
                    disabled={deletingAttachmentId === activeAttachment.id}
                    onClick={() => void deleteAttachment(activeAttachment)}
                  >
                    {deletingAttachmentId === activeAttachment.id
                      ? "Deleting..."
                      : "Delete file"}
                  </button>
                ) : null}
              </div>
            </div>
            <div className="attachment-lightbox-body">
              {isImageAttachment(activeAttachment) ? (
                <Image
                  src={activeAttachment.href}
                  alt={activeAttachment.originalName}
                  className="attachment-lightbox-image"
                  width={1800}
                  height={1350}
                  unoptimized
                />
              ) : (
                <iframe
                  src={activeAttachment.href}
                  title={activeAttachment.originalName}
                  className="attachment-lightbox-frame"
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
