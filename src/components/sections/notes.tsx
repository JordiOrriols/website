import React, { useMemo, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { NotebookPen, X } from "lucide-react";
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
  const modalScrollRef = useRef<HTMLDivElement>(null);

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
  const activeNoteIndex = useMemo(() => {
    if (!activeNote) return -1;
    return notes.findIndex((note) => note.slug === activeNote.slug);
  }, [activeNote, notes]);

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

  const handleModalScroll = () => {
    const container = modalScrollRef.current;
    if (!container || notes.length < 2) return;

    const nextIndex = Math.max(
      0,
      Math.min(notes.length - 1, Math.round(container.scrollTop / container.clientHeight))
    );
    const nextNote = notes[nextIndex];
    if (!nextNote || nextNote.slug === selectedSlug) return;

    setSelectedSlug(nextNote.slug);
    const locale = normalizeLocale(i18n.language);
    replacePortfolioRoute(locale, "notes", nextNote.slug);
  };

  useEffect(() => {
    if (activeNoteIndex < 0) return;
    const container = modalScrollRef.current;
    if (!container || typeof container.scrollTo !== "function") return;

    container.scrollTo({
      top: container.clientHeight * activeNoteIndex,
      behavior: "auto",
    });
  }, [activeNoteIndex]);

  useEffect(() => {
    if (!activeNote) return;

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [activeNote]);

  return (
    <Card data-testid="notes-section" className={activeNote ? "hidden" : ""}>
      <div className="p-6 md:p-8" ref={containerRef}>
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("notesLabel")}
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mt-2 mb-3">{t("notesTitle")}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{t("notesIntro")}</p>

        <div className="space-y-3 max-h-[50dvh] overflow-y-auto pr-1" data-testid="notes-list">
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
        </div>

        {typeof document !== "undefined"
          ? createPortal(
              <AnimatePresence initial={false}>
                {activeNote ? (
                  <motion.div
                    key="notes-modal"
                    className="fixed inset-0 z-[100] bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-4 right-4 pointer-events-auto">
                        <Button type="button" variant="outline" className="min-h-11 bg-white/95" onClick={backToNotesRoot}>
                          <X className="w-4 h-4" aria-hidden="true" />
                          {t("backToNotes")}
                        </Button>
                      </div>
                    </div>

                    <div
                      ref={modalScrollRef}
                      onScroll={handleModalScroll}
                      className="h-full overflow-y-auto snap-y snap-mandatory overscroll-contain"
                      style={{ scrollSnapType: "y mandatory" }}
                    >
                      {notes.map((note) => (
                        <section
                          key={`note-modal-${note.slug}`}
                          className="min-h-full snap-start flex items-center justify-center px-4 py-16"
                        >
                          <motion.article
                            className="w-full max-w-3xl rounded-3xl border border-white/50 bg-white/95 p-6 md:p-8 shadow-2xl"
                            initial={{ opacity: 0.6, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            data-note-slug={note.slug}
                            data-testid={note.slug === selectedSlug ? "note-detail" : undefined}
                          >
                            <div className="mb-4 flex items-center justify-between gap-3">
                              <span className="rounded-full bg-[#EAF1FA] px-3 py-1 text-xs font-medium text-[#2D4A6B]">
                                {t("levelTwo")}
                              </span>
                              <NotebookPen className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-medium text-gray-800">{note.title}</h3>

                            <div className="mt-5 space-y-4 max-h-[60dvh] overflow-y-auto pr-1">
                              {(note.longText ?? note.shortText)
                                .split("\n\n")
                                .filter(Boolean)
                                .map((paragraph) => (
                                  <p key={paragraph} className="text-gray-700 leading-relaxed">
                                    {paragraph}
                                  </p>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-5">
                              {note.tags.map((tag) => (
                                <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </motion.article>
                        </section>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>,
              document.body
            )
          : null}
      </div>
    </Card>
  );
}
