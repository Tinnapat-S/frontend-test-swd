import styles from "./page.module.css"
import { testType } from "@/constants/constant"
import Link from "next/link"
import { Button, Flex, Row } from "antd"
import Title from "antd/es/typography/Title"
import Text from "antd/es/typography/Text"
import initTranslations from "@/app/i18n"
import LanguageSwitcher from "@/app/components/LanguageSwitcher"
import { TranslationsProvider } from "@/lib/providers"

const I18_NAME_SPACE = ["home"]
export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params
  const { t } = await initTranslations(locale, I18_NAME_SPACE)
  return (
    <Flex align="center" justify="center" style={{ height: "100svh" }}>
      <Flex gap="16px">
        {testType.map((item, index) => (
          <Link
            key={index}
            href={`/${locale}/${item.header.toLocaleLowerCase()}`}
            className={styles.test_container}
          >
            <Title level={5}>{t(`headers.${item.header}`)}</Title>
            <Text type="secondary">{t(`subHeaders.${item.subHeader}`)}</Text>
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}
