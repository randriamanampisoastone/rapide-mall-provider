import { createFileRoute } from '@tanstack/react-router'
import {
   AtSign,
   CalendarClock,
   ChevronLeft,
   ChevronRight,
   DoorClosed,
   DoorOpen,
   LockKeyhole,
   MapPinHouse,
   Phone,
   Settings,
} from 'lucide-react'
import langue from '@/data/language/app/provider/index.json'
import useTranslate from '@/hooks/useTranslate'
import { useState } from 'react'
import ProviderLocation from '@/components/app/provider/ProviderLocation'
import ScrollText from '@/components/ScrollText'
import { useGetProviderFullProfile } from '@/api/mart/get.provider.full.profile.api'
import { ScaleLoader } from 'react-spinners'
import { selectValueLanguage } from '@/utils/select.value.language.util'
import type { Lang } from '@/utils/formats/time.utils'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import EditProviderModal from '@/components/app/provider/EditProviderModal'
import EditProviderPasswordModal from '@/components/app/provider/EditProviderPasswordModal'
import ProviderFinance from '@/components/app/provider/ProviderFinance'

export const Route = createFileRoute('/app/')({
   component: RouteComponent,
})

const weekList = [
   'monday',
   'tuesday',
   'wednesday',
   'thursday',
   'friday',
   'saturday',
   'sunday',
]

