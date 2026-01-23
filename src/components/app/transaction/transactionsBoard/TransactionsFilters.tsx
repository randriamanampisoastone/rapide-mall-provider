import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import {
   CalendarClock,
   ChevronsRight,
   CircleX,
   SlidersHorizontal,
} from 'lucide-react'
import React from 'react'
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io'
import langue from '@/data/language/app/finance/transactionsBoard/TransactionsFilters.json'
import useTranslate from '@/hooks/useTranslate'
import { TransactionStatusType } from '@/enums/transaction/transaction.status.enum'
import { TransactionMethodType } from '@/enums/transaction/transaction.method.enum'
import { DateTimePicker } from '@/components/customComponents/DateTimePicker'

interface TransactionFiltersProps {
   selectedTransactionStatus: TransactionStatusType[]
   setSelectedTransactionStatus: React.Dispatch<
      React.SetStateAction<TransactionStatusType[]>
   >

   selectedTransactionMethod: TransactionMethodType[]
   setSelectedTransactionMethod: React.Dispatch<
      React.SetStateAction<TransactionMethodType[]>
   >

   selectedDateFrom: Date | undefined
   setSelectedDateFrom: React.Dispatch<React.SetStateAction<Date | undefined>>

   selectedDateTo: Date | undefined
   setSelectedDateTo: React.Dispatch<React.SetStateAction<Date | undefined>>

   showServiceSelection?: boolean
}

function TransactionFilters({
   selectedTransactionStatus,
   setSelectedTransactionStatus,
   selectedTransactionMethod,
   setSelectedTransactionMethod,
   selectedDateFrom,
   setSelectedDateFrom,
   selectedDateTo,
   setSelectedDateTo,
}: TransactionFiltersProps) {
   const translate = useTranslate(langue)

   const filter = () => (
      <>
         {/** Transaction status */}
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant={'outline'} className='cursor-pointer'>
                  <div className='flex items-center gap-2'>
                     <IoMdAddCircleOutline /> <span>{translate('status')}</span>
                  </div>
                  <div>
                     {selectedTransactionStatus.length < 3 ? (
                        <div className='flex items-center gap-1'>
                           {selectedTransactionStatus.map((value) => (
                              <div
                                 key={value}
                                 className='border rounded-md px-3'
                              >
                                 {translate(value)}
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div className='border rounded-md px-3'>
                           {selectedTransactionStatus.length}{' '}
                           {translate('selected')}
                        </div>
                     )}
                  </div>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
               {Object.values(TransactionStatusType).map((status) => (
                  <DropdownMenuCheckboxItem
                     key={status}
                     checked={selectedTransactionStatus.includes(status)}
                     onCheckedChange={(checked) =>
                        setSelectedTransactionStatus((prev) =>
                           checked
                              ? [...prev, status]
                              : prev.filter((item) => item !== status),
                        )
                     }
                     className='cursor-pointer'
                  >
                     {translate(status)}
                  </DropdownMenuCheckboxItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>

         {/** Transation method */}
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant={'outline'} className='cursor-pointer'>
                  <div className='flex items-center gap-2'>
                     <IoMdAddCircleOutline />{' '}
                     <span>{translate('transactionmethod')}</span>
                  </div>
                  {selectedTransactionMethod.length > 0 && (
                     <div className='border rounded-md px-3'>
                        {selectedTransactionMethod.length}{' '}
                        {translate('selected')}
                     </div>
                  )}
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
               {Object.values(TransactionMethodType).map((methode) => {
                  const [from, to] = methode.split('_TO_')
                  return (
                     <DropdownMenuCheckboxItem
                        key={methode}
                        checked={selectedTransactionMethod.includes(methode)}
                        onCheckedChange={(checked) =>
                           setSelectedTransactionMethod((prev) =>
                              checked
                                 ? [...prev, methode]
                                 : prev.filter((item) => item !== methode),
                           )
                        }
                        className='cursor-pointer'
                     >
                        {translate(from.toLowerCase())}{' '}
                        <ChevronsRight size={20} />{' '}
                        {translate(to.toLowerCase())}
                     </DropdownMenuCheckboxItem>
                  )
               })}
            </DropdownMenuContent>
         </DropdownMenu>

         {/** Created at */}
         <Popover>
            <PopoverTrigger asChild>
               <Button variant={'outline'} className='relative cursor-pointer'>
                  <CalendarClock /> {translate('createdat')}
                  {(selectedDateFrom || selectedDateTo) && (
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
                           date={selectedDateFrom}
                           setDate={setSelectedDateFrom}
                        />
                     </div>
                     <Button
                        variant={'outline'}
                        onClick={() => setSelectedDateFrom(undefined)}
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
                           date={selectedDateTo}
                           setDate={setSelectedDateTo}
                        />
                     </div>
                     <Button
                        variant={'outline'}
                        onClick={() => setSelectedDateTo(undefined)}
                        className='cursor-pointer'
                     >
                        <CircleX />
                     </Button>
                  </div>
               </div>
            </PopoverContent>
         </Popover>

         {/** Reset */}
         {(selectedDateFrom ||
            selectedDateTo ||
            selectedTransactionStatus.length !== 0 ||
            selectedTransactionMethod.length !== 0) && (
            <Button
               variant={'outline'}
               onClick={() => {
                  setSelectedDateFrom(undefined)
                  setSelectedDateTo(undefined)
                  setSelectedTransactionStatus([])
                  setSelectedTransactionMethod([])
               }}
            >
               <IoMdCloseCircleOutline /> {translate('reset')}
            </Button>
         )}
      </>
   )

   return (
      <div>
         {/** Filter */}
         <div className='py-2 flex items-center gap-2 flex-wrap not-lg:hidden'>
            {filter()}
         </div>

         <div className='lg:hidden mb-1'>
            <Popover>
               <PopoverTrigger asChild>
                  <Button variant='outline'>
                     <SlidersHorizontal />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className='flex items-center gap-2 flex-wrap'>
                  {filter()}
               </PopoverContent>
            </Popover>
         </div>
      </div>
   )
}

export default TransactionFilters
