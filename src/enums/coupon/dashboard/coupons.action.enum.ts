export const CouponsCategories = {
   RIDES: 'RIDES',
   EXPRESS: 'EXPRESS',
   FOODS: 'FOODS',
   MARTS: 'MARTS',
} as const

export type CouponsCategories = keyof typeof CouponsCategories

export const CouponsCategoriesColor = {
   [CouponsCategories.RIDES]: 'green',
   [CouponsCategories.EXPRESS]: 'blue',
   [CouponsCategories.FOODS]: 'yellow',
   [CouponsCategories.MARTS]: 'fuchsia',
}
