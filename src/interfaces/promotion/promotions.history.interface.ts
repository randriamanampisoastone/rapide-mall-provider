import type { PromotionsCategories } from '@/enums/promotion/dashboard/promotions.action.enum'

export interface PromotionsHistoryInterface {
   promotionId: string
   reference: number
   use: number
   promotionsCategories: PromotionsCategories
   clientProfileId: string
   usedAt: string
}
