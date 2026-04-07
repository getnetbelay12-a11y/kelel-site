"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  businessResources,
  evidenceRegister,
  projects,
  sectorPages,
} from "@/lib/site-content";

type ExplorerItem = {
  title: string;
  description: string;
  href?: string;
  label: string;
  type: "resource" | "case-study" | "sector" | "evidence";
  status?: string;
};

const explorerItems: ExplorerItem[] = [
  ...businessResources.map((item) => ({
    title: item.title,
    description: item.description,
    href: item.href,
    label: item.type,
    type: "resource" as const,
  })),
  ...projects.map((project) => ({
    title: project.name,
    description: project.blurb,
    href: `/work/${project.slug}`,
    label: project.type,
    type: "case-study" as const,
  })),
  ...sectorPages.map((sector) => ({
    title: sector.name,
    description: sector.summary,
    href: `/industries/${sector.slug}`,
    label: "Industry page",
    type: "sector" as const,
  })),
  ...evidenceRegister.map((item) => ({
    title: item.title,
    description: item.summary,
    label: item.category,
    type: "evidence" as const,
    status: item.status,
  })),
];

const filterOptions = [
  { value: "all", label: "All" },
  { value: "resource", label: "Documents" },
  { value: "case-study", label: "Case studies" },
  { value: "sector", label: "Sectors" },
  { value: "evidence", label: "Evidence" },
];

export function ResourceExplorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const totalCounts = useMemo(
    () => ({
      all: explorerItems.length,
      resource: explorerItems.filter((item) => item.type === "resource").length,
      "case-study": explorerItems.filter((item) => item.type === "case-study").length,
      sector: explorerItems.filter((item) => item.type === "sector").length,
      evidence: explorerItems.filter((item) => item.type === "evidence").length,
    }),
    [],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return explorerItems.filter((item) => {
      const matchesFilter = filter === "all" || item.type === filter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${item.title} ${item.description} ${item.label} ${item.status ?? ""}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div className="resource-explorer">
      <div className="resource-explorer-summary">
        <article className="resource-explorer-summary-card">
          <span>Visible now</span>
          <strong>{filteredItems.length}</strong>
          <p>Items matching the current search and filter.</p>
        </article>
        <article className="resource-explorer-summary-card">
          <span>Selected view</span>
          <strong>
            {filterOptions.find((option) => option.value === filter)?.label ?? "All"}
          </strong>
          <p>
            {filter === "all"
              ? "Showing the full review library."
              : "Focused on one part of the review system."}
          </p>
        </article>
        <article className="resource-explorer-summary-card">
          <span>Search state</span>
          <strong>{query.trim().length > 0 ? "Active" : "Open"}</strong>
          <p>
            {query.trim().length > 0
              ? "Keyword filtering is refining the visible review items."
              : "No keyword is applied, so broader browsing is available."}
          </p>
        </article>
      </div>
      <div className="resource-explorer-controls">
        <label>
          <span>Search resources</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documents, sectors, proof, or case studies"
          />
        </label>

        <label>
          <span>Filter</span>
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="resource-explorer-filter-row">
        <div className="tag-cloud compact-tags">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`explorer-filter-chip ${
                filter === option.value ? "active" : ""
              }`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
              <small>{totalCounts[option.value as keyof typeof totalCounts]}</small>
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="resource-grid">
          {filteredItems.map((item, index) => (
            <article
              key={`${item.type}-${item.title}`}
              className={`resource-card ${index === 0 ? "resource-card-featured" : ""}`}
            >
              <div className="evidence-card-top">
                <span className="project-type">{item.label}</span>
                {item.status ? (
                  <span
                    className={`status-pill ${
                      item.status === "available" ? "status-contacted" : "status-upcoming"
                    }`}
                  >
                    {item.status === "available" ? "Available now" : "Prepared next"}
                  </span>
                ) : (
                  <span className={`status-pill ${index === 0 ? "status-contacted" : "status-upcoming"}`}>
                    {index === 0 ? "Best match" : "Result"}
                  </span>
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.href ? (
                <Link href={item.href} className="secondary-link">
                  Open item
                </Link>
              ) : (
                <span className="resource-note">
                  Add external document or certificate when available.
                </span>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="resource-explorer-empty">
          <span className="eyebrow">No direct matches</span>
          <h3>No review materials matched that search yet.</h3>
          <p>
            Try a broader keyword, switch back to <strong>All</strong>, or use the
            evidence filter to review what is available now versus what is still prepared next.
          </p>
        </div>
      )}
    </div>
  );
}
