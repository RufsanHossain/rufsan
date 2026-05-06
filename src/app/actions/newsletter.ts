"use server";

import { Resend } from "resend";

/* "Email-yourself" newsletter signup — no Resend Audience required, so this
 * works on Resend's free tier. Every successful submission sends a
 * notification email to TO_EMAIL with the subscriber's address. The address
 * is then curated manually (inbox folder / Notion / wherever) until the list
 * grows enough to justify proper audience tooling. */

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "rufsanhossain315@gmail.com";
const FROM_EMAIL = "Rufsan Shares <onboarding@resend.dev>";

/* ── Simple in-memory rate limiter (mirrors the contact form) ── */
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 3;

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const timestamps = (rateMap.get(email) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  rateMap.set(email, timestamps);
  return false;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function subscribeToNewsletter(
  email: string,
  source = "unknown",
): Promise<ActionResult> {
  /* ── Validation ── */
  const trimmed = email.trim();
  if (!trimmed) return { success: false, error: "Email is required" };
  if (trimmed.length > 320) return { success: false, error: "Email is too long" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { success: false, error: "Please enter a valid email" };
  }

  if (isRateLimited(trimmed)) {
    return { success: false, error: "Too many attempts. Try again in a minute." };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: trimmed,
      subject: `New Rufsan Shares subscriber: ${trimmed}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #050505; padding: 32px; border-radius: 12px; border: 1px solid #1a1a1a;">
            <h2 style="color: #8deab2; margin: 0 0 24px; font-size: 20px;">
              New Rufsan Shares Subscriber
            </h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #71717a; font-size: 14px; width: 120px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #e4e4e7; font-size: 14px;">
                  <a href="mailto:${escapeHtml(trimmed)}" style="color: #8deab2; text-decoration: none;">${escapeHtml(trimmed)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #71717a; font-size: 14px;">Source</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #e4e4e7; font-size: 14px;">${escapeHtml(source)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #71717a; font-size: 14px;">When</td>
                <td style="padding: 12px 0; color: #e4e4e7; font-size: 14px;">${new Date().toUTCString()}</td>
              </tr>
            </table>

            <p style="color: #71717a; font-size: 12px; margin: 24px 0 0; text-align: center;">
              Add to your subscriber list, then you're done. Reply directly to thank them.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Couldn't subscribe right now. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
