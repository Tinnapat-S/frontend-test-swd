"use client"
import { useDispatch, useSelector } from "react-redux"
import {
  personalFormSlice,
  PersonalFormState,
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
  InputNumber,
  Cascader,
} from "antd"
import InputChaining from "./components/InputChaining"
import { createRef, useRef } from "react"
import {
  genderOptions,
  nationalityOptions,
  phoneAreaOptions,
  titleOptions,
} from "@/app/constants/constant"
import { resetField, setField } from "@/lib/slices/personalFormSlice"

export default function Test3() {
  const dispatch = useDispatch()
  const formState = useSelector((state: RootState) => state.personalFormSlice)

  const [form] = Form.useForm()
  const onFinish = (form: PersonalFormState) => {
    console.log(form)
    message.success("Form submitted successfully!")
  }

  const onReset = () => {
    // dispatch(resetField())
    form.resetFields()
    message.info("reset done")
  }

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const field = Object.keys(changedValues)[0] //as keyof PersonalFormState;
    const value = Object.values(changedValues)[0]
    dispatch(setField({ field, value }))
  }

  return (
    // form={form}
    <Form
      // initialValues={formState}
      form={form}
      // onValuesChange={handleValuesChange}
      onFinish={onFinish}
      // labelCol={{ span: 4 }}
      // wrapperCol={{ span: 20 }}
    >
      <Flex gap="16px">
        <Form.Item<PersonalFormState>
          style={{ width: "50%" }}
          label="Title"
          name="title"
          rules={[{ required: true, message: "Need title!" }]}
        >
          <Select placeholder="Title" options={titleOptions} />
        </Form.Item>
        <Form.Item<PersonalFormState>
          style={{ width: "100%" }}
          label="FirstName"
          name="firstName"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input name="firstName" placeholder="Firstname" />
        </Form.Item>
        <Form.Item<PersonalFormState>
          style={{ width: "100%" }}
          label="LastName"
          name="lastName"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input name="lastName" placeholder="Lastname" />
        </Form.Item>
      </Flex>
      <Flex gap="16px">
        <Form.Item<PersonalFormState>
          label="Birthday"
          name="birthDay"
          rules={[{ required: true, message: "Please input your birthdate!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item<PersonalFormState>
          label="Nationality"
          name="nationality"
          style={{ width: "50%" }}
          rules={[{ required: true, message: "Need nationality!" }]}
        >
          <Select placeholder="Nationality" options={nationalityOptions} />
        </Form.Item>
      </Flex>
      <Form.Item label="Citizen Id" name="citizenId">
        <InputChaining />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Need Gender!" }]}
      >
        <Radio.Group options={genderOptions} />
      </Form.Item>
      <Form.Item label="Mobile Phone">
        <Flex align="center" gap="small">
          <Form.Item
            name={["phone", "area"]}
            noStyle
            rules={[{ required: true, message: "Phone Code is required" }]}
          >
            <Select
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
              style={{ width: "50%" }}
            />
          </Form.Item>
          -
          <Form.Item
            name={["phone", "number"]}
            noStyle
            rules={[
              { required: true, message: "Phone number required" },
              {
                pattern: /^[0-9]{9,10}$/,
                message: "Enter a valid phone number!",
              },
            ]}
          >
            <Input placeholder="Input street" />
          </Form.Item>
        </Flex>
      </Form.Item>
      <Flex>
        <Flex vertical style={{ width: "100%" }}>
          <Form.Item<PersonalFormState> label="Passport No" name="passportNo">
            <Input placeholder="Passport Number" />
          </Form.Item>
          <Form.Item<PersonalFormState>
            label="Expected Salary"
            name="expectedSalary"
            rules={[{ required: true, message: "How much?" }]}
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
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Flex>
      </Flex>

      {/* Submit */}
    </Form>
  )
}
