import React from "react";
import { useTranslation } from "react-i18next";
import { trackLanguageChange } from "@/lib/analytics";
import { normalizeLocale, parsePortfolioPath, replacePortfolioRoute } from "@/lib/routes";

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const languages = [
    { code: "ca", label: "CA" },
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
  ];

  const language = normalizeLocale(i18n.language);

  const handleLanguageChange = (langCode: string) => {
    const normalizedLang = normalizeLocale(langCode);
    const route = parsePortfolioPath(window.location.pathname);
    const currentSection = route.section ?? "profile";
    const currentSlug = route.slug ?? undefined;

    replacePortfolioRoute(normalizedLang, currentSection, currentSlug);
    void i18n.changeLanguage(normalizedLang);
    trackLanguageChange(langCode);
  };

  return (
    <nav
      className="absolute top-5 right-5 flex items-center gap-1 bg-gray-100 rounded-full p-1"
      role="navigation"
      aria-label="Language selection"
      data-testid="language-selector"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          aria-pressed={language === lang.code}
          aria-label={`Switch to ${lang.code === "ca" ? "Catalan" : lang.code === "es" ? "Spanish" : "English"}`}
          data-testid={`language-button-${lang.code}`}
          className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            language === lang.code
              ? "bg-[#2D4A6B] text-white shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </nav>
  );
}
