import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface PersonalFormState {
  title: string | null
  firstName: string
  lastName: string
  birthDay: Date | null
  nationality: string | null
  citizenId?: string
  gender: string
  mobilePhone: string
  passportNo?: string
  expectedSalary: string
}

const initialState: PersonalFormState = {
  title: null,
  firstName: "",
  lastName: "",
  birthDay: null,
  nationality: null,
  citizenId: "",
  gender: "",
  mobilePhone: "",
  passportNo: "",
  expectedSalary: "",
}

export const personalFormSlice = createSlice({
  name: "personalForm",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ field: keyof PersonalFormState; value: any }>
    ) => {
      state[action.payload.field] = action.payload.value
    },
    resetField: () => initialState,
  },
})

export const { setField, resetField } = personalFormSlice.actions
export default personalFormSlice.reducer
