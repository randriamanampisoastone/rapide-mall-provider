export const ExpressGuaranteeType = {
   BASIC: 'BASIC',
   STANDARD: 'STANDARD',
   PREMIUM: 'PREMIUM',
}

export type ExpressGuaranteeType = keyof typeof ExpressGuaranteeType
