import { ExpressDeliveryType } from '@/enums/express/express.delivery.type.enum'
import { ExpressGuaranteeType } from '@/enums/express/express.guarantee.type'
import { MethodType } from '@/enums/method.type.enum'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface ExpressAddressInterface {
   addressId: string
   name: string
   latitude?: number
   longitude?: number
   isTanaCity: boolean
   region?: string
   district?: string
   description?: string
   clientProfileId?: string
   adminProfileId?: string
   createdAt?: string
   updatedAt?: string
}

export interface ClientInformationInterface {
   senderName: string
   senderPhoneNumber: string
   receiverName: string
   receiverPhoneNumber: string
}

export interface PackageInformationInterface {
   contentType?: string
   isFragile: boolean
   estimatedWidth: number
   estimatedHeight: number
   estimatedLength: number
   estimatedWeight: number
   note?: string
}

export interface OverExpressInformation {
   distance: number
   fragileFactor: number
   guaranteeBasicFees: number
   guaranteeStandardFees: number
   guaranteePremiumFees: number
   guaranteeBasicCoverUp: number
   guaranteeStandardCoverUp: number
   guaranteePremiumCoverUp: number
   message: string
}

interface stateInterface {
   expressPickUpAddress: ExpressAddressInterface
   expressDeliveryAddress: ExpressAddressInterface
   clientInformation: ClientInformationInterface
   packageInformation: PackageInformationInterface
   expressGuaranteeType: ExpressGuaranteeType
   expressDeliveryType: ExpressDeliveryType
   overExpressInformation?: OverExpressInformation
   deliveryFees: number
   paymentMethod: MethodType
   isPayInAdvance: boolean
   cooperative?: string
}

const initialState: stateInterface = {
   expressPickUpAddress: {
      addressId: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      isTanaCity: true,
   },
   expressDeliveryAddress: {
      addressId: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      isTanaCity: true,
   },
   clientInformation: {
      senderName: '',
      senderPhoneNumber: '',
      receiverName: '',
      receiverPhoneNumber: '',
   },
   packageInformation: {
      estimatedWidth: 0,
      estimatedHeight: 0,
      estimatedLength: 0,
      estimatedWeight: 0,
      isFragile: false,
   },
   expressGuaranteeType: ExpressGuaranteeType.BASIC as ExpressGuaranteeType,
   expressDeliveryType:
      ExpressDeliveryType.NORMAL_DELIVERY as ExpressDeliveryType,
   overExpressInformation: undefined,
   deliveryFees: 0,
   paymentMethod: MethodType.CASH,
   isPayInAdvance: true,
   cooperative: undefined,
}

const expressCommandSlice = createSlice({
   name: 'express-command',
   initialState,
   reducers: {
      setExpressPickupAddress: (
         state,
         action: PayloadAction<ExpressAddressInterface>,
      ) => {
         state.expressPickUpAddress = action.payload
      },
      setExpressDeliveryAddress: (
         state,
         action: PayloadAction<ExpressAddressInterface>,
      ) => {
         state.expressDeliveryAddress = action.payload
      },
      setSenderInformation: (
         state,
         action: PayloadAction<{
            senderName: string
            senderPhoneNumber: string
         }>,
      ) => {
         state.clientInformation.senderName = action.payload.senderName
         state.clientInformation.senderPhoneNumber =
            action.payload.senderPhoneNumber
      },
      setReceiverInformation: (
         state,
         action: PayloadAction<{
            receiverName: string
            receiverPhoneNumber: string
         }>,
      ) => {
         state.clientInformation.receiverName = action.payload.receiverName
         state.clientInformation.receiverPhoneNumber =
            action.payload.receiverPhoneNumber
      },
      setExpressPickupLocation: (
         state,
         action: PayloadAction<{ latitude: number; longitude: number }>,
      ) => {
         if (state.expressPickUpAddress) {
            state.expressPickUpAddress.latitude = action.payload.latitude
            state.expressPickUpAddress.longitude = action.payload.longitude
         }
      },
      setExpressDeliveryLocation: (
         state,
         action: PayloadAction<{ latitude: number; longitude: number }>,
      ) => {
         if (state.expressDeliveryAddress) {
            state.expressDeliveryAddress.latitude = action.payload.latitude
            state.expressDeliveryAddress.longitude = action.payload.longitude
         }
      },
      setPackageInformation: (
         state,
         action: PayloadAction<PackageInformationInterface>,
      ) => {
         state.packageInformation = action.payload
      },
      setExpressDeliveryType: (
         state,
         action: PayloadAction<ExpressDeliveryType>,
      ) => {
         state.expressDeliveryType = action.payload
      },
      setExpressGuaranteeType: (
         state,
         action: PayloadAction<ExpressGuaranteeType>,
      ) => {
         state.expressGuaranteeType = action.payload
      },
      setOverExpressInformation: (
         state,
         action: PayloadAction<OverExpressInformation>,
      ) => {
         state.overExpressInformation = action.payload
      },
      setDeliveryFees: (state, action: PayloadAction<number>) => {
         state.deliveryFees = action.payload
      },
      setExpressPaymentMethod: (state, action: PayloadAction<MethodType>) => {
         state.paymentMethod = action.payload
      },
      setIsPayInAdvance: (state, action: PayloadAction<boolean>) => {
         state.isPayInAdvance = action.payload
      },
      setCooperative: (state, action: PayloadAction<string>) => {
         state.cooperative = action.payload
      },
      resetExpressCommand: () => {
         return initialState
      },
   },
})

export const {
   setExpressDeliveryAddress,
   setExpressPickupAddress,
   setSenderInformation,
   setReceiverInformation,
   setExpressPickupLocation,
   setExpressDeliveryLocation,
   setPackageInformation,
   setExpressDeliveryType,
   setExpressGuaranteeType,
   setOverExpressInformation,
   setDeliveryFees,
   setExpressPaymentMethod,
   setIsPayInAdvance,
   setCooperative,
   resetExpressCommand,
} = expressCommandSlice.actions
export default expressCommandSlice.reducer
