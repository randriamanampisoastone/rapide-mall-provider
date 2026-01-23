import {
   Sidebar,
   SidebarContent,
   SidebarHeader,
} from '@/components/ui/sidebar'
import { HeaderAppSidebar } from './HeaderAppSidebar'
import { NavMain } from './NavMain'
import { useDataSidebar } from '@/hooks/useDataSidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const { dataSidebar } = useDataSidebar()
   return (
      <Sidebar variant='inset' collapsible='icon' {...props}>
         <SidebarHeader>
            <HeaderAppSidebar />
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={dataSidebar} />
         </SidebarContent>
      </Sidebar>
   )
}
