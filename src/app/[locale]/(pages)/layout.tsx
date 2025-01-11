import type { Metadata } from "next"
import styles from "./page.module.css"
import localFont from "next/font/local"
import "./globals.css"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Providers } from "@/lib/providers"
import { Button, Flex, Row } from "antd"
import LanguageSwitcher from "@/app/components/LanguageSwitcher"
import { TranslationsProvider } from "@/lib/providers"
import initTranslations from "@/app/i18n"

// const geistSans = localFont({
//   src: "/fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })

// const geistMono = localFont({
//   src: "/fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}
interface Props {
  children: React.ReactNode
  params: { locale: string }
}
const I18_NAME_SPACE = ["home", "test3", "common"]
export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const { resources } = await initTranslations(locale, I18_NAME_SPACE)
  return (
    <html lang={locale}>
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body>
        <div className={styles.page}>
          <AntdRegistry>
            <Providers>
              <TranslationsProvider
                resources={resources}
                locale={locale}
                namespace={I18_NAME_SPACE}
              >
                <Flex
                  vertical
                  gap="small"
                  style={{ position: "absolute", right: "8px" }}
                >
                  <Row>
                    <LanguageSwitcher />
                  </Row>
                  <Button style={{ padding: "4px" }}>Home</Button>
                </Flex>
                {children}
              </TranslationsProvider>
            </Providers>
          </AntdRegistry>
        </div>
      </body>
    </html>
  )
}
