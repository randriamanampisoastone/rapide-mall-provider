export const MartOrderStatusType = {
   PENDING_PAYMENT: 'PENDING_PAYMENT',
   CONFIRMED: 'CONFIRMED',
   PROCESSING: 'PROCESSING',
   SHIPPED: 'SHIPPED',
   DELIVERED: 'DELIVERED',
   CANCELLED: 'CANCELLED',
   RETURNED: 'RETURNED',
   REFUNDED: 'REFUNDED',
} as const

export type MartOrderStatusType = keyof typeof MartOrderStatusType

export const MartOrderStatusTypeColor: Record<MartOrderStatusType, string> = {
   PENDING_PAYMENT: '--yellow',
   CONFIRMED: '--blue',
   PROCESSING: '--sky-blue',
   SHIPPED: '--purple',
   DELIVERED: '--green',
   CANCELLED: '--red',
   RETURNED: '--fuchsia',
   REFUNDED: '--brown',
} as const
