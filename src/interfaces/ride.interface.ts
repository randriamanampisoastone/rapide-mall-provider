import type { MethodType } from '@/enums/method.type.enum'
import type { RideStatusType } from '@/enums/ride/ride.status.enum'
import type { VehicleType } from '@/enums/ride/vehicle.enum'
import type { ShiftType } from '@/enums/shift.enum'

export interface RideData {
   rideId?: string

   shift?: ShiftType

   clientProfileId: string
   driverProfileId?: string
   adminProfileId?: string

   vehicleType: VehicleType

   methodType: MethodType

   pickUpLocation: {
      latitude: number
      longitude: number
   }
   dropOffLocation: {
      latitude: number
      longitude: number
   }
   isBooked: boolean
   pickUpDateWithTime?: Date
   encodedPolyline: string
   distanceMeters: number

   isAssignedByAdmin: boolean
   isCreatedByAdmin: boolean
   lambdaClientName?: string
   lambdaClientPhoneNumber?: string

   rideShortCode: string

   estimatedDuration: number
   estimatedPrice: {
      lower: number
      upper: number
   }
   estimatedPriceAfterDiscount: {
      lower: number
      upper: number
   }
   discount?: number

   isUseRidePromotion: boolean
   isUseRideCouponUsage: boolean
   ridePromotionId?: string
   rideCouponUsageId?: string

   realPrice?: number
   isAlreadyPay?: boolean

   rideStatus?: RideStatusType

   driverToClientEncodedPolyline?: string
   driverToClientDistanceMeters?: number
   driverToClientEstimatedDuration?: number
   driverToClientStartTime?: Date
   driverToClientEndTime?: Date

   clientExpoPushToken?: string
   driverExpoPushToken?: string

   waitingTime?: number
   driverReceivedRequest: string[]

   note?: number
   review?: string

   orangeMoneyTransactionId?: string
   mvolaTransactionId?: string
   cardTransactionId?: string

   startTime?: Date
   endTime?: Date

   createdAt?: Date
   updatedAt?: Date
}
