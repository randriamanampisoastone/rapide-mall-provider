import { centerAntananarivo } from '@/constants/liveTracking/liveTracking.constant'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: { lat: number; lng: number } = centerAntananarivo

const centerMapSlice = createSlice({
   name: 'centerMap',
   initialState,
   reducers: {
      setCenterMap: (
         state,
         action: PayloadAction<{ lat: number; lng: number }>,
      ) => {
         state.lat = action.payload.lat
         state.lng = action.payload.lng
      },
      resetCenterMap: () => {},
   },
})

export const { resetCenterMap, setCenterMap } = centerMapSlice.actions
export default centerMapSlice.reducer
