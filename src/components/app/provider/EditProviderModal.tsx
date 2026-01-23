import { type GetProviderFullPRofileResponse } from '@/api/mart/get.provider.full.profile.api'
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import type React from 'react'
import { useEffect, useState } from 'react'
import langue from '@/data/language/app/provider/EditProviderModal.json'
import useTranslate from '@/hooks/useTranslate'
import {
   AtSign,
   ChevronLeft,
   ChevronRight,
   CircleX,
   DoorClosed,
   DoorOpen,
   MapPinHouse,
   Upload,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PhoneInput } from '@/components/phoneNumber/PhoneInput'
import { cn } from '@/lib/utils'
import type { LatLng } from '@/interfaces/map/location.interface'
import EditProviderLocationMap from './EditProviderLocationMap'
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from '@/components/ui/input-otp'
import { useUpdateProviderProfile } from '@/api/auth/update.provider.profile.api'
import { useUploadMartPhoto } from '@/api/mart/upload/upload.mart.photo.api'
import { toast } from 'react-toastify'
import { errorSound, successSound } from '@/utils/audio.player.util'
import { ScaleLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'

interface EditProviderModalProps {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
   refetch: () => void
   providerProfileData: GetProviderFullPRofileResponse
}

interface FileSourceInterface {
   file: File | null
   source: string
}

const weekList = [
   'monday',
   'tuesday',
   'wednesday',
   'thursday',
   'friday',
   'saturday',
   'sunday',
]

const formatTime = (data: string) => {
   let value = data

   // Enlever tout ce qui n'est pas un chiffre ou 'h'
   value = value.replace(/[^0-9h]/g, '')

   // Supprimer les 'h' multiples
   value = value.replace(/h+/g, 'h')

   // Séparer les parties avant et après 'h'
   const parts = value.split('h')
   let hours = parts[0] || ''
   let minutes = parts[1] || ''

   // Limiter les heures à 2 chiffres (00-23)
   if (hours.length > 2) {
      hours = hours.slice(0, 2)
   }
   if (hours.length === 2 && parseInt(hours) > 23) {
      hours = '23'
   }

   // Limiter les minutes à 2 chiffres (00-59)
   if (minutes.length > 2) {
      minutes = minutes.slice(0, 2)
   }
   if (minutes.length === 2 && parseInt(minutes) > 59) {
      minutes = '59'
   }

   // Reconstruire la valeur
   let formattedValue = hours
   if (value.includes('h') || hours.length === 2) {
      formattedValue += 'h' + minutes
   }

   return formattedValue
}

function EditProviderModal({
   isOpen,
   setIsOpen,
   refetch,
   providerProfileData,
}: EditProviderModalProps) {
   const translate = useTranslate(langue)
   const [newBusinessLogo, setNewBusinessLogo] = useState<FileSourceInterface>({
      file: null,
      source: '',
   })
   const [newBusinessCoverPhoto, setNewBusinessCoverPhoto] =
      useState<FileSourceInterface>({
         file: null,
         source: '',
      })
   const [businessName, setBusinessName] = useState<string>(
      providerProfileData.businessName,
   )
   const [businessDescription, setBusinessDescription] = useState<string>(
      providerProfileData.businessDescriptionFr || '',
   )
   const [businessAddress, setBusinessAddress] = useState<string>(
      providerProfileData.businessAddress,
   )
   const [businessEmail, setBusinessEmail] = useState<string>(
      providerProfileData.businessEmail,
   )
   const [businessPhoneNumber, setBusinessPhoneNumber] = useState<string>(
      providerProfileData.businessPhoneNumber,
   )
   const [openHours, setOpenHours] = useState<string[]>(
      providerProfileData.openHours,
   )
   const [closeHours, setCloseHours] = useState<string[]>(
      providerProfileData.closeHours,
   )
   const [openDays, setOpenDays] = useState<boolean[]>(
      providerProfileData.openDays,
   )
   const [isBusinessOpen, setIsBusinessOpen] = useState<boolean>(
      providerProfileData.isOpen,
   )
   const [currentDate, setCurrentDate] = useState<number>(0)
   const [location, setLocation] = useState<LatLng>({
      latitude: providerProfileData.latitude,
      longitude: providerProfileData.longitude,
   })
   const locale = useSelector((state: RootState) => state.language.locale)

   const {
      mutateAsync: updateProviderProfile,
      isSuccess: isSuccessUpdateProviderProfile,
      isPending: isPendingUpdateProviderProfile,
   } = useUpdateProviderProfile()

   const { mutateAsync: uploadMartPhoto, isPending: isPendingUploadMartPhoto } =
      useUploadMartPhoto()

   useEffect(() => {
      if (isSuccessUpdateProviderProfile) {
         toast.success(translate('profile_updated_successfully'))
         successSound.play()
         refetch()
         setIsOpen(false)
      }
   }, [isSuccessUpdateProviderProfile])

   const handleUpdateProviderProfile = async (providerPassword: string) => {
      try {
         let coverSource = newBusinessCoverPhoto.source
         let logoSource = newBusinessLogo.source

         if (newBusinessCoverPhoto.file && !coverSource) {
            coverSource = await uploadMartPhoto({
               file: newBusinessCoverPhoto.file,
            })
         }

         if (newBusinessLogo.file && !logoSource) {
            logoSource = await uploadMartPhoto({
               file: newBusinessLogo.file,
            })
         }

         await updateProviderProfile({
            openHours,
            closeHours,
            openDays,
            isOpen: isBusinessOpen,
            businessAddress,
            businessCoverPhoto: coverSource ? coverSource : undefined,
            businessDescriptionFr: businessDescription,
            businessEmail,
            businessLogo: logoSource ? logoSource : undefined,
            businessName,
            businessPhoneNumber,
            latitude: location.latitude,
            longitude: location.longitude,
            providerPassword,
            locale,
         })
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message)
         }
         errorSound.play()
      }
   }

   const ChangeOpenTimeComponent = () => {
      const handleNext = () => {
         setCurrentDate((prev) => (prev + 1) % 7)
      }
      const handlePrev = () => {
         setCurrentDate((prev) => (prev - 1 + 7) % 7)
      }
      return (
         <div className='flex gap-1 max-w-100 m-auto'>
            <button
               className='bg-[var(--background-secondary)] p-2 rounded-md cursor-pointer'
               onClick={handlePrev}
            >
               <ChevronLeft />
            </button>
            <div className='flex-1 overflow-hidden'>
               <div
                  className='flex duration-500'
                  style={{ transform: `translateX(-${currentDate * 312}px)` }}
               >
                  {weekList.map((value, index) => (
                     <div className='px-2 min-w-[312px]'>
                        <div className='w-full bg-[var(--background)] rounded-md p-2 space-y-2'>
                           <h1 className='text-2xl font-extrabold'>
                              {translate(value)}
                           </h1>

                           <div
                              className='grid grid-cols-2 h-9 border rounded relative cursor-pointer'
                              onClick={() =>
                                 setOpenDays((prev) => {
                                    const copy = [...prev]
                                    copy[index] = !prev[index]
                                    return copy
                                 })
                              }
                           >
                              <div
                                 className={cn(
                                    'absolute w-1/2 h-full rounded duration-500',
                                    {
                                       'bg-[var(--blue)] left-0':
                                          openDays[index],
                                       'bg-[var(--red)] left-1/2':
                                          !openDays[index],
                                    },
                                 )}
                              />
                              <div className='flex items-center justify-center font-bold z-10'>
                                 <DoorOpen /> {translate('open')}
                              </div>
                              <div className='flex items-center justify-center font-bold z-10'>
                                 <DoorClosed /> {translate('close')}
                              </div>
                           </div>

                           <div className='flex gap-2'>
                              <Input
                                 value={openHours[index]}
                                 onChange={(e) => {
                                    setOpenHours((prev) => {
                                       const copy = [...prev]
                                       copy[index] = formatTime(e.target.value)
                                       return copy
                                    })
                                 }}
                                 placeholder='Ex: 08h00'
                                 maxLength={5}
                                 disabled={!openDays[index]}
                              />

                              <div className='font-bold flex items-center justify-center'>
                                 -
                              </div>
                              <Input
                                 value={closeHours[index]}
                                 onChange={(e) => {
                                    setCloseHours((prev) => {
                                       const copy = [...prev]
                                       copy[index] = formatTime(e.target.value)
                                       return copy
                                    })
                                 }}
                                 placeholder='Ex: 17h00'
                                 maxLength={5}
                                 disabled={!openDays[index]}
                              />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <button
               className='bg-[var(--background-secondary)] p-2 rounded-md cursor-pointer'
               onClick={handleNext}
            >
               <ChevronRight />
            </button>
         </div>
      )
   }

   return (
      <ResponsiveDialog
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         title=''
         closeOnBlur={false}
      >
         <CircleX
            className='size-4 absolute top-4 cursor-pointer hover:scale-110 text-[var(--red)]'
            onClick={() => setIsOpen(false)}
         />
         <div className='relative'>
            {(isPendingUpdateProviderProfile || isPendingUploadMartPhoto) && (
               <div className='w-full h-full absolute flex items-center justify-center'>
                  <ScaleLoader color='var(--green)' />
               </div>
            )}
            <div
               className={cn(
                  'max-h-100 overflow-y-auto overflow-x-hidden min-h-100 space-y-4 scrollbar-none',
                  {
                     'opacity-15':
                        isPendingUpdateProviderProfile ||
                        isPendingUploadMartPhoto,
                  },
               )}
            >
               <div>
                  <label htmlFor='business-cover-photo'>
                     <div className='h-40 rounded overflow-hidden bg-[var(--background-secondary)]'>
                        {providerProfileData.businessCoverPhoto ||
                        newBusinessCoverPhoto.file ? (
                           <img
                              src={
                                 newBusinessCoverPhoto.file
                                    ? URL.createObjectURL(
                                         newBusinessCoverPhoto.file,
                                      )
                                    : providerProfileData.businessCoverPhoto
                              }
                              alt='cover-photo'
                              className='object-cover w-full h-full'
                           />
                        ) : (
                           <div className='flex items-center justify-center flex-col w-full h-full bg-[var(--background-secondary)]'>
                              <Upload className='size-20' />
                              <p className='text-xs'>
                                 {translate('business_cover_photo')}
                              </p>
                           </div>
                        )}
                     </div>
                     <input
                        type='file'
                        className='hidden'
                        accept='image/*'
                        id='business-cover-photo'
                        onChange={(e) => {
                           setNewBusinessCoverPhoto((prev) => ({
                              ...prev,
                              file: e.target.files ? e.target.files[0] : null,
                           }))
                        }}
                     />
                  </label>

                  <div className='relative left-2 max-w-[calc(100%-8px)] h-10 flex gap-2 items-end'>
                     <label htmlFor='business-logo'>
                        <div className='h-20 w-20 rounded border-2 overflow-hidden'>
                           {providerProfileData.businessLogo ||
                           newBusinessLogo.file ? (
                              <img
                                 src={
                                    newBusinessLogo.file
                                       ? URL.createObjectURL(
                                            newBusinessLogo.file,
                                         )
                                       : providerProfileData.businessLogo
                                 }
                                 alt='business-logo'
                                 className='object-cover w-full h-full'
                              />
                           ) : (
                              <div className='flex flex-col items-center justify-center bg-[var(--background)] w-full h-full'>
                                 <Upload />
                                 <p className='text-xs'>
                                    {translate('business_logo')}
                                 </p>
                              </div>
                           )}
                        </div>
                        <input
                           type='file'
                           className='hidden'
                           accept='image/*'
                           id='business-logo'
                           onChange={(e) => {
                              setNewBusinessLogo((prev) => ({
                                 ...prev,
                                 file: e.target.files
                                    ? e.target.files[0]
                                    : null,
                              }))
                           }}
                        />
                     </label>
                     <div className='flex gap-2 w-full'>
                        <Input
                           value={businessName}
                           onChange={(e) => setBusinessName(e.target.value)}
                           className='flex-1'
                        />

                        <div
                           className='min-w-20 max-w-20 overflow-hidden h-9 relative'
                           onClick={() => setIsBusinessOpen((prev) => !prev)}
                        >
                           <div
                              className={cn(
                                 'flex h-9 cursor-pointer absolute duration-500',
                                 {
                                    'left-0': isBusinessOpen,
                                    '-left-full': !isBusinessOpen,
                                 },
                              )}
                           >
                              <div className='min-w-20 bg-[var(--blue)] flex gap-2 h-full items-center justify-center rounded-md font-bold'>
                                 <DoorOpen /> {translate('open')}
                              </div>
                              <div className='min-w-20 bg-[var(--red)] flex gap-2 h-full items-center justify-center rounded-md font-bold'>
                                 <DoorClosed /> {translate('close')}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div>
                  <label htmlFor='' className='font-bold'>
                     {translate('description')} :
                  </label>
                  <Textarea
                     value={businessDescription}
                     onChange={(e) => setBusinessDescription(e.target.value)}
                     className='max-h-40 h-40'
                  />
               </div>

               <div className='space-y-1'>
                  <div className='flex rounded-md border h-9 bg-[var(--background)] px-2 gap-2'>
                     <div className='h-full flex items-center justify-center'>
                        <MapPinHouse />
                     </div>
                     <input
                        type='text'
                        className='outline-none w-full'
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                     />
                  </div>

                  <PhoneInput
                     defaultCountry='MG'
                     className='outline-none w-full focus:outline-none'
                     value={businessPhoneNumber}
                     onChange={setBusinessPhoneNumber}
                  />

                  <div className='flex rounded-md border h-9 bg-[var(--background)] px-2 gap-2'>
                     <div className='h-full flex items-center justify-center'>
                        <AtSign />
                     </div>
                     <input
                        type='text'
                        className='outline-none w-full'
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                     />
                  </div>
               </div>

               {ChangeOpenTimeComponent()}

               <EditProviderLocationMap
                  location={location}
                  setLocation={setLocation}
               />

               <hr />

               <div>
                  <InputOTP
                     maxLength={6}
                     onComplete={handleUpdateProviderProfile}
                  >
                     <InputOTPGroup className='m-auto'>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                     </InputOTPGroup>
                  </InputOTP>
                  <p className='m-auto text-center text-xs text-[var(--gray)]'>
                     {translate('enter_your_password')}
                  </p>
               </div>
            </div>
         </div>
      </ResponsiveDialog>
   )
}

export default EditProviderModal
