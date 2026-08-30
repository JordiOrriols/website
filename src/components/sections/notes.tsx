import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { NotebookPen } from "lucide-react";
import Card from "@/components/ui/card";
import Carousel from "@/components/ui/carousel";
import { trackBlockVisible, trackContentDisplayed } from "@/lib/analytics";

interface NoteEntry {
  title: string;
  shortText: string;
  longText?: string;
  tags: string[];
  slug: string;
}

export default function NotesSection() {
  const { t } = useTranslation();
  const notifiedSlugsRef = useRef<Set<string>>(new Set());

  const notes = t("notesItems", { returnObjects: true }) as NoteEntry[];

  const handleActiveIndexChange = (_index: number, note: NoteEntry) => {
    if (notifiedSlugsRef.current.has(note.slug)) return;
    notifiedSlugsRef.current.add(note.slug);
    trackBlockVisible("notes", note.slug);
    trackContentDisplayed("note", note.slug, "notes");
  };

  return (
    <Card data-testid="notes-section">
      <div className="p-6 md:p-8">
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("notesLabel")}
        </span>
        <h2 className="text-xl md:text-4xl font-light text-gray-800 mt-2 mb-3">
          {t("notesTitle")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">{t("notesIntro")}</p>

        <Carousel
          items={notes}
          getKey={(note) => note.slug}
          onActiveIndexChange={handleActiveIndexChange}
          ariaLabel={t("notesLabel")}
          itemClassName="w-[85%] sm:w-[60%] md:w-[44%]"
          renderItem={(note, _index, isActive) => (
            <article
              data-testid={`note-card-${note.slug}`}
              className={`w-full h-full flex flex-col rounded-2xl border bg-white p-6 md:p-8 pb-10 md:pb-14 shadow-sm transition-all duration-300 ${
                isActive ? "border-[#4A6FA5] ring-2 ring-[#4A6FA5]/20" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-xl font-medium text-gray-800">{note.title}</h3>
                <NotebookPen className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
              </div>
              <p className="text-gray-600 leading-relaxed">{note.longText ?? note.shortText}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          )}
        />
      </div>
    </Card>
  );
}
