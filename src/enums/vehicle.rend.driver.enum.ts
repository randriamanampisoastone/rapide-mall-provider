export const VehicleRentDriverType = {
   WITH_DRIVER: 'WITH_DRIVER',
   WITHOUT_DRIVER: 'WITHOUT_DRIVER',
   DRIVER_OPTIONAL: 'DRIVER_OPTIONAL',
}

export type VehicleRentDriverType = keyof typeof VehicleRentDriverType
