import useTranslate from '@/hooks/useTranslate'
import langue from '@/data/language/Navbar.json'
import {
   LucideLogOut,
   LucidePanelRightClose,
   LucidePanelRightOpen,
   Moon,
   Sun,
} from 'lucide-react'
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { useSidebar } from '../ui/sidebar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Link, useRouterState } from '@tanstack/react-router'
import AppProperties from './AppProperties'
import AdminSheet from '../adminInfo/AdminSheet'
import { Button } from '../ui/button'
import LogOut from '../adminInfo/LogOut'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CgMenuGridO } from 'react-icons/cg'
import { useGetShift } from '@/api/shift/get.shift.api'
import { ShiftType } from '@/enums/shift.enum'

function Navbar() {
   const translate = useTranslate(langue)

   const { open, toggleSidebar } = useSidebar()

   const location = useRouterState({ select: (state) => state.location })

   const pathname = location.pathname
   const [isLogOutModalOpen, setIsLogOutModalOpen] = useState<boolean>(false)

   const segments = pathname.split('/').filter(Boolean)

   const items = segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      const isLast = index === segments.length - 1
      const isUuid =
         /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
            segment,
         )

      const label = isUuid ? 'detail' : segment.charAt(0) + segment.slice(1)

      return (
         <BreadcrumbItem key={href}>
            {isLast ? (
               <BreadcrumbPage>{translate(label)}</BreadcrumbPage>
            ) : (
               <>
                  <Link to={href}>
                     <BreadcrumbLink>{translate(label)}</BreadcrumbLink>
                  </Link>
                  <BreadcrumbSeparator />
               </>
            )}
         </BreadcrumbItem>
      )
   })

   const {
      data: dataGetShift,
      isSuccess: isSuccessGetShift,
      refetch: refetchGetShift,
   } = useGetShift()

   useEffect(() => {
      const intervale = setInterval(() => {
         refetchGetShift()
      }, 10_000)
      return () => clearInterval(intervale)
   }, [refetchGetShift])

   const options = () => {
      return <></>
   }

   return (
      <>
         <div className='flex sticky top-0 justify-between w-full h-12 bg-[var(--background)] z-10 '>
            <div className='flex items-center ml-2.5 gap-3'>
               <button
                  onClick={() => {
                     toggleSidebar()
                  }}
               >
                  {open ? (
                     <LucidePanelRightOpen className='text-2xl' />
                  ) : (
                     <LucidePanelRightClose className='text-2xl' />
                  )}
               </button>
               <Breadcrumb className='hidden lg:block'>
                  <BreadcrumbList>{items}</BreadcrumbList>
               </Breadcrumb>
            </div>

            <div className='flex items-center gap-4 mr-2.5'>
               {isSuccessGetShift && (
                  <>
                     {dataGetShift.shift === ShiftType.DAY && (
                        <div className='flex items-center gap-2 bg-[var(--blue-secondary)] rounded-md text-xs font-bold px-2 py-1'>
                           <Sun className='size-4 text-[var(--blue)]' />
                           <p className='truncate'>{translate('day_shift')}</p>
                        </div>
                     )}
                     {dataGetShift.shift === ShiftType.NIGHT && (
                        <div className='flex items-center gap-2 bg-[var(--red-secondary)] rounded-md text-xs font-bold px-2 py-1'>
                           <Moon className='size-4 text-[var(--red)]' />
                           <p className='truncate'>
                              {translate('night_shift')}
                           </p>
                        </div>
                     )}
                  </>
               )}

               <div className='hidden md:flex items-center gap-4'>
                  {options()}
               </div>
               <div className='block md:hidden'>
                  <Popover>
                     <PopoverTrigger asChild>
                        <Button variant={'outline'}>
                           <CgMenuGridO />
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent className='grid grid-cols-3 gap-4 w-40'>
                        {options()}
                     </PopoverContent>
                  </Popover>
               </div>

               <AppProperties />

               <AdminSheet />

               <HoverCard>
                  <HoverCardTrigger>
                     <Button
                        variant='ghost'
                        className='text-[var(--red)] w-fit !p-0 cursor-pointer hover:scale-95 duration-300'
                        onClick={() => setIsLogOutModalOpen(true)}
                     >
                        <LucideLogOut className='size-6' />
                     </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className='text-center text-[var(--red)]'>
                     {translate('log_out')}
                  </HoverCardContent>
               </HoverCard>

               <LogOut
                  open={isLogOutModalOpen}
                  setOpen={setIsLogOutModalOpen}
               />
            </div>
         </div>
      </>
   )
}

export default Navbar
