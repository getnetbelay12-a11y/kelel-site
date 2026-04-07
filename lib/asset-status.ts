import { promises as fs } from "fs";
import path from "path";

import { assetReplacementMap, incomingAssetFolders } from "@/lib/site-content";

export type IncomingAssetGroup =
  | "leadership"
  | "team"
  | "projects"
  | "certificates"
  | "unfiled";

export type IncomingAssetFile = {
  group: IncomingAssetGroup;
  name: string;
};

export type AssetManifestRow = {
  filename: string;
  folder: string;
  assetType: string;
  approvedForPublicUse: string;
  preferredPageOrSection: string;
  notes: string;
};

export type AssetSyncReport = {
  generatedAt: string;
  mode: "dry-run" | "sync";
  summary: {
    readyOrSyncedCount: number;
    waitingCount: number;
    blockedCount: number;
  };
  items: Array<{
    sourceFolder: string;
    sourceName: string;
    targetName: string;
    targetPath: string;
    label: string;
    status: "waiting" | "blocked" | "ready" | "synced";
    approvedByManifest: boolean;
    notes: string;
  }>;
};

export const assetSyncPlan = [
  {
    sourceFolder: "leadership",
    sourceName: "kelel-leadership-hero.jpg",
    targetName: "hero-businessman-tablet.jpg",
    targetPath: "public/media/hero-businessman-tablet.jpg",
    label: "Homepage and leadership hero image",
  },
  {
    sourceFolder: "team",
    sourceName: "kelel-team-review.jpg",
    targetName: "team-tablet-meeting.jpg",
    targetPath: "public/media/team-tablet-meeting.jpg",
    label: "Team review and trust visual",
  },
  {
    sourceFolder: "team",
    sourceName: "kelel-delivery-team.jpg",
    targetName: "it-support-team.jpg",
    targetPath: "public/media/it-support-team.jpg",
    label: "Delivery and support visual",
  },
] as const;

function getIncomingAssetsRoot() {
  return path.join(process.cwd(), "incoming-assets");
}

function parseCsvLine(line: string) {
  const values: string[] = [];
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

export async function listIncomingAssetFiles(): Promise<IncomingAssetFile[]> {
  const incomingRoot = getIncomingAssetsRoot();

  try {
    const groups: IncomingAssetGroup[] = [
      "leadership",
      "team",
      "projects",
      "certificates",
    ];
    const collected: IncomingAssetFile[] = [];

    for (const group of groups) {
      const groupPath = path.join(incomingRoot, group);

      try {
        const entries = await fs.readdir(groupPath, { withFileTypes: true });
        for (const entry of entries) {
          if (!entry.isFile() || entry.name.toLowerCase() === ".gitkeep") {
            continue;
          }

          collected.push({ group, name: entry.name });
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          throw error;
        }
      }
    }

    const rootEntries = await fs.readdir(incomingRoot, { withFileTypes: true });
    for (const entry of rootEntries) {
      const lower = entry.name.toLowerCase();
      if (!entry.isFile() || lower === "readme.md" || lower === ".gitkeep") {
        continue;
      }

      collected.push({ group: "unfiled", name: entry.name });
    }

    return collected;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function readAssetManifestRows(): Promise<AssetManifestRow[]> {
  const manifestPath = path.join(getIncomingAssetsRoot(), "asset-manifest-template.csv");

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
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function readAssetSyncReport(): Promise<AssetSyncReport | null> {
  const reportPath = path.join(process.cwd(), "data", "asset-sync-report.json");

  try {
    const raw = await fs.readFile(reportPath, "utf8");
    return JSON.parse(raw) as AssetSyncReport;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export async function getAssetStatusData() {
  const incomingFiles = await listIncomingAssetFiles();
  const manifestRows = await readAssetManifestRows();
  const latestSyncReport = await readAssetSyncReport();
  const groups: IncomingAssetGroup[] = [
    "leadership",
    "team",
    "projects",
    "certificates",
    "unfiled",
  ];
  const groupedIncomingFiles: Array<{
    group: IncomingAssetGroup;
    files: IncomingAssetFile[];
  }> = groups.map((group) => ({
    group,
    files: incomingFiles.filter((file) => file.group === group),
  }));

  const matchedCount = assetReplacementMap.filter((item) =>
    incomingFiles.some((file) => file.name === item.suggestedReplacement),
  ).length;

  const expectedAssetSummary = incomingAssetFolders.map((group) => {
    const receivedNames = incomingFiles
      .filter((file) => file.group === group.folder)
      .map((file) => file.name);

    return {
      ...group,
      receivedNames,
      missingFiles: group.expectedFiles.filter(
        (fileName) => !receivedNames.includes(fileName),
      ),
    };
  });

  const manifestSummary = {
    totalRows: manifestRows.length,
    approvedRows: manifestRows.filter(
      (row) => row.approvedForPublicUse.trim().toLowerCase() === "yes",
    ).length,
  };
  const syncPlan = assetSyncPlan.map((item) => ({
    ...item,
    ready: incomingFiles.some(
      (file) => file.group === item.sourceFolder && file.name === item.sourceName,
    ),
  }));

  const metrics = {
    expectedReplacements: assetReplacementMap.length,
    matchedRealFiles: matchedCount,
    stillWaiting: assetReplacementMap.length - matchedCount,
    extraIncomingFiles: Math.max(0, incomingFiles.length - matchedCount),
    approvedManifestRows: manifestSummary.approvedRows,
    syncReadyCount: syncPlan.filter((item) => item.ready).length,
  };

  const replacementPriorities = assetReplacementMap
    .map((item) => {
      const received = incomingFiles.some(
        (file) => file.name === item.suggestedReplacement,
      );

      return {
        ...item,
        received,
        impactCount: item.placements.length,
      };
    })
    .sort((left, right) => {
      if (left.received !== right.received) {
        return left.received ? 1 : -1;
      }

      if (left.impactCount !== right.impactCount) {
        return right.impactCount - left.impactCount;
      }

      return left.suggestedReplacement.localeCompare(right.suggestedReplacement);
    })
    .map((item, index) => ({
      ...item,
      priorityRank: index + 1,
    }));

  return {
    incomingFiles,
    manifestRows,
    groupedIncomingFiles,
    expectedAssetSummary,
    manifestSummary,
    syncPlan,
    latestSyncReport,
    metrics,
    replacementPriorities,
    replacementMap: assetReplacementMap,
  };
}
