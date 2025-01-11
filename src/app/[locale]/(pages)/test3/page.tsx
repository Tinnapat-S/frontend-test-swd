"use client"
import { useDispatch, useSelector } from "react-redux"
import {
  addPersonInfo,
  clearSelectedPerson,
  PersonalFormState,
  PersonalFormStateIn,
  updatePersonInfo,
} from "@/lib/slices/personalFormSlice"
import { RootState } from "@/lib/store"

import {
  Input,
  Flex,
  Button,
  Form,
  message,
  Space,
  Select,
  DatePicker,
  Radio,
  Row,
  Col,
  Typography,
} from "antd"
import InputChaining from "./components/InputChaining"
import {
  genderOptions,
  nationalityOptions,
  titleOptions,
} from "@/constants/constant"
import { InputCustomPhone } from "./components/InputCustomPhone"
import CustomTable from "./components/CustomTable"
import { generateUniqueId } from "@/utils/utilFunc"
import { useEffect } from "react"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"

const DATE_FORMAT = "YYYY/MM/DD"
const checkPhone = (
  test: any,
  value: { areaCode: string; phoneNumber: string }
) => {
  if (isNaN(parseInt(value?.phoneNumber))) {
    return Promise.reject(new Error("Please Input only number!"))
  }
  if (value.phoneNumber.length === 10 && value.areaCode) {
    return Promise.resolve()
  }
  return Promise.reject(new Error("Invalid phone number!"))
}

export default function Test3() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { selectedPerson } = useSelector(
    (state: RootState) => state.personalFormSlice
  )
  const [form] = Form.useForm()

  const onFinish = (inputForm: PersonalFormStateIn) => {
    const serializedData = {
      ...inputForm,
      birthDay: dayjs(inputForm.birthDay).toString(),
      id: selectedPerson?.id || generateUniqueId(),
    }
    if (selectedPerson) {
      dispatch(updatePersonInfo(serializedData))
      dispatch(clearSelectedPerson())
      message.success("Form edited successfully!")
      return
    }
    dispatch(addPersonInfo(serializedData))
    dispatch(clearSelectedPerson())
    form.resetFields()
    message.success("Form submitted successfully!")
  }

  useEffect(() => {
    if (selectedPerson) {
      form.setFieldsValue({
        ...selectedPerson,
        birthDay: dayjs(selectedPerson.birthDay),
      })
    } else {
      form.resetFields()
    }
  }, [selectedPerson])
  const onReset = () => {
    dispatch(clearSelectedPerson())
    form.resetFields()
    message.info("reset done")
  }

  const test = () => {
    form.setFieldsValue({
      title: "ms",
      firstName: "dd",
      lastName: "dd",
      citizenId: "1100901218527",
      birthDay: dayjs("2025-01-08"),
      nationality: "english",
      gender: "female",
      mobilePhone: {
        areaCode: "+1",
        phoneNumber: "2222222222",
      },
      expectedSalary: "22222",
      id: "1ae52719-d836-4bec-807a-23f6c4b24ee2",
    })
  }

  return (
    <>
      <Row style={{ width: "100%", padding: "0px 20px" }} justify={"start"}>
        <Col>
          <Typography.Title>{t(`header`)}</Typography.Title>
        </Col>
      </Row>
      <Flex align="center" justify="center" style={{ marginTop: "48px" }}>
        <Button onClick={() => test()}></Button>
        <Form form={form} onFinish={onFinish} wrapperCol={{ span: 24 }}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item<PersonalFormState>
                label={t("form.title")}
                name="title"
                rules={[{ required: true, message: "Need title!" }]}
              >
                <Select placeholder="Title" options={titleOptions} />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item<PersonalFormState>
                label={t("form.firstName")}
                name="firstName"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input name="firstName" placeholder="Firstname" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item<PersonalFormState>
                label={t(`form.lastName`)}
                name="lastName"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input name="lastName" placeholder="Lastname" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={8}>
              <Form.Item<PersonalFormState>
                label={t(`form.birthDay`)}
                name="birthDay"
                rules={[
                  { required: true, message: "Please input your birthdate!" },
                ]}
              >
                <DatePicker format={DATE_FORMAT} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={10}>
              <Form.Item<PersonalFormState>
                label={t(`form.nationality`)}
                name="nationality"
                rules={[{ required: true, message: "Need nationality!" }]}
              >
                <Select
                  placeholder="Nationality"
                  options={nationalityOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Citizen Id" name="citizenId">
            <InputChaining />
          </Form.Item>
          <Form.Item
            label={t(`form.gender`)}
            name="gender"
            rules={[{ required: true, message: "Need Gender!" }]}
          >
            <Radio.Group options={genderOptions} />
          </Form.Item>
          <Form.Item
            label={t(`form.mobilePhone`)}
            name="mobilePhone"
            rules={[{ validator: checkPhone, required: true }]}
          >
            <InputCustomPhone />
          </Form.Item>
          <Flex>
            <Flex vertical style={{ width: "100%" }}>
              <Form.Item<PersonalFormState>
                label={t(`form.passportNo`)}
                name="passportNo"
              >
                <Input placeholder="Passport Number" />
              </Form.Item>
              <Form.Item<PersonalFormState>
                label={t(`form.expectedSalary`)}
                name="expectedSalary"
                rules={[
                  { required: true, message: "How much?" },
                  {
                    pattern: /^[0-9]{4,8}$/,
                    message: "How?",
                  },
                ]}
              >
                <Input placeholder="280,000" />
              </Form.Item>
            </Flex>
            <Flex align="end" justify="center" style={{ width: "100%" }}>
              <Form.Item>
                <Space size={50}>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                  <Button type="primary" htmlType="submit">
                    {selectedPerson ? "Edit" : "Submit"}
                  </Button>
                </Space>
              </Form.Item>
            </Flex>
          </Flex>

          {/* Submit */}
        </Form>
      </Flex>
      <CustomTable />
    </>
  )
}
