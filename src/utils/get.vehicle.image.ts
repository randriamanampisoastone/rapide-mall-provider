import { VehicleType } from '@/enums/ride/vehicle.enum'
import moto from '@/assets/images/vehicle/moto.png'
import car_lite from '@/assets/images/vehicle/car_lite.png'
import car_premium from '@/assets/images/vehicle/car_premium.png'

export const getVehicleImage = (vehicleType: VehicleType) => {
   switch (vehicleType) {
      case VehicleType.MOTO:
         return moto
      case VehicleType.LITE_CAR:
         return car_lite
      case VehicleType.PREMIUM_CAR:
         return car_premium
   }
}
