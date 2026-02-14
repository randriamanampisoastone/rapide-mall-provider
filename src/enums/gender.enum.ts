export const GenderType = {
   MALE: 'MALE',
   FEMALE: 'FEMALE',
   OTHER: 'OTHER',
} as const

export type GenderType = keyof typeof GenderType
