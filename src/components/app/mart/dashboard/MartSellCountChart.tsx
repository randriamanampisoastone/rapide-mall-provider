import type { GetProductSalesChartResponse } from '@/api/mart/dashboard/get.product.sales.chart.api'
import {
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
   type ChartConfig,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import langue from '@/data/language/app/mart/dashboard/MartSellChart.json'
import useTranslate from '@/hooks/useTranslate'

interface MartSellCountChartProps {
   data: GetProductSalesChartResponse
}

function MartSellCountChart({ data }: MartSellCountChartProps) {
   const translate = useTranslate(langue)
   const chartConfig = {} satisfies ChartConfig

   return (
      <div className='p-2 bg-[var(--background-secondary)] rounded-md flex-1 flex flex-col items-center justify-center gap-2'>
         <p className='font-bold text-center text-2xl'>
            {translate('item_sell_quantity')}:{' '}
            <span className='text-[var(--gray)]'>( {data.totalQuantity} )</span>
         </p>
         <ChartContainer
            config={chartConfig}
            className='aspect-auto h-[170px] w-full'
         >
            <BarChart
               accessibilityLayer
               data={data.chartData}
               margin={{
                  left: 12,
                  right: 12,
               }}
            >
               <CartesianGrid vertical={false} />
               <XAxis
                  dataKey='date'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                     const date = new Date(value)
                     return date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                     })
                  }}
               />
               <ChartTooltip
                  content={
                     <ChartTooltipContent
                        className='w-[150px]'
                        nameKey='views'
                        labelFormatter={(value) => {
                           return new Date(value).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                           })
                        }}
                     />
                  }
               />
               <Bar dataKey={'quantity'} fill={`var(--blue)`} />
            </BarChart>
         </ChartContainer>
      </div>
   )
}

export default MartSellCountChart
