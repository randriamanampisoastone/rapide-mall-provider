import { useGetLastSalesDashboard } from '@/api/mart/dashboard/get.last.sales.dashboard.api'
import ScrollText from '@/components/ScrollText'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { RootState } from '@/redux/store'
import { formatTimeDifference } from '@/utils/formats/time.utils'
import { selectValueLanguage } from '@/utils/select.value.language.util'
import { useSelector } from 'react-redux'
import langue from '@/data/language/app/mart/dashboard/LastOrder.json'
import useTranslate from '@/hooks/useTranslate'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { Link } from '@tanstack/react-router'

function LastOrders() {
   const translate = useTranslate(langue)
   const { data, isSuccess } = useGetLastSalesDashboard()
   const locale = useSelector((state: RootState) => state.language.locale)

   return (
      <div className='p-2 bg-[var(--background-secondary)] rounded-md flex-1 min-w-50 flex flex-col space-y-2'>
         <p className='text-center font-bold text-xl'>
            {translate('last_orders')}
         </p>

         <div className='space-y-2 flex-1 scrollbar-none'>
            {isSuccess &&
               data.map((item, i) => (
                  <Link
                     to={'/app/mart/$martId'}
                     params={{ martId: item.martItem.martProductId }}
                  >
                     <div className='flex gap-1' key={'last_command_' + i}>
                        <p className='font-bold'>{i + 1}.</p>

                        <div className='border-2 rounded-md p-2 flex-1 cursor-pointer hover:bg-[var(--background)] overflow-hidden space-y-2'>
                           <div className='overflow-hidden flex gap-2'>
                              <div className='flex-1'>
                                 <ScrollText
                                    text={formatTimeDifference(
                                       new Date(item.createdAt).getTime(),
                                    )}
                                    className='text-xs text-[var(--gray)]'
                                 />
                              </div>
                              <div>
                                 <ScrollText
                                    text={translate('quantity').replace(
                                       '{quantity}',
                                       unitConvert(item.quantity),
                                    )}
                                    className='text-xs text-[var(--red)] font-bold'
                                 />
                              </div>
                              <div>
                                 <ScrollText
                                    text={translate('price').replace(
                                       '{amount}',
                                       unitConvert(
                                          item.priceAtTime * item.quantity,
                                       ),
                                    )}
                                    className='text-xs text-[var(--green)] font-bold'
                                 />
                              </div>
                           </div>
                           <div className='gap-2 grid grid-cols-2 overflow-hidden'>
                              <div className='flex overflow-hidden items-center gap-2'>
                                 <Avatar className='size-10'>
                                    <AvatarImage
                                       src={item.clientProfile.profilePhoto}
                                    />
                                    <AvatarFallback>
                                       {item.clientProfile.firstName
                                          .charAt(0)
                                          .toUpperCase()}
                                       {item.clientProfile.lastName
                                          ?.charAt(0)
                                          .toUpperCase()}
                                    </AvatarFallback>
                                 </Avatar>

                                 <div className='flex-1 overflow-hidden'>
                                    <ScrollText
                                       text={`${item.clientProfile.firstName} ${item.clientProfile.lastName ?? ''}`}
                                       className='font-bold'
                                    />
                                    <p className='text-xs'>
                                       {item.clientProfile.phoneNumber}
                                    </p>
                                 </div>
                              </div>
                              <div className='flex overflow-hidden items-center gap-2'>
                                 <div className='size-10 min-w-10 aspect-square rounded overflow-hidden'>
                                    <img
                                       src={item.martItem.images[0]}
                                       className='object-cover w-full h-full'
                                    />
                                 </div>

                                 <div className='flex-1 overflow-hidden'>
                                    <ScrollText
                                       text={selectValueLanguage(locale, {
                                          valueEn: item.martItem.nameEn,
                                          valueFr: item.martItem.nameFr,
                                          valueMg: item.martItem.nameMg,
                                          valueZh: item.martItem.nameZh,
                                       })}
                                       className='font-bold'
                                    />
                                    <ScrollText
                                       text={(
                                          selectValueLanguage(locale, {
                                             valueEn:
                                                item.martItem.descriptionEn,
                                             valueFr:
                                                item.martItem.descriptionFr,
                                             valueMg:
                                                item.martItem.descriptionMg,
                                             valueZh:
                                                item.martItem.descriptionZh,
                                          }) as string[]
                                       ).join('; ')}
                                       className='text-xs'
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
         </div>
      </div>
   )
}

export default LastOrders
