import React from "react";
import Card from "@/components/ui/card";
import { renderWithBold } from "@/lib/text";

export interface FlySection {
  emoji: string;
  title: string;
  paragraphs: string[];
}

interface FlySectionCardProps {
  section: FlySection;
  testId: string;
  children?: React.ReactNode;
}

export default function FlySectionCard({ section, testId, children }: FlySectionCardProps) {
  return (
    <Card data-testid={testId} className="max-h-[90dvh] overflow-y-auto">
      <div className="p-8 md:p-12">
        <span className="text-4xl" aria-hidden="true">
          {section.emoji}
        </span>
        <h2 className="text-xl md:text-4xl font-light text-gray-800 mt-2 mb-8">{section.title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>{renderWithBold(paragraph)}</p>
          ))}
        </div>
        {children}
      </div>
    </Card>
  );
}
