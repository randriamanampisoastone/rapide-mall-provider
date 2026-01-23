export const TransactionStatusType = {
   PENDING: 'PENDING',
   SUCCESS: 'SUCCESS',
   FAILED: 'FAILED',
   REJECTED: 'REJECTED',
} as const

export type TransactionStatusType = keyof typeof TransactionStatusType

export const TransactionStatusTypeColor = {
   [TransactionStatusType.PENDING]: 'yellow',
   [TransactionStatusType.SUCCESS]: 'green',
   [TransactionStatusType.FAILED]: 'red',
   [TransactionStatusType.REJECTED]: 'red',
}
