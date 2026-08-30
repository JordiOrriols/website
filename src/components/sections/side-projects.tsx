import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, FolderKanban } from "lucide-react";
import Card from "@/components/ui/card";
import Carousel from "@/components/ui/carousel";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import {
  trackBlockVisible,
  trackContentDisplayed,
  trackSideProjectLinkClicked,
} from "@/lib/analytics";

interface SideProjectEntry {
  title: string;
  shortDescription: string;
  slug: string;
  link: string;
  images: string[];
}

export default function SideProjectsSection() {
  const { t } = useTranslation();
  const notifiedSlugsRef = useRef<Set<string>>(new Set());

  const sideProjects = t("sideProjectsItems", { returnObjects: true }) as SideProjectEntry[];

  const handleActiveIndexChange = (_index: number, project: SideProjectEntry) => {
    if (notifiedSlugsRef.current.has(project.slug)) return;
    notifiedSlugsRef.current.add(project.slug);
    trackBlockVisible("side_projects", project.slug);
    trackContentDisplayed("side_project", project.slug, "side_projects");
  };

  return (
    <Card data-testid="side-projects-section">
      <div className="p-6 md:p-8">
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("sideProjectsLabel")}
        </span>
        <h2 className="text-xl md:text-4xl font-light text-gray-800 mt-2 mb-4">
          {t("sideProjectsTitle")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">{t("sideProjectsIntro")}</p>

        <Carousel
          items={sideProjects}
          getKey={(project) => project.slug}
          onActiveIndexChange={handleActiveIndexChange}
          ariaLabel={t("sideProjectsLabel")}
          itemClassName="w-[85%] sm:w-[65%] md:w-[48%]"
          renderItem={(project, _index, isActive) => (
            <article
              data-testid={`side-project-card-${project.slug}`}
              className={`w-full h-full flex flex-col rounded-2xl border bg-white p-6 md:p-8 pb-10 md:pb-14 shadow-sm transition-all duration-300 ${
                isActive ? "border-[#4A6FA5] ring-2 ring-[#4A6FA5]/20" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mt-2 leading-relaxed">{project.shortDescription}</p>
                </div>
                <FolderKanban className="w-5 h-5 text-[#4A6FA5] shrink-0" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.images.map((image, index) => (
                  <div
                    key={`${project.slug}-${index}`}
                    className="h-32 md:h-36 rounded-xl overflow-hidden"
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5">
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
            </article>
          )}
        />
      </div>
    </Card>
  );
}
