import { useProviderGetOrderItem } from '@/api/mart/provider.get.order.items.api'
import { ImageViewer } from '@/components/ImageViewer'
import ScrollText from '@/components/ScrollText'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MartOrderStatusTypeColor } from '@/enums/mart/mart.order.status.enum'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { format } from 'date-fns'
import { useState } from 'react'
import { ScaleLoader } from 'react-spinners'

interface ProductCommandSectionProps {
   martProductId: string
}

function ProductCommandSection({ martProductId }: ProductCommandSectionProps) {
   const [imageSrc, setImageSrc] = useState<string>('')
   const [isImageViewerOpen, setIsImageViewerOpen] = useState<boolean>(false)

   const handleOpenImageViewer = (src: string) => {
      setImageSrc(src)
      setIsImageViewerOpen(true)
   }

   const { data: orderItems, isSuccess: isSuccessProviderGetOrderItem } =
      useProviderGetOrderItem({
         martProductId,
      })

   return (
      <>
         {isSuccessProviderGetOrderItem ? (
            <div className='h-100 overflow-x-hidden overflow-y-auto scrollbar-none space-y-3'>
               {orderItems.data.map((data, index) => {
                  return (
                     <div>
                        <ScrollText
                           text={format(
                              new Date(data.createdAt),
                              'dd MMMM yyyy - HH:mm:ss',
                           )}
                           className='text-xs'
                        />

                        <div key={index} className='flex gap-2'>
                           <div className='flex gap-2 items-center overflow-hidden flex-1'>
                              <Avatar
                                 className='size-13 cursor-pointer'
                                 onClick={() =>
                                    handleOpenImageViewer(
                                       data.clientProfile.profilePhoto || '',
                                    )
                                 }
                              >
                                 <AvatarImage
                                    src={data.clientProfile.profilePhoto}
                                 />
                                 <AvatarFallback>
                                    {data.clientProfile.firstName
                                       .charAt(0)
                                       .toUpperCase()}
                                    {data.clientProfile.lastName
                                       ?.charAt(0)
                                       .toUpperCase()}
                                 </AvatarFallback>
                              </Avatar>
                              <div className='flex-1 overflow-hidden'>
                                 <ScrollText
                                    text={data.clientProfile.firstName}
                                    className='font-bold text-base'
                                 />
                                 {data.clientProfile.lastName && (
                                    <ScrollText
                                       text={data.clientProfile.lastName}
                                       className='text-[var(--gray)] text-xs'
                                    />
                                 )}
                                 <ScrollText
                                    text={data.clientProfile.phoneNumber}
                                    className='text-[var(--gray)] text-xs'
                                 />
                              </div>
                           </div>

                           <div className='min-w-1 rounded-full bg-[var(--foreground)]' />

                           <div className='min-w-50 max-w-50 flex gap-2'>
                              <div className='min-w-15 max-w-15 min-h-15 max-h-15 aspect-square rounded-md border overflow-hidden'>
                                 <img
                                    src={data.martItem.images[0]}
                                    alt={`items-${index}`}
                                    className='w-full h-full object-cover'
                                 />
                              </div>

                              <div className='flex flex-col justify-between overflow-hidden gap-1'>
                                 <div className='overflow-hidden'>
                                    <div
                                       className='px-2 rounded w-fit flex gap-2 items-center text-xs'
                                       style={{
                                          backgroundColor: `var(${MartOrderStatusTypeColor[data.orderStatus]}-secondary)`,
                                          color: `var(${MartOrderStatusTypeColor[data.orderStatus]})`,
                                       }}
                                    >
                                       <p>{data.orderStatus}</p>
                                    </div>
                                 </div>
                                 <div className='flex gap-1 text-xs'>
                                    <div className='px-1 bg-[var(--foreground)] text-[var(--background)] w-fit rounded'>
                                       {data.quantity}
                                    </div>
                                    <div>
                                       {unitConvert(data.priceAtTime)} Ar
                                    </div>
                                 </div>
                                 <p className='font-bold text-lg'>
                                    {unitConvert(
                                       data.priceAtTime * data.quantity,
                                    )}{' '}
                                    Ar
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>
         ) : (
            <div className='h-100 flex items-center justify-center'>
               <ScaleLoader color='var(--green)' />
            </div>
         )}

         {isImageViewerOpen && (
            <ImageViewer
               firstName=''
               lastName=''
               isOpen={isImageViewerOpen}
               setIsOpen={setIsImageViewerOpen}
               profilePhoto={imageSrc}
            />
         )}
      </>
   )
}

export default ProductCommandSection
