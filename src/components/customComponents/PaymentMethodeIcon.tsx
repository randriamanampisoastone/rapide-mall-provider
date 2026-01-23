import { PaymentMethode } from '@/enums/payment.methode'
import mvola from '@/assets/images/payment/mvola.png'
import orangeMoney from '@/assets/images/payment/orange_money.png'
import card from '@/assets/images/payment/master_card.png'
import { TbCashBanknoteFilled } from 'react-icons/tb'
import { BiSolidWallet } from 'react-icons/bi'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import langue from '@/data/language/customComponents/PaymentMethodeIcon.json'
import useTranslate from '@/hooks/useTranslate'

interface Props {
   className?: string
   paymentMethode: PaymentMethode
}

function PaymentMethodeIcon({ className, paymentMethode }: Props) {
   const translate = useTranslate(langue)

   switch (paymentMethode) {
      case PaymentMethode.CASH:
         return (
            <HoverCard>
               <HoverCardTrigger className='cursor-pointer' asChild>
                  <TbCashBanknoteFilled
                     size={30}
                     className={className ?? '' + 'text-[var(--green)] size-6'}
                  />
               </HoverCardTrigger>
               <HoverCardContent className='flex justify-center w-35 font-bold text-center'>
                  {translate('cash')}
               </HoverCardContent>
            </HoverCard>
         )
      case PaymentMethode.MVOLA:
         return (
            <HoverCard>
               <HoverCardTrigger className='cursor-pointer' asChild>
                  <img
                     className={className ?? '' + 'rounded-md'}
                     alt=''
                     src={mvola}
                     width={25}
                     loading='lazy'
                  />
               </HoverCardTrigger>
               <HoverCardContent className='flex justify-center w-35 font-bold text-center'>
                  {translate('mvola')}
               </HoverCardContent>
            </HoverCard>
         )
      case PaymentMethode.ORANGE_MONEY:
         return (
            <HoverCard>
               <HoverCardTrigger className='cursor-pointer' asChild>
                  <img
                     className={className ?? '' + 'rounded-md'}
                     alt=''
                     src={orangeMoney}
                     width={25}
                     loading='lazy'
                  />
               </HoverCardTrigger>
               <HoverCardContent className='flex justify-center w-35 font-bold text-center'>
                  {translate('orange_money')}
               </HoverCardContent>
            </HoverCard>
         )
      case PaymentMethode.CARD:
         return (
            <HoverCard>
               <HoverCardTrigger className='cursor-pointer' asChild>
                  <img
                     className={className ?? '' + 'rounded-md'}
                     alt=''
                     src={card}
                     width={25}
                     loading='lazy'
                  />
               </HoverCardTrigger>
               <HoverCardContent className='flex justify-center w-35 font-bold text-center'>
                  {translate('card')}
               </HoverCardContent>
            </HoverCard>
         )
      case PaymentMethode.RAPIDE_WALLET:
         return (
            <HoverCard>
               <HoverCardTrigger className='cursor-pointer' asChild>
                  <BiSolidWallet
                     size={25}
                     className={className ?? '' + 'text-[var(--green)] size-6'}
                  />
               </HoverCardTrigger>
               <HoverCardContent className='flex justify-center w-35 font-bold text-center'>
                  {translate('rapide_wallet')}
               </HoverCardContent>
            </HoverCard>
         )
   }
}

export default PaymentMethodeIcon