function RouteComponent() {
   const translate = useTranslate(langue)
   const [currentDate, setCurrentDate] = useState(1)
   const locale = useSelector((state: RootState) => state.language.locale)
   const [isEditModeOpen, setIsEditModeOpen] = useState<boolean>(false)
   const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] =
      useState<boolean>(false)

   const {
      data: providerProfile,
      isSuccess: isSuccessGetProviderFullProfile,
      refetch: refetchGetProviderFullProfile,
   } = useGetProviderFullProfile()

   const openTimeComponent = () => {
      if (!isSuccessGetProviderFullProfile) return
      const handleNext = () => {
         const maxLength = providerProfile.openDays.length
         setCurrentDate((prev) => (prev + 1) % maxLength)
      }
      const handlePrev = () => {
         const maxLength = providerProfile.openDays.length
         setCurrentDate((prev) => (prev - 1 + maxLength) % maxLength)
      }

      return (
         <div className='flex gap-2'>
            <div
               className='bg-[var(--blue-secondary)] text-[var(--blue)] p-2 rounded-md flex items-center justify-center cursor-pointer'
               onClick={handlePrev}
            >
               <ChevronLeft />
            </div>
            <div className='overflow-hidden flex-1'>
               <div
                  className='flex duration-500'
                  style={{
                     transform: `translateX(-${currentDate * 150}px)`,
                  }}
               >
                  {weekList.map((value, index) => {
                     return (
                        <div className='min-w-[150px] max-w-[150px] px-1 duration-500'>
                           <div
                              className={`bg-[var(--background-secondary)] p-2 rounded-md gap-2 flex items-center ${providerProfile.openDays[index] ? 'opacity-100' : 'opacity-15'}`}
                              key={index}
                           >
                              <CalendarClock className='size-9' />
                              <div>
                                 <p className='font-bold'>{translate(value)}</p>
                                 <p className='text-xs text-[var(--gray)]'>
                                    {providerProfile.openDays[index] &&
                                       `${providerProfile.openHours[index]} - ${providerProfile.closeHours[index]}`}
                                    {!providerProfile.openDays[index] &&
                                       translate('close')}
                                 </p>
                              </div>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
            <div
               className='bg-[var(--blue-secondary)] text-[var(--blue)] p-2 rounded-md flex items-center justify-center cursor-pointer'
               onClick={handleNext}
            >
               <ChevronRight />
            </div>
         </div>
      )
   }

   const openAndCloseComponent = () => {
      return isSuccessGetProviderFullProfile && providerProfile.isOpen ? (
         <div className='p-2 bg-[var(--green-secondary)] text-[var(--green)] rounded-md flex gap-2 font-bold cursor-pointer hover:scale-105 duration-300'>
            <DoorOpen />
            <p>{translate('open')}</p>
         </div>
      ) : (
         <div className='p-2 bg-[var(--red-secondary)] text-[var(--red)] rounded-md flex gap-2 font-bold cursor-pointer hover:scale-105 duration-300'>
            <DoorClosed />
            <p>{translate('close')}</p>
         </div>
      )
   }

   return (
      <>
         {isSuccessGetProviderFullProfile ? (
            <div className='p-5 flex flex-col gap-5'>
               <div>
                  <div className='relative'>
                     <div className='h-80 overflow-hidden relative rounded-md'>
                        <div className='w-full h-full absolute bg-black opacity-70' />
                        <img
                           src={providerProfile.businessCoverPhoto}
                           alt=''
                           className='object-cover w-full h-full'
                        />
                     </div>

                     <div className='h-40 relative left-1 lg:left-10 bottom-20 flex flex-wrap items-end gap-2 w-[calc(100%-4px)] lg:w-[calc(100%-40px)]'>
                        <div className='border-2 border-[var(--background)] bg-[var(--background)] h-40 min-w-40 w-40 rounded-md overflow-hidden shadow'>
                           <img
                              src={providerProfile.businessLogo}
                              alt='business-logo'
                              className='object-cover w-full h-full'
                           />
                        </div>

                        <div className='flex-1 flex justify-between text-nowrap'>
                           <div>
                              <div className='flex gap-2 items-center'>
                                 <h1 className='text-3xl font-extrabold'>
                                    {providerProfile.businessName}
                                 </h1>

                                 {openAndCloseComponent()}
                              </div>
                              <div className='text-lg font-bold'>
                                 {translate('register_number')}:{' '}
                                 <span className='text-[var(--gray)]'>
                                    {providerProfile.registrationNumber
                                       .toString()
                                       .padStart(3, '0')}
                                 </span>
                              </div>
                           </div>

                           <div className='flex flex-col items-center'>
                              <Settings
                                 className='hover:rotate-180 duration-500 cursor-pointer'
                                 onClick={() => setIsEditModeOpen(true)}
                              />
                              <button
                                 className='p-1 rounded hover:bg-[var(--background-secondary)] cursor-pointer'
                                 onClick={() => setIsUpdatePasswordOpen(true)}
                              >
                                 <LockKeyhole />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className='space-y-1 z-5 md:max-w-full p-2'>
                     {/** Header */}
                     <div>
                        <div className='text-xs max-h-25 min-h-25 overflow-auto [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] [webkit-mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] py-1'>
                           {(
                              selectValueLanguage(locale as Lang, {
                                 valueEn: providerProfile.businessDescriptionEn,
                                 valueFr: providerProfile.businessDescriptionFr,
                                 valueMg: providerProfile.businessDescriptionMg,
                                 valueZh: providerProfile.businessDescriptionZh,
                              }) || ''
                           )
                              .trim()
                              .split('\n\n')
                              .map((paragraph: string, index: number) => (
                                 <p
                                    key={index}
                                    className='text-sm leading-relaxed mb-4'
                                 >
                                    {paragraph}
                                 </p>
                              ))}
                        </div>
                     </div>

                     {/** Open time */}
                     <div className='overflow-hidden'>
                        <h1 className='text-2xl text-bold font-bold'>
                           {translate('open_time')} :
                        </h1>

                        {openTimeComponent()}
                     </div>

                     {/** Contact */}
                     <div>
                        <h1 className='text-2xl text-bold font-bold'>
                           {translate('contact')} :
                        </h1>

                        <div>
                           <div className='flex gap-2 font-bold items-center'>
                              <MapPinHouse />

                              <ScrollText
                                 text={providerProfile.businessAddress}
                              />
                           </div>
                           <div className='flex gap-2 font-bold items-center'>
                              <Phone />
                              <ScrollText
                                 text={providerProfile.businessPhoneNumber}
                              />
                           </div>
                           <div className='flex gap-2 font-bold items-center'>
                              <AtSign />
                              <ScrollText
                                 text={providerProfile.businessEmail}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <ProviderLocation
                  latitude={providerProfile.latitude}
                  longitude={providerProfile.longitude}
               />

               <ProviderFinance />

               {/* <BestProduct /> */}
            </div>
         ) : (
            <div className='w-full h-screen flex items-center justify-center'>
               <ScaleLoader color='var(--green)' />
            </div>
         )}

         {isEditModeOpen && isSuccessGetProviderFullProfile && (
            <EditProviderModal
               isOpen={isEditModeOpen}
               setIsOpen={setIsEditModeOpen}
               refetch={refetchGetProviderFullProfile}
               providerProfileData={providerProfile}
            />
         )}

         {isUpdatePasswordOpen && (
            <EditProviderPasswordModal
               isOpen={isUpdatePasswordOpen}
               setIsOpen={setIsUpdatePasswordOpen}
            />
         )}
      </>
   )
}
