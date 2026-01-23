export const FuelType = {
   GASOLINE: 'GASOLINE',
   DIESEL: 'DIESEL',
   ELECTRICAL: 'ELECTRICAL',
   HYBRID: 'HYBRID',
   CNG: 'CNG',
   LPG: 'LPG',
   FLEX_FUEL: 'FLEX_FUEL',
   LNG: 'LNG',
   MARINE_DIESEL: 'MARINE_DIESEL',
   MARINE_GASOLINE: 'MARINE_GASOLINE',
   AVGAS: 'AVGAS',
   KEROSENE: 'KEROSENE',
}

export type FuelType = keyof typeof FuelType

export const FuelMethod = {
   CASH: 'CASH',
   JOVENA_CARD: 'JOVENA_CARD',
}
export type FuelMethod = keyof typeof FuelMethod
