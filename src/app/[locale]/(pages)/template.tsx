"use client"
import { Button, Flex, Row, Select } from "antd"
import styles from "./page.module.css"
import { useRouter } from "next/navigation"
import LanguageSwitcher from "@/app/components/LanguageSwitcher"

interface Props {
  children: React.ReactNode
}
export default function TemplateMainPage({ children }: Props) {
  const router = useRouter()

  return (
    <div className={styles.page}>
      <Flex vertical gap="small" style={{ position: "absolute", right: "8px" }}>
        <Row>
          <LanguageSwitcher />
        </Row>
        <Button onClick={() => router.push("/")} style={{ padding: "4px" }}>
          Home
        </Button>
      </Flex>
      {children}
    </div>
  )
}
