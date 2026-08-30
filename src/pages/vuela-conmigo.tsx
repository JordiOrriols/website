import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { AnimatePresence } from "framer-motion";
import { CalendarSearch } from "lucide-react";
import DynamicScene from "@/components/weather/scenes/dynamic";
import PlaneController from "@/components/plane";
import ScrollCards from "@/components/scroll-cards";
import FlyHeroCard from "@/components/sections/fly-hero-card";
import FlySectionCard, { type FlySection } from "@/components/sections/fly-section-card";
import FlyBookingModal from "@/components/sections/fly-booking-modal";
import { Button } from "@/components/ui/button";
import { useMotionPreference } from "@/lib/motion";
import { parsePortfolioPath } from "@/lib/routes";
import { trackSectionVisible, trackModalAction } from "@/lib/analytics";

export default function FlyWithMe() {
  const { t, i18n } = useTranslation();
  const { reducedMotion } = useMotionPreference();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const { locale } = parsePortfolioPath(window.location.pathname);
    if (locale && locale !== i18n.language) {
      void i18n.changeLanguage(locale);
    }
  }, [i18n]);

  const heroSection: FlySection = {
    emoji: t("flyWithMeHeroEmoji"),
    title: t("flyWithMeHeroTitle"),
    paragraphs: t("flyWithMeHeroIntro", { returnObjects: true }) as string[],
  };
  const sections = t("flyWithMeSections", { returnObjects: true }) as FlySection[];

  const openBooking = () => {
    setIsBookingOpen(true);
    trackModalAction("open", "booking");
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    trackModalAction("close", "booking");
  };

  const fallbackComponent = null;

  return (
    <main className="relative min-h-[100dvh] overflow-hidden" data-testid="vuela-conmigo-page">
      <ErrorBoundary fallback={fallbackComponent}>
        <DynamicScene weather="clear" timeOfDay="day" />
      </ErrorBoundary>

      <ErrorBoundary fallback={fallbackComponent}>
        <PlaneController reducedMotion={reducedMotion} />
      </ErrorBoundary>

      <div className="relative z-20">
        <ScrollCards
          onActiveCardChange={(cardKey) => trackSectionVisible(`fly-${cardKey}`)}
          cards={[
            {
              key: "hero",
              component: <FlyHeroCard section={heroSection} testId="fly-hero-section" />,
            },
            ...sections.map((section, index) => ({
              key: `section-${index}`,
              component: (
                <FlySectionCard section={section} testId={`fly-section-${index}`}>
                  {index === sections.length - 1 && (
                    <div className="mt-8">
                      <Button
                        onClick={openBooking}
                        data-testid="fly-find-date-button"
                        className="bg-[#2D4A6B] hover:bg-[#1F3447] text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <CalendarSearch className="w-4 h-4 mr-2" aria-hidden="true" />
                        {t("flyWithMeFindDateButton")}
                      </Button>
                    </div>
                  )}
                </FlySectionCard>
              ),
            })),
          ]}
        />
      </div>

      <ErrorBoundary fallback={fallbackComponent}>
        <AnimatePresence>
          {isBookingOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
              data-testid="fly-booking-modal-overlay"
            >
              <FlyBookingModal onClose={closeBooking} />
            </div>
          )}
        </AnimatePresence>
      </ErrorBoundary>
    </main>
  );
}
