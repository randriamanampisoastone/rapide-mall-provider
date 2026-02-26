import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/mart/add-many-products')({
   component: RouteComponent,
})

function RouteComponent() {
   return <div>Hello "/app/mart/add-many-products"!</div>
}
