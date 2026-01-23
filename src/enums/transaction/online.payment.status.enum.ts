export const OnlinePaymentStatusType = {
   INITIATED: 'INITIATED',
   PENDING: 'PENDING',
   EXPIRED: 'EXPIRED',
   SUCCESS: 'SUCCESS',
   COMPLETED: 'COMPLETED',
   FAILED: 'FAILED',
   CANCELLED: 'CANCELLED',
   REJECTED: 'REJECTED',
} as const

export type OnlinePaymentStatusType = keyof typeof OnlinePaymentStatusType
