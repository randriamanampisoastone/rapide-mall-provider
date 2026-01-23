export const CardType = {
   VISA: 'VISA',
   MASTER_CARD: 'MASTER_CARD',
} as const

export type CardType = keyof typeof CardType
