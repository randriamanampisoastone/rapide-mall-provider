export const MethodType = {
   CASH: 'CASH',
   RAPIDE_WALLET: 'RAPIDE_WALLET',
   ORANGE_MONEY: 'ORANGE_MONEY',
   MVOLA: 'MVOLA',
   CARD: 'CARD',
} as const

export type MethodType = keyof typeof MethodType
