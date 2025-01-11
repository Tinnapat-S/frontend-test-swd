"use client"

import { Provider } from "react-redux"
import { store, persistor } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import i18n from "@/lib/i18n"
import { I18nextProvider } from "react-i18next"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>{children}</Provider>
      </PersistGate>
    </I18nextProvider>
  )
}
