import React from "react";
import Card from "@/components/ui/card";
import Avatar from "@/components/avatar";
import LanguageSelector from "@/components/language-selector";
import { renderWithBold } from "@/lib/text";
import type { FlySection } from "./fly-section-card";

interface FlyHeroCardProps {
  section: FlySection;
  testId: string;
}

// Same overlapping-avatar layout as the profile card's HomeSection, always in "aviator" (headset) mode.
export default function FlyHeroCard({ section, testId }: FlyHeroCardProps) {
  return (
    <Card data-testid={testId} className="relative overflow-visible">
      <LanguageSelector buildPath={(locale) => `/${locale}/vuela-conmigo`} />
      <div className="relative pt-20 px-8 pb-8 md:pb-12">
        <div className="mt-[-200px] mb-6">
          <div className="w-40 h-40 rounded-full bg-white p-2 shadow-xl m-auto">
            <Avatar season="aviator" />
          </div>
        </div>
        <span className="text-4xl" aria-hidden="true">
          {section.emoji}
        </span>
        <h2 className="text-xl md:text-4xl font-light text-gray-800 mt-2 mb-8">{section.title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>{renderWithBold(paragraph)}</p>
          ))}
        </div>
      </div>
    </Card>
  );
}
