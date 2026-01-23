import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import langue from '@/data/language/app/mart/MartProductCard.json'
import useTranslate from '@/hooks/useTranslate'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { useNavigate } from '@tanstack/react-router'
import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from '@/components/ui/hover-card'
import { useEffect, useState } from 'react'
import type { GetMartProductResponseData } from '@/api/mart/get.mart.product.api'
import type { Lang } from '@/utils/formats/time.utils'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { selectValueLanguage } from '@/utils/select.value.language.util'
import { FaMinusCircle } from 'react-icons/fa'

interface MartProductCardProps {
   product: GetMartProductResponseData
}

const getRandomNumber = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min + 1)) + min
}

function MartProductCard({ product }: MartProductCardProps) {
   const translate = useTranslate(langue)
   const navigate = useNavigate()
   const [currentSelectedItem, setCurrentSelectedItem] = useState(0)
   const [currentImage, setCurrentImage] = useState(0)
   const [randomImageDelay, setRandomImageDelay] = useState<number>(
      getRandomNumber(2, 6),
   )
   const locale = useSelector((state: RootState) => state.language.locale)

   useEffect(() => {
      const intervaleId = setInterval(() => {
         setCurrentImage(
            (prev) =>
               (prev + 1) %
               product.martProductItem[currentSelectedItem].images.length,
         )
      }, randomImageDelay * 1000)
      return () => {
         clearInterval(intervaleId)
      }
   }, [product])

   return (
      <div
         className='bg-[var(--background-secondary)] rounded-md overflow-hidden relative'
         style={{ aspectRatio: '6/7' }}
      >
         <div className='absolute top-2 w-full flex justify-end px-2 items-center gap-2'>
            {!product.isAvailable && (
               <HoverCard>
                  <HoverCardTrigger>
                     <FaMinusCircle className='text-[var(--red)]' />
                  </HoverCardTrigger>
                  <HoverCardContent>
                     {translate('unavailable')}
                  </HoverCardContent>
               </HoverCard>
            )}

            <HoverCard>
               <HoverCardTrigger>
                  <div className='flex gap-2 items-center font-bold bg-[var(--background)] px-1 rounded'>
                     <ShoppingCart className='size-4' />{' '}
                     {
                        product.martProductItem[currentSelectedItem]
                           .salesQuantity
                     }
                  </div>
               </HoverCardTrigger>
               <HoverCardContent className='p-1 font-bold'>
                  {translate('sales')}
               </HoverCardContent>
            </HoverCard>
         </div>
         <img
            src={
               typeof product.martProductItem[currentSelectedItem].images[
                  currentImage
               ] === 'string'
                  ? product.martProductItem[currentSelectedItem].images[
                       currentImage
                    ]
                  : URL.createObjectURL(
                       product.martProductItem[currentSelectedItem].images[
                          currentImage
                       ],
                    )
            }
            alt='product'
            className='w-full h-full object-cover duration-300 hover:scale-110 cursor-pointer'
            onClick={() =>
               navigate({
                  to: '/app/mart/$martId',
                  params: { martId: product.martProductId },
               })
            }
         />
         <div className='grid grid-rows-3 absolute bottom-0 w-full'>
            <div className='row-span-4 bg-gradient-to-b from-transparent to-[#000000d6] h-10 flex items-end justify-end'>
               {product.martProductItem.length > 1 && (
                  <div className='flex gap-2 items-center px-2'>
                     <button
                        className='bg-[var(--background)] rounded-full p-1 cursor-pointer'
                        onClick={() => {
                           setCurrentSelectedItem(
                              (prev) =>
                                 (prev - 1 + product.martProductItem.length) %
                                 product.martProductItem.length,
                           )
                           setRandomImageDelay(getRandomNumber(2, 6))
                        }}
                     >
                        <ChevronLeft className='size-4' />
                     </button>
                     <div className='font-bold text-base'>
                        {currentSelectedItem + 1}/
                        {product.martProductItem.length}
                     </div>
                     <button
                        className='bg-[var(--background)] rounded-full p-1 cursor-pointer'
                        onClick={() => {
                           setCurrentSelectedItem(
                              (prev) =>
                                 (prev + 1) % product.martProductItem.length,
                           )
                           setRandomImageDelay(getRandomNumber(2, 6))
                        }}
                     >
                        <ChevronRight className='size-4' />
                     </button>
                  </div>
               )}
            </div>
            <div className='bg-[#000000d6] row-span-2 px-2 pb-2'>
               <div className='text-xl font-extrabold line-clamp-1 text-white'>
                  {selectValueLanguage(locale as Lang, {
                     valueEn: product.nameEn,
                     valueFr: product.nameFr,
                     valueMg: product.nameMg,
                     valueZh: product.nameZh,
                  })}
               </div>
               <p className='text-xs text-[var(--gray)] line-clamp-1'>
                  {selectValueLanguage(locale as Lang, {
                     valueEn:
                        product.martProductItem[currentSelectedItem]
                           .descriptionEn,
                     valueFr:
                        product.martProductItem[currentSelectedItem]
                           .descriptionFr,
                     valueMg:
                        product.martProductItem[currentSelectedItem]
                           .descriptionMg,
                     valueZh:
                        product.martProductItem[currentSelectedItem]
                           .descriptionZh,
                  }).join('; ')}
               </p>
               <div className='-space-y-2'>
                  <div className='text-[var(--red)] font-extrabold line-through text-xs'>
                     {unitConvert(
                        product.martProductItem[currentSelectedItem].oldPrice,
                     )}{' '}
                     Ar
                  </div>
                  <div className='text-[var(--green)] font-extrabold'>
                     {unitConvert(
                        product.martProductItem[currentSelectedItem].price,
                     )}{' '}
                     Ar
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MartProductCard
