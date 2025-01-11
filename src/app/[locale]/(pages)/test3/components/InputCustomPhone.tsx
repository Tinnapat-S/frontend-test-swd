import { Col, Form, Input, Row, Select, Space } from "antd"
import { phoneAreaOptions } from "@/constants/constant"
import { useState } from "react"

interface PhoneValues {
  areaCode?: string | null
  phoneNumber?: string
}
interface IInputCustomPhoneProps {
  id?: string
  value?: PhoneValues
  onChange?: (value: PhoneValues) => void
}
export const InputCustomPhone: React.FC<IInputCustomPhoneProps> = (props) => {
  const { id, value = {}, onChange } = props
  const [phoneNumber, setPhoneNumber] = useState("")
  const [areaCode, setAreaCode] = useState<string | null>(null)
  const triggerChange = (changedValue: {
    areaCode?: string | null
    phoneNumber?: string
  }) => {
    onChange?.({ areaCode, phoneNumber, ...value, ...changedValue })
  }

  const onAreaCodeChange = (newAreaCode: string) => {
    if (!("areaCode" in value)) {
      setAreaCode(newAreaCode)
    }
    triggerChange({ areaCode: newAreaCode })
  }

  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value
    if (!("phoneNumber" in value)) {
      setPhoneNumber(newPhoneNumber)
    }
    triggerChange({ phoneNumber: newPhoneNumber })
  }

  return (
    <Row align="middle" gutter={12}>
      <Col span={6}>
        <Select
          value={value.areaCode || areaCode}
          onChange={onAreaCodeChange}
          placeholder="Select province"
          options={phoneAreaOptions}
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.label}>
                {option.data.emoji}
              </span>
              {option.data.desc}
            </Space>
          )}
        />
      </Col>
      -
      <Col span={12}>
        <Input
          value={value.phoneNumber || phoneNumber}
          onChange={onPhoneNumberChange}
          placeholder="Input phone number"
        />
      </Col>
    </Row>
  )
}
