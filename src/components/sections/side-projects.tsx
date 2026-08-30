import React, { useMemo, useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ExternalLink, FolderKanban } from "lucide-react";
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

  return (
    <Card data-testid="side-projects-section">
      <div className="p-6 md:p-8" ref={containerRef}>
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("sideProjectsLabel")}
        </span>
        <h2 className="text-xl md:text-4xl font-light text-gray-800 mt-2 mb-4">
          {t("sideProjectsTitle")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">{t("sideProjectsIntro")}</p>

        <AnimatePresence initial={false}>
          {activeProject ? (
            <motion.article
              key={`project-detail-${activeProject.slug}`}
              data-side-project-slug={activeProject.slug}
              className="rounded-2xl border border-[#4A6FA5] ring-2 ring-[#4A6FA5]/20 bg-white p-5 shadow-sm"
              data-testid="side-project-detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="min-h-10 px-2"
                  onClick={backToProjectsRoot}
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  {t("backToProjects")}
                </Button>
                <span className="rounded-full bg-[#EAF1FA] px-3 py-1 text-xs font-medium text-[#2D4A6B]">
                  {t("levelTwo")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800">{activeProject.title}</h3>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {activeProject.shortDescription}
                  </p>
                </div>
                <FolderKanban className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
              </div>

              <div className="max-h-[40dvh] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProject.images.map((image, index) => (
                    <div
                      key={`${activeProject.slug}-${index}`}
                      className="h-32 md:h-36 rounded-xl overflow-hidden"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${activeProject.title} preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackSideProjectLinkClicked(activeProject.slug, activeProject.link)
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#2D4A6B] px-4 py-2 text-sm font-medium text-white shadow-xs transition-all hover:bg-[#1F3447]"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  {t("projectLink")}
                </a>
              </div>
            </motion.article>
          ) : (
            <motion.div
              key="side-projects-list"
              className="space-y-3 max-h-[50dvh] overflow-y-auto pr-1"
              data-testid="side-projects-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
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
                      <h3 className="text-base md:text-lg font-medium text-gray-800">
                        {project.title}
                      </h3>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
