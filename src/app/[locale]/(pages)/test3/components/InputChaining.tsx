"use client"
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react"
import { Input, Form, InputRef, Flex } from "antd"

import styles from "./styles.module.css"

const maxLengths = [1, 4, 5, 2, 1]
interface IInputChaining {
  id?: string
  value?: string
  onChange?: (value: string) => void
}
const InputChaining = ({ onChange, id, value = "" }: IInputChaining) => {
  const inputRef1 = useRef<InputRef>(null)
  const inputRef2 = useRef<InputRef>(null)
  const inputRef3 = useRef<InputRef>(null)
  const inputRef4 = useRef<InputRef>(null)
  const inputRef5 = useRef<InputRef>(null)

  const [values, setValue] = useState(Array(5).fill(""))

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextInputRef: React.RefObject<InputRef>,
    maxLength: number,
    index: number
  ) => {
    const value = e.target.value
    const newValues = [...values] //['','','','','']
    newValues[index] = value
    setValue(newValues)

    if (value.length === maxLength && nextInputRef.current) {
      nextInputRef.current.focus()
    }

    const allInputsValid = newValues.every(
      (val, i) => val.length === maxLengths[i]
    )
    if (allInputsValid) {
      const fullValue = newValues.join("")
      onChange?.(fullValue)
    }
  }
  useEffect(() => {
    if (value) {
      // Split the string value into the individual parts
      const splitValues = [
        value.slice(0, 1),
        value.slice(1, 5),
        value.slice(5, 10),
        value.slice(10, 12),
        value.slice(12, 13),
      ]
      setValue([...splitValues])
    }
  }, [value])

  const handleOnKeyDown = (
    e: React.KeyboardEvent,
    prevInputRef: React.RefObject<InputRef>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (values[index] === "" && index > 0) {
        // Move to previous input if current is empty
        prevInputRef.current?.focus()
      }
    }
  }

  return (
    <Flex gap="4px" align="center">
      <Input
        placeholder="0"
        style={{ width: "40px", textAlign: "center" }}
        ref={inputRef1}
        value={values[0]}
        maxLength={1} // Allow up to 5 characters
        onChange={(e) => handleInputChange(e, inputRef2, 1, 0)} // Focus the next input when length reaches 5
      />
      -
      <Input
        placeholder="0000"
        style={{ width: "60px", textAlign: "center" }}
        ref={inputRef2}
        value={values[1]}
        maxLength={4}
        onChange={(e) => handleInputChange(e, inputRef3, 4, 1)} // Focus the next input when length reaches 5
        onKeyDown={(e) => handleOnKeyDown(e, inputRef1, 1)}
      />
      -
      <Input
        placeholder="00000"
        style={{ width: "68px", textAlign: "center" }}
        ref={inputRef3}
        value={values[2]}
        maxLength={5}
        onChange={(e) => handleInputChange(e, inputRef4, 5, 2)}
        onKeyDown={(e) => handleOnKeyDown(e, inputRef2, 2)}
      />
      -
      <Input
        placeholder="00"
        style={{ width: "48px", textAlign: "center" }}
        ref={inputRef4}
        value={values[3]}
        maxLength={2}
        onChange={(e) => handleInputChange(e, inputRef5, 2, 3)}
        onKeyDown={(e) => handleOnKeyDown(e, inputRef3, 3)}
      />
      -
      <Input
        placeholder="0"
        style={{ width: "40px", textAlign: "center" }}
        ref={inputRef5}
        value={values[4]}
        maxLength={1}
        onChange={(e) => handleInputChange(e, inputRef5, 2, 4)}
        onKeyDown={(e) => handleOnKeyDown(e, inputRef4, 4)}
      />
    </Flex>
  )
}

export default InputChaining
