import { useGetProductSalesChart } from '@/api/mart/dashboard/get.product.sales.chart.api'
import BestProduct from '@/components/app/mart/dashboard/BestProduct'
import LastCommand from '@/components/app/mart/dashboard/LastOrders'
import MartSellChartPrice from '@/components/app/mart/dashboard/MartSellChartPrice'
import MartSellCountChart from '@/components/app/mart/dashboard/MartSellCountChart'
import ScrollText from '@/components/ScrollText'
import { Button } from '@/components/ui/button'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarClock, CircleX } from 'lucide-react'
import { useState } from 'react'
import { ScaleLoader } from 'react-spinners'
import langue from '@/data/language/app/mart/dashboard/index.json'
import useTranslate from '@/hooks/useTranslate'
import { DateTimePicker } from '@/components/customComponents/DateTimePicker'
import { utcConvert } from '@/utils/utc.convert.util'
import { MartOrderStatusType } from '@/enums/mart/mart.order.status.enum'
import { MultiSelect } from '@/components/MultiSelect'
import { useGetProviderIncomes } from '@/api/mart/dashboard/get.provider.incomes.api'

export const Route = createFileRoute('/app/mart/')({
   component: RouteComponent,
})

function RouteComponent() {
   const translate = useTranslate(langue)
   const [selectedDateFrom, setSelectedDateFrom] = useState<Date | undefined>(
      undefined,
   )
   const [selectedDateTo, setSelectedDateTo] = useState<Date | undefined>(
      undefined,
   )
   const [martOrderStatus, setMartOrderStatus] = useState<
      MartOrderStatusType[]
   >([])

   const {
      data: dateGetProviderIncome,
      isSuccess: isSuccessGetProviderIncomes,
   } = useGetProviderIncomes()

   const {
      data: dataGetProductSalesChart,
      isSuccess: isSuccessGetProductSalesChart,
   } = useGetProductSalesChart({
      selectedDateFrom: selectedDateFrom
         ? utcConvert(selectedDateFrom)
         : undefined,
      selectedDateTo: selectedDateTo ? utcConvert(selectedDateTo) : undefined,
      martOrderStatus,
   })

   const filterProductSales = () => {
      return (
         <>
            <Popover>
               <PopoverTrigger asChild>
                  <Button
                     variant={'outline'}
                     className='relative cursor-pointer'
                  >
                     <CalendarClock /> {translate('created_at')}
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

            <MultiSelect
               options={Object.values(MartOrderStatusType).map((status) => ({
                  value: status,
                  label: translate(status.toLowerCase()),
               }))}
               onValueChange={(val) => {
                  setMartOrderStatus(val as MartOrderStatusType[])
               }}
               defaultValue={martOrderStatus}
               placeholder={translate('select_mart_order_status')}
               all_placeholder={translate('select_all')}
               search_placeholder={translate('search')}
               variant='secondary'
               maxCount={2}
               className='w-fit'
            />
         </>
      )
   }

   return (
      <div className='flex not-lg:flex-col gap-4'>
         <div className='space-y-4 flex-1 flex flex-col lg:max-h-[calc(100vh-90px)] overflow-auto scrollbar-none'>
            {isSuccessGetProviderIncomes && (
               <div className='flex flex-wrap gap-4 relative z-10'>
                  <div className='p-5 bg-[var(--background-secondary)] rounded-md flex-1 min-w-50 flex flex-col justify-center'>
                     <ScrollText
                        text={translate('total_income')}
                        className='text-xl font-bold'
                     ></ScrollText>
                     <p className='text-3xl font-extrabold'>
                        {unitConvert(dateGetProviderIncome.total)} Ar
                     </p>
                  </div>
                  <div className='p-5 bg-[var(--background-secondary)] rounded-md flex-1 min-w-50'>
                     <div className='grid grid-cols-2 gap-2'>
                        <div className='border-l-2 border-[var(--blue)] px-2'>
                           <p className='font-bold'>{translate('daily')}</p>
                           <p className='text-xs'>
                              {unitConvert(dateGetProviderIncome.daily)} Ar
                           </p>
                        </div>
                        <div className='border-l-2 border-[var(--blue)] px-2'>
                           <p className='font-bold'>{translate('weekly')}</p>
                           <p className='text-xs'>
                              {unitConvert(dateGetProviderIncome.weekly)} Ar
                           </p>
                        </div>
                        <div className='border-l-2 border-[var(--blue)] px-2'>
                           <p className='font-bold'>{translate('monthly')}</p>
                           <p className='text-xs'>
                              {unitConvert(dateGetProviderIncome.monthly)} Ar
                           </p>
                        </div>
                        <div className='border-l-2 border-[var(--blue)] px-2'>
                           <p className='font-bold'>{translate('yearly')}</p>
                           <p className='text-xs'>
                              {unitConvert(dateGetProviderIncome.yearly)} Ar
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {isSuccessGetProductSalesChart ? (
               <div className='space-y-2'>
                  <div className='flex gap-2 items-center'>
                     {filterProductSales()}
                  </div>
                  <MartSellCountChart data={dataGetProductSalesChart} />
                  <MartSellChartPrice data={dataGetProductSalesChart} />
               </div>
            ) : (
               <div className='p-4 bg-[var(--background-secondary)] rounded-md'>
                  <ScaleLoader color='var(--green)' />
               </div>
            )}
         </div>

         <div className='lg:w-1/3 flex lg:flex-col not-lg:flex-wrap gap-4 lg:max-h-[calc(100vh-90px)] overflow-auto scrollbar-none'>
            <BestProduct />
            <LastCommand />
         </div>
      </div>
   )
}
