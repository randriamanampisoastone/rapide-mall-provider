import TransactionsBoard from '@/components/app/transaction/transactionsBoard/TransactionsBoard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/transactions/')({
   component: RouteComponent,
})

function RouteComponent() {
   return <TransactionsBoard />
}
