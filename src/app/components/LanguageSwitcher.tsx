"use client"

import { i18nConfig } from "@/i18nConfig"
import { Select } from "antd"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

const LanguageSwitcher = () => {
  const router = useRouter()

  const { i18n, t } = useTranslation()
  const currentLocale = i18n.language
  const currentPathname = usePathname()

  const changeLang = (lng: string) => {
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = "expires=" + date.toUTCString()
    document.cookie = `i18next=${lng}; ${expires}; path=/`

    i18n.changeLanguage(lng)

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + lng + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${lng}`))
    }

    router.refresh()
  }

  return (
    <Select
      defaultValue={currentLocale}
      onChange={changeLang}
      options={[
        { value: "en", label: t("common:components.languageSwitcher.en") },
        { value: "th", label: t("common:components.languageSwitcher.th") },
      ]}
    ></Select>
  )
}
export default LanguageSwitcher
