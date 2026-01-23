import { IoIosLogOut } from 'react-icons/io'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import AdminInfo from '../adminInfo/AdminInfo'
import { useGetClientProfile } from '@/api/profile/get.client.profile'
import LogOut from '../adminInfo/LogOut'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { SlOptions } from 'react-icons/sl'
import { useState } from 'react'
import langue from '@/data/language/adminInfo/AdminSheet.json'
import useTranslate from '@/hooks/useTranslate'

function AdminSheet() {
   const translate = useTranslate(langue)
   const [isLogOutOpen, setIsLogOutOpen] = useState<boolean>(false)
   const { data: dataClientProfile } = useGetClientProfile()

   return (
      <>
         <Sheet>
            <SheetTrigger>
               <Avatar className='cursor-pointer'>
                  <AvatarImage
                     src={dataClientProfile?.profilePhoto}
                     alt='@shadcn'
                  />
                  <AvatarFallback className='bg-[var(--green-secondary)] font-bold text-sm'>
                     {dataClientProfile?.firstName?.charAt(0).toUpperCase()}
                     {dataClientProfile?.lastName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
            </SheetTrigger>
            <SheetContent>
               <AdminInfo
                  dataAdminProfile={dataClientProfile}
                  dropdownMenuAdminProfile={
                     <div className='absolute z-50 top-4 left-4'>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <div className='cursor-pointer hover:scale-110 duration-300'>
                                 <SlOptions className='text-muted-foreground' />
                              </div>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align='start'>
                              <SheetClose asChild>
                                 <DropdownMenuItem
                                    onClick={() => setIsLogOutOpen(true)}
                                    className='cursor-pointer'
                                 >
                                    <IoIosLogOut className='text-[var(--red)]' />{' '}
                                    {translate('log_out')}
                                 </DropdownMenuItem>
                              </SheetClose>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  }
               />
            </SheetContent>
         </Sheet>

         {isLogOutOpen && (
            <LogOut open={isLogOutOpen} setOpen={setIsLogOutOpen} />
         )}
      </>
   )
}

export default AdminSheet
