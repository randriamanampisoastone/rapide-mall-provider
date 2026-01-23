export const RentTimeType = {
   HALF_DAY: 'HALF_DAY',
   DAILY: 'DAILY',
   WEEKLY: 'WEEKLY',
}

export type RentTimeType = keyof typeof RentTimeType
