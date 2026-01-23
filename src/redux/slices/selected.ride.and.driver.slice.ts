import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface selectedRideAndDriverInterface {
   rideIds: string[]
   driverIds: string[]
}

const initialState: selectedRideAndDriverInterface = {
   rideIds: [],
   driverIds: [],
}

const selectedRideAndDriverSlice = createSlice({
   name: 'selectedRideAndDriver',
   initialState,
   reducers: {
      pushOnSelectedRideIds: (state, action: PayloadAction<string>) => {
         const indexOfRide = state.rideIds.indexOf(action.payload)
         if (indexOfRide === -1) {
            state.rideIds.push(action.payload)
         }
      },
      pushOnSelectedDriverIds: (state, action: PayloadAction<string>) => {
         const indexOfDriver = state.driverIds.indexOf(action.payload)
         if (indexOfDriver === -1) {
            state.driverIds.push(action.payload)
         }
      },
      removeFromSelectedRideIds: (state, action: PayloadAction<string>) => {
         state.rideIds = state.rideIds.filter(
            (rideId) => rideId !== action.payload,
         )
      },
      removeFromSelectedDriverIds: (state, action: PayloadAction<string>) => {
         state.driverIds = state.driverIds.filter(
            (driverId) => driverId !== action.payload,
         )
      },
      clearAllSelectedRideAndDriver: (state) => {
         state.rideIds = []
         state.driverIds = []
      },
   },
})

export const {
   pushOnSelectedDriverIds,
   pushOnSelectedRideIds,
   removeFromSelectedDriverIds,
   removeFromSelectedRideIds,
   clearAllSelectedRideAndDriver,
} = selectedRideAndDriverSlice.actions
export default selectedRideAndDriverSlice.reducer
