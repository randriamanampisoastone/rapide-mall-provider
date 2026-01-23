import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface LanguageState {
   locale: string
}

const initialState: LanguageState = {
   locale: 'en',
}

const languageSlice = createSlice({
   name: 'language',
   initialState,
   reducers: {
      changeLanguage: (state, action: PayloadAction<string>) => {
         state.locale = action.payload
      },
   },
})

export const { changeLanguage } = languageSlice.actions
export default languageSlice.reducer
