import { promises as fs } from "fs";
import path from "path";

const projectRoot = process.cwd();
const incomingRoot = path.join(projectRoot, "incoming-assets");
const publicMediaRoot = path.join(projectRoot, "public", "media");
const reportPath = path.join(projectRoot, "data", "asset-sync-report.json");
const manifestPath = path.join(incomingRoot, "asset-manifest-template.csv");
const dryRun = process.argv.includes("--dry-run");

const replacements = [
  {
    sourceFolder: "leadership",
    sourceName: "kelel-leadership-hero.jpg",
    targetName: "hero-businessman-tablet.jpg",
    label: "Homepage and leadership hero image",
  },
  {
    sourceFolder: "team",
    sourceName: "kelel-team-review.jpg",
    targetName: "team-tablet-meeting.jpg",
    label: "Team review and trust visual",
  },
  {
    sourceFolder: "team",
    sourceName: "kelel-delivery-team.jpg",
    targetName: "it-support-team.jpg",
    label: "Delivery and support visual",
  },
];

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureFolder(folderPath) {
  await fs.mkdir(folderPath, { recursive: true });
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

async function readManifestRows() {
  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    const lines = raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const [, ...dataLines] = lines;
    return dataLines.map((line) => {
      const [
        filename,
        folder,
        assetType,
        approvedForPublicUse,
        preferredPageOrSection,
        notes,
      ] = parseCsvLine(line);

      return {
        filename,
        folder,
        assetType,
        approvedForPublicUse,
        preferredPageOrSection,
        notes,
      };
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function main() {
  await ensureFolder(publicMediaRoot);
  await ensureFolder(path.dirname(reportPath));

  const manifestRows = await readManifestRows();

  let copiedCount = 0;
  let missingCount = 0;
  let blockedCount = 0;
  const reportItems = [];

  console.log(
    `${dryRun ? "Previewing" : "Syncing"} approved incoming website assets...\n`,
  );

  for (const item of replacements) {
    const sourcePath = path.join(incomingRoot, item.sourceFolder, item.sourceName);
    const targetPath = path.join(publicMediaRoot, item.targetName);
    const sourceExists = await fileExists(sourcePath);
    const manifestRow = manifestRows.find(
      (row) => row.filename === item.sourceName && row.folder === item.sourceFolder,
    );
    const approved =
      manifestRow?.approvedForPublicUse?.trim().toLowerCase() === "yes";

    if (!sourceExists) {
      console.log(`[waiting] ${item.sourceFolder}/${item.sourceName}`);
      console.log(`          target: public/media/${item.targetName}`);
      console.log(`          use: ${item.label}\n`);
      missingCount += 1;
      reportItems.push({
        ...item,
        status: "waiting",
        approvedByManifest: approved,
        notes: manifestRow?.notes ?? "",
      });
      continue;
    }

    if (!manifestRow || !approved) {
      console.log(`[blocked] ${item.sourceFolder}/${item.sourceName}`);
      console.log(`          target: public/media/${item.targetName}`);
      console.log("          reason: manifest row missing or not approved for public use\n");
      blockedCount += 1;
      reportItems.push({
        ...item,
        status: "blocked",
        approvedByManifest: approved,
        notes: manifestRow?.notes ?? "",
      });
      continue;
    }

    if (dryRun) {
      console.log(`[ready] ${item.sourceFolder}/${item.sourceName}`);
      console.log(`        target: public/media/${item.targetName}`);
      console.log(`        use: ${item.label}\n`);
      reportItems.push({
        ...item,
        status: "ready",
        approvedByManifest: true,
        notes: manifestRow.notes,
      });
    } else {
      await fs.copyFile(sourcePath, targetPath);
      console.log(`[synced] ${item.sourceFolder}/${item.sourceName}`);
      console.log(`         target: public/media/${item.targetName}`);
      console.log(`         use: ${item.label}\n`);
      reportItems.push({
        ...item,
        status: "synced",
        approvedByManifest: true,
        notes: manifestRow.notes,
      });
    }
    copiedCount += 1;
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: dryRun ? "dry-run" : "sync",
    summary: {
      readyOrSyncedCount: copiedCount,
      waitingCount: missingCount,
      blockedCount,
    },
    items: reportItems,
  };

  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(
    `Asset sync summary: ${copiedCount} ${dryRun ? "ready" : "synced"}, ${missingCount} still waiting, ${blockedCount} blocked.`,
  );
  console.log(`Report saved to data/asset-sync-report.json`);

  if (copiedCount === 0 && (missingCount > 0 || blockedCount > 0)) {
    process.exitCode = 1;
  }
}

await main();
