export const FinanceType = {
   AGENCY: "AGENCY",
   RIDE: 'RIDE',
   EXPRESS: 'EXPRESS',
   FOOD: 'FOOD',
   MART: 'MART',
}

export type FinanceType = keyof typeof FinanceType
