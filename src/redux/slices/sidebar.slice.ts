import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SideBarState {
   isSidebarOpen: boolean
}

const initialState: SideBarState = {
   isSidebarOpen: true,
}

const sidebarSlice = createSlice({
   name: 'sidebar',
   initialState,
   reducers: {
      changeSidebar: (state, action: PayloadAction<boolean>) => {
         state.isSidebarOpen = action.payload
      },
   },
})

export const { changeSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
