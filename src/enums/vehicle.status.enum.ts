export const VehicleStatus = {
   AVAILABLE: 'AVAILABLE',
   MAINTENANCE: 'MAINTENANCE',
   BROKEN: 'BROKEN',
   OFFLINE: 'OFFLINE',
   RESERVED: 'RESERVED',
   CHARGING: 'CHARGING',
   NON_COMPLIANT: 'NON_COMPLIANT',
} as const

export type VehicleStatus = keyof typeof VehicleStatus

export const VehicleStatusColor: Record<VehicleStatus, string> = {
   [VehicleStatus.AVAILABLE]: 'green',
   [VehicleStatus.MAINTENANCE]: 'orange',
   [VehicleStatus.BROKEN]: 'red',
   [VehicleStatus.OFFLINE]: 'grey',
   [VehicleStatus.RESERVED]: 'blue',
   [VehicleStatus.CHARGING]: 'purple',
   [VehicleStatus.NON_COMPLIANT]: 'red',
}
