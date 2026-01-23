import { useProviderUpdatePassword } from '@/api/auth/provider.update.password.api'
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from '@/components/ui/input-otp'
import langue from '@/data/language/app/provider/EditProviderPasswordModal.json'
import useTranslate from '@/hooks/useTranslate'
import { cn } from '@/lib/utils'
import type { RootState } from '@/redux/store'
import { successSound } from '@/utils/audio.player.util'
import { LockKeyhole, Save, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { toast } from 'react-toastify'

interface EditProviderPasswordModalProps {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function EditProviderPasswordModal({
   isOpen,
   setIsOpen,
}: EditProviderPasswordModalProps) {
   const translate = useTranslate(langue)
   const [currentProviderPassword, setCurrentProviderPassword] = useState('')
   const [newProviderPassword, setNewProviderPassword] = useState('')
   const locale = useSelector((state: RootState) => state.language.locale)

   const {
      mutate: mutateProviderUpdatePassword,
      isSuccess: isSuccessProviderUpdatePassword,
      isPending: isPendingProviderUpdatePassword,
   } = useProviderUpdatePassword()

   useEffect(() => {
      if (isSuccessProviderUpdatePassword) {
         setIsOpen(false)
         toast.success(translate('password_updated_successfully'))
         successSound.play()
      }
   }, [isSuccessProviderUpdatePassword])

   const handleUpdatePassword = () => {
      mutateProviderUpdatePassword({
         currentProviderPassword,
         newProviderPassword,
         locale,
      })
   }

   return createPortal(
      isOpen ? (
         <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='bg-black w-full h-full opacity-80' />

            <div className='absolute p-4 bg-[var(--background)] rounded-md'>
               {isPendingProviderUpdatePassword && (
                  <div className='absolute flex items-center justify-center w-full h-full'>
                     <ScaleLoader color='var(--green)' />
                  </div>
               )}
               <div
                  className={cn('flex flex-col gap-4', {
                     'opacity-15': isPendingProviderUpdatePassword,
                  })}
               >
                  <div>
                     <div>
                        <div className='flex gap-2 items-center'>
                           <LockKeyhole className='size-4' />
                           <label htmlFor='' className='font-bold'>
                              {translate('current_password')} :
                           </label>
                        </div>
                        <InputOTP
                           maxLength={6}
                           value={currentProviderPassword}
                           onChange={setCurrentProviderPassword}
                        >
                           <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                           </InputOTPGroup>
                        </InputOTP>
                     </div>

                     <div>
                        <div className='flex gap-2 items-center'>
                           <LockKeyhole className='size-4' />
                           <label htmlFor='' className='font-bold'>
                              {translate('new_password')} :
                           </label>
                        </div>
                        <InputOTP
                           maxLength={6}
                           value={newProviderPassword}
                           onChange={setNewProviderPassword}
                        >
                           <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                           </InputOTPGroup>
                        </InputOTP>
                     </div>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                     <button
                        className='h-9 flex items-center justify-center gap-2 bg-[var(--red-secondary)] rounded-md text-[var(--red)] font-bold hover:opacity-50 cursor-pointer'
                        onClick={() => setIsOpen(false)}
                     >
                        <X className='size-4' /> {translate('cancel')}
                     </button>

                     <button
                        className='h-9 flex items-center justify-center gap-2 bg-[var(--green-secondary)] rounded-md text-[var(--green)] font-bold hover:opacity-50 cursor-pointer'
                        onClick={handleUpdatePassword}
                     >
                        <Save className='size-4' /> {translate('save')}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      ) : (
         <div />
      ),
      document.body,
   )
}

export default EditProviderPasswordModal
