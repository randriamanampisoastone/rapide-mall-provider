import { ShoppingCart, X } from 'lucide-react'
import langue from '@/data/language/app/mart/AddMartProduct.json'
import useTranslate from '@/hooks/useTranslate'
import AddProductImage from './AddProductImage'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import {
   setSelectedItem,
   upsertProductItem,
   type MartItemInterface,
} from '@/redux/slices/mart.product.slice'
import AddProductDescription from './AddProductDescription'
import InputNumber from '@/components/customComponents/InputNumber'
import { Input } from '@/components/ui/input'
import { generateProductCode } from '@/utils/generate.product.code.util'

function AddItems() {
   const translate = useTranslate(langue)
   const { name, martItems, selectedItem } = useSelector(
      (state: RootState) => state.martProduct,
   )
   const dispatch = useDispatch()
   const [currentMartItem, setCurrentMartItem] = useState<MartItemInterface>({
      description: [],
      images: [],
      isMain: martItems.length > 0 ? false : true,
      oldPrice: 0,
      price: 0,
      quantity: 0,
      code: generateProductCode(
         name ? name.slice(0, 4).toUpperCase() : undefined,
      ),
      martItemId: '',
   })

   useEffect(() => {
      if (selectedItem) {
         const currentItem = martItems.find(
            (value) => value.martItemId === selectedItem,
         )
         if (currentItem) {
            setCurrentMartItem(currentItem)
         }
      }
   }, [selectedItem])

   return (
      <div className='space-y-2'>
         <div>
            <div className='flex gap-2'>
               <ShoppingCart className='size-8' />
               <p className='text-3xl font-extrabold'>
                  {translate('add_item')}
               </p>
            </div>

            <AddProductImage
               files={currentMartItem.images}
               setFiles={(data) =>
                  setCurrentMartItem((prev) => ({
                     ...prev,
                     images:
                        typeof data === 'function' ? data(prev.images) : data,
                  }))
               }
            />
         </div>

         <div className='p-2 lg:p-5 rounded-md bg-[var(--background-secondary)] space-y-3'>
            <div>
               <label className='font-bold'>{translate('items_code')}</label>
               <Input
                  placeholder={translate('items_code')}
                  className='w-fit'
                  value={currentMartItem.code}
                  onChange={(e) =>
                     setCurrentMartItem((prev) => ({
                        ...prev,
                        code: e.target.value,
                     }))
                  }
               />
            </div>
            <div className='space-y-2 md:grid grid-cols-3 gap-5'>
               <InputNumber
                  label={translate('quantity')}
                  value={currentMartItem.quantity}
                  setValue={(data) =>
                     setCurrentMartItem((prev) => ({
                        ...prev,
                        quantity: data,
                     }))
                  }
               />

               <InputNumber
                  label={translate('old_price') + ' ( Ar )'}
                  value={currentMartItem.oldPrice}
                  setValue={(data) =>
                     setCurrentMartItem((prev) => ({
                        ...prev,
                        oldPrice: data,
                     }))
                  }
               />

               <InputNumber
                  label={translate('price') + ' ( Ar )'}
                  value={currentMartItem.price}
                  setValue={(data) =>
                     setCurrentMartItem((prev) => ({
                        ...prev,
                        price: data,
                     }))
                  }
               />
            </div>
            <AddProductDescription
               descriptions={currentMartItem.description}
               setDescriptions={(data) =>
                  setCurrentMartItem((prev) => ({ ...prev, description: data }))
               }
            />

            <div
               className='flex gap-2 items-center cursor-pointer w-fit'
               onClick={() =>
                  setCurrentMartItem({
                     ...currentMartItem,
                     isMain: !currentMartItem.isMain,
                  })
               }
            >
               <div className='h-5 rounded-full w-10 border cursor-pointer relative'>
                  <div
                     className={`absolute top-1/2 -translate-y-1/2 ${!currentMartItem.isMain ? 'left-[1px] bg-[var(--gray)]' : 'left-[calc(50%+1px)] bg-[var(--blue)]'} w-4 h-4 rounded-full duration-300`}
                  />
               </div>

               <p className='font-bold'>{translate('main_item')}</p>
            </div>

            <div className='flex justify-end gap-2'>
               {selectedItem && (
                  <Button
                     onClick={() => {
                        dispatch(setSelectedItem(undefined))
                        setCurrentMartItem({
                           description: [],
                           images: [],
                           isMain: martItems.length ? false : true,
                           oldPrice: 0,
                           price: 0,
                           quantity: 0,
                           code: generateProductCode(
                              name ? name.slice(0, 4).toUpperCase() : undefined,
                           ),
                           martItemId: '',
                        })
                     }}
                     className='bg-[var(--red-secondary)] hover:bg-[var(--red-secondary)] text-[var(--red)] cursor-pointer'
                  >
                     <X />
                     {translate('cancel')}
                  </Button>
               )}
               <Button
                  className='font-bold bg-[var(--blue-secondary)] hover:bg-[var(--blue-secondary)] text-[var(--blue)] cursor-pointer'
                  onClick={() => {
                     dispatch(upsertProductItem(currentMartItem))
                     setCurrentMartItem({
                        description: [],
                        images: [],
                        isMain: martItems.length ? false : true,
                        oldPrice: 0,
                        price: 0,
                        quantity: 0,
                        code: generateProductCode(
                           name ? name.slice(0, 4).toUpperCase() : undefined,
                        ),
                        martItemId: '',
                     })
                  }}
                  disabled={
                     currentMartItem.images.length === 0 ||
                     !currentMartItem.price ||
                     !currentMartItem.oldPrice ||
                     !currentMartItem.quantity
                  }
               >
                  <ShoppingCart />{' '}
                  {selectedItem
                     ? translate('save_item_change')
                     : translate('add_item')}
               </Button>
            </div>
         </div>
      </div>
   )
}

export default AddItems
