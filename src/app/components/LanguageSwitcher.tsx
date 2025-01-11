"use client"

import { Select } from "antd"
import { useTranslation } from "react-i18next"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  return (
    <Select
      defaultValue={"en"}
      onChange={changeLang}
      options={[
        { value: "en", label: "EN" },
        { value: "th", label: "TH" },
      ]}
    ></Select>
  )
}
export default LanguageSwitcher
