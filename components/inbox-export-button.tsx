type InboxExportButtonProps = {
  disabled?: boolean;
};

export function InboxExportButton({ disabled = false }: InboxExportButtonProps) {
  if (disabled) {
    return (
      <span className="secondary-link disabled-link" aria-disabled="true">
        Export CSV
      </span>
    );
  }

  return (
    <a href="/api/contact/export" className="primary-link">
      Export CSV
    </a>
  );
}
