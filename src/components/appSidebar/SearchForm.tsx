import { Search } from 'lucide-react'
import {
   SidebarGroup,
   SidebarGroupContent,
   SidebarInput,
   useSidebar,
} from '@/components/ui/sidebar'
import useTranslate from '@/hooks/useTranslate'
import langue from '@/data/language/sidebar/Search.json'

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
   const translate = useTranslate(langue)

   const { open } = useSidebar()

   return (
      <>
         {open && (
            <form {...props}>
               <SidebarGroup className='py-0'>
                  <SidebarGroupContent className='relative'>
                     <SidebarInput
                        id='search'
                        placeholder={translate('search')}
                        className='pl-8'
                     />
                     <Search className='pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50' />
                  </SidebarGroupContent>
               </SidebarGroup>
            </form>
         )}
      </>
   )
}
