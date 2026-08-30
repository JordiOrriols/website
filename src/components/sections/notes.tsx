import React, { useMemo, useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, NotebookPen } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  trackBlockVisible,
  trackContentDisplayed,
  trackNoteOpened,
} from "@/lib/analytics";
import {
  normalizeLocale,
  pushPortfolioRoute,
  replacePortfolioRoute,
} from "@/lib/routes";

interface NoteEntry {
  title: string;
  shortText: string;
  longText?: string;
  tags: string[];
  slug: string;
}

interface NotesSectionProps {
  activeSlug?: string | null;
}

export default function NotesSection({ activeSlug = null }: NotesSectionProps) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleNotesRef = useRef<Set<string>>(new Set());
  const [selectedSlug, setSelectedSlug] = useState<string | null>(activeSlug);
  const prevActiveSlugRef = useRef<string | null>(activeSlug);

  const notes = useMemo(
    () => t("notesItems", { returnObjects: true }) as NoteEntry[],
    [t]
  );

  useEffect(() => {
    if (prevActiveSlugRef.current !== activeSlug) {
      setSelectedSlug(activeSlug);
      prevActiveSlugRef.current = activeSlug;
    }
  }, [activeSlug]);

  const activeNote = useMemo(() => {
    if (!selectedSlug) return null;
    return notes.find((note) => note.slug === selectedSlug) ?? null;
  }, [selectedSlug, notes]);

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

  const openNote = (slug: string) => {
    const locale = normalizeLocale(i18n.language);
    setSelectedSlug(slug);
    pushPortfolioRoute(locale, "notes", slug);
    trackNoteOpened(slug);
  };

  const backToNotesRoot = () => {
    const locale = normalizeLocale(i18n.language);
    setSelectedSlug(null);
    replacePortfolioRoute(locale, "notes");
  };

  return (
    <Card data-testid="notes-section">
      <div className="p-6 md:p-8" ref={containerRef}>
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("notesLabel")}
        </span>
        <h2 className="text-xl md:text-4xl font-light text-gray-800 mt-2 mb-3">{t("notesTitle")}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{t("notesIntro")}</p>

        <AnimatePresence initial={false}>
          {activeNote ? (
            <motion.article
              key={`note-detail-${activeNote.slug}`}
              data-note-slug={activeNote.slug}
              className="rounded-2xl border border-[#4A6FA5] ring-2 ring-[#4A6FA5]/20 bg-white p-5 shadow-sm"
              data-testid="note-detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <Button type="button" variant="ghost" className="min-h-10 px-2" onClick={backToNotesRoot}>
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  {t("backToNotes")}
                </Button>
                <span className="rounded-full bg-[#EAF1FA] px-3 py-1 text-xs font-medium text-[#2D4A6B]">
                  {t("levelTwo")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-medium text-gray-800">{activeNote.title}</h3>
                <NotebookPen className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
              </div>

              <div className="mt-4 max-h-[44dvh] overflow-y-auto pr-1">
                {(activeNote.longText ?? activeNote.shortText)
                  .split("\n\n")
                  .filter(Boolean)
                  .map((paragraph) => (
                    <p key={paragraph} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {activeNote.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ) : (
            <motion.div
              key="notes-list"
              className="space-y-3 max-h-[50dvh] overflow-y-auto pr-1"
              data-testid="notes-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {notes.map((note) => (
                <button
                  key={note.slug}
                  data-note-slug={note.slug}
                  type="button"
                  onClick={() => openNote(note.slug)}
                  className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-colors hover:border-[#4A6FA5] ${
                    activeSlug === note.slug ? "border-[#4A6FA5] ring-2 ring-[#4A6FA5]/20" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base md:text-lg font-medium text-gray-800">{note.title}</h3>
                      <p className="text-gray-600 mt-2 leading-relaxed line-clamp-3">{note.shortText}</p>
                    </div>
                    <NotebookPen className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {note.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
