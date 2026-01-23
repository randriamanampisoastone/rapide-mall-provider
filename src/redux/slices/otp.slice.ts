import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface OtpInterface {
   phoneNumber: string
   otp: string
   motif: string
   createdAt: string
}

interface OtpStateInterface {
   otps: OtpInterface[]
}

const initialState: OtpStateInterface = {
   otps: [],
}

const otpSlice = createSlice({
   name: 'otp',
   initialState,
   reducers: {
      pushOtp: (state, action: PayloadAction<OtpInterface>) => {
         state.otps.push(action.payload)
      },
   },
})

export const { pushOtp } = otpSlice.actions
export default otpSlice.reducer
