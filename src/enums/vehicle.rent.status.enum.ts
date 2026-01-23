export const VehicleRentStatusType = {
   PENDING: 'PENDING',
   FROZEN: 'FROZEN',
   RESERVED: 'RESERVED',
   BROKEN: 'BROKEN',
   AVAILABLE: 'AVAILABLE',
   UNAVAILABLE: 'UNAVAILABLE',
}

export type VehicleRentStatusType = keyof typeof VehicleRentStatusType
