import type { RideData } from '@/interfaces/ride.interface'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface RideState {
   allCurrentRide: RideData[]
   isClientFindingDriverModalOpen: boolean
   selectedRideId: string | null
}

const initialState: RideState = {
   allCurrentRide: [],
   isClientFindingDriverModalOpen: false,
   selectedRideId: null,
}

const rideSlice = createSlice({
   name: 'ride',
   initialState,
   reducers: {
      setAllCurrentRide: (state, action: PayloadAction<RideData[]>) => {
         state.allCurrentRide = action.payload
      },
      setIsClientFindingDriverModalOpen: (
         state,
         action: PayloadAction<boolean>,
      ) => {
         state.isClientFindingDriverModalOpen = action.payload
      },
      toggleRideSelection: (state, action: PayloadAction<string>) => {
         state.selectedRideId =
            state.selectedRideId === action.payload ? null : action.payload
      },
      clearSelection: (state) => {
         state.selectedRideId = null
      },
   },
})

export const {
   setAllCurrentRide,
   setIsClientFindingDriverModalOpen,
   toggleRideSelection,
   clearSelection,
} = rideSlice.actions
export default rideSlice.reducer
