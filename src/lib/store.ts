import { configureStore } from "@reduxjs/toolkit"
import personalFormSlice from "./slices/personalFormSlice"
export const store = configureStore({
  reducer: {
    personalFormSlice: personalFormSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
