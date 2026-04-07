import { AssetImpactBoard } from "@/components/asset-impact-board";
import { AssetReplacementPreviewGrid } from "@/components/asset-replacement-preview-grid";
import { ExecutiveContactCard } from "@/components/executive-contact-card";
import { SectionIntro } from "@/components/section-intro";
import type { Metadata } from "next";
import Link from "next/link";
import { getAssetStatusData } from "@/lib/asset-status";

export const metadata: Metadata = {
  title: "Asset Status | Kelel IT Solution",
  description:
    "Track which real Kelel asset files have been provided and which temporary website visuals are still waiting for replacement.",
};

export default async function AssetStatusPage() {
  const {
    incomingFiles,
    manifestRows,
    groupedIncomingFiles,
    expectedAssetSummary,
    syncPlan,
    latestSyncReport,
    metrics,
    replacementPriorities,
    replacementMap,
  } = await getAssetStatusData();

  const statusStats = [
    {
      label: "Expected replacements",
      value: String(metrics.expectedReplacements),
      note: "Live placeholders already mapped to specific real Kelel target files.",
    },
    {
      label: "Matched files",
      value: String(metrics.matchedRealFiles),
      note: "Real incoming files that match the replacement plan right now.",
    },
    {
      label: "Sync ready",
      value: String(metrics.syncReadyCount),
      note: "Approved files ready for the live media replacement command.",
    },
    {
      label: "Manifest coverage",
      value: `${metrics.approvedManifestRows}/${manifestRows.length || 0}`,
      note: "Approved public-use rows compared to the current manifest entries.",
    },
  ];

  return (
    <main className="page-shell home-page-shell resource-page-shell">
      <section className="section-block page-hero resource-command-hero">
        <SectionIntro
          eyebrow="Asset status"
          title="A live command view of which real Kelel asset files have arrived and which temporary visuals are still in place."
          description="This page now works more like an asset operations dashboard: arrival status, replacement order, sync readiness, manifest checks, and the latest preview report."
        />
        <div className="hero-actions">
          <Link href="/asset-guide" className="secondary-link">
            Open asset guide
          </Link>
          <Link href="/resources" className="secondary-link">
            Back to resources
          </Link>
        </div>
        <div className="resource-command-metrics">
          {statusStats.map((item) => (
            <article key={item.label} className="resource-command-metric">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resource-command-grid compact">
        <article className="section-block resource-command-card">
          <span className="project-type">Waiting</span>
          <h3>{metrics.stillWaiting} assets still need real files</h3>
          <p>The replacement queue is still blocked mainly by missing incoming files rather than missing structure in the website.</p>
        </article>
        <article className="section-block resource-command-card">
          <span className="project-type">Extra files</span>
          <h3>{metrics.extraIncomingFiles} incoming files are outside the main mapped set</h3>
          <p>Those files can still be useful, but they are not currently part of the highest-impact replacement sequence.</p>
        </article>
        <article className="section-block resource-command-card">
          <span className="project-type">Manifest</span>
          <h3>{metrics.approvedManifestRows} rows are approved for public use</h3>
          <p>The manifest view now helps the team confirm not only presence, but also approval and intended placement.</p>
        </article>
        <article className="section-block resource-command-card">
          <span className="project-type">Sync</span>
          <h3>{metrics.syncReadyCount} assets are ready for live media sync</h3>
          <p>Use the dry-run first, then the real sync command once the incoming files are approved and present.</p>
        </article>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Replacement tracking"
          title="The current website replacement targets."
          description="This gives a visual view of the placeholders that are still live and the real Kelel files the site is prepared to accept next."
        />
        <AssetReplacementPreviewGrid
          title="The live placeholders the site is still using and the real files each one is waiting for."
          description="This makes the asset status page easier to scan by showing what is still live on the site today and which approved Kelel original should replace it."
        />
        <div className="resource-grid">
          {replacementMap.map((item) => {
            const received = incomingFiles.some(
              (file) => file.name === item.suggestedReplacement,
            );

            return (
              <article key={item.currentFile} className="resource-card">
                <span
                  className={`status-pill ${
                    received ? "status-contacted" : "status-upcoming"
                  }`}
                >
                  {received ? "received" : "waiting"}
                </span>
                <h3>{item.suggestedReplacement}</h3>
                <p>
                  Replaces <strong>{item.currentFile}</strong>
                </p>
                <p>{item.guidance}</p>
                <div className="tag-cloud compact-tags">
                  {item.placements.map((placement) => (
                    <span key={placement} className="tag-pill alt">
                      {placement}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block contrast-panel">
        <AssetImpactBoard
          title="Where the biggest visible site improvements will happen first."
          description="This helps the team prioritize real Kelel assets by showing which public pages are still relying most on the shared temporary visuals."
        />
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Replacement order"
          title="The clearest order for collecting the next real Kelel files."
          description="This queue prioritizes missing assets first and ranks them by how many visible website areas they improve."
        />
        <div className="resource-grid">
          {replacementPriorities.map((item) => (
            <article key={item.suggestedReplacement} className="resource-card">
              <span
                className={`status-pill ${
                  item.received ? "status-contacted" : "status-upcoming"
                }`}
              >
                {item.received ? "already received" : `priority ${item.priorityRank}`}
              </span>
              <h3>{item.suggestedReplacement}</h3>
              <p>
                Replaces <strong>{item.currentFile}</strong>
              </p>
              <p>{item.guidance}</p>
              <p className="resource-note">
                Impacts {item.impactCount} website area{item.impactCount === 1 ? "" : "s"}.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="resource-operations-grid">
        <section className="section-block contrast-panel">
          <SectionIntro
            eyebrow="Incoming files"
            title="What is currently inside incoming-assets."
            description="This shows the real files already delivered into the project handoff folders."
          />
          {incomingFiles.length > 0 ? (
            <div className="resource-grid compact-grid">
              {groupedIncomingFiles
                .filter((group) => group.files.length > 0)
                .map((group) => (
                  <article key={group.group} className="resource-card">
                    <span className="project-type">{group.group}</span>
                    <h3>{group.files.length} file{group.files.length === 1 ? "" : "s"}</h3>
                    <div className="tag-cloud compact-tags">
                      {group.files.map((file) => (
                        <span
                          key={`${group.group}-${file.name}`}
                          className="tag-pill alt"
                        >
                          {file.name}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
            </div>
          ) : (
            <div className="empty-state">
              <strong>No real asset files have been dropped into `incoming-assets` yet.</strong>
              <p>Add approved Kelel files there and this page will update automatically.</p>
            </div>
          )}
        </section>

        <section className="section-block">
          <SectionIntro
            eyebrow="Expected files"
            title="The next real files the project is already waiting for."
            description="These expected filenames make the asset handoff easier to track and easier to replace consistently across the website."
          />
          <p className="section-copy">
            Use the asset manifest template in{" "}
            <strong>`incoming-assets/asset-manifest-template.csv`</strong>{" "}
            to record approval, intended page placement, and any notes for each real file.
          </p>
          <div className="resource-grid compact-grid">
            {expectedAssetSummary.map((group) => (
              <article key={group.folder} className="resource-card">
                <span className="project-type">{group.folder}</span>
                <h3>
                  {group.expectedFiles.length - group.missingFiles.length}/
                  {group.expectedFiles.length} expected files ready
                </h3>
                <div className="tag-cloud compact-tags">
                  {group.expectedFiles.map((fileName) => (
                    <span
                      key={`${group.folder}-${fileName}`}
                      className={`tag-pill ${
                        group.receivedNames.includes(fileName) ? "alt" : ""
                      }`}
                    >
                      {fileName}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Sync plan"
          title="Exactly what the live media replacement command will update."
          description="When approved incoming files are present, `npm run sync:assets` copies them into these public website targets."
        />
        <p className="section-copy">
          Preview the replacement pass first with <strong>`npm run sync:assets:dry`</strong>,
          then run <strong>`npm run sync:assets`</strong> when the incoming files are approved.
        </p>
        <div className="resource-grid">
          {syncPlan.map((item) => (
            <article key={`${item.sourceFolder}-${item.sourceName}`} className="resource-card">
              <span
                className={`status-pill ${
                  item.ready ? "status-contacted" : "status-upcoming"
                }`}
              >
                {item.ready ? "ready to sync" : "waiting"}
              </span>
              <h3>{item.sourceName}</h3>
              <p>
                <strong>{item.sourceFolder}</strong> to <strong>{item.targetPath}</strong>
              </p>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionIntro
          eyebrow="Latest sync report"
          title="The most recent preview or sync run is saved for quick review."
          description="This gives the team a shared record of the last asset replacement check, including waiting or blocked items."
        />
        {latestSyncReport ? (
          <>
            <div className="enterprise-metric-row">
              <article>
                <span>Last mode</span>
                <strong>{latestSyncReport.mode}</strong>
              </article>
              <article>
                <span>Ready or synced</span>
                <strong>{latestSyncReport.summary.readyOrSyncedCount}</strong>
              </article>
              <article>
                <span>Still waiting</span>
                <strong>{latestSyncReport.summary.waitingCount}</strong>
              </article>
              <article>
                <span>Blocked</span>
                <strong>{latestSyncReport.summary.blockedCount}</strong>
              </article>
            </div>
            <p className="section-copy">
              Last run: <strong>{latestSyncReport.generatedAt}</strong>
            </p>
            <div className="resource-grid">
              {latestSyncReport.items.map((item) => (
                <article key={`${item.sourceFolder}-${item.sourceName}-report`} className="resource-card">
                  <span
                    className={`status-pill ${
                      item.status === "ready" || item.status === "synced"
                        ? "status-contacted"
                        : "status-upcoming"
                    }`}
                  >
                    {item.status}
                  </span>
                  <h3>{item.sourceName}</h3>
                  <p>
                    <strong>{item.sourceFolder}</strong> to <strong>{item.targetPath}</strong>
                  </p>
                  <p>{item.notes || item.label}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <strong>No sync report has been saved yet.</strong>
            <p>Run `npm run sync:assets:dry` or `npm run sync:assets` and this page will show the latest result.</p>
          </div>
        )}
      </section>

      <section className="section-block contrast-panel">
        <SectionIntro
          eyebrow="Manifest status"
          title="The browser view now checks the asset manifest too."
          description="This helps the team confirm not only that a file exists, but also that it has a folder, type, page placement, and public-use approval note."
        />
        {manifestRows.length > 0 ? (
          <div className="resource-grid">
            {manifestRows.map((row) => (
              <article key={`${row.folder}-${row.filename}`} className="resource-card">
                <span
                  className={`status-pill ${
                    row.approvedForPublicUse.trim().toLowerCase() === "yes"
                      ? "status-contacted"
                      : "status-upcoming"
                  }`}
                >
                  {row.approvedForPublicUse.trim().toLowerCase() === "yes"
                    ? "approved"
                    : "review needed"}
                </span>
                <h3>{row.filename}</h3>
                <p>
                  <strong>{row.folder}</strong> | {row.assetType}
                </p>
                <p>{row.preferredPageOrSection}</p>
                <p>{row.notes}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <strong>No asset manifest rows found yet.</strong>
            <p>Add entries to `incoming-assets/asset-manifest-template.csv` to document incoming Kelel files.</p>
          </div>
        )}
      </section>

      <section className="resource-bottom-grid">
        <section className="section-block contrast-panel">
          <ExecutiveContactCard
            compact
            title="Asset coordination"
            copy="Use this status page together with the asset guide when collecting the next real Kelel files."
          />
        </section>
        <article className="section-block">
          <SectionIntro
            eyebrow="Next action"
            title="Drop the real files into incoming-assets and this page will immediately show progress."
            description="Once the real files are present, the dry-run and sync workflow can move from planning into actual replacement."
          />
          <div className="contact-panel-stack">
            <Link href="/asset-guide" className="primary-link">
              Review asset guide
            </Link>
            <Link href="/resources" className="secondary-link">
              Open resources
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
