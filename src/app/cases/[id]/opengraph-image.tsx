import { ImageResponse } from "next/og";
import { CASES } from "@/lib/content";

export const alt = "Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cs = CASES.find((c) => c.slug === id);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#050505",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#8deab2",
              }}
            />
            <span style={{ fontSize: "22px", color: "#71717a" }}>
              Rufsan Hossain Santo
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                padding: "6px 16px",
                background: "rgba(141,234,178,0.12)",
                border: "1px solid rgba(141,234,178,0.25)",
                borderRadius: "6px",
                fontSize: "16px",
                color: "#8deab2",
              }}
            >
              {cs?.vertical ?? "Case Study"}
            </span>
          </div>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            {cs?.title ?? "Case Study"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "24px",
              color: "#8deab2",
              fontWeight: 600,
            }}
          >
            {cs?.outcome ?? ""}
          </div>
          <div
            style={{
              display: "flex",
              gap: "24px",
            }}
          >
            {cs?.metrics.slice(0, 4).map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#fafafa",
                  }}
                >
                  {m.v}
                </span>
                <span style={{ fontSize: "14px", color: "#71717a" }}>
                  {m.l}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "4px",
            background: "linear-gradient(90deg, #8deab2, #8deab200)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
