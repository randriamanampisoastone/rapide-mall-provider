export const MartOrderItemStatusType = {
   WAITING_FOR_CONFIRMATION: 'WAITING_FOR_CONFIRMATION',
   SOLD_OUT: 'SOLD_OUT',
   CONFIRMED: 'CONFIRMED',
   READY_FOR_PICK_UP: 'READY_FOR_PICK_UP',
   PICKED: 'PICKED',
   ARRIVED_IN_WAREHOUSE: 'ARRIVED_IN_WAREHOUSE',
   READY_FOR_DELIVERY: 'READY_FOR_DELIVERY',
   ON_DELIVERY: 'ON_DELIVERY',
   DELIVERED: 'DELIVERED',
   LOST_ON_PICKED: 'LOST_ON_PICKED',
   LOST_IN_WAREHOUSE: 'LOST_IN_WAREHOUSE',
   LOST_ON_DELIVERY: 'LOST_ON_DELIVERY',
   BROKEN_ON_PICKED: 'BROKEN_ON_PICKED',
   BROKEN_IN_WAREHOUSE: 'BROKEN_IN_WAREHOUSE',
   BROKEN_ON_DELIVERY: 'BROKEN_ON_DELIVERY',
}

export type MartOrderItemStatusType = keyof typeof MartOrderItemStatusType

export const MartOrderItemStatusColor: Record<
   string | MartOrderItemStatusType,
   string
> = {
   [MartOrderItemStatusType.WAITING_FOR_CONFIRMATION]: 'yellow',
   [MartOrderItemStatusType.SOLD_OUT]: 'brown',
   [MartOrderItemStatusType.CONFIRMED]: 'blue',
   [MartOrderItemStatusType.READY_FOR_PICK_UP]: 'sky-blue',
   [MartOrderItemStatusType.PICKED]: 'orange',
   [MartOrderItemStatusType.ARRIVED_IN_WAREHOUSE]: 'purple',
   [MartOrderItemStatusType.READY_FOR_DELIVERY]: 'sky-blue',
   [MartOrderItemStatusType.ON_DELIVERY]: 'orange',
   [MartOrderItemStatusType.DELIVERED]: 'green',
   [MartOrderItemStatusType.LOST_ON_PICKED]: 'red',
   [MartOrderItemStatusType.LOST_IN_WAREHOUSE]: 'red',
   [MartOrderItemStatusType.LOST_ON_DELIVERY]: 'red',
   [MartOrderItemStatusType.BROKEN_ON_PICKED]: 'red',
   [MartOrderItemStatusType.BROKEN_IN_WAREHOUSE]: 'red',
   [MartOrderItemStatusType.BROKEN_ON_DELIVERY]: 'red',
}
