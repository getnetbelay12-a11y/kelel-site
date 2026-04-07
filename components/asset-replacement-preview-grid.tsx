import Image from "next/image";
import { assetReplacementMap } from "@/lib/site-content";

type AssetReplacementPreviewGridProps = {
  title?: string;
  description?: string;
};

export function AssetReplacementPreviewGrid({
  title = "The current live placeholders and the real Kelel files that should replace them next.",
  description = "This makes the asset handoff more concrete by showing the exact live placeholder each approved Kelel original is meant to replace across the website.",
}: AssetReplacementPreviewGridProps) {
  const totalPlacements = assetReplacementMap.reduce(
    (sum, item) => sum + item.placements.length,
    0,
  );

  return (
    <section className="asset-preview-wall">
      <div className="asset-preview-copy">
        <span className="eyebrow">Replacement preview</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="asset-preview-summary">
        <article className="asset-preview-summary-card">
          <span>Mapped replacements</span>
          <strong>{assetReplacementMap.length}</strong>
          <p>The core live placeholder files still carrying the temporary visual system.</p>
        </article>
        <article className="asset-preview-summary-card">
          <span>Page placements</span>
          <strong>{totalPlacements}</strong>
          <p>Public website placements that improve as soon as the real files are synced.</p>
        </article>
        <article className="asset-preview-summary-card">
          <span>Replacement flow</span>
          <strong>3 steps</strong>
          <p>Drop approved files, run dry preview, then sync live media.</p>
        </article>
      </div>
      <div className="asset-preview-grid">
        {assetReplacementMap.map((item, index) => (
          <article key={item.currentFile} className="asset-preview-card">
            <div className="asset-preview-topline">
              <span className="status-pill status-upcoming">priority {index + 1}</span>
              <span className="asset-preview-impact">
                {item.placements.length} placement{item.placements.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="asset-preview-live">
              <div className="asset-preview-image-frame">
                <Image
                  src={`/media/${item.currentFile}`}
                  alt={`${item.currentFile} placeholder preview`}
                  width={1600}
                  height={1067}
                  className="asset-preview-image"
                />
              </div>
              <div className="asset-preview-labels">
                <span className="project-type">Live placeholder</span>
                <strong>{item.currentFile}</strong>
              </div>
            </div>
            <div className="asset-preview-arrow" aria-hidden="true">
              Replace with
            </div>
            <div className="asset-preview-target">
              <div className="asset-preview-placeholder">
                <span>Incoming asset</span>
                <strong>{item.suggestedReplacement}</strong>
              </div>
              <div className="asset-preview-labels">
                <span className="project-type">Target file</span>
                <p>{item.guidance}</p>
              </div>
            </div>
            <div className="asset-preview-placements">
              <span className="project-type">Used across</span>
              <div className="tag-cloud compact-tags">
                {item.placements.map((placement) => (
                  <span key={`${item.currentFile}-${placement}`} className="tag-pill alt">
                    {placement}
                  </span>
                ))}
              </div>
            </div>
            <div className="asset-preview-steps">
              <span>Drop in incoming-assets</span>
              <span>Preview dry run</span>
              <span>Sync live media</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
