import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
   type ColumnDef,
   type ColumnFiltersState,
   type SortingState,
   type VisibilityState,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'
import { useEffect, useMemo, useState } from 'react'
import PaymentMethodeIcon from '@/components/customComponents/PaymentMethodeIcon'
import type { PaymentMethode } from '@/enums/payment.methode'
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import langue from '@/data/language/app/finance/transactionsBoard/TransactionsBoard.json'
import useTranslate from '@/hooks/useTranslate'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import {
   useGetTransactionForBackOffice,
   type GetTransactionForBackOfficeProfileResponse,
   type GetTransactionForBackOfficeResponseData,
} from '@/api/transaction/get.transactions.for.back.office.api'
import { formatTimeDifference, type Lang } from '@/utils/formats/time.utils'
import { toast } from 'react-toastify'
import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from '@/components/ui/hover-card'
import { ScaleLoader } from 'react-spinners'
import {
   CalendarDays,
   ChevronDown,
   Clock4,
   Download,
   LucideSettings2,
   MoreHorizontal,
   Timer,
} from 'lucide-react'
import {
   TransactionStatusTypeColor,
   type TransactionStatusType,
} from '@/enums/transaction/transaction.status.enum'
import type { TransactionActionType } from '@/enums/transaction/transaction.action.enum'
import type { TransactionFlowType } from '@/enums/transaction/transaction.flow.enum'
import type { TransactionMethodType } from '@/enums/transaction/transaction.method.enum'
import { errorSound } from '@/utils/audio.player.util'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import TransactionDetails from './TransactionsDetails'
import TransactionFilters from './TransactionsFilters'
import SearchBar from '@/components/SearchBar'
import NotFoundComponent from '@/components/NotFoundComponent'
import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import exportFromJSON from 'export-from-json'
import { utcConvert } from '@/utils/utc.convert.util'

interface TransactionsBoardProps {
   customComponent?: React.ReactNode
   defaultTransactionAction?: TransactionActionType[]
   showAction?: boolean
   defaultTransactionFlow?: TransactionFlowType[]
   defaultTransactionMethod?: TransactionMethodType[]
   showServiceSelection?: boolean
}

