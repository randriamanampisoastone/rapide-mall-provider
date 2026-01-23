export const CompanyPurposeType = {
   MAIN: 'MAIN',
   RESERVE: 'RESERVE',
   REFUND: 'REFUND',
   PROMOTION: 'PROMOTION',
   TAX: 'TAX',
} as const

export type CompanyPurposeType = keyof typeof CompanyPurposeType
