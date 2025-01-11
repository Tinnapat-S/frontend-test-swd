import initTranslations from "@/app/i18n"
import { TranslationsProvider } from "@/lib/providers"
import React from "react"

interface ITest3Props {
  params: { locale: string }
  children: React.ReactNode
}

const I18_NAME_SPACE = ["test3"]
export default async function Test3Layout({
  params: { locale },
  children,
}: ITest3Props) {
  const { t, resources } = await initTranslations(locale, I18_NAME_SPACE)
  return (
    <TranslationsProvider
      namespace={I18_NAME_SPACE}
      locale={locale}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  )
}
