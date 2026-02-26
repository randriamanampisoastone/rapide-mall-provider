import { AppSidebar } from '@/components/appSidebar/AppSidebar'
import Navbar from '@/components/navbar/Navbar'
import NotFound404Component from '@/components/NotFound404Component '
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
   component: RouteComponent,
   notFoundComponent: () => <NotFound404Component item='page' />,
})

function RouteComponent() {
   return (
      <SidebarProvider className='overflow-x-hidden'>
         <AppSidebar />
         <SidebarInset className='min-w-0 max-w-full overflow-x-hidden'>
            <Navbar />
            <div className='p-2.5 flex-1 min-w-0 max-w-full overflow-x-hidden'>
               <Outlet />
            </div>
         </SidebarInset>
      </SidebarProvider>
   )
}
