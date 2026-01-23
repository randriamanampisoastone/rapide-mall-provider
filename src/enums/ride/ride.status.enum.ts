export const RideStatusType = {
   FINDING_DRIVER: 'FINDING_DRIVER',
   CANCELLED: 'CANCELLED',
   DRIVER_ACCEPTED: 'DRIVER_ACCEPTED',
   DRIVER_ON_THE_WAY: 'DRIVER_ON_THE_WAY',
   STOPPED: 'STOPPED',
   DRIVER_ARRIVED: 'DRIVER_ARRIVED',
   CLIENT_NOT_FOUND: 'CLIENT_NOT_FOUND',
   ON_RIDE: 'ON_RIDE',
   ARRIVED_DESTINATION: 'ARRIVED_DESTINATION',
   COMPLETED: 'COMPLETED',
   ADMIN_CHECK: 'ADMIN_CHECK',
   ADMIN_CANCELLED: 'ADMIN_CANCELLED',
   BOOKED: 'BOOKED',
   EXPIRED_FINDING_DRIVER: 'EXPIRED_FINDING_DRIVER',
   PAY: 'PAY',
   CLIENT_DID_NOT_PAY: 'CLIENT_DID_NOT_PAY',
} as const

export type RideStatusType = keyof typeof RideStatusType

export const RideStatusColor = {
   [RideStatusType.COMPLETED]: '--green',
   [RideStatusType.CANCELLED]: '--red',
   [RideStatusType.STOPPED]: '--yellow',
   [RideStatusType.CLIENT_NOT_FOUND]: '--rose',
   [RideStatusType.ARRIVED_DESTINATION]: '--purple',
   [RideStatusType.ADMIN_CANCELLED]: '--red',
   [RideStatusType.ADMIN_CHECK]: '--orange',
   [RideStatusType.FINDING_DRIVER]: '--sky-blue',
   [RideStatusType.DRIVER_ACCEPTED]: '--blue',
   [RideStatusType.DRIVER_ON_THE_WAY]: '--blue',
   [RideStatusType.DRIVER_ARRIVED]: '--blue',
   [RideStatusType.ON_RIDE]: '--fuchsia',
   [RideStatusType.BOOKED]: '--green',
   [RideStatusType.EXPIRED_FINDING_DRIVER]: '--yellow',
   [RideStatusType.PAY]: '--green',
   [RideStatusType.CLIENT_DID_NOT_PAY]: '--red',
}
