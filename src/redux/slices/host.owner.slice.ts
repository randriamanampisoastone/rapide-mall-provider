import type { UserRole } from '@/enums/profile.enum'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
interface HostOwnerDataInterface {
   roles: UserRole[]
   siteId?: string
}

const initialState: HostOwnerDataInterface = {
   roles: [],
   siteId: undefined,
}

const hostOwnerSlice = createSlice({
   name: 'hostOwner',
   initialState,
   reducers: {
      setHostOwnerInformation: (
         state,
         action: PayloadAction<HostOwnerDataInterface>,
      ) => {
         state.roles = action.payload.roles
         state.siteId = action.payload.siteId
      },
   },
})

export const { setHostOwnerInformation } = hostOwnerSlice.actions
export default hostOwnerSlice.reducer
