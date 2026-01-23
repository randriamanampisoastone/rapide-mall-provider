export const RapideWalletStatus = {
   UNDETERMINED: 'UNDETERMINED',
   ACTIVE: 'ACTIVE',
   PENDING: 'PENDING',
   FROZEN: 'FROZEN',
   CLOSED: 'CLOSED',
   REJECTED: 'REJECTED',
} as const

export type RapideWalletStatus = keyof typeof RapideWalletStatus

export const WalletStatusColor: Record<RapideWalletStatus, string> = {
   [RapideWalletStatus.UNDETERMINED]: 'orange',
   [RapideWalletStatus.ACTIVE]: 'green',
   [RapideWalletStatus.PENDING]: 'yellow',
   [RapideWalletStatus.FROZEN]: 'blue',
   [RapideWalletStatus.CLOSED]: 'brown',
   [RapideWalletStatus.REJECTED]: 'red',
}
