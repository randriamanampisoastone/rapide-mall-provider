export const RentStatusType = {
   PENDING: 'PENDING',
   VALIDATE: 'VALIDATE',
   CANCELLED: 'CANCELLED',
   ADMIN_CANCELLED: 'ADMIN_CANCELLED',
   REJECTED: 'REJECTED',
   PROCESSING: 'PROCESSING',
   COMPLETED: 'COMPLETED',
   CLIENT_NOT_FOUND: 'CLIENT_NOT_FOUND',
}

export type RentStatusType = keyof typeof RentStatusType

export const RentStatusColor: Record<string, string> = {
   [RentStatusType.PENDING]: 'yellow',
   [RentStatusType.VALIDATE]: 'green',
   [RentStatusType.CANCELLED]: 'red',
   [RentStatusType.ADMIN_CANCELLED]: 'orange',
   [RentStatusType.REJECTED]: 'brown',
   [RentStatusType.PROCESSING]: 'blue',
   [RentStatusType.COMPLETED]: 'green',
   [RentStatusType.CLIENT_NOT_FOUND]: 'red',
}
