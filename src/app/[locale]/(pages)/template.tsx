"use client"
import { Button, Flex, Row, Select } from "antd"
import styles from "./page.module.css"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

interface Props {
  children: React.ReactNode
}
export default function TemplateMainPage({ children }: Props) {
  const router = useRouter()
  const { t } = useTranslation("common")
  const handleChange = (value: string) => {
    console.log(value)
  }
  return (
    <div className={styles.page}>
      <Flex vertical gap="small" style={{ position: "absolute", right: "8px" }}>
        <Row>
          <Select
            defaultValue={"english"}
            onChange={handleChange}
            options={[
              { value: "english", label: "EN" },
              { value: "thai", label: "TH" },
            ]}
          ></Select>
        </Row>
        <Button onClick={() => router.push("/")} style={{ padding: "4px" }}>
          Home
        </Button>
      </Flex>
      {children}
    </div>
  )
}
