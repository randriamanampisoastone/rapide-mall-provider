import {
   ChartContainer,
   ChartLegend,
   ChartLegendContent,
   ChartTooltip,
   type ChartConfig,
} from '@/components/ui/chart'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { format } from 'date-fns'
import langue from '@/data/language/app/mart/dashboard/MartSellChart.json'
import {
   Area,
   AreaChart,
   CartesianGrid,
   XAxis,
   type TooltipProps,
} from 'recharts'
import useTranslate from '@/hooks/useTranslate'
import type { GetProductSalesChartResponse } from '@/api/mart/dashboard/get.product.sales.chart.api'

interface MartSellChartPriceProps {
   data: GetProductSalesChartResponse
}

function MartSellChartPrice({ data }: MartSellChartPriceProps) {
   const translate = useTranslate(langue)

   const CustomTooltip = ({
      active,
      payload,
      label,
   }: TooltipProps<number, string>) => {
      if (!active || !payload || !payload.length) return null

      return (
         <div className='rounded-md bg-[var(--background)] p-2 shadow'>
            <div className='font-bold'>
               {format(new Date(label), 'dd MMM yyyy')}
            </div>
            {payload.map((entry, index) => (
               <div key={index} className='flex items-center gap-2'>
                  <span
                     className='h-2 w-2 rounded-full'
                     style={{ backgroundColor: entry.color }}
                  />
                  <span>
                     {entry.name ? translate(entry.name.toLowerCase()) : ''} :
                  </span>
                  <span>{entry.value ? unitConvert(entry.value) : '0'} Ar</span>
               </div>
            ))}
         </div>
      )
   }

   const chartConfig = {} satisfies ChartConfig

   return (
      <div className='p-2 bg-[var(--background-secondary)] rounded-md flex-1 flex flex-col items-center justify-center gap-2'>
         <p className='font-bold text-center text-2xl'>
            {translate('sell_amount')}
         </p>
         <ChartContainer
            config={chartConfig}
            className='aspect-auto h-[170px] w-full'
         >
            <AreaChart data={data.chartData}>
               <defs>
                  <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
                     <stop
                        offset='5%'
                        stopColor='var(--color-desktop)'
                        stopOpacity={0.8}
                     />
                     <stop
                        offset='95%'
                        stopColor='var(--color-desktop)'
                        stopOpacity={0.1}
                     />
                  </linearGradient>
                  <linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
                     <stop
                        offset='5%'
                        stopColor='var(--color-mobile)'
                        stopOpacity={0.8}
                     />
                     <stop
                        offset='95%'
                        stopColor='var(--color-mobile)'
                        stopOpacity={0.1}
                     />
                  </linearGradient>
               </defs>
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
               <ChartTooltip cursor={false} content={<CustomTooltip />} />
               <Area
                  dataKey='providerProfit'
                  type='natural'
                  fill='var(--green-secondary)'
                  stroke='var(--green)'
                  stackId='a'
               />
               <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
         </ChartContainer>
      </div>
   )
}

export default MartSellChartPrice
