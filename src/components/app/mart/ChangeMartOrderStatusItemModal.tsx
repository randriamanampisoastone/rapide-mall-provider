import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import {
   MartOrderItemStatusColor,
   type MartOrderItemStatusType,
} from '@/enums/mart/mart.order.item.status.enum'
import langue from '@/data/language/app/mart/ChangeMartOrderStatusItemModal.json'
import useTranslate from '@/hooks/useTranslate'
import { ChevronsRight } from 'lucide-react'
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from '@/components/ui/input-otp'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { successSound } from '@/utils/audio.player.util'
import { ScaleLoader } from 'react-spinners'
import { cn } from '@/lib/utils'
import { useProviderUpdateMartOrderItemStatus } from '@/api/mart/provider.update.mart.order.item.status.api'

interface ChangeMartOrderStatusItemModalProps {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
   martOrderItemId: string
   oldMartOrderItemStatus: MartOrderItemStatusType
   newMartOrderItemStatus: MartOrderItemStatusType
   refetchFn: () => void
}

function ChangeMartOrderStatusItemModal({
   isOpen,
   setIsOpen,
   martOrderItemId,
   newMartOrderItemStatus,
   oldMartOrderItemStatus,
   refetchFn,
}: ChangeMartOrderStatusItemModalProps) {
   const translate = useTranslate(langue)
   const locale = useSelector((state: RootState) => state.language.locale)

   const {
      mutate: mutateProviderUpdateMartOrderItemStatus,
      isSuccess: isSuccessProviderUpdateMartOrderItemStatus,
      isPending: isPendingProviderUpdateMartOrderItemStatus,
   } = useProviderUpdateMartOrderItemStatus()

   useEffect(() => {
      if (isSuccessProviderUpdateMartOrderItemStatus) {
         refetchFn()
         toast.success(translate('status_successfully_updated'))
         successSound.play()
         setIsOpen(false)
      }
   }, [isSuccessProviderUpdateMartOrderItemStatus])

   const handleUpdateMartOrderItemStatus = (providerPassword: string) => {
      mutateProviderUpdateMartOrderItemStatus({
         providerPassword,
         locale,
         martOrderItemId,
         newStatus: newMartOrderItemStatus,
      })
   }

   return (
      <ResponsiveDialog
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         title={translate('change_mart_order_item_status')}
      >
         <div className='relative'>
            {isPendingProviderUpdateMartOrderItemStatus && (
               <div className='absolute w-full h-full flex items-center justify-center'>
                  <ScaleLoader color='var(--green)' />
               </div>
            )}
            <div
               className={cn('space-y-2', {
                  'opacity-15': isPendingProviderUpdateMartOrderItemStatus,
               })}
            >
               <div className='flex items-center gap-2 justify-center'>
                  <div
                     className='p-2 rounded text-xs'
                     style={{
                        backgroundColor: `var(--${MartOrderItemStatusColor[oldMartOrderItemStatus]}-secondary)`,
                        color: `var(--${MartOrderItemStatusColor[oldMartOrderItemStatus]})`,
                     }}
                  >
                     {translate(oldMartOrderItemStatus.toLowerCase())}
                  </div>
                  <ChevronsRight />
                  <div
                     className='p-2 rounded text-xs'
                     style={{
                        backgroundColor: `var(--${MartOrderItemStatusColor[newMartOrderItemStatus]}-secondary)`,
                        color: `var(--${MartOrderItemStatusColor[newMartOrderItemStatus]})`,
                     }}
                  >
                     {translate(newMartOrderItemStatus.toLowerCase())}
                  </div>
               </div>

               <div>
                  <InputOTP
                     maxLength={6}
                     onComplete={handleUpdateMartOrderItemStatus}
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

                  <p className='text-center text-xs text-[var(--gray)]'>
                     {translate('enter_your_password')}
                  </p>
               </div>
            </div>
         </div>
      </ResponsiveDialog>
   )
}

export default ChangeMartOrderStatusItemModal
