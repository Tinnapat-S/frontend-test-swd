import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import i18nConfig from "../../i18nConfig"
import HttpApi from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ...i18nConfig,
    backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
    detection: { order: ["queryString", "cookie"], caches: ["cookie"] },
    react: {
      useSuspense: false,
    },
  })

export default i18n
