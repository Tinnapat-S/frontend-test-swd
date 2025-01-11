import { generateUniqueId } from "@/utils/utilFunc"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IMobilePhone {
  areaCode: string
  phoneNumber: string
}
export interface PersonalFormState {
  id: string
  title: string | null
  firstName: string
  lastName: string
  birthDay: Date | null
  nationality: string | null
  citizenId?: string
  gender: string
  mobilePhone: IMobilePhone
  passportNo?: string
  expectedSalary: string
}

export interface PersonalFormStateIn {
  id: string
  title: string
  firstName: string
  lastName: string
  birthDay: string
  nationality: string
  citizenId?: string
  gender: string
  mobilePhone: IMobilePhone
  passportNo?: string
  expectedSalary: string
}

interface IStore {
  personData: PersonalFormStateIn[]
  selectedPerson: PersonalFormStateIn | null
  isEditMode: boolean
}

const initialState: IStore = {
  personData: [],
  selectedPerson: null,
  isEditMode: false,
}

export const personalFormSlice = createSlice({
  name: "personalForm",
  initialState,
  reducers: {
    addPersonInfo: (state, action: PayloadAction<PersonalFormStateIn>) => {
      const newPerson = { ...action.payload, id: generateUniqueId() }
      state.personData.push(newPerson)
    },
    updatePersonInfo: (state, action: PayloadAction<PersonalFormStateIn>) => {
      const index = state.personData.findIndex(
        (person) => person.id === action.payload.id
      )
      if (index !== -1) {
        state.personData[index] = action.payload
      }
    },

    deletePersonInfo: (state, action: PayloadAction<string>) => {
      state.personData = state.personData.filter(
        (person) => person.id !== action.payload
      )
    },
    deleteMultiplePersonInfo: (state, action: PayloadAction<string[]>) => {
      state.personData = state.personData.filter(
        (item) => !action.payload.includes(item.id)
      )
    },
    setSelectedPerson: (state, action: PayloadAction<string | null>) => {
      state.selectedPerson =
        state.personData.find((person) => person.id === action.payload) || null
    },
    clearSelectedPerson: (state) => {
      state.selectedPerson = null
    },
    // openEditMode: (state) => {
    //   state.isEditMode = true
    // },
    // closeEditMode: (state) => {
    //   state.isEditMode = false
    // },
  },
})

export const {
  addPersonInfo,
  updatePersonInfo,
  deletePersonInfo,
  deleteMultiplePersonInfo,
  setSelectedPerson,
  clearSelectedPerson,
  //   openEditMode,
  //   closeEditMode,
} = personalFormSlice.actions
export default personalFormSlice.reducer
