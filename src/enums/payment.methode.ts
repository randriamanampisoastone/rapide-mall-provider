export const PaymentMethode = {
   CASH: 'CASH',
   RAPIDE_WALLET: 'RAPIDE_WALLET',
   MVOLA: 'MVOLA',
   ORANGE_MONEY: 'ORANGE_MONEY',
   CARD: 'CARD',
} as const

export type PaymentMethode = keyof typeof PaymentMethode
