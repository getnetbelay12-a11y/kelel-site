import { assetReplacementMap } from "@/lib/site-content";

type AssetImpactBoardProps = {
  title?: string;
  description?: string;
};

export function AssetImpactBoard({
  title = "Which pages improve first when each real Kelel asset arrives.",
  description = "This impact view shows where the current temporary visuals are used most, so the team can see which real replacement will upgrade the biggest parts of the site first.",
}: AssetImpactBoardProps) {
  const pageCounts = new Map<string, number>();

  for (const item of assetReplacementMap) {
    for (const placement of item.placements) {
      pageCounts.set(placement, (pageCounts.get(placement) ?? 0) + 1);
    }
  }

  const rankedPlacements = Array.from(pageCounts.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([placement, count]) => ({ placement, count }));

  return (
    <section className="asset-impact-board">
      <div className="asset-impact-copy">
        <span className="eyebrow">Impact view</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="asset-impact-grid">
        {rankedPlacements.map((item) => (
          <article key={item.placement} className="asset-impact-card">
            <span className="project-type">Affected area</span>
            <h4>{item.placement}</h4>
            <strong>{item.count} replacement{item.count === 1 ? "" : "s"}</strong>
            <p>
              {item.count === 1
                ? "One shared temporary asset is still visible here."
                : `${item.count} shared temporary assets are still visible here.`}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
