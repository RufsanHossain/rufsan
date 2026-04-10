import { track } from "@vercel/analytics";

interface Events {
  resume_download: Record<string, never>;
  cta_click: { label: string; location: string };
  contact_form_submit: { project_type: string };
  contact_form_success: Record<string, never>;
  blog_read: { slug: string; title: string };
  case_study_view: { id: string; title: string };
  share_click: { platform: string; slug: string };
  external_link: { label: string; href: string };
  cmd_palette_open: Record<string, never>;
}

export function trackEvent<K extends keyof Events>(
  event: K,
  ...args: Events[K] extends Record<string, never> ? [] : [Events[K]]
) {
  track(event, args[0] as Record<string, string>);
}
