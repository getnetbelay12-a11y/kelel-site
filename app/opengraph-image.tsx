/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site-content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getLogoDataUri() {
  const filePath = path.join(process.cwd(), "public", "brand", "kelel-logo-en.jpg");
  const buffer = await readFile(filePath);
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const logoSrc = await getLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #f8f4ec 0%, #efe8db 45%, #e7ded0 100%)",
          color: "#13211d",
          padding: "52px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            border: "1px solid rgba(19,33,29,0.12)",
            borderRadius: 36,
            padding: "42px 46px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "rgba(255,255,255,0.58)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
            }}
          >
            <img
              src={logoSrc}
              alt="Kelel logo"
              width={220}
              height={145}
              style={{ objectFit: "contain" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: "#8d3517",
                }}
              >
                IT Solutions Company
              </div>
              <div style={{ display: "flex", fontSize: 42, fontWeight: 800 }}>{site.name}</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 880,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 72,
                lineHeight: 1.02,
                fontWeight: 700,
              }}
            >
              Reliable IT solutions for modern organizations.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.4,
                color: "#556660",
              }}
            >
              Managed IT support, infrastructure, software systems, and digital
              transformation support from Addis Ababa.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 24,
              color: "#1d4b42",
            }}
          >
            <div style={{ display: "flex" }}>{site.contactPerson} | {site.contactRole}</div>
            <div style={{ display: "flex" }}>{site.email}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
