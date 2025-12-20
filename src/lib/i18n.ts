import i18n from "i18next";
import type { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import { es } from "../locales/es";
import { en } from "../locales/en";
import { ca } from "../locales/ca";

import type { ResourceLanguage } from "i18next";

const options: InitOptions = {
  resources: {
    ca: ca as ResourceLanguage,
    es: es as ResourceLanguage,
    en: en as ResourceLanguage,
  },
  lng: "en",
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
};

void i18n.use(LanguageDetector).use(initReactI18next).init(options);

export default i18n;