function TransactionsBoard({
   customComponent,
   defaultTransactionMethod,
   showServiceSelection = false,
}: TransactionsBoardProps) {
   const translate = useTranslate(langue)
   const [sorting, setSorting] = useState<SortingState>([])
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
   const [rowSelection, setRowSelection] = useState({})
   const [transactionIdToShow, setTransactionIdToShow] = useState<string>('')
   const [isShowDetailOpen, setIsShowDetailOpen] = useState(false)

   const [selectedReference, setSelectedReference] = useState<string>('')
   const [selectedTransactionStatus, setSelectedTransactionStatus] = useState<
      TransactionStatusType[]
   >([])
   const [selectedTransactionMethod, setSelectedTransactionMethod] = useState<
      TransactionMethodType[]
   >(
      Array.isArray(defaultTransactionMethod)
         ? defaultTransactionMethod.map(
              (status) => status as TransactionMethodType,
           )
         : [],
   )
   const [selectedDateFrom, setSelectedDateFrom] = useState<Date>()
   const [selectedDateTo, setSelectedDateTo] = useState<Date>()

   const locale = useSelector((state: RootState) => state.language.locale)

   const [pageSetting, setPageSetting] = useState<{
      page: number
      pageSize: number
   }>({
      page: 1,
      pageSize: 10,
   })

   const {
      data: dataGetTransactionForBackOffice,
      isPending: isGetTransactionForBackOfficePending,
      isSuccess: isSuccessTransactionForBackOffice,
      isError: isErrorTransactionForBackOffice,
      error: errorTransactionForBackOffice,
      refetch: refetchTransactionForBackOffice,
   } = useGetTransactionForBackOffice({
      selectedReference: selectedReference
         ? parseInt(selectedReference)
         : undefined,
      selectedTransactionStatus,
      selectedTransactionMethod,
      selectedDate: {
         from: selectedDateFrom ? utcConvert(selectedDateFrom) : undefined,
         to: selectedDateTo ? utcConvert(selectedDateTo) : undefined,
      },
      page: pageSetting.page,
      pageSize: pageSetting.pageSize,
   })

   const maxPage = useMemo(
      () =>
         Math.ceil(
            (dataGetTransactionForBackOffice?.totalCount
               ? dataGetTransactionForBackOffice?.totalCount
               : 1) / pageSetting.pageSize,
         ),
      [dataGetTransactionForBackOffice, pageSetting.pageSize],
   )

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

   const columns: ColumnDef<GetTransactionForBackOfficeResponseData>[] = [
      {
         accessorKey: 'createdAt',
         header: translate('created_at'),
         cell: ({ row }) => {
            const createdAt = new Date(row.getValue('createdAt'))
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
      {
         accessorKey: 'reference',
         header: translate('reference'),
         cell: ({ row }) => (
            <HoverCard>
               <HoverCardTrigger asChild>
                  <Button
                     className='text-wrap line-clamp-1 cursor-pointer'
                     variant='link'
                     onClick={() => {
                        navigator.clipboard.writeText(
                           String(row.getValue('reference')).padStart(6, '0'),
                        )
                        toast.success(translate('copy'))
                     }}
                  >
                     {String(row.getValue('reference')).padStart(6, '0')}
                  </Button>
               </HoverCardTrigger>
               <HoverCardContent>{translate('copy')}</HoverCardContent>
            </HoverCard>
         ),
      },
      {
         accessorKey: 'senderProfile',
         header: translate('sender'),
         cell: ({ row }) => {
            const sender = row.original.transactionFlow.split('_TO_')[0]
            if (!row.getValue('senderProfile')) {
               return (
                  <div className='text-muted-foreground text-center'>
                     {sender
                        .toLowerCase()
                        .replace(/_/g, ' ')
                        .replace(/^\w|\s\w/g, (c) => c.toUpperCase())}
                  </div>
               )
            }

            const senderProfile: GetTransactionForBackOfficeProfileResponse =
               row.getValue<GetTransactionForBackOfficeProfileResponse>(
                  'senderProfile',
               )
            return (
               <HoverCard>
                  <HoverCardTrigger asChild>
                     <Button variant={'link'} className='cursor-pointer'>
                        {senderProfile.firstName}
                     </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className='flex items-center gap-2'>
                     <Avatar className='size-15'>
                        <AvatarImage src={senderProfile.phoneNumber} />
                        <AvatarFallback>
                           {senderProfile.firstName.charAt(0).toUpperCase()}
                           {senderProfile.lastName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                     </Avatar>
                     <div>
                        <p className='font-bold'>{senderProfile.firstName}</p>
                        <p className='font-bold text-xs text-muted-foreground'>
                           {senderProfile.lastName}
                        </p>
                        <p className='font-bold text-xs text-muted-foreground'>
                           {senderProfile.phoneNumber}
                        </p>
                     </div>
                  </HoverCardContent>
               </HoverCard>
            )
         },
      },
      {
         accessorKey: 'receiverProfile',
         header: translate('receiver'),
         cell: ({ row }) => {
            const receiver = row.original.transactionFlow.split('_TO_')[1]
            if (!row.getValue('receiverProfile')) {
               return (
                  <div className='text-muted-foreground text-center'>
                     {receiver
                        .toLowerCase()
                        .replace(/_/g, ' ')
                        .replace(/^\w|\s\w/g, (c) => c.toUpperCase())}
                  </div>
               )
            }

            const receiverProfile: GetTransactionForBackOfficeProfileResponse =
               row.getValue<GetTransactionForBackOfficeProfileResponse>(
                  'receiverProfile',
               )
            return (
               <HoverCard>
                  <HoverCardTrigger asChild>
                     <Button variant={'link'} className='cursor-pointer'>
                        {receiverProfile.firstName}
                     </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className='flex items-center gap-2'>
                     <Avatar className='size-15'>
                        <AvatarImage src={receiverProfile.phoneNumber} />
                        <AvatarFallback>
                           {receiverProfile.firstName.charAt(0).toUpperCase()}
                           {receiverProfile.lastName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                     </Avatar>
                     <div>
                        <p className='font-bold'>{receiverProfile.firstName}</p>
                        <p className='font-bold text-xs text-muted-foreground'>
                           {receiverProfile.lastName}
                        </p>
                        <p className='font-bold text-xs text-muted-foreground'>
                           {receiverProfile.phoneNumber}
                        </p>
                     </div>
                  </HoverCardContent>
               </HoverCard>
            )
         },
      },
      {
         accessorKey: 'transactionAction',
         header: translate('transaction_action'),
         cell: ({ row }) => (
            <div className='text-center rounded-md font-bold'>
               {translate(row.getValue('transactionAction'))}
            </div>
         ),
      },
      {
         accessorKey: 'transactionStatus',
         header: translate('status'),
         cell: ({ row }) => (
            <div
               className='text-center rounded-md font-bold p-2'
               style={{
                  backgroundColor: `var(--${TransactionStatusTypeColor[row.getValue('transactionStatus') as TransactionStatusType]}-secondary)`,
                  color: `var(--${TransactionStatusTypeColor[row.getValue('transactionStatus') as TransactionStatusType]})`,
               }}
            >
               {translate(String(row.getValue('transactionStatus')))}
            </div>
         ),
      },
      {
         header: translate('transaction_from'),
         id: 'transaction_from',
         cell: ({ row }) => {
            const methode = row.original.transactionMethod.split('_TO_')[0]
            const sender = row.original.transactionFlow.split('_TO_')[0]
            return (
               <div className='flex items-center gap-1'>
                  <PaymentMethodeIcon
                     paymentMethode={methode as PaymentMethode}
                     className='size-7 rounded text-[var(--green)] border p-1'
                  />
                  <span className='font-bold'>
                     {sender
                        .toLowerCase()
                        .replace(/_/g, ' ')
                        .replace(/^\w|\s\w/g, (c) => c.toUpperCase())}
                  </span>
               </div>
            )
         },
      },
      {
         header: translate('transaction_to'),
         id: 'transaction_to',
         cell: ({ row }) => {
            const methode = row.original.transactionMethod.split('_TO_')[1]
            const sender = row.original.transactionFlow.split('_TO_')[1]
            return (
               <div className='flex items-center gap-1'>
                  <PaymentMethodeIcon
                     paymentMethode={methode as PaymentMethode}
                     className='size-7 rounded text-[var(--green)] border p-1'
                  />
                  <span className='font-bold'>
                     {sender
                        .toLowerCase()
                        .replace(/_/g, ' ')
                        .replace(/^\w|\s\w/g, (c) => c.toUpperCase())}
                  </span>
               </div>
            )
         },
      },
      {
         accessorKey: 'amount',
         header: translate('amount'),
         cell: ({ row }) => (
            <div className=''>
               <p>{unitConvert(row.original.amount)} Ar</p>
               {row.original.fees
                  ? row.original.fees > 0 && (
                       <p>
                          <span className='text-xs text-[var(--green)] font-bold'>
                             {translate('fees')} :{' '}
                          </span>
                          {unitConvert(row.original.fees)} %
                       </p>
                    )
                  : ''}
            </div>
         ),
      },
      {
         accessorKey: 'total',
         header: translate('total'),
         cell: ({ row }) => (
            <span className=''>{unitConvert(row.getValue('total'))} Ar</span>
         ),
      },
      {
         id: 'actions',
         enableHiding: false,
         cell: ({ row }) => {
            const transaction = row.original

            return (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant='ghost' className='h-8 w-8 p-0'>
                        <MoreHorizontal />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                     <DropdownMenuLabel>
                        {translate('actions')}
                     </DropdownMenuLabel>
                     <DropdownMenuItem
                        onClick={() => {
                           navigator.clipboard.writeText(
                              String(transaction.reference).padStart(6, '0'),
                           )
                           toast.success(translate('copy'))
                        }}
                     >
                        {translate('copy_reference')}
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={() => {
                           setTransactionIdToShow(transaction.transactionId)
                           setIsShowDetailOpen(true)
                        }}
                     >
                        {translate('view_details')}
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            )
         },
      },
   ]

   const table = useReactTable({
      data: dataGetTransactionForBackOffice?.data || [],
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
      },
   })

   useEffect(() => {
      if (isErrorTransactionForBackOffice && errorTransactionForBackOffice) {
         toast.error(errorTransactionForBackOffice.message)
         errorSound.play()
      }
   }, [isErrorTransactionForBackOffice, errorTransactionForBackOffice])

   const transactionComponent = () => {
      return (
         <div className='flex gap-2'>
            {customComponent}

            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='ml-auto cursor-pointer'>
                     <LucideSettings2 /> {translate('view')} <ChevronDown />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align='end'>
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => {
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                 column.toggleVisibility(!!value)
                              }
                              className='cursor-pointer'
                           >
                              {translate(column.id.toLocaleLowerCase())}
                           </DropdownMenuCheckboxItem>
                        )
                     })}
               </DropdownMenuContent>
            </DropdownMenu>

            {isSuccessTransactionForBackOffice && (
               <Button
                  variant={'outline'}
                  onClick={handleDownloadFile}
                  className='cursor-pointer'
               >
                  <Download />
               </Button>
            )}
         </div>
      )
   }

   const handleDownloadFile = () => {
      const exportData = dataGetTransactionForBackOffice?.data.map((item) => {
         return {
            ['Created at']: new Date(
               item.createdAt.toLocaleString(getLocalDateFormat()),
            ),
            ['Rapide reference']: item.reference.toString().padStart(6, '0'),
            ['Sender name']: item.senderProfile
               ? item.senderProfile?.firstName +
                 ' ' +
                 (item.senderProfile?.lastName ?? '')
               : 'undefined',
            ['Sender phone number']: item.senderProfile
               ? "' " + item.senderProfile.phoneNumber + " '"
               : 'undefined',
            ['Receiver name']: item.receiverProfile
               ? item.receiverProfile.firstName +
                 ' ' +
                 (item.receiverProfile.lastName ?? '')
               : 'undefined',
            ['Receiver phone number']: item.receiverProfile
               ? "' " + item.receiverProfile.phoneNumber + " '"
               : 'undefined',
            ['Transaction payment methode from']:
               item.transactionMethod.split('_TO_')[0],
            ['Transaction payment methode to']:
               item.transactionMethod.split('_TO_')[1],
            ['Transaction flow from']: item.transactionFlow.split('_TO_')[0],
            ['Transaction flow to']: item.transactionFlow.split('_TO_')[1],
            ['Action']: item.transactionAction,
            ['Status']: item.transactionStatus,
            ['Amount (AR)']: item.amount,
            ['Fees (%)']: item.fees,
            ['Total (AR)']: item.total,
         }
      })
      exportFromJSON({
         data: exportData ?? [],
         fileName: `transactions-data-${Date.now()}`,
         exportType: 'xls',
      })
   }

   return (
      <div className='w-full'>
         {/** Head */}
         <SearchBar
            filterItems={[]}
            refetchFn={refetchTransactionForBackOffice}
            searchFilter={[]}
            setSearchFilter={() => {}}
            setSearchValue={setSelectedReference}
            totalCount={dataGetTransactionForBackOffice?.totalCount || 0}
            customComponent={transactionComponent()}
         />

         <div className='flex items-center justify-between'>
            <TransactionFilters
               selectedTransactionStatus={selectedTransactionStatus}
               setSelectedTransactionStatus={setSelectedTransactionStatus}
               selectedTransactionMethod={selectedTransactionMethod}
               setSelectedTransactionMethod={setSelectedTransactionMethod}
               selectedDateFrom={selectedDateFrom}
               setSelectedDateFrom={setSelectedDateFrom}
               selectedDateTo={selectedDateTo}
               setSelectedDateTo={setSelectedDateTo}
               showServiceSelection={showServiceSelection}
            />

            <div className='text-xl font-bold'>
               {isSuccessTransactionForBackOffice
                  ? unitConvert(dataGetTransactionForBackOffice.totalAmount)
                  : 0}{' '}
               Ar
            </div>
         </div>

         {isSuccessTransactionForBackOffice ? (
            <>
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
                                    <TableCell key={cell.id}>
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
                                 {translate('no_results')}
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </div>
               <div className='flex items-center justify-end space-x-2 py-4 gap-5 flex-wrap text-nowrap'>
                  <div className='flex-1 text-sm text-muted-foreground'>
                     {translate('page')} {pageSetting.page}/{maxPage}
                  </div>
                  <div className='flex items-center gap-3'>
                     <p>{translate('page_size')} :</p>
                     <Select
                        defaultValue={pageSetting.pageSize.toString()}
                        value={pageSetting.pageSize.toString()}
                        onValueChange={(value) => {
                           setPageSetting({
                              ...pageSetting,
                              pageSize: parseInt(value),
                           })
                        }}
                     >
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           {[10, 20, 30, 40, 50].map((pageSize) => (
                              <SelectItem
                                 key={pageSize}
                                 value={String(pageSize)}
                              >
                                 {pageSize}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className='space-x-2'>
                     <Button
                        variant='outline'
                        size='sm'
                        className='cursor-pointer'
                        onClick={() =>
                           setPageSetting({
                              ...pageSetting,
                              page:
                                 pageSetting.page > 1
                                    ? pageSetting.page - 1
                                    : 1,
                           })
                        }
                        disabled={pageSetting.page <= 1}
                     >
                        {translate('previous')}
                     </Button>
                     <Button
                        variant='outline'
                        size='sm'
                        className='cursor-pointer'
                        onClick={() =>
                           setPageSetting({
                              ...pageSetting,
                              page: dataGetTransactionForBackOffice.hasMore
                                 ? pageSetting.page + 1
                                 : pageSetting.page,
                           })
                        }
                        disabled={!dataGetTransactionForBackOffice.hasMore}
                     >
                        {translate('next')}
                     </Button>
                  </div>
               </div>
            </>
         ) : (
            <>
               {isGetTransactionForBackOfficePending ? (
                  <div className='w-full h-full flex items-center justify-center'>
                     <ScaleLoader color='var(--green)' />
                  </div>
               ) : (
                  <div className='w-full h-full'>
                     {dataGetTransactionForBackOffice?.data?.length === 0 && (
                        <NotFoundComponent item={'Transaction'} />
                     )}
                  </div>
               )}
            </>
         )}
         <TransactionDetails
            transactionIdToShow={transactionIdToShow}
            isShowDetailOpen={isShowDetailOpen}
            setIsShowDetailOpen={setIsShowDetailOpen}
         />
      </div>
   )
}

export default TransactionsBoard
