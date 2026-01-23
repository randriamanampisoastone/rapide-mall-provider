import rapideIcon from '@/assets/images/logo/rapide_icon.png'
import logoLight from '@/assets/images/logo/logo_light.png'
import logoDark from '@/assets/images/logo/logo_dark.png'

import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useTheme } from '../ThemeProvider'
import { Link } from '@tanstack/react-router'

export function HeaderAppSidebar() {
   const { theme } = useTheme()
   return (
      <SidebarMenu>
         <SidebarMenuItem>
            <SidebarMenuButton
               size='lg'
               className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-2.5'
               asChild
            >
               <Link to='/app'>
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                     <img src={rapideIcon} alt='logo' className='rounded-sm' />
                  </div>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                     <img
                        src={theme === 'dark' ? logoLight : logoDark}
                        alt='logo'
                        className='w-28'
                     />
                  </div>
               </Link>
            </SidebarMenuButton>
         </SidebarMenuItem>
      </SidebarMenu>
   )
}
