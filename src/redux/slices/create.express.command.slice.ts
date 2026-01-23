import type { LatLng } from '@/interfaces/map/location.interface'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CustomerInformationInterface {
   firstName: string
   lastName?: string
   phoneNumber: string
   address?: string
   commune?: string
   municipality?: string
   location?: LatLng
}

interface ExpressCommandInterface {
   senderInformation: CustomerInformationInterface
   receiverInformation: CustomerInformationInterface
   width: number
   height: number
   length: number
   weight: number
   isFragile: boolean
   note?: string
}

const customerDefaultValue: CustomerInformationInterface = {
   firstName: '',
   lastName: '',
   phoneNumber: '',
   address: undefined,
   commune: undefined,
   municipality: undefined,
   location: undefined,
}

const initialState: ExpressCommandInterface = {
   senderInformation: customerDefaultValue,
   receiverInformation: customerDefaultValue,
   width: 0,
   height: 0,
   length: 0,
   weight: 0,
   isFragile: false,
   note: '',
}

const createExpressCommandSlice = createSlice({
   name: 'create-express-command',
   initialState,
   reducers: {
      setExpressCommand: (
         state,
         action: PayloadAction<Partial<ExpressCommandInterface>>,
      ) => {
         state = { ...state, ...action.payload }
      },
      setCustomerInformation: (
         state,
         action: PayloadAction<{
            customerType: 'sender' | 'receiver'
            customerInformationData: Partial<CustomerInformationInterface>
         }>,
      ) => {
         if (action.payload.customerType === 'sender')
            state.senderInformation = {
               ...state.senderInformation,
               ...action.payload,
            }
         else if (action.payload.customerType === 'receiver')
            state.receiverInformation = {
               ...state.receiverInformation,
               ...action.payload,
            }
      },
      resetExpressCommand: () => initialState,
   },
})

export const {
   resetExpressCommand,
   setCustomerInformation,
   setExpressCommand,
} = createExpressCommandSlice.actions
export default createExpressCommandSlice.reducer
