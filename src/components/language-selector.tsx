import React, { useState, useEffect } from "react";
import i18n from "@/lib/i18n";
import { trackLanguageChange } from "@/lib/analytics";

export default function LanguageSelector() {
  const languages = [
    { code: "ca", label: "CA" },
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
  ];

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    trackLanguageChange(langCode);
  };

  return (
    <nav className="absolute top-5 right-5 flex items-center gap-1 bg-gray-100 rounded-full p-1" role="navigation" aria-label="Language selection">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          aria-pressed={language === lang.code}
          aria-label={`Switch to ${lang.code === 'ca' ? 'Catalan' : lang.code === 'es' ? 'Spanish' : 'English'}`}
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
