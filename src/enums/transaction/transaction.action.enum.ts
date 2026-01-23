export const TransactionActionType = {
   DEPOSIT: 'DEPOSIT',
   TRANSFER: 'TRANSFER',
   PAYMENT: 'PAYMENT',
   WITHDRAWAL: 'WITHDRAWAL',
   REFUND: 'REFUND',
   SETTLE: 'SETTLE',
   BONUS: 'BONUS',
   PENALTY: 'PENALTY',
   ADJUSTMENT: 'ADJUSTMENT',
} as const

export type TransactionActionType = keyof typeof TransactionActionType
