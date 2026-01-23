import { useGetBestItemsDashboard } from '@/api/mart/dashboard/get.best.items.dashboard.api'
import ScrollText from '@/components/ScrollText'
import type { RootState } from '@/redux/store'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { selectValueLanguage } from '@/utils/select.value.language.util'
import { Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import langue from '@/data/language/app/mart/dashboard/BestProduct.json'
import useTranslate from '@/hooks/useTranslate'

function BestProduct() {
   const translate = useTranslate(langue)
   const { data, isSuccess } = useGetBestItemsDashboard()
   const locale = useSelector((state: RootState) => state.language.locale)

   return (
      <div className='p-2 bg-[var(--background-secondary)] rounded-md flex-1 min-w-50 flex flex-col space-y-2'>
         <p className='text-center font-bold text-xl'>
            {translate('best_items')}
         </p>

         <div className='space-y-2 flex-1 scrollbar-none'>
            {isSuccess &&
               data.map((item, i) => (
                  <div className='flex gap-1' key={'best_product_' + i}>
                     <p className='font-bold'>{i + 1}.</p>
                     <Link
                        to={`/app/mart/$martId`}
                        params={{ martId: item.martProductId }}
                        className='border-2 rounded-md p-2 flex items-center justify-between gap-2 flex-1 cursor-pointer hover:bg-[var(--background)]'
                     >
                        <div className='w-14 rounded overflow-hidden aspect-square'>
                           <img
                              src={item.images[0]}
                              alt='product'
                              className='object-cover'
                           />
                        </div>

                        <div className='flex-1 grid grid-cols-2 gap-2'>
                           <div>
                              <p className='font-bold'>
                                 {selectValueLanguage(locale, {
                                    valueEn: item.nameEn,
                                    valueFr: item.nameFr,
                                    valueMg: item.nameMg,
                                    valueZh: item.nameZh,
                                 })}
                              </p>
                              <ScrollText
                                 text={(
                                    selectValueLanguage(locale, {
                                       valueEn: item.descriptionEn,
                                       valueFr: item.descriptionFr,
                                       valueMg: item.descriptionMg,
                                       valueZh: item.descriptionZh,
                                    }) as string[]
                                 ).join('; ')}
                                 className='text-xs'
                              ></ScrollText>
                           </div>

                           <div className='h-full flex flex-col justify-between'>
                              <div className='bg-[var(--blue-secondary)] text-[var(--blue)] rounded px-1 text-xs flex items-center gap-2 text-nowrap'>
                                 <div>{translate('sales')} :</div>
                                 <ScrollText
                                    text={unitConvert(item.salesQuantity)}
                                 />
                              </div>
                              <div className='bg-[var(--green-secondary)] text-[var(--green)] rounded px-1 text-xs flex items-center gap-2 text-nowrap'>
                                 <div>{translate('price')} :</div>
                                 <ScrollText
                                    text={unitConvert(item.price) + ' Ar'}
                                 />
                              </div>
                           </div>
                        </div>
                     </Link>
                  </div>
               ))}
         </div>
      </div>
   )
}

export default BestProduct
