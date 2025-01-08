"use client"
import { Flex, Select } from "antd"
import styles from "./page.module.css"

interface Props {
  children: React.ReactNode
}
export default function TemplateMainPage({ children }: Props) {
  const handleChange = (value: string) => {
    console.log(value)
  }
  return (
    <div className={styles.page}>
      <Flex style={{ justifySelf: "end" }}>
        <Select
          defaultValue={"english"}
          onChange={handleChange}
          options={[
            { value: "english", label: "EN" },
            { value: "thai", label: "TH" },
          ]}
        ></Select>
      </Flex>
      <Flex align="center" justify="center">
        {children}
      </Flex>
    </div>
  )
}
