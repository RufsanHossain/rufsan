"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "rufsanhossain315@gmail.com";
const FROM_EMAIL = "Contact Form <onboarding@resend.dev>";

interface ContactPayload {
  name: string;
  email: string;
  type: string;
  message: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

const TYPE_LABELS: Record<string, string> = {
  saas: "SaaS Product",
  ai: "AI / ML Integration",
  data: "Data / Analytics",
  consulting: "Consulting",
  other: "Other",
};

export async function sendContactEmail(data: ContactPayload): Promise<ActionResult> {
  /* ── Server-side validation ── */
  if (!data.name.trim()) return { success: false, error: "Name is required" };
  if (!data.email.trim()) return { success: false, error: "Email is required" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { success: false, error: "Invalid email" };
  if (!data.type) return { success: false, error: "Project type is required" };
  if (!data.message.trim()) return { success: false, error: "Message is required" };
  if (data.message.trim().length < 20) return { success: false, error: "Message too short" };

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `New Inquiry: ${TYPE_LABELS[data.type] ?? data.type} — ${data.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #050505; padding: 32px; border-radius: 12px; border: 1px solid #1a1a1a;">
            <h2 style="color: #8deab2; margin: 0 0 24px; font-size: 20px;">
              New Project Inquiry
            </h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #71717a; font-size: 14px; width: 120px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #e4e4e7; font-size: 14px;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #71717a; font-size: 14px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #e4e4e7; font-size: 14px;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color: #8deab2; text-decoration: none;">${escapeHtml(data.email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #71717a; font-size: 14px;">Project Type</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #e4e4e7; font-size: 14px;">${escapeHtml(TYPE_LABELS[data.type] ?? data.type)}</td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <p style="color: #71717a; font-size: 13px; margin: 0 0 8px;">Message</p>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid #1a1a1a; border-radius: 8px; padding: 16px;">
                <p style="color: #e4e4e7; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
              </div>
            </div>

            <p style="color: #71717a; font-size: 12px; margin: 24px 0 0; text-align: center;">
              Sent from rufsansanto.com contact form
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send email. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("Contact form error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}