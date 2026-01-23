import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import langue from '@/data/language/adminInfo/AdminInfo.json'
import useTranslate from '@/hooks/useTranslate'
import React, { useEffect, useState } from 'react'
import foodBackground from '@/assets/images/background/food-background.png'
import {
   Award,
   CalendarFold,
   ChevronLeft,
   KeyRound,
   Mars,
   Phone,
   ShieldPlus,
   Venus,
} from 'lucide-react'
import { ScaleLoader } from 'react-spinners'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import ScrollText from '../ScrollText'
import type { ClientProfileResponse } from '@/api/profile/get.client.profile'

interface AdminInfoProps {
   dataAdminProfile: ClientProfileResponse | undefined
   dropdownMenuAdminProfile: React.ReactNode
}

function AdminInfo({
   dropdownMenuAdminProfile,
   dataAdminProfile,
}: AdminInfoProps) {
   const translate = useTranslate(langue)

   const [adminProfile, setAdminProfile] =
      useState<ClientProfileResponse | null>(null)
   const [elementHover, setElementHover] = useState<
      'permission' | 'roles' | null
   >(null)
   const [listeToShow, setListeToShow] = useState<
      'permission' | 'roles' | null
   >(null)

   useEffect(() => {
      if (dataAdminProfile) {
         setAdminProfile(dataAdminProfile)
      }
   }, [dataAdminProfile])
   return adminProfile ? (
      <div className='h-full relative overflow-auto space-y-5 flex flex-col'>
         {/** Menu */}
         {dropdownMenuAdminProfile}

         {/** Decoration */}
         <div
            className='absolute inset-0 -z-50 h-full w-full'
            style={{
               WebkitMaskImage: `url("${foodBackground}")`,
               maskImage: `url("${foodBackground}")`,
               WebkitMaskRepeat: 'no-repeat',
               maskRepeat: 'no-repeat',
               WebkitMaskSize: 'cover',
               maskSize: 'cover',
               backgroundColor: 'var(--green)',
            }}
         />

         {/** Head */}
         <div className='rounded-b-[50%] bg-[var(--background)] relative overflow-hidden min-h-60'>
            <div className='bg-[var(--green-secondary)] w-full h-full p-10 flex flex-col items-center'>
               <Avatar className='size-30 relative z-10'>
                  <AvatarImage src={adminProfile.profilePhoto} alt='@shadcn' />
                  <AvatarFallback className='text-4xl'>
                     {adminProfile.firstName?.charAt(0).toUpperCase()}
                     {adminProfile.lastName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <div className='flex flex-1 flex-col items-center gap-1  w-full relative z-10'>
                  <ScrollText
                     text={adminProfile.firstName}
                     className='font-bold text-xl max-w-64 text-center'
                  />

                  <ScrollText
                     text={adminProfile.lastName}
                     className='font-bold break-words text-muted-foreground max-w-40 text-center'
                  />
               </div>
            </div>
         </div>

         <div className='w-full overflow-hidden flex h-full min-h-100'>
            <div
               className={cn(
                  'overflow-hidden w-0 duration-500 bg-[var(--background)] rounded-xl mb-5 flex flex-col',
                  {
                     'w-full mx-5': listeToShow,
                  },
               )}
               style={{ boxShadow: '3px 3px 1px var(--green-secondary)' }}
            >
               <div className='flex items-center justify-between p-2'>
                  <Button
                     className='bg-[var(--blue-secondary)] text-[var(--blue)] hover:bg-[var(--blue-secondary)]'
                     onClick={() => setListeToShow(null)}
                  >
                     <ChevronLeft />
                  </Button>
                  {listeToShow &&
                     (listeToShow === 'roles' ? (
                        <Button
                           className='bg-[var(--red-secondary)] text-[var(--red)] font-bold hover:bg-[var(--red-secondary)] hover:scale-105 duration-300'
                           onClick={() => setListeToShow('permission')}
                        >
                           <KeyRound /> {translate('show_permissions')}
                        </Button>
                     ) : (
                        <Button
                           className='bg-[var(--green-secondary)] text-[var(--green)] font-bold hover:bg-[var(--green-secondary)] hover:scale-105 duration-300'
                           onClick={() => setListeToShow('roles')}
                        >
                           <Award /> {translate('show_roles')}
                        </Button>
                     ))}
               </div>
            </div>
            <div
               className={cn('px-5 space-y-2 w-full duration-500', {
                  'w-0 p-0': listeToShow,
               })}
            >
               {/** Rols and permissoin */}
               <div className='space-y-2 min-w-60'>
                  <div
                     className='relative rounded-xl bg-[var(--background-secondary)] overflow-hidden cursor-pointer'
                     onMouseEnter={() => setElementHover('roles')}
                     onMouseLeave={() => setElementHover(null)}
                  >
                     <div
                        className={cn(
                           'absolute h-full w-0 bg-[var(--green)] font-bold flex items-center justify-center overflow-hidden rounded-xl duration-500 text-nowrap gap-3',
                           {
                              'w-full': elementHover === 'roles',
                           },
                        )}
                        onClick={() => setListeToShow('roles')}
                     >
                        <Award />
                        {translate('show_all_roles')}
                     </div>
                  </div>
                  <div
                     className='relative rounded-xl bg-[var(--background-secondary)] overflow-hidden cursor-pointer'
                     onMouseEnter={() => setElementHover('permission')}
                     onMouseLeave={() => setElementHover(null)}
                  >
                     <div
                        className={cn(
                           'absolute h-full w-0 bg-[var(--red)] font-bold flex items-center justify-center overflow-hidden rounded-xl duration-500 text-nowrap gap-3',
                           {
                              'w-full': elementHover === 'permission',
                           },
                        )}
                        onClick={() => setListeToShow('permission')}
                     >
                        <KeyRound />
                        {translate('show_all_permissions')}
                     </div>
                  </div>
               </div>

               {/** Information */}
               <div className='grid grid-cols-2 gap-2 min-w-60'>
                  <div className='rounded-xl bg-[var(--background-secondary)] p-2 space-y-2'>
                     <div>
                        <div className='bg-[var(--yellow-secondary)] w-fit p-2 text-[var(--yellow)] rounded-md m-auto'>
                           <Phone />
                        </div>
                        <p className='text-center text-xs font-bold text-[var(--yellow)]'>
                           {translate('phone_number')}
                        </p>
                     </div>
                     <ScrollText
                        text={adminProfile.phoneNumber}
                        className='text-center text-sm font-bold text-[var(--foreground)'
                     />
                  </div>

                  <div className='rounded-xl bg-[var(--background-secondary)] p-2 space-y-2'>
                     <div>
                        <div className='bg-[var(--blue-secondary)] w-fit p-2 text-[var(--blue)] rounded-md m-auto'>
                           <CalendarFold />
                        </div>
                        <p className='text-center text-xs font-bold text-[var(--blue)]'>
                           {translate('birthday')}
                        </p>
                     </div>
                     <p className='text-center text-sm font-bold text-[var(--foreground)]'>
                        {adminProfile.birthday
                           ? format(adminProfile.birthday, 'dd MMM yyyy')
                           : translate('undefined')}
                     </p>
                  </div>

                  <div className='rounded-xl bg-[var(--background-secondary)] p-2 space-y-2'>
                     <div>
                        <div className='bg-[var(--sky-blue-secondary)] w-fit p-2 text-[var(--sky-blue)] rounded-md m-auto'>
                           <ShieldPlus />
                        </div>
                        <p className='text-center text-xs font-bold text-[var(--sky-blue)]'>
                           {translate('profile_status')}
                        </p>
                     </div>
                     <p className='text-center text-sm font-bold text-[var(--foreground)]'>
                        {adminProfile.profileStatus}
                     </p>
                  </div>

                  <div className='rounded-xl bg-[var(--background-secondary)] p-2 space-y-2'>
                     <div>
                        <div className='bg-[var(--rose-secondary)] w-fit p-2 text-[var(--rose)] rounded-md m-auto'>
                           {adminProfile.gender === 'FEMALE' ? (
                              <Venus />
                           ) : (
                              <Mars />
                           )}
                        </div>
                        <p className='text-center text-xs font-bold text-[var(--rose)]'>
                           {translate('gender')}
                        </p>
                     </div>
                     <p className='text-center text-sm font-bold text-[var(--foreground)]'>
                        {adminProfile.gender
                           ? adminProfile.gender
                           : translate('undefined')}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   ) : (
      <div className='h-full flex items-center justify-center'>
         <ScaleLoader color='var(--green)' />
      </div>
   )
}

export default AdminInfo
