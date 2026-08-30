import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import DynamicScene from "@/components/weather/scenes/dynamic";
import PlaneController from "@/components/plane";
import ScrollCards from "@/components/scroll-cards";
import FlyHeroCard from "@/components/sections/fly-hero-card";
import FlySectionCard, { type FlySection } from "@/components/sections/fly-section-card";
import FlyBooking from "@/components/sections/fly-booking";
import { useMotionPreference } from "@/lib/motion";
import { parsePortfolioPath } from "@/lib/routes";
import { trackSectionVisible } from "@/lib/analytics";

export default function FlyWithMe() {
  const { t, i18n } = useTranslation();
  const { reducedMotion } = useMotionPreference();

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
                      <p className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase mb-4">
                        {t("flyWithMeBookingLabel")}
                      </p>
                      <FlyBooking />
                    </div>
                  )}
                </FlySectionCard>
              ),
            })),
          ]}
        />
      </div>
    </main>
  );
}

