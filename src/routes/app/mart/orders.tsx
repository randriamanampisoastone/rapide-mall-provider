import {
   useProviderGetOrderItem,
   type ProviderGetOrderItemsResponseData,
} from '@/api/mart/provider.get.order.items.api'
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
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
   CalendarClock,
   CalendarDays,
   ChevronsLeft,
   ChevronsRight,
   CircleX,
   Clock4,
   Component,
   MoreVertical,
   Shirt,
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
import {
   flexRender,
   getCoreRowModel,
   useReactTable,
   type ColumnDef,
} from '@tanstack/react-table'
import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
   MartOrderItemStatusColor,
   MartOrderItemStatusType,
} from '@/enums/mart/mart.order.item.status.enum'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'
import NotFoundComponent from '@/components/NotFoundComponent'
import ChangeMartOrderStatusItemModal from '@/components/app/mart/ChangeMartOrderStatusItemModal'

export const Route = createFileRoute('/app/mart/orders')({
   component: RouteComponent,
})

function RouteComponent() {
   const translate = useTranslate(langue)
   const navigate = useNavigate()

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
   const [isChangeMartOrderItemStatusOpen, setIsChangeMartOrderItemStatusOpen] =
      useState<boolean>(false)
   const [changeMartOrderItemStatusData, setChangeMartOrderItemStatusData] =
      useState<
         | {
              martOrderItemId: string
              oldMartOrderItemStatus: MartOrderItemStatusType
              newMartOrderItemStatus: MartOrderItemStatusType
           }
         | undefined
      >(undefined)

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
      isPending: isPendingProviderGetOrderItem,
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

   const columns: ColumnDef<ProviderGetOrderItemsResponseData>[] = [
      // createdAt
      {
         accessorKey: 'createdAt',
         header: translate('created_at'),
         cell: ({ row }) => {
            const createdAt = new Date(row.getValue('createdAt') ?? '')
            return (
               <div className='text-xs space-y-1'>
                  <div className='flex items-center gap-1'>
                     <Clock4 className='size-4' />
                     {new Date(createdAt).toLocaleTimeString(
                        getLocalDateFormat(),
                        optionPickUpTime,
                     )}
                  </div>
                  <div className='flex items-center gap-1'>
                     <CalendarDays className='size-4' />
                     {new Date(createdAt).toLocaleDateString(
                        getLocalDateFormat(),
                        optionPickUpDate,
                     )}
                  </div>
                  <div className='flex items-center gap-1'>
                     <Timer className='size-4' />
                     {formatTimeDifference(
                        new Date(createdAt).getTime(),
                        locale as Lang,
                     )}
                  </div>
               </div>
            )
         },
      },
      // updatedAt
      {
         id: 'updated_at',
         header: translate('last_update'),
         cell: ({ row }) => {
            const updatedAt = new Date(row.original.updateAt ?? '')
            return (
               <div className='text-xs space-y-1'>
                  <div className='flex items-center gap-1'>
                     <Clock4 className='size-4' />
                     {new Date(updatedAt).toLocaleTimeString(
                        getLocalDateFormat(),
                        optionPickUpTime,
                     )}
                  </div>
                  <div className='flex items-center gap-1'>
                     <CalendarDays className='size-4' />
                     {new Date(updatedAt).toLocaleDateString(
                        getLocalDateFormat(),
                        optionPickUpDate,
                     )}
                  </div>
                  <div className='flex items-center gap-1'>
                     <Timer className='size-4' />
                     {formatTimeDifference(
                        new Date(updatedAt).getTime(),
                        locale as Lang,
                     )}
                  </div>
               </div>
            )
         },
      },
      // item
      {
         id: 'item',
         header: translate('item'),
         cell: ({ row }) => (
            <HoverCard>
               <HoverCardTrigger asChild>
                  <div
                     className='flex gap-2 items-end'
                     onClick={() =>
                        navigate({
                           to: '/app/mart/$martId',
                           params: {
                              martId: row.original.martItem.martProductId,
                           },
                        })
                     }
                  >
                     <div className='bg-[var(--background-secondary)] w-[50px] min-w-[50px] aspect-square overflow-hidden rounded'>
                        <img
                           src={row.original.martItem.images[0]}
                           alt={row.original.martOrderItemId}
                           className='object-cover w-full h-full'
                        />
                     </div>
                     <div className='max-w-40 overflow-hidden text-left'>
                        <div className='truncate font-extrabold'>
                           {selectValueLanguage(locale as Lang, {
                              valueEn: row.original.martItem.nameEn,
                              valueFr: row.original.martItem.nameFr,
                              valueMg: row.original.martItem.nameMg,
                              valueZh: row.original.martItem.nameZh,
                           })}
                        </div>
                        <div className='line-clamp-2 text-xs text-wrap text-[var(--gray)]'>
                           {(
                              selectValueLanguage(locale as Lang, {
                                 valueEn: row.original.martItem.descriptionEn,
                                 valueFr: row.original.martItem.descriptionFr,
                                 valueMg: row.original.martItem.descriptionMg,
                                 valueZh: row.original.martItem.descriptionZh,
                              }) as string[]
                           ).join('; ')}
                           ;{' '}
                           {(
                              selectValueLanguage(locale as Lang, {
                                 valueEn:
                                    row.original.martItem.productDescriptionEn,
                                 valueFr:
                                    row.original.martItem.productDescriptionFr,
                                 valueMg:
                                    row.original.martItem.productDescriptionMg,
                                 valueZh:
                                    row.original.martItem.productDescriptionZh,
                              }) as string[]
                           ).join('; ')}
                        </div>
                     </div>
                  </div>
               </HoverCardTrigger>
               <HoverCardContent className='max-w-50 text-xs space-y-2'>
                  <div>
                     <h1 className='font-bold'>
                        {translate('product_descriptions')} :
                     </h1>
                     <div className='pl-3'>
                        {(
                           selectValueLanguage(locale as Lang, {
                              valueEn:
                                 row.original.martItem.productDescriptionEn,
                              valueFr:
                                 row.original.martItem.productDescriptionFr,
                              valueMg:
                                 row.original.martItem.productDescriptionMg,
                              valueZh:
                                 row.original.martItem.productDescriptionZh,
                           }) as string[]
                        ).map((description) => (
                           <div className='flex gap-2 items-start'>
                              <Component className='size-3 mt-1 min-w-3' />{' '}
                              <p className='text-wrap'>{description}</p>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div>
                     <h1 className='font-bold'>
                        {translate('item_descriptions')} :
                     </h1>
                     <div className='pl-3'>
                        {(
                           selectValueLanguage(locale as Lang, {
                              valueEn: row.original.martItem.descriptionEn,
                              valueFr: row.original.martItem.descriptionFr,
                              valueMg: row.original.martItem.descriptionMg,
                              valueZh: row.original.martItem.descriptionZh,
                           }) as string[]
                        ).map((description) => (
                           <div className='flex gap-2 items-start'>
                              <Component className='size-3 mt-1 min-w-3' />{' '}
                              <p className='text-wrap'>{description}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </HoverCardContent>
            </HoverCard>
         ),
      },

      // client
      {
         id: 'client',
         header: translate('client'),
         cell: ({ row }) => (
            <HoverCard>
               <HoverCardTrigger asChild>
                  <Button variant='link' className='cursor-pointer'>
                     <div className='truncate max-w-30'>
                        {row.original.clientProfile.firstName +
                           ' ' +
                           (row.original.clientProfile.lastName || '')}
                     </div>
                  </Button>
               </HoverCardTrigger>
               <HoverCardContent className='max-w-50 select-none cursor-pointer'>
                  <div className='flex gap-2 items-end'>
                     <Avatar className='size-10'>
                        <AvatarImage
                           src={row.original.clientProfile.profilePhoto}
                        />
                        <AvatarFallback>
                           {row.original.clientProfile.firstName
                              .charAt(0)
                              .toUpperCase()}
                           {row.original.clientProfile.lastName
                              ?.charAt(0)
                              .toUpperCase()}
                        </AvatarFallback>
                     </Avatar>
                     <div className='overflow-hidden'>
                        <ScrollText
                           text={`${row.original.clientProfile.firstName} ${row.original.clientProfile.lastName || ''}`}
                        />
                        <ScrollText
                           text={row.original.clientProfile.phoneNumber}
                           className='text-xs text-[var(--gray)]'
                        />
                     </div>
                  </div>
               </HoverCardContent>
            </HoverCard>
         ),
      },

      // quantity
      {
         id: 'quantity',
         header: translate('quantity'),
         cell: ({ row }) => (
            <div className='text-xl'>
               {row.original.quantity.toString().padStart(3, '0')}
            </div>
         ),
      },

      // price
      {
         id: 'price',
         header: translate('price'),
         cell: ({ row }) => (
            <div className='text-left'>
               <div>{unitConvert(row.original.priceAtTime)} Ar</div>
               <div className='-space-y-1'>
                  <div className='text-xs text-[var(--gray)]'>
                     {translate('total_price')} :
                  </div>
                  <div>
                     {unitConvert(
                        row.original.priceAtTime * row.original.quantity,
                     )}{' '}
                     Ar
                  </div>
               </div>
            </div>
         ),
      },

      // status
      {
         id: 'order_status',
         header: translate('order_status'),
         cell: ({ row }) => (
            <div
               className='p-2 rounded-md max-w-30'
               style={{
                  backgroundColor: `var(--${MartOrderStatusTypeColor[row.original.orderStatus]}-secondary)`,
                  color: `var(--${MartOrderStatusTypeColor[row.original.orderStatus]})`,
               }}
            >
               <ScrollText
                  text={translate(row.original.orderStatus.toLowerCase())}
               />
            </div>
         ),
      },

      // item status
      {
         id: 'order_item_status',
         header: translate('order_item_status'),
         cell: ({ row }) => (
            <div
               className='p-2 rounded-md max-w-30'
               style={{
                  backgroundColor: `var(--${MartOrderItemStatusColor[row.original.martOrderItemStatus]}-secondary)`,
                  color: `var(--${MartOrderItemStatusColor[row.original.martOrderItemStatus]})`,
               }}
            >
               <ScrollText
                  text={translate(
                     row.original.martOrderItemStatus.toLowerCase(),
                  )}
               />
            </div>
         ),
      },

      // pickup driver
      {
         id: 'pickup_driver',
         header: translate('pickup_driver'),
         cell: ({ row }) =>
            row.original.driverPickedUp ? (
               <div className='p-2 cursor-pointer hover:bg-[var(--background-secondary)] flex gap-2 max-w-40 overflow-hidden items-center rounded-md'>
                  <Avatar className='size-9'>
                     <AvatarImage
                        src={row.original.driverPickedUp.profilePhoto}
                     />
                     <AvatarFallback>
                        {row.original.driverPickedUp.firstName
                           .charAt(0)
                           .toUpperCase()}
                        {row.original.driverPickedUp.lastName
                           ?.charAt(0)
                           .toUpperCase()}
                     </AvatarFallback>
                  </Avatar>
                  <div className='overflow-hidden text-left'>
                     <ScrollText
                        text={`${row.original.driverPickedUp.firstName} ${row.original.driverPickedUp.lastName || ''}`}
                     />
                     <ScrollText
                        text={row.original.driverPickedUp.phoneNumber}
                        className='text-xs text-[var(--gray)]'
                     />
                  </div>
               </div>
            ) : (
               <div className='text-[var(--gray)]'>
                  {translate('undefined')}
               </div>
            ),
      },

      // delivery
      {
         id: 'delivery_driver',
         header: translate('delivery_driver'),
         cell: ({ row }) =>
            row.original.driverDelivered ? (
               <div className='p-2 cursor-pointer hover:bg-[var(--background-secondary)] flex gap-2 max-w-40 overflow-hidden items-center rounded-md'>
                  <Avatar className='size-9'>
                     <AvatarImage
                        src={row.original.driverDelivered.profilePhoto}
                     />
                     <AvatarFallback>
                        {row.original.driverDelivered.firstName
                           .charAt(0)
                           .toUpperCase()}
                        {row.original.driverDelivered.lastName
                           ?.charAt(0)
                           .toUpperCase()}
                     </AvatarFallback>
                  </Avatar>
                  <div className='overflow-hidden text-left'>
                     <ScrollText
                        text={`${row.original.driverDelivered.firstName} ${row.original.driverDelivered.lastName || ''}`}
                     />
                     <ScrollText
                        text={row.original.driverDelivered.phoneNumber}
                        className='text-xs text-[var(--gray)]'
                     />
                  </div>
               </div>
            ) : (
               <div className='text-[var(--gray)]'>
                  {translate('undefined')}
               </div>
            ),
      },

      // action
      {
         id: 'action',
         cell: ({ row }) => (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <div className='p-2 hover:bg-[var(--background-secondary)] cursor-pointer rounded w-fil'>
                     <MoreVertical className='size-4' />
                  </div>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuItem
                     onClick={() =>
                        navigate({
                           to: '/app/mart/$martId',
                           params: {
                              martId: row.original.martItem.martProductId,
                           },
                        })
                     }
                  >
                     <Shirt /> {translate('show_product')}
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                     <DropdownMenuSubTrigger>
                        {translate('change_item_status')}
                     </DropdownMenuSubTrigger>
                     <DropdownMenuSubContent>
                        {[
                           MartOrderItemStatusType.CONFIRMED,
                           MartOrderItemStatusType.SOLD_OUT,
                        ].map((status) => (
                           <DropdownMenuItem
                              disabled={
                                 row.original.martOrderItemStatus === status
                              }
                              onClick={() => {
                                 setIsChangeMartOrderItemStatusOpen(true)
                                 setChangeMartOrderItemStatusData({
                                    martOrderItemId:
                                       row.original.martOrderItemId,
                                    oldMartOrderItemStatus:
                                       row.original.martOrderItemStatus,
                                    newMartOrderItemStatus:
                                       status as MartOrderItemStatusType,
                                 })
                              }}
                           >
                              {translate(status.toLowerCase())}
                           </DropdownMenuItem>
                        ))}
                     </DropdownMenuSubContent>
                  </DropdownMenuSub>
               </DropdownMenuContent>
            </DropdownMenu>
         ),
      },
   ]

   const table = useReactTable({
      data: orders?.data ?? [],
      columns,
      getCoreRowModel: getCoreRowModel(),
   })

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
      <>
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

            {/** Board */}
            {isSuccessProviderGetOrderItem ? (
               <div className='rounded-md border md:max-w-full m-auto'>
                  <Table>
                     <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                           <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                 return (
                                    <TableHead
                                       key={header.id}
                                       className='text-center'
                                    >
                                       {header.isPlaceholder
                                          ? null
                                          : flexRender(
                                               header.column.columnDef.header,
                                               header.getContext(),
                                            )}
                                    </TableHead>
                                 )
                              })}
                           </TableRow>
                        ))}
                     </TableHeader>
                     <TableBody>
                        {table.getRowModel().rows?.length ? (
                           table.getRowModel().rows.map((row) => (
                              <TableRow
                                 key={row.id}
                                 data-state={row.getIsSelected() && 'selected'}
                              >
                                 {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                       key={cell.id}
                                       className='text-center'
                                    >
                                       {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext(),
                                       )}
                                    </TableCell>
                                 ))}
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={columns.length}
                                 className='h-24 text-center'
                              >
                                 No results.
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </div>
            ) : (
               <>
                  {isPendingProviderGetOrderItem ? (
                     <div className='w-full h-full flex items-center justify-center'>
                        <ScaleLoader color='var(--green)' />
                     </div>
                  ) : (
                     <div className='w-full h-full'>
                        {orders?.data.length === 0 && (
                           <NotFoundComponent item={'Order'} />
                        )}
                     </div>
                  )}
               </>
            )}

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
         {isChangeMartOrderItemStatusOpen && changeMartOrderItemStatusData && (
            <ChangeMartOrderStatusItemModal
               isOpen={isChangeMartOrderItemStatusOpen}
               setIsOpen={setIsChangeMartOrderItemStatusOpen}
               martOrderItemId={changeMartOrderItemStatusData.martOrderItemId}
               oldMartOrderItemStatus={
                  changeMartOrderItemStatusData.oldMartOrderItemStatus
               }
               newMartOrderItemStatus={
                  changeMartOrderItemStatusData.newMartOrderItemStatus
               }
               refetchFn={refetchProviderGetOrderItem}
            />
         )}
      </>
   )
}
