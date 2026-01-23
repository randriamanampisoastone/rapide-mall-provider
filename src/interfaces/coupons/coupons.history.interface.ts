import type { CouponsCategories } from '@/enums/coupon/dashboard/coupons.action.enum'

export interface CouponsHistoryInterface {
   couponId: string
   reference: number
   use: number
   couponsCategories: CouponsCategories
   clientProfileId: string
   usedAt: string
}
