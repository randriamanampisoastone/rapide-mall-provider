import { useProviderGetOrderItem } from '@/api/mart/provider.get.order.items.api'
import ScrollText from '@/components/ScrollText'
import SearchBar from '@/components/SearchBar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import type { RootState } from '@/redux/store'
import { formatTimeDifference, type Lang } from '@/utils/formats/time.utils'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { createFileRoute } from '@tanstack/react-router'
import {
   CalendarClock,
   CalendarDays,
   ChevronsLeft,
   ChevronsRight,
   CircleX,
   Clock4,
   Timer,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import langue from '@/data/language/app/mart/Orders.json'
import useTranslate from '@/hooks/useTranslate'
import { selectValueLanguage } from '@/utils/select.value.language.util'
import {
   MartOrderStatusType,
   MartOrderStatusTypeColor,
} from '@/enums/mart/mart.order.status.enum'
import { MultiSelect } from '@/components/MultiSelect'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import { DateTimePicker } from '@/components/customComponents/DateTimePicker'
import { utcConvert } from '@/utils/utc.convert.util'

export const Route = createFileRoute('/app/mart/orders')({
   component: RouteComponent,
})

function RouteComponent() {
   const translate = useTranslate(langue)

   const [searchValue, setSearchValue] = useState('')
   const [pageSetting, setPageSetting] = useState<{
      page: number
      pageSize: number
   }>({
      page: 1,
      pageSize: 10,
   })
   const [orderStatus, setOrderStatus] = useState<MartOrderStatusType[]>([])
   const [createdAtFrom, setCreatedAtFrom] = useState<Date | undefined>(
      undefined,
   )
   const [createdAtTo, setCreatedAtTo] = useState<Date | undefined>(undefined)
   const [updatedAtFrom, setUpdatedAtFrom] = useState<Date | undefined>(
      undefined,
   )
   const [updatedAtTo, setUpdatedAtTo] = useState<Date | undefined>(undefined)

   const locale = useSelector((state: RootState) => state.language.locale)

   const optionPickUpDate: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
   }

   const optionPickUpTime: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
   }

   const getLocalDateFormat = () => {
      if (locale === 'en') return 'en-US'
      else if (locale === 'fr') return 'fr-FR'
      else if (locale === 'mg') return 'mg-MG'
      else if (locale === 'zh') return 'zh-CN'
      else return 'en-US'
   }

   const {
      data: orders,
      isSuccess: isSuccessProviderGetOrderItem,
      refetch: refetchProviderGetOrderItem,
   } = useProviderGetOrderItem({
      page: pageSetting.page,
      pageSize: pageSetting.pageSize,
      term: searchValue,
      orderStatus,
      createdAtFrom: createdAtFrom ? utcConvert(createdAtFrom) : undefined,
      createdAtTo: createdAtTo ? utcConvert(createdAtTo) : undefined,
      updatedAtFrom: updatedAtFrom ? utcConvert(updatedAtFrom) : undefined,
      updatedAtTo: updatedAtTo ? utcConvert(updatedAtTo) : undefined,
   })

   const maxPage = useMemo(
      () => Math.ceil((orders?.totalCount || 1) / pageSetting.pageSize),
      [orders, pageSetting.pageSize],
   )

   const filter = () => (
      <>
         <MultiSelect
            options={Object.keys(MartOrderStatusTypeColor).map((status) => ({
               label: translate(status.toLowerCase()),
               value: status,
            }))}
            onValueChange={(val) => {
               setOrderStatus(val as MartOrderStatusType[])
            }}
            defaultValue={orderStatus}
            placeholder={translate('select_order_status')}
            all_placeholder={translate('select_all')}
            search_placeholder={translate('search')}
            variant='secondary'
            maxCount={2}
            className='w-fit'
         />

         <Popover>
            <PopoverTrigger asChild>
               <Button variant={'outline'} className='relative cursor-pointer'>
                  <CalendarClock /> {translate('createdAt')}
                  {(createdAtFrom || createdAtTo) && (
                     <div className='absolute size-3 rounded-full bg-[var(--red)] -right-1 -top-1' />
                  )}
               </Button>
            </PopoverTrigger>
            <PopoverContent className='space-y-2 p-2'>
               <div>
                  <p>{translate('from')} :</p>
                  <div className='grid grid-cols-6 gap-1'>
                     <div className='col-span-5'>
                        <DateTimePicker
                           date={createdAtFrom}
                           setDate={setCreatedAtFrom}
                        />
                     </div>
                     <Button
                        variant={'outline'}
                        onClick={() => setCreatedAtFrom(undefined)}
                        className='cursor-pointer'
                     >
                        <CircleX />
                     </Button>
                  </div>
               </div>
               <div>
                  <p>{translate('to')} :</p>
                  <div className='grid grid-cols-6 gap-1'>
                     <div className='col-span-5'>
                        <DateTimePicker
                           date={createdAtTo}
                           setDate={setCreatedAtTo}
                        />
                     </div>
                     <Button
                        variant={'outline'}
                        onClick={() => setCreatedAtTo(undefined)}
                        className='cursor-pointer'
                     >
                        <CircleX />
                     </Button>
                  </div>
               </div>
            </PopoverContent>
         </Popover>

         <Popover>
            <PopoverTrigger asChild>
               <Button variant={'outline'} className='relative cursor-pointer'>
                  <CalendarClock /> {translate('last_update')}
                  {(updatedAtFrom || updatedAtTo) && (
                     <div className='absolute size-3 rounded-full bg-[var(--red)] -right-1 -top-1' />
                  )}
               </Button>
            </PopoverTrigger>
            <PopoverContent className='space-y-2 p-2'>
               <div>
                  <p>{translate('from')} :</p>
                  <div className='grid grid-cols-6 gap-1'>
                     <div className='col-span-5'>
                        <DateTimePicker
                           date={updatedAtFrom}
                           setDate={setUpdatedAtFrom}
                        />
                     </div>
                     <Button
                        variant={'outline'}
                        onClick={() => setUpdatedAtFrom(undefined)}
                        className='cursor-pointer'
                     >
                        <CircleX />
                     </Button>
                  </div>
               </div>
               <div>
                  <p>{translate('to')} :</p>
                  <div className='grid grid-cols-6 gap-1'>
                     <div className='col-span-5'>
                        <DateTimePicker
                           date={updatedAtTo}
                           setDate={setUpdatedAtTo}
                        />
                     </div>
                     <Button
                        variant={'outline'}
                        onClick={() => setUpdatedAtTo(undefined)}
                        className='cursor-pointer'
                     >
                        <CircleX />
                     </Button>
                  </div>
               </div>
            </PopoverContent>
         </Popover>
      </>
   )

   return (
      <div className='space-y-2'>
         <SearchBar
            filterItems={[]}
            refetchFn={refetchProviderGetOrderItem}
            searchFilter={[]}
            setSearchFilter={() => {}}
            setSearchValue={setSearchValue}
            totalCount={orders?.totalCount || 0}
         />

         <div className='flex justify-between items-end'>
            <div className='flex gap-2 items-center'>{filter()}</div>
            {isSuccessProviderGetOrderItem && (
               <div className='p-2 bg-[var(--background-secondary)] rounded-md'>
                  <p className='text-xs text-[var(--gray)]'>
                     {translate('total_amount')} :
                  </p>
                  <p className='font-bold'>
                     {unitConvert(orders.totalAmount)} Ar
                  </p>
               </div>
            )}
         </div>

         <div className='space-y-2 overflow-auto md:max-w-[calc(100vw-290px)]'>
            <div className='flex items-center bg-[var(--background-secondary)] p-2 rounded-md shadow min-w-fit gap-2'>
               <div className='font-bold min-w-25 max-w-25'>
                  {translate('created_at')}
               </div>
               <div className='font-bold min-w-25 max-w-25'>
                  {translate('last_update')}
               </div>
               <div className='font-bold min-w-25 max-w-25'>
                  {translate('order_code')}
               </div>
               <div className='font-bold min-w-25 max-w-25'>
                  <ScrollText text={translate('transaction_reference')} />
               </div>
               <div className='font-bold min-w-40 max-w-40'>
                  {translate('client')}
               </div>
               <div className='font-bold min-w-50 max-w-50'>
                  {translate('product_item')}
               </div>
               <div className='font-bold min-w-20 max-w-20'>
                  {translate('quantity')}
               </div>
               <div className='font-bold min-w-25 max-w-25'>
                  {translate('price')}
               </div>
               <div className='font-bold min-w-25 max-w-25'>
                  {translate('order_status')}
               </div>
               <div className='font-bold min-w-40 max-w-40'>
                  {translate('pickup_driver')}
               </div>
               <div className='font-bold min-w-40 max-w-40'>
                  {translate('delivery_driver')}
               </div>
            </div>
            {isSuccessProviderGetOrderItem ? (
               <div className='space-y-2'>
                  {orders.data.map((data) => (
                     <div className='flex items-center bg-[var(--background-secondary)] p-2 rounded-md shadow min-w-fit gap-2'>
                        {/** Created At */}
                        <div className='text-xs space-y-1 min-w-25 max-w-25'>
                           <div className='flex items-center gap-1'>
                              <Clock4 className='size-4' />
                              {new Date(data.createdAt).toLocaleTimeString(
                                 getLocalDateFormat(),
                                 optionPickUpTime,
                              )}
                           </div>
                           <div className='flex items-center gap-1'>
                              <CalendarDays className='size-4' />
                              {new Date(data.createdAt).toLocaleDateString(
                                 getLocalDateFormat(),
                                 optionPickUpDate,
                              )}
                           </div>
                           <div className='flex items-center gap-1'>
                              <Timer className='size-4' />
                              {formatTimeDifference(
                                 new Date(data.createdAt).getTime(),
                                 locale as Lang,
                              )}
                           </div>
                        </div>

                        {/** Last update */}
                        <div className='text-xs space-y-1 min-w-25 max-w-25'>
                           <div className='flex items-center gap-1'>
                              <Clock4 className='size-4' />
                              {new Date(data.updateAt).toLocaleTimeString(
                                 getLocalDateFormat(),
                                 optionPickUpTime,
                              )}
                           </div>
                           <div className='flex items-center gap-1'>
                              <CalendarDays className='size-4' />
                              {new Date(data.updateAt).toLocaleDateString(
                                 getLocalDateFormat(),
                                 optionPickUpDate,
                              )}
                           </div>
                           <div className='flex items-center gap-1'>
                              <Timer className='size-4' />
                              {formatTimeDifference(
                                 new Date(data.updateAt).getTime(),
                                 locale as Lang,
                              )}
                           </div>
                        </div>

                        {/** Order code */}
                        <div className='font-bold min-w-25 max-w-25 text-xl'>
                           {data.martOrderShortCode}
                        </div>

                        {/** reference */}
                        <div className='font-bold min-w-25 max-w-25'>
                           {data.transactionReference ? (
                              <span className='text-xl'>
                                 {data.transactionReference
                                    .toString()
                                    .padStart(6, '0')}
                              </span>
                           ) : (
                              <span className='text-[var(--gray)] text-xs'>
                                 {translate('undefined')}
                              </span>
                           )}
                        </div>

                        {/** Client */}
                        <div className='min-w-40 max-w-40 flex items-center gap-2'>
                           {data.clientProfile ? (
                              <>
                                 <Avatar className='size-11 font-bold'>
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

                                 <div className='flex-1'>
                                    <ScrollText
                                       text={`${data.clientProfile.firstName} ${data.clientProfile.lastName || ''}`}
                                       className='font-bold'
                                    />
                                    <ScrollText
                                       text={data.clientProfile.phoneNumber}
                                       className='text-xs'
                                    />
                                 </div>
                              </>
                           ) : (
                              <span className='text-[var(--gray)] text-xs'>
                                 {translate('undefined')}
                              </span>
                           )}
                        </div>

                        {/** Product item */}
                        <div className='min-w-50 max-w-50 flex gap-2 overflow-hidden'>
                           <div className='aspect-square min-w-15 h-15 rounded-md overflow-hidden'>
                              <img
                                 src={data.martItem.images[0]}
                                 alt='product-item'
                                 className='object-cover w-full h-full'
                              />
                           </div>

                           <div className='flex-1 overflow-hidden'>
                              <ScrollText
                                 text={data.martItem.code}
                                 className='font-bold'
                              />
                              <ScrollText
                                 text={selectValueLanguage(locale as Lang, {
                                    valueEn: data.martItem.nameEn,
                                    valueFr: data.martItem.nameFr,
                                    valueMg: data.martItem.nameMg,
                                    valueZh: data.martItem.nameZh,
                                 })}
                                 className='text-xs'
                              />
                              <ScrollText
                                 text={selectValueLanguage(locale as Lang, {
                                    valueEn: data.martItem.descriptionEn,
                                    valueFr: data.martItem.descriptionFr,
                                    valueMg: data.martItem.descriptionMg,
                                    valueZh: data.martItem.descriptionZh,
                                 }).join('; ')}
                                 className='text-xs'
                              />
                           </div>
                        </div>

                        {/** Quantity */}
                        <div className='font-bold min-w-20 max-w-20 text-center text-2xl'>
                           {data.quantity.toString().padStart(3, '0')}
                        </div>

                        {/** Price */}
                        <div className='min-w-25 max-w-25'>
                           <ScrollText
                              text={unitConvert(data.priceAtTime) + ' Ar'}
                              className='text-xs font-bold'
                           />
                           <div className='-space-y-2'>
                              <p className='text-[var(--gray)] text-xs'>
                                 {translate('total')} :
                              </p>
                              <ScrollText
                                 text={
                                    unitConvert(
                                       data.priceAtTime * data.quantity,
                                    ) + ' Ar'
                                 }
                                 className='font-bold'
                              />
                           </div>
                        </div>

                        {/** Order status */}
                        <div className='font-bold min-w-25 max-w-25'>
                           <div
                              className='p-2 rounded-md text-center'
                              style={{
                                 backgroundColor: `var(${MartOrderStatusTypeColor[data.orderStatus]}-secondary)`,
                                 color: `var(${MartOrderStatusTypeColor[data.orderStatus]})`,
                              }}
                           >
                              <ScrollText
                                 text={translate(
                                    data.orderStatus.toLowerCase(),
                                 )}
                              />
                           </div>
                        </div>

                        {/** Pickup driver */}
                        <div className='min-w-40 max-w-40 flex items-center gap-2'>
                           {data.driverPickedUp ? (
                              <>
                                 <Avatar className='size-11 font-bold'>
                                    <AvatarImage
                                       src={data.driverPickedUp.profilePhoto}
                                    />
                                    <AvatarFallback>
                                       {data.driverPickedUp.firstName
                                          .charAt(0)
                                          .toUpperCase()}
                                       {data.driverPickedUp.lastName
                                          ?.charAt(0)
                                          .toUpperCase()}
                                    </AvatarFallback>
                                 </Avatar>

                                 <div className='flex-1'>
                                    <ScrollText
                                       text={`${data.driverPickedUp.firstName} ${data.driverPickedUp.lastName || ''}`}
                                       className='font-bold'
                                    />
                                    <ScrollText
                                       text={data.driverPickedUp.phoneNumber}
                                       className='text-xs'
                                    />
                                 </div>
                              </>
                           ) : (
                              <span className='text-[var(--gray)] text-xs'>
                                 {translate('undefined')}
                              </span>
                           )}
                        </div>

                        {/** Delivery driver */}
                        <div className='min-w-40 max-w-40 flex items-center gap-2'>
                           {data.driverDelivered ? (
                              <>
                                 <Avatar className='size-11 font-bold'>
                                    <AvatarImage
                                       src={data.driverDelivered.profilePhoto}
                                    />
                                    <AvatarFallback>
                                       {data.driverDelivered.firstName
                                          .charAt(0)
                                          .toUpperCase()}
                                       {data.driverDelivered.lastName
                                          ?.charAt(0)
                                          .toUpperCase()}
                                    </AvatarFallback>
                                 </Avatar>

                                 <div className='flex-1'>
                                    <ScrollText
                                       text={`${data.driverDelivered.firstName} ${data.driverDelivered.lastName || ''}`}
                                       className='font-bold'
                                    />
                                    <ScrollText
                                       text={data.driverDelivered.phoneNumber}
                                       className='text-xs'
                                    />
                                 </div>
                              </>
                           ) : (
                              <span className='text-[var(--gray)] text-xs'>
                                 {translate('undefined')}
                              </span>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className='h-100 flex items-center justify-center'>
                  <ScaleLoader color='var(--green)' />
               </div>
            )}
         </div>

         <div className='flex items-center justify-between'>
            <p className='text-xs text-[var(--gray)]'>
               {translate('pages')
                  .replace('{page}', unitConvert(pageSetting.page))
                  .replace('{maxPage}', unitConvert(maxPage))}
            </p>

            <div className='flex items-center gap-2'>
               <Select
                  value={pageSetting.pageSize.toString()}
                  onValueChange={(value) =>
                     setPageSetting({
                        page: 1,
                        pageSize: parseInt(value),
                     })
                  }
               >
                  <SelectTrigger size='sm'>
                     {translate('page_size')}: <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     {[10, 20, 30, 40, 50].map((value) => (
                        <SelectItem key={value} value={value.toString()}>
                           {value}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>

               <Button
                  size={'sm'}
                  variant={'outline'}
                  className='flex items-center font-bold'
                  onClick={() =>
                     setPageSetting((prev) => ({
                        ...prev,
                        page: prev.page - 1,
                     }))
                  }
                  disabled={pageSetting.page === 1}
               >
                  <ChevronsLeft /> {translate('previous')}
               </Button>
               <Button
                  size={'sm'}
                  variant={'outline'}
                  className='flex items-center font-bold'
                  onClick={() =>
                     setPageSetting((prev) => ({
                        ...prev,
                        page: prev.page + 1,
                     }))
                  }
                  disabled={!orders?.hasMore}
               >
                  {translate('next')} <ChevronsRight />
               </Button>
            </div>
         </div>
      </div>
   )
}
