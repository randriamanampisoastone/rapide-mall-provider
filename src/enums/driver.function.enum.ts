export const DriverFunctionType = {
   RIDE: 'RIDE',
   EXPRESS: 'EXPRESS',
   MART: 'MART',
   FOOD: 'FOOD',
}

export type DriverFunctionType = keyof typeof DriverFunctionType
