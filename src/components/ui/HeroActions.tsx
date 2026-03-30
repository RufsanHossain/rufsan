"use client";

import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { RESUME_URL } from "@/lib/constants";

type HeroAction =
  | { type: "scroll"; target: string }
  | { type: "navigate"; href: string }
  | { type: "download" };

interface HeroWithActionsProps {
  breadcrumb?: { label: string; href?: string }[];
  badge?: string;
  badgeIcon?: string;
  h1: [string, string, string];
  subtitle: string;
  btn1: string;
  btn2: string;
  action1: HeroAction;
  action2: HeroAction;
  btn2Resume?: boolean;
}

function executeAction(action: HeroAction, router: ReturnType<typeof useRouter>) {
  switch (action.type) {
    case "scroll":
      document.getElementById(action.target)?.scrollIntoView({ behavior: "smooth" });
      break;
    case "navigate":
      router.push(action.href);
      break;
    case "download": {
      const link = document.createElement("a");
      link.href = RESUME_URL;
      link.download = "Rufsan-Hossain-Santo-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      break;
    }
  }
}

export function HeroWithActions({
  action1,
  action2,
  ...heroProps
}: HeroWithActionsProps) {
  const router = useRouter();

  return (
    <HeroSection
      {...heroProps}
      on1={() => { executeAction(action1, router); }}
      on2={() => { executeAction(action2, router); }}
    />
  );
}
