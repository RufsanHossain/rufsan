"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResumeModal } from "@/components/ui/ResumeModal";

type HeroAction =
  | { type: "scroll"; target: string }
  | { type: "navigate"; href: string }
  | { type: "modal"; target: "resume" };

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

export function HeroWithActions({
  action1,
  action2,
  ...heroProps
}: HeroWithActionsProps) {
  const router = useRouter();
  const [resumeOpen, setResumeOpen] = useState(false);

  const executeAction = (action: HeroAction) => {
    switch (action.type) {
      case "scroll":
        document.getElementById(action.target)?.scrollIntoView({ behavior: "smooth" });
        break;
      case "navigate":
        router.push(action.href);
        break;
      case "modal":
        // Currently only `resume` exists; switch on action.target when more modals are added.
        setResumeOpen(true);
        break;
    }
  };

  return (
    <>
      <HeroSection
        {...heroProps}
        on1={() => { executeAction(action1); }}
        on2={() => { executeAction(action2); }}
      />
      <ResumeModal open={resumeOpen} onClose={() => { setResumeOpen(false); }} />
    </>
  );
}
