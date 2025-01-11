"use client"

import { Provider } from "react-redux"
import { store, persistor } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import { I18nextProvider } from "react-i18next"
import { createInstance } from "i18next"
import initTranslations from "@/app/i18n"

interface ProviderProps {
  children: React.ReactNode
}
export function Providers({ children }: ProviderProps) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>{children}</Provider>
    </PersistGate>
  )
}

export function TranslationsProvider({
  children,
  resources,
  locale,
  namespace,
}: any) {
  const i18n = createInstance()
  initTranslations(locale, namespace, i18n, resources)
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
