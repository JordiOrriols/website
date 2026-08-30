import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import Cal from "@calcom/embed-react";
import DynamicScene from "@/components/weather/scenes/dynamic";
import PlaneController from "@/components/plane";
import ScrollCards from "@/components/scroll-cards";
import Card from "@/components/ui/card";
import Avatar from "@/components/avatar";
import LanguageSelector from "@/components/language-selector";
import { useMotionPreference } from "@/lib/motion";
import { renderWithBold } from "@/lib/text";
import { parsePortfolioPath } from "@/lib/routes";
import { trackSectionVisible } from "@/lib/analytics";

interface FlySection {
  emoji: string;
  title: string;
  paragraphs: string[];
}

function FlySectionCard({
  section,
  testId,
  children,
}: {
  section: FlySection;
  testId: string;
  children?: React.ReactNode;
}) {
  return (
    <Card data-testid={testId} className="max-h-[90dvh] overflow-y-auto">
      <div className="p-8 md:p-12">
        <span className="text-4xl" aria-hidden="true">
          {section.emoji}
        </span>
        <h2 className="text-xl md:text-4xl font-light text-gray-800 mt-2 mb-8">{section.title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>{renderWithBold(paragraph)}</p>
          ))}
        </div>
        {children}
      </div>
    </Card>
  );
}

// Same overlapping-avatar layout as the profile card's HomeSection, always in "aviator" (headset) mode.
function FlyHeroCard({ section, testId }: { section: FlySection; testId: string }) {
  return (
    <Card data-testid={testId} className="relative overflow-visible">
      <LanguageSelector buildPath={(locale) => `/${locale}/vuela-conmigo`} />
      <div className="relative pt-20 px-8 pb-8 md:pb-12">
        <div className="mt-[-200px] mb-6">
          <div className="w-40 h-40 rounded-full bg-white p-2 shadow-xl m-auto">
            <Avatar season="aviator" />
          </div>
        </div>
        <span className="text-4xl" aria-hidden="true">
          {section.emoji}
        </span>
        <h2 className="text-xl md:text-4xl font-light text-gray-800 mt-2 mb-8">{section.title}</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>{renderWithBold(paragraph)}</p>
          ))}
        </div>
      </div>
    </Card>
  );
}

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
                    <div className="mt-8" data-testid="fly-booking-embed">
                      <p className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase mb-4">
                        {t("flyWithMeBookingLabel")}
                      </p>
                      <Cal
                        calLink="jordiorriols/fly-with-me"
                        style={{ width: "100%", height: "600px", overflow: "scroll" }}
                        config={{ layout: "month_view" }}
                      />
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
