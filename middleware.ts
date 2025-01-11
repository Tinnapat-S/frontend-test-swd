import { i18nRouter } from "next-i18n-router"
import i18nConfig from "./i18nConfig"

const middleware = (request) => {
  return i18nRouter(request, i18nConfig)
}
