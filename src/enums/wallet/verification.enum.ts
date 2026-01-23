export const VerificationType = {
   ID_CARD: 'ID_CARD',
   PASSPORT: 'PASSPORT',
   RESIDENT_CARD: 'RESIDENT_CARD',
} as const

export type VerificationType = keyof typeof VerificationType
