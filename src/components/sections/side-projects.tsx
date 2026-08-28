import React, { useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, FolderKanban } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import {
  trackBlockVisible,
  trackContentDisplayed,
  trackSideProjectLinkClicked,
  trackSideProjectOpened,
} from "@/lib/analytics";
import { normalizeLocale, pushPortfolioRoute } from "@/lib/routes";

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

  const sideProjects = useMemo(
    () => t("sideProjectsItems", { returnObjects: true }) as SideProjectEntry[],
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

  const handleOpenProject = (slug: string) => {
    const locale = normalizeLocale(i18n.language);
    pushPortfolioRoute(locale, "side-projects", slug);
    trackSideProjectOpened(slug);
  };

  return (
    <Card data-testid="side-projects-section">
      <div className="p-8 md:p-12" ref={containerRef}>
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("sideProjectsLabel")}
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mt-2 mb-4">
          {t("sideProjectsTitle")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8">{t("sideProjectsIntro")}</p>

        <div className="space-y-6">
          {sideProjects.map((project) => (
            <article
              key={project.slug}
              data-side-project-slug={project.slug}
              className={`rounded-2xl border bg-white p-5 shadow-sm ${
                activeSlug === project.slug
                  ? "border-[#4A6FA5] ring-2 ring-[#4A6FA5]/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mt-2">{project.shortDescription}</p>
                </div>
                <FolderKanban className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.images.map((image, index) => (
                  <div key={`${project.slug}-${index}`} className="h-40 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  onClick={() => handleOpenProject(project.slug)}
                >
                  {t("openProject")}
                </Button>

                <Button type="button" asChild className="min-h-11 bg-[#2D4A6B] hover:bg-[#1F3447]">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackSideProjectLinkClicked(project.slug, project.link)}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    {t("projectLink")}
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Card>
  );
}
