import styles from "./page.module.css"
import { testType } from "@/constants/constant"
import Link from "next/link"
import { Flex } from "antd"
import Title from "antd/es/typography/Title"
import Text from "antd/es/typography/Text"

export default function Home() {
  return (
    <Flex align="center" justify="center" style={{ height: "100svh" }}>
      <Flex gap="16px">
        {testType.map((item, index) => (
          <Link
            key={index}
            href={`${item.header.toLocaleLowerCase()}`}
            className={styles.test_container}
          >
            <Title level={5}>{item.header}</Title>
            <Text type="secondary">{item.subHeader}</Text>
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}
