import MartProductList from '@/components/app/mart/MartProductList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/mart/all-products')({
   component: RouteComponent,
})

function RouteComponent() {
   return <MartProductList />
}
