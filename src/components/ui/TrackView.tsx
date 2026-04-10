"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function TrackCaseView({ id, title }: { id: string; title: string }) {
  useEffect(() => {
    trackEvent("case_study_view", { id, title });
  }, [id, title]);
  return null;
}
