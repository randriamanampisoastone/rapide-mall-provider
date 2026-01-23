export const InvoiceStatusType = {
   UNPAID: 'UNPAID',
   PAID: 'PAID',
   PENDING: 'PENDING',
   CANCELLED: 'CANCELLED',
   OVERDUE: 'OVERDUE',
   REFUNDED: 'REFUNDED',
   PROCESS: 'PROCESS',
} as const

export type InvoiceStatusType = keyof typeof InvoiceStatusType

export const InvoiceStatusColor: Record<InvoiceStatusType, string> = {
   [InvoiceStatusType.UNPAID]: 'var(--red)',
   [InvoiceStatusType.PAID]: 'var(--green)',
   [InvoiceStatusType.PENDING]: 'var(--yellow)',
   [InvoiceStatusType.CANCELLED]: 'var(--red)',
   [InvoiceStatusType.OVERDUE]: 'var(--red)',
   [InvoiceStatusType.REFUNDED]: 'var(--green)',
   [InvoiceStatusType.PROCESS]: 'var(--yellow)',
}
