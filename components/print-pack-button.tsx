"use client";

export function PrintPackButton() {
  return (
    <button
      type="button"
      className="secondary-link button-link"
      onClick={() => window.print()}
    >
      Print or Save PDF
    </button>
  );
}
