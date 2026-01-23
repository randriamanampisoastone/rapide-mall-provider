import type { UserRole } from '@/enums/profile.enum'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AdminRoleInterface {
   roles: UserRole[]
   siteId?: string
}

const initialState: AdminRoleInterface = {
   roles: [],
   siteId: undefined,
}

const adminRoleSlice = createSlice({
   name: 'adminRole',
   initialState,
   reducers: {
      setAdminRole: (state, action: PayloadAction<UserRole[]>) => {
         state.roles = action.payload
      },
      setAdminSite: (state, action: PayloadAction<string>) => {
         state.siteId = action.payload
      },
   },
})

export const { setAdminRole, setAdminSite } = adminRoleSlice.actions
export default adminRoleSlice.reducer
