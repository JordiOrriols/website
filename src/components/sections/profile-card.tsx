import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import type { ExperienceEntry } from "@/data/experience";
import type { SeasonType, SectionsType } from "@/pages/portfolio";
import HomeSection from "@/components/sections/home";
import ContactForm from "@/components/sections/contact-form";
import ProjectsGallery from "@/components/sections/projects";
import Gallery from "@/components/sections/gallery";
import WorkTimeline from "@/components/sections/experience";
import { companiesGallery } from "@/data/companies";
import { trackStatClick, trackModalAction } from "@/lib/analytics";

interface ProfileCardProps {
  season: SeasonType;
  showPlane: boolean;
  playClick: () => void;
  onClickAvatar: () => void;
}

export default function ProfileCard({ season, showPlane, playClick, onClickAvatar }: ProfileCardProps) {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<SectionsType | null>(null);

  const handleStatClick = (statType: SectionsType) => {
    setActiveModal(statType);
    playClick();
    trackStatClick(statType);
    trackModalAction("open", statType);
  };

  const closeModal = () => {
    if (activeModal) {
      trackModalAction("close", activeModal);
    }
    setActiveModal(null);
    playClick();
  };

  const isModalOpen = activeModal !== null;

  const experienceTimeline = t("experienceTimeline", {
    returnObjects: true,
  }) as unknown as ExperienceEntry[];

  const fallbackComponent = null;

  return (
    <div className="relative w-full" style={{ perspective: "1000px" }} data-testid="profile-card">
      <ErrorBoundary fallback={fallbackComponent}>
        <HomeSection
          season={season}
          showPlane={showPlane}
          isModalOpen={isModalOpen}
          handleStatClick={handleStatClick}
          onClickAvatar={onClickAvatar}
        />
      </ErrorBoundary>

      <AnimatePresence>
        {activeModal === "contact" && (
          <ErrorBoundary fallback={fallbackComponent}>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <ContactForm onClose={closeModal} />
            </div>
          </ErrorBoundary>
        )}

        {activeModal === "projects" && (
          <ErrorBoundary fallback={fallbackComponent}>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <ProjectsGallery title={""} subtitle={""} onClose={closeModal} />
            </div>
          </ErrorBoundary>
        )}

        {activeModal === "companies" && (
          <ErrorBoundary fallback={fallbackComponent}>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Gallery
                title={t("companiesTitle")}
                subtitle={t("companiesSubtitle")}
                options={companiesGallery}
                onClose={closeModal}
              />
            </div>
          </ErrorBoundary>
        )}

        {activeModal === "leading_years" && (
          <ErrorBoundary fallback={fallbackComponent}>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Gallery
                title={""}
                subtitle={""}
                options={companiesGallery}
                onClose={closeModal}
              />
            </div>
          </ErrorBoundary>
        )}

        {activeModal === "experience_years" && (
          <ErrorBoundary fallback={fallbackComponent}>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <WorkTimeline
                title={t("workTimelineTitle")}
                subtitle={t("workTimelineSubtitle")}
                options={experienceTimeline}
                onClose={closeModal}
              />
            </div>
          </ErrorBoundary>
        )}
      </AnimatePresence>
    </div>
  );
}
