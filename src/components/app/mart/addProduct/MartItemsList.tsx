import type { RootState } from '@/redux/store'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import langue from '@/data/language/app/mart/AddMartProduct.json'
import useTranslate from '@/hooks/useTranslate'
import ScrollText from '@/components/ScrollText'
import {
   deleteItem,
   setSelectedItem,
   type MartItemInterface,
} from '@/redux/slices/mart.product.slice'
import { FaStar } from 'react-icons/fa'

function MartItemsList() {
   const translate = useTranslate(langue)
   const dispatch = useDispatch()
   const [currentPage, setCurrentPage] = useState(0)
   const martItem = useSelector(
      (state: RootState) => state.martProduct.martItems,
   )

   const itemWidth = 176 + 8

   const handlePrev = () => {
      setCurrentPage((prev) => (prev - 1 + martItem.length) % martItem.length)
   }

   const handleNext = () => {
      setCurrentPage((prev) => (prev + 1) % martItem.length)
   }

   const ItemComponent = (item: MartItemInterface) => (
      <div className='w-44 flex-shrink-0 space-y-2 cursor-pointer hover:bg-[var(--background-secondary)] rounded-md p-2'>
         <div
            className='w-40 h-40 rounded-md overflow-hidden'
            style={{ aspectRatio: '1/1' }}
         >
            <img
               src={
                  typeof item.images[0] === 'string'
                     ? item.images[0]
                     : URL.createObjectURL(item.images[0])
               }
               alt='product'
               className='object-cover w-full h-full'
            />
         </div>
         <div>
            <ScrollText
               text={item.description.join('; ')}
               className='text-xs text-gray-600 line-clamp-2'
            ></ScrollText>

            <div className='-space-y-2'>
               <p className='text-[var(--red)] line-through text-xs'>
                  {unitConvert(item.oldPrice)} Ar
               </p>
               <p className='font-bold text-[var(--green)]'>
                  {unitConvert(item.price)} Ar
               </p>
            </div>
         </div>
      </div>
   )

   return (
      <div className='md:max-w-[calc(100vw-290px)]'>
         <div className='max-w-7xl mx-auto'>
            <div className='relative'>
               <button
                  onClick={handlePrev}
                  className={`absolute top-1/2 -translate-y-1/2 left-4 z-10 size-10 rounded-full p-2 shadow-lg transition-all hover:bg-[var(--background-secondary)] cursor-pointer`}
               >
                  <ChevronLeft className='size-full' />
               </button>

               {/* Bouton Suivant */}
               <button
                  onClick={handleNext}
                  className={`absolute top-1/2 -translate-y-1/2 right-4 z-10 size-10 rounded-full p-2 shadow-lg transition-all hover:bg-[var(--background-secondary)] cursor-pointer`}
               >
                  <ChevronRight className='size-full' />
               </button>

               {/* Container du carrousel */}
               <div className='overflow-hidden'>
                  <div
                     className='flex gap-2 transition-transform duration-300 ease-in-out'
                     style={{
                        transform: `translateX(-${currentPage * itemWidth}px)`,
                     }}
                  >
                     {martItem.length === 0 ? (
                        <div className='h-40 w-full border rounded-md flex items-center justify-center text-3xl font-extrabold text-[var(--gray)] text-center'>
                           {translate('no_product_item')}
                        </div>
                     ) : (
                        martItem.map((item, index) => (
                           <div
                              className='relative group'
                              key={item.martItemId}
                           >
                              {item.isMain && (
                                 <FaStar className='text-[var(--yellow)] absolute top-3 left-3' />
                              )}
                              <div
                                 onClick={() => {
                                    if (item.martItemId) {
                                       dispatch(
                                          setSelectedItem(item.martItemId),
                                       )
                                    }
                                 }}
                              >
                                 {ItemComponent(item)}
                              </div>
                              <button
                                 className='hidden group-hover:block cursor-pointer absolute top-3 right-3 text-[var(--foreground)] bg-[var(--red)] p-1 rounded'
                                 onClick={() => dispatch(deleteItem(index))}
                              >
                                 <Trash2 className='size-4' />
                              </button>
                           </div>
                        ))
                     )}
                  </div>
               </div>
            </div>

            <div className='flex gap-1 justify-center'>
               {Array.from({ length: martItem.length }).map((_, i) => (
                  <div
                     className={`w-1 h-1 bg-[var(--foreground)] rounded-full curser-pointer ${i === currentPage ? 'opacity-100 w-2' : 'opacity-50'}`}
                     onClick={() => setCurrentPage(i)}
                     key={i}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default MartItemsList
