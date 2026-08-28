import React, { useMemo, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, FolderKanban, X } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import {
  trackBlockVisible,
  trackContentDisplayed,
  trackSideProjectLinkClicked,
  trackSideProjectOpened,
} from "@/lib/analytics";
import { normalizeLocale, pushPortfolioRoute, replacePortfolioRoute } from "@/lib/routes";

interface SideProjectEntry {
  title: string;
  shortDescription: string;
  slug: string;
  link: string;
  images: string[];
}

interface SideProjectsSectionProps {
  activeSlug?: string | null;
}

export default function SideProjectsSection({ activeSlug = null }: SideProjectsSectionProps) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleProjectsRef = useRef<Set<string>>(new Set());
  const [selectedSlug, setSelectedSlug] = useState<string | null>(activeSlug);
  const prevActiveSlugRef = useRef<string | null>(activeSlug);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const sideProjects = useMemo(
    () => t("sideProjectsItems", { returnObjects: true }) as SideProjectEntry[],
    [t]
  );

  useEffect(() => {
    if (prevActiveSlugRef.current !== activeSlug) {
      setSelectedSlug(activeSlug);
      prevActiveSlugRef.current = activeSlug;
    }
  }, [activeSlug]);

  const activeProject = useMemo(() => {
    if (!selectedSlug) return null;
    return sideProjects.find((project) => project.slug === selectedSlug) ?? null;
  }, [selectedSlug, sideProjects]);
  const activeProjectIndex = useMemo(() => {
    if (!activeProject) return -1;
    return sideProjects.findIndex((project) => project.slug === activeProject.slug);
  }, [activeProject, sideProjects]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const slug = entry.target.getAttribute("data-side-project-slug");
          if (!slug || visibleProjectsRef.current.has(slug)) return;

          visibleProjectsRef.current.add(slug);
          trackBlockVisible("side_projects", slug);
          trackContentDisplayed("side_project", slug, "side_projects");
        });
      },
      { threshold: 0.6 }
    );

    const targets = container.querySelectorAll<HTMLElement>("[data-side-project-slug]");
    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, [sideProjects]);

  const openProject = (slug: string) => {
    const locale = normalizeLocale(i18n.language);
    setSelectedSlug(slug);
    pushPortfolioRoute(locale, "side-projects", slug);
    trackSideProjectOpened(slug);
  };

  const backToProjectsRoot = () => {
    const locale = normalizeLocale(i18n.language);
    setSelectedSlug(null);
    replacePortfolioRoute(locale, "side-projects");
  };

  const handleModalScroll = () => {
    const container = modalScrollRef.current;
    if (!container || sideProjects.length < 2) return;

    const nextIndex = Math.max(
      0,
      Math.min(sideProjects.length - 1, Math.round(container.scrollTop / container.clientHeight))
    );
    const nextProject = sideProjects[nextIndex];
    if (!nextProject || nextProject.slug === selectedSlug) return;

    setSelectedSlug(nextProject.slug);
    const locale = normalizeLocale(i18n.language);
    replacePortfolioRoute(locale, "side-projects", nextProject.slug);
  };

  useEffect(() => {
    if (activeProjectIndex < 0) return;
    const container = modalScrollRef.current;
    if (!container || typeof container.scrollTo !== "function") return;

    container.scrollTo({
      top: container.clientHeight * activeProjectIndex,
      behavior: "auto",
    });
  }, [activeProjectIndex]);

  useEffect(() => {
    if (!activeProject) return;

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [activeProject]);

  return (
    <Card data-testid="side-projects-section" className={activeProject ? "hidden" : ""}>
      <div className="p-6 md:p-8" ref={containerRef}>
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("sideProjectsLabel")}
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mt-2 mb-4">
          {t("sideProjectsTitle")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">{t("sideProjectsIntro")}</p>

        <div className="space-y-3 max-h-[50dvh] overflow-y-auto pr-1" data-testid="side-projects-list">
          {sideProjects.map((project) => (
            <button
              key={project.slug}
              data-side-project-slug={project.slug}
              type="button"
              onClick={() => openProject(project.slug)}
              className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-colors hover:border-[#4A6FA5] ${
                activeSlug === project.slug
                  ? "border-[#4A6FA5] ring-2 ring-[#4A6FA5]/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base md:text-lg font-medium text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mt-2 leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>
                <FolderKanban className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
              </div>

              <div className="mt-3">
                <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                  {t("openProject")}
                </span>
              </div>
            </button>
          ))}
        </div>

        {typeof document !== "undefined"
          ? createPortal(
              <AnimatePresence initial={false}>
                {activeProject ? (
                  <motion.div
                    key="side-projects-modal"
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
                        <Button type="button" variant="outline" className="min-h-11 bg-white/95" onClick={backToProjectsRoot}>
                          <X className="w-4 h-4" aria-hidden="true" />
                          {t("backToProjects")}
                        </Button>
                      </div>
                    </div>

                    <div
                      ref={modalScrollRef}
                      onScroll={handleModalScroll}
                      className="h-full overflow-y-auto snap-y snap-mandatory overscroll-contain"
                      style={{ scrollSnapType: "y mandatory" }}
                    >
                      {sideProjects.map((project) => (
                        <section
                          key={`side-project-modal-${project.slug}`}
                          className="min-h-full snap-start flex items-center justify-center px-4 py-16"
                        >
                          <motion.article
                            className="w-full max-w-3xl rounded-3xl border border-white/50 bg-white/95 p-6 md:p-8 shadow-2xl"
                            initial={{ opacity: 0.6, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            data-side-project-slug={project.slug}
                            data-testid={project.slug === selectedSlug ? "side-project-detail" : undefined}
                          >
                            <div className="mb-4 flex items-center justify-between gap-3">
                              <span className="rounded-full bg-[#EAF1FA] px-3 py-1 text-xs font-medium text-[#2D4A6B]">
                                {t("levelTwo")}
                              </span>
                              <FolderKanban className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-medium text-gray-800">{project.title}</h3>
                            <p className="text-gray-600 mt-3 leading-relaxed">{project.shortDescription}</p>

                            <div className="mt-5 max-h-[48dvh] overflow-y-auto pr-1">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.images.map((image, index) => (
                                  <div key={`${project.slug}-${index}`} className="h-32 md:h-36 rounded-xl overflow-hidden">
                                    <ImageWithFallback
                                      src={image}
                                      alt={`${project.title} preview ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-5 flex gap-3">
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackSideProjectLinkClicked(project.slug, project.link)}
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#2D4A6B] px-4 py-2 text-sm font-medium text-white shadow-xs transition-all hover:bg-[#1F3447]"
                              >
                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                {t("projectLink")}
                              </a>
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
