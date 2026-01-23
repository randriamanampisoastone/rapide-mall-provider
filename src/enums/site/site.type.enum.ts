export const SiteType = {
   HEAD_QUARTER: 'HEAD_QUARTER',
   HUB: 'HUB',
   CASH_POINT: 'CASH_POINT',
} as const

export type SiteType = keyof typeof SiteType
