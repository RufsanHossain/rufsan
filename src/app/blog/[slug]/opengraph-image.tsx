import { ImageResponse } from "next/og";
import { BLOG_POSTS } from "@/lib/content";

export const alt = "Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

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
              {post?.tag ?? "Blog"}
            </span>
            {post?.readTime && (
              <span
                style={{
                  padding: "6px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                  fontSize: "16px",
                  color: "#71717a",
                }}
              >
                {post.readTime} read
              </span>
            )}
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
            {post?.title ?? "Blog Post"}
          </div>
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#71717a",
            lineHeight: 1.6,
            maxWidth: "700px",
          }}
        >
          {post?.excerpt ?? ""}
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
