export const PromotionsCategories = {
   RIDES: 'RIDES',
   EXPRESS: 'EXPRESS',
   FOODS: 'FOODS',
   MARTS: 'MARTS',
} as const

export type PromotionsCategories = keyof typeof PromotionsCategories

export const PromotionsCategoriesColor = {
   [PromotionsCategories.RIDES]: 'green',
   [PromotionsCategories.EXPRESS]: 'blue',
   [PromotionsCategories.FOODS]: 'yellow',
   [PromotionsCategories.MARTS]: 'fuchsia',
}
