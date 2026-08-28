import React, { useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Copy, NotebookPen } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  trackBlockVisible,
  trackContentDisplayed,
  trackNoteLinkCopied,
  trackNoteOpened,
} from "@/lib/analytics";
import {
  buildPortfolioAbsoluteLink,
  buildPortfolioPath,
  normalizeLocale,
  pushPortfolioRoute,
} from "@/lib/routes";

interface NoteEntry {
  title: string;
  shortText: string;
  tags: string[];
  slug: string;
}

interface NotesSectionProps {
  activeSlug?: string | null;
}

function buildNoteShareLink(locale: string, slug: string): string {
  if (typeof window === "undefined") {
    return buildPortfolioPath(locale, "notes", slug);
  }

  const origin = window.location.origin;
  return buildPortfolioAbsoluteLink(origin, locale, "notes", slug);
}

export default function NotesSection({ activeSlug = null }: NotesSectionProps) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleNotesRef = useRef<Set<string>>(new Set());

  const notes = useMemo(
    () => t("notesItems", { returnObjects: true }) as NoteEntry[],
    [t]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const slug = entry.target.getAttribute("data-note-slug");
          if (!slug || visibleNotesRef.current.has(slug)) return;

          visibleNotesRef.current.add(slug);
          trackBlockVisible("notes", slug);
          trackContentDisplayed("note", slug, "notes");
        });
      },
      { threshold: 0.6 }
    );

    const targets = container.querySelectorAll<HTMLElement>("[data-note-slug]");
    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, [notes]);

  const handleCopy = async (slug: string) => {
    const locale = normalizeLocale(i18n.language);
    const link = buildNoteShareLink(locale, slug);
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(link);
    }
    trackNoteLinkCopied(slug);
  };

  const handleOpenNote = (slug: string) => {
    const locale = normalizeLocale(i18n.language);
    pushPortfolioRoute(locale, "notes", slug);
    trackNoteOpened(slug);
  };

  return (
    <Card data-testid="notes-section">
      <div className="p-8 md:p-12" ref={containerRef}>
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("notesLabel")}
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mt-2 mb-4">{t("notesTitle")}</h2>
        <p className="text-gray-600 leading-relaxed mb-8">{t("notesIntro")}</p>

        <div className="space-y-4">
          {notes.map((note) => (
            <article
              key={note.slug}
              data-note-slug={note.slug}
              className={`rounded-2xl border bg-white p-5 shadow-sm ${
                activeSlug === note.slug ? "border-[#4A6FA5] ring-2 ring-[#4A6FA5]/20" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{note.title}</h3>
                  <p className="text-gray-600 mt-2">{note.shortText}</p>
                </div>
                <NotebookPen className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {note.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  onClick={() => handleOpenNote(note.slug)}
                >
                  {t("openNote")}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="min-h-11"
                  onClick={() => void handleCopy(note.slug)}
                >
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  {t("copyLink")}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Card>
  );
}
