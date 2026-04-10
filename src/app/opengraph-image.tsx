import { ImageResponse } from "next/og";

export const alt = "Rufsan Hossain Santo — Full-Stack Developer & Agency Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#050505",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
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
          <span style={{ fontSize: "24px", color: "#71717a" }}>
            rufsansanto.com
          </span>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}
        >
          Rufsan Hossain Santo
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#71717a",
            lineHeight: 1.5,
          }}
        >
          Senior Full-Stack Developer & Agency Founder
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
