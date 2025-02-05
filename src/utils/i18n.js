import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "../locale/en.json";
import translationAR from "../locale/ar.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

const lang = localStorage.getItem("lang") || "ar";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: lang,
    lng: lang,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
