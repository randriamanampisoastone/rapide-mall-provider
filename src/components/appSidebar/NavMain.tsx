import { ChevronRight, type LucideIcon } from 'lucide-react'

import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
   SidebarGroup,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import type { IconType } from 'react-icons/lib'

export function NavMain({
   items,
}: {
   items: {
      title: string
      url?: string
      icon?: LucideIcon | IconType
      isActive?: boolean
      items?: {
         title: string
         url: string
      }[]
   }[]
}) {
   return (
      <SidebarGroup>
         <SidebarMenu>
            {items.map((item) =>
               item.items && item.items.length > 0 ? (
                  <Collapsible
                     key={item.title}
                     asChild
                     defaultOpen={false}
                     className='group/collapsible'
                  >
                     <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                           <Link
                              to={item.url}
                              className='[&.active]:bg-sidebar-accent [&.active]:text-sidebar-accent-foreground'
                           >
                              <SidebarMenuButton tooltip={item.title}>
                                 {item.icon && (
                                    <item.icon className='text-[var(--green)]' />
                                 )}
                                 <span>{item.title}</span>
                                 <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                              </SidebarMenuButton>
                           </Link>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                           <SidebarMenuSub>
                              {item.items?.map((subItem) => (
                                 <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                       <Link
                                          to={
                                             `${item.url}/${subItem.url}` as any
                                          }
                                          className='[&.active]:bg-sidebar-accent [&.active]:text-sidebar-accent-foreground'
                                       >
                                          <span>{subItem.title}</span>
                                       </Link>
                                    </SidebarMenuSubButton>
                                 </SidebarMenuSubItem>
                              ))}
                           </SidebarMenuSub>
                        </CollapsibleContent>
                     </SidebarMenuItem>
                  </Collapsible>
               ) : (
                  <Link
                     to={item.url}
                     className='[&.active]:bg-sidebar-accent [&.active]:text-sidebar-accent-foreground [&.active]:rounded-md'
                  >
                     <SidebarMenuButton tooltip={item.title}>
                        {item.icon && (
                           <item.icon className='text-[var(--green)]' />
                        )}
                        <span>{item.title}</span>
                     </SidebarMenuButton>
                  </Link>
               ),
            )}
         </SidebarMenu>
      </SidebarGroup>
   )
}
