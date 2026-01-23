import { configureStore } from '@reduxjs/toolkit'
import languageReducer from '@/redux/slices/language.slice'
import sidebarReducer from '@/redux/slices/sidebar.slice'
import socketReducer from '@/redux/slices/socket.slice'
import rideReducer from '@/redux/slices/ride.slice'
import adminRoleReducer from '@/redux/slices/admin.role.slice'
import hostOwnerReducer from '@/redux/slices/host.owner.slice'
import centerMapReduce from '@/redux/slices/center.map.slice'
import otpReduce from '@/redux/slices/otp.slice'
import selectedRideAndDriverReduce from '@/redux/slices/selected.ride.and.driver.slice'
import expressCommandReduce from '@/redux/slices/express.slice'
import fileReduce from '@/redux/slices/file.slice'
import martProductReduce from '@/redux/slices/mart.product.slice'

export const store = configureStore({
   reducer: {
      language: languageReducer,
      sidebar: sidebarReducer,
      socket: socketReducer,
      ride: rideReducer,
      adminRole: adminRoleReducer,
      hostOwner: hostOwnerReducer,
      centerMap: centerMapReduce,
      otp: otpReduce,
      selectedRideAndDriver: selectedRideAndDriverReduce,
      expressCommand: expressCommandReduce,
      file: fileReduce,
      martProduct: martProductReduce,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
