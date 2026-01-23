import { createFileRoute } from '@tanstack/react-router'
import {
   ChevronLeft,
   ChevronRight,
   Component,
   LucideWeight,
   SquarePen,
} from 'lucide-react'
import { useState } from 'react'
import langue from '@/data/language/app/mart/MartDetail.json'
import useTranslate from '@/hooks/useTranslate'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { cn } from '@/lib/utils'
import ScrollText from '@/components/ScrollText'
import ProductCommentSection from '@/components/app/mart/martDetail/ProductCommendSection'
import { Button } from '@/components/ui/button'
import { TbRuler2, TbRulerMeasure, TbRulerMeasure2 } from 'react-icons/tb'
import { Link } from '@tanstack/react-router'
import { useGetMartProductDetail } from '@/api/mart/get.mart.product.detail.api'
import { ScaleLoader } from 'react-spinners'
import { selectValueLanguage } from '@/utils/select.value.language.util'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import type { Lang } from '@/utils/formats/time.utils'
import type { GetMartProductItemResponseData } from '@/api/mart/get.mart.product.api'

export const Route = createFileRoute('/app/mart/$martId')({
   component: RouteComponent,
   loader: ({ params }) => ({
      martId: params.martId,
   }),
})

function RouteComponent() {
   const translate = useTranslate(langue)
   const { martId } = Route.useLoaderData()
   const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
   const [currentMartItemIndex, setCurrentMartItemIndex] = useState<number>(0)
   const [martItemIndex, setMartItemIndex] = useState<number>(0)
   const locale = useSelector((state: RootState) => state.language.locale)

   const { data: martProductData, isSuccess: isSuccessGetMartProductDetail } =
      useGetMartProductDetail({ martProductId: martId })

   const handleNext = () => {
      if (!isSuccessGetMartProductDetail) return
      const maxLength =
         martProductData.martProductItem[currentMartItemIndex].images.length
      setCurrentImageIndex((prev) => (prev + 1) % maxLength)
   }
   const handlePrev = () => {
      if (!isSuccessGetMartProductDetail) return
      const maxLength =
         martProductData.martProductItem[currentMartItemIndex].images.length
      setCurrentImageIndex((prev) => (prev - 1 + maxLength) % maxLength)
   }

   const ItemComponent = (
      martItem: GetMartProductItemResponseData,
      index: number,
   ) => (
      <div
         className='w-[200px] h-[60px] px-2 flex-shrink-0 cursor-pointer'
         key={index}
      >
         <div
            className={cn(
               'p-1 h-full bg-[var(--background-secondary)] rounded-md border-2 border-[var(--background-secondary)] flex gap-2',
               {
                  'border-[var(--foreground)]': currentMartItemIndex === index,
               },
            )}
            onClick={() => setCurrentMartItemIndex(index)}
         >
            <div className='h-full aspect-square overflow-hidden rounded'>
               <img
                  src={
                     typeof martItem.images[0] === 'string'
                        ? martItem.images[0]
                        : URL.createObjectURL(martItem.images[0])
                  }
                  alt='img'
                  className='w-full h-full object-cover'
               />
            </div>

            <div>
               <ScrollText
                  text={selectValueLanguage(locale as Lang, {
                     valueEn: martItem.descriptionEn,
                     valueFr: martItem.descriptionFr,
                     valueMg: martItem.descriptionMg,
                     valueZh: martItem.descriptionZh,
                  }).join('; ')}
                  className='text-[var(--gray)] max-w-30 text-xs'
               />
               <div className='-space-y-2'>
                  <p className='text-xs line-through text-[var(--gray)]'>
                     {unitConvert(martItem.price)} Ar
                  </p>
                  <p className='font-bold'>{unitConvert(martItem.price)} Ar</p>
               </div>
            </div>
         </div>
      </div>
   )

   const CategoryComponent = (src: string, name: string) => (
      <div className='bg-[var(--foreground)] text-[var(--background)] font-bold px-4 py-1 flex gap-2 rounded-lg items-center'>
         <div className='aspect-square overflow-hidden h-5 w-5 rounded'>
            <img src={src} alt={src} />
         </div>{' '}
         <p>{name}</p>
      </div>
   )

   return isSuccessGetMartProductDetail ? (
      <div className='space-y-4'>
         <div className='space-y-2'>
            <div className='bg-[var(--background-secondary)] p-2 flex flex-wrap rounded-xl overflow-hidden'>
               <div
                  className='w-1/2 flex overflow-hidden relative max-w-100 min-w-[345px] m-auto rounded-md'
                  style={{ aspectRatio: '1/1' }}
               >
                  <button
                     className='absolute top-1/2 -translate-y-1/2 left-2 p-3 rounded-full bg-[var(--background)] text-[var(--foreground)] cursor-pointer group z-10'
                     onClick={handlePrev}
                  >
                     <ChevronLeft className='group-hover:scale-130 duration-300' />
                  </button>
                  <button
                     className='absolute top-1/2 -translate-y-1/2 right-2 p-3 rounded-full bg-[var(--background)] text-[var(--foreground)] cursor-pointer group z-10'
                     onClick={handleNext}
                  >
                     <ChevronRight />
                  </button>

                  <div className='absolute bottom-4 left-4 flex gap-2 z-10'>
                     {Array.from({
                        length:
                           martProductData.martProductItem[currentMartItemIndex]
                              .images.length,
                     }).map((_, index) => (
                        <div
                           className={`${index === currentImageIndex ? 'w-6 opacity-100' : 'w-2 opacity-50'} h-2 shadow bg-[var(--foreground)] duration-300 rounded-full cursor-pointer`}
                           onClick={() => setCurrentImageIndex(index)}
                        />
                     ))}
                  </div>
                  <div
                     className='w-full h-full flex transition-transform duration-500'
                     style={{
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                     }}
                  >
                     {martProductData.martProductItem[
                        currentMartItemIndex
                     ].images.map((item, index) => (
                        <div
                           key={index}
                           className='aspect-square h-full overflow-hidden flex-shrink-0'
                        >
                           <img
                              src={
                                 typeof item === 'string'
                                    ? item
                                    : URL.createObjectURL(item)
                              }
                              alt={`Image ${index + 1}`}
                              className='w-full h-full object-cover'
                           />
                        </div>
                     ))}
                  </div>
               </div>

               <div className='p-2 lg:p-5 overflow-auto space-y-3 flex-1 min-w-[345px]'>
                  <div>
                     <h1 className='text-2xl font-extrabold'>
                        {translate('descriptions')}
                     </h1>

                     <div className='ml-5 text-[var(--gray)]'>
                        {selectValueLanguage(locale as Lang, {
                           valueEn:
                              martProductData.martProductItem[
                                 currentMartItemIndex
                              ].descriptionEn,
                           valueFr:
                              martProductData.martProductItem[
                                 currentMartItemIndex
                              ].descriptionFr,
                           valueMg:
                              martProductData.martProductItem[
                                 currentMartItemIndex
                              ].descriptionMg,
                           valueZh:
                              martProductData.martProductItem[
                                 currentMartItemIndex
                              ].descriptionZh,
                        }).map((item: string) => {
                           const isColor = item.startsWith('Color: ')
                           const value = item.split(': ')[1]
                           return isColor ? (
                              <div
                                 className={`px-3 py-1 rounded-md w-fit font-bold text-[var(--foreground)]`}
                                 style={{ backgroundColor: value }}
                              >
                                 {value}
                              </div>
                           ) : (
                              <p>{item}</p>
                           )
                        })}
                     </div>
                  </div>

                  <div className='-space-y-3'>
                     <p className='font-extrabold text-xl line-through text-[var(--gray)]'>
                        {unitConvert(
                           martProductData.martProductItem[currentMartItemIndex]
                              .oldPrice,
                        )}{' '}
                        Ar
                     </p>
                     <p className='font-extrabold text-4xl'>
                        {unitConvert(
                           martProductData.martProductItem[currentMartItemIndex]
                              .price,
                        )}{' '}
                        Ar
                     </p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                     <div className='flex bg-[var(--background)] rounded-md'>
                        <div className='bg-[var(--yellow)] w-2 rounded-full' />

                        <div className='p-2'>
                           <h2 className='text-lg font-extrabold'>
                              {translate('quantity')}
                           </h2>
                           <p>
                              {unitConvert(
                                 martProductData.martProductItem[
                                    currentMartItemIndex
                                 ].quantity,
                              )}
                           </p>
                        </div>
                     </div>
                     <div className='flex bg-[var(--background)] rounded-md'>
                        <div className='bg-[var(--green)] w-2 rounded-full' />

                        <div className='p-2'>
                           <h2 className='text-lg font-extrabold'>
                              {translate('sales')}
                           </h2>
                           <p>
                              {unitConvert(
                                 martProductData.martProductItem[
                                    currentMartItemIndex
                                 ].salesQuantity,
                              )}
                           </p>
                        </div>
                     </div>
                     <div className='flex bg-[var(--background)] rounded-md'>
                        <div className='bg-[var(--gray)] w-2 rounded-full' />

                        <div className='p-2'>
                           <h2 className='text-lg font-extrabold'>
                              {translate('item_code')}
                           </h2>
                           <p>
                              {
                                 martProductData.martProductItem[
                                    currentMartItemIndex
                                 ].code
                              }
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className='space-y-1'>
               <div className='overflow-hidden flex'>
                  <div
                     className='p-2 flex items-center justify-center bg-[var(--background-secondary)] rounded-md z-10'
                     onClick={() => {
                        const maxLength = martProductData.martProductItem.length
                        setMartItemIndex(
                           (prev) => (prev - 1 + maxLength) % maxLength,
                        )
                     }}
                  >
                     <ChevronLeft />
                  </div>
                  <div className='w-full overflow-hidden'>
                     <div
                        className='flex transition-transform duration-300'
                        style={{
                           transform: `translateX(-${martItemIndex * 200}px)`,
                        }}
                     >
                        {martProductData.martProductItem.map((value, index) =>
                           ItemComponent(value, index),
                        )}
                     </div>
                  </div>
                  <div
                     className='p-2 flex items-center justify-center bg-[var(--background-secondary)] rounded-md z-10'
                     onClick={() => {
                        const maxLength = martProductData.martProductItem.length
                        setMartItemIndex((prev) => (prev + 1) % maxLength)
                     }}
                  >
                     <ChevronRight />
                  </div>
               </div>

               <div className='flex justify-center gap-2'>
                  {Array.from({
                     length: martProductData.martProductItem.length,
                  }).map((_, index) => (
                     <div
                        className={`${index === martItemIndex ? 'w-4 opacity-100' : 'w-2 opacity-50'} h-2 rounded-full shadow bg-[var(--foreground)] cursor-pointer duration-300`}
                        onClick={() => setMartItemIndex(index)}
                     />
                  ))}
               </div>
            </div>
         </div>

         <div className='flex gap-2 flex-wrap'>
            <div className='flex-1 min-w-[345px] space-y-4'>
               <ScrollText
                  text={selectValueLanguage(locale as Lang, {
                     valueEn: martProductData.nameEn,
                     valueFr: martProductData.nameFr,
                     valueMg: martProductData.nameMg,
                     valueZh: martProductData.nameZh,
                  })}
                  className='text-4xl font-extrabold'
               ></ScrollText>

               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                  <div className='p-2 bg-[var(--background-secondary)] rounded-md flex gap-2 items-center'>
                     <TbRulerMeasure className='size-10' />
                     <div>
                        <h2 className='font-bold'>{translate('width')}</h2>
                        <p className='text-xs text-[var(--gray)]'>
                           {martProductData.width} cm
                        </p>
                     </div>
                  </div>
                  <div className='p-2 bg-[var(--background-secondary)] rounded-md flex gap-2 items-center'>
                     <TbRulerMeasure2 className='size-10' />
                     <div>
                        <h2 className='font-bold'>{translate('height')}</h2>
                        <p className='text-xs text-[var(--gray)]'>
                           {martProductData.height} cm
                        </p>
                     </div>
                  </div>
                  <div className='p-2 bg-[var(--background-secondary)] rounded-md flex gap-2 items-center'>
                     <TbRuler2 className='size-10' />
                     <div>
                        <h2 className='font-bold'>{translate('length')}</h2>
                        <p className='text-xs text-[var(--gray)]'>
                           {martProductData.length} cm
                        </p>
                     </div>
                  </div>
                  <div className='p-2 bg-[var(--background-secondary)] rounded-md flex gap-2 items-center'>
                     <LucideWeight className='size-10' />
                     <div>
                        <h2 className='font-bold'>{translate('weight')}</h2>
                        <p className='text-xs text-[var(--gray)]'>
                           {martProductData.weight} g
                        </p>
                     </div>
                  </div>
               </div>

               <div>
                  <h2 className='text-2xl font-extrabold'>
                     {translate('descriptions')} :
                  </h2>
                  <div className='text-[var(--gray)]'>
                     {selectValueLanguage(locale as Lang, {
                        valueEn: martProductData.descriptionEn,
                        valueFr: martProductData.descriptionFr,
                        valueMg: martProductData.descriptionMg,
                        valueZh: martProductData.descriptionZh,
                     }).map((value: string) => (
                        <div className='flex gap-2 ml-5'>
                           <Component className='size-3 mt-2 min-w-3' />
                           <p>{value}</p>
                        </div>
                     ))}
                  </div>
               </div>

               <div className='space-y-1'>
                  <h2 className='text-2xl font-extrabold'>
                     {translate('category')} :
                  </h2>
                  <div className='flex flex-wrap gap-2'>
                     {martProductData.martCategory.map((value) =>
                        CategoryComponent(
                           value.image,
                           selectValueLanguage(locale as Lang, {
                              valueEn: value.nameEn || '',
                              valueFr: value.nameFr || '',
                              valueMg: value.nameMg || '',
                              valueZh: value.nameZh || '',
                           }),
                        ),
                     )}
                  </div>
               </div>

               <hr />

               <Button
                  className='bg-[var(--blue-secondary)] hover:bg-[var(--blue-secondary)] text-[var(--blue)] cursor-pointer font-bold'
                  asChild
               >
                  <Link to='/app/mart/edit/$martId' params={{ martId }}>
                     <SquarePen /> {translate('edit')}
                  </Link>
               </Button>
            </div>

            <div className='flex-1 min-w-[345px] space-y-2'>
               <h1 className='font-bold text-2xl text-center'>
                  {translate('commends')}
               </h1>
               <ProductCommentSection martProductId={martId} />
            </div>
         </div>
      </div>
   ) : (
      <div className='w-full h-screen flex items-center justify-center'>
         <ScaleLoader color='var(--green)' />
      </div>
   )
}
