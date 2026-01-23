import { useGetProviderFinance } from '@/api/auth/get.provider.finance.api'
import PaymentMethodeIcon from '@/components/customComponents/PaymentMethodeIcon'
import langue from '@/data/language/app/provider/ProviderFinance.json'
import useTranslate from '@/hooks/useTranslate'
import { unitConvert } from '@/utils/formats/unit.convert.utils'

function ProviderFinance() {
   const translate = useTranslate(langue)

   const {
      data: dataGetProviderFinance,
      isSuccess: isSuccessGetProviderFinance,
   } = useGetProviderFinance()

   const financeComponent = ({
      card,
      cash,
      mvola,
      orangeMoney,
      rapideWallet,
   }: {
      card: number
      cash: number
      mvola: number
      orangeMoney: number
      rapideWallet: number
   }) => (
      <div className='flex gap-2 text-nowrap flex-wrap'>
         <div className='flex-1 p-2 bg-[var(--brown-secondary)] rounded-md flex gap-2 items-center min-w-45'>
            <PaymentMethodeIcon
               paymentMethode='CASH'
               className='size-13 text-[var(--brown)]'
            />
            <div>
               <h1 className='font-bold text-[var(--brown)]'>
                  {translate('cash')}
               </h1>
               <p className='text-xl'>{unitConvert(cash)} Ar</p>
            </div>
         </div>

         <div className='flex-1 p-2 bg-[var(--green-secondary)] rounded-md flex gap-2 items-center min-w-45'>
            <PaymentMethodeIcon
               paymentMethode='RAPIDE_WALLET'
               className='size-13 text-[var(--green)] rounded'
            />
            <div>
               <h1 className='font-bold text-[var(--green)]'>
                  {translate('rapide_wallet')}
               </h1>
               <p className='text-xl'>{unitConvert(rapideWallet)} Ar</p>
            </div>
         </div>

         <div className='flex-1 p-2 bg-[var(--orange-secondary)] rounded-md flex gap-2 items-center min-w-45'>
            <PaymentMethodeIcon
               paymentMethode='ORANGE_MONEY'
               className='size-13 text-[var(--orange)] rounded'
            />
            <div>
               <h1 className='font-bold text-[var(--orange)]'>
                  {translate('orange_money')}
               </h1>
               <p className='text-xl'>{unitConvert(orangeMoney)} Ar</p>
            </div>
         </div>

         <div className='flex-1 p-2 bg-[var(--yellow-secondary)] rounded-md flex gap-2 items-center min-w-45'>
            <PaymentMethodeIcon
               paymentMethode='MVOLA'
               className='size-13 text-[var(--yellow)] rounded'
            />
            <div>
               <h1 className='font-bold text-[var(--yellow)]'>
                  {translate('mvola')}
               </h1>
               <p className='text-xl'>{unitConvert(mvola)} Ar</p>
            </div>
         </div>

         <div className='flex-1 p-2 bg-[var(--blue-secondary)] rounded-md flex gap-2 items-center min-w-45'>
            <PaymentMethodeIcon
               paymentMethode='CARD'
               className='size-13 text-[var(--blue)] rounded'
            />
            <div>
               <h1 className='font-bold text-[var(--blue)]'>
                  {translate('card')}
               </h1>
               <p className='text-xl'>{unitConvert(card)} Ar</p>
            </div>
         </div>
      </div>
   )

   return (
      <div className='space-y-1'>
         <div className='text-2xl font-bold border-b'>
            {translate('finance')} :
         </div>

         {isSuccessGetProviderFinance &&
            financeComponent({
               card: dataGetProviderFinance.mart.card || 0,
               cash: dataGetProviderFinance.mart.cash || 0,
               mvola: dataGetProviderFinance.mart.mvola || 0,
               orangeMoney: dataGetProviderFinance.mart.orangeMoney || 0,
               rapideWallet: dataGetProviderFinance.mart.rapideWallet || 0,
            })}
      </div>
   )
}

export default ProviderFinance
