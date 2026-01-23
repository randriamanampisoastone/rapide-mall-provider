import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface FileInterface {
   file: File | undefined
}

const initialState: FileInterface = {
   file: undefined,
}

const fileSlice = createSlice({
   name: 'file',
   initialState,
   reducers: {
      setFile: (state, action: PayloadAction<File | undefined>) => {
         if (action.payload) {
            state.file = action.payload
         }
      },
      resetFile: (state) => {
         state.file = undefined
      },
   },
})

export const { resetFile, setFile } = fileSlice.actions
export default fileSlice.reducer
