import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { getAnalyticsConsent, setAnalyticsConsent, trackConsentDecision } from "@/lib/analytics";

type ConsentState = "granted" | "denied" | null;

export default function AnalyticsConsent() {
  const { t } = useTranslation();
  const [consent, setConsent] = useState<ConsentState>(() => getAnalyticsConsent());
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const applyConsent = (nextConsent: "granted" | "denied") => {
    setAnalyticsConsent(nextConsent);
    trackConsentDecision(nextConsent);
    setConsent(nextConsent);
    setIsPreferencesOpen(false);
  };

  if (consent !== null && !isPreferencesOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-30">
        <Button
          type="button"
          variant="outline"
          className="min-h-11 bg-white/95"
          onClick={() => setIsPreferencesOpen(true)}
        >
          {t("analyticsConsentManage")}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 md:right-auto md:max-w-md">
      <Card>
        <div className="p-5 space-y-4">
          <h2 className="text-base font-medium text-gray-800">{t("analyticsConsentTitle")}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t("analyticsConsentDescription")}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              className="min-h-11 bg-[#2D4A6B] hover:bg-[#1F3447]"
              onClick={() => applyConsent("granted")}
            >
              {t("analyticsConsentAccept")}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              onClick={() => applyConsent("denied")}
            >
              {t("analyticsConsentDecline")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
