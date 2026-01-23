import { Label, Pie, PieChart } from 'recharts'
import {
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
   type ChartConfig,
} from '../ui/chart'

interface Props {
   total: number
   chartData: GenderChartDataInterface[]
   genderFor: 'clients' | 'drivers' | 'admins'
}
import langue from '@/data/language/customComponents/GenderComponentChart.json'
import useTranslate from '@/hooks/useTranslate'
import type { GenderChartDataInterface } from '@/interfaces/customComponent/gender.chart.data.interface'

function GenderComponentChart({ total, chartData, genderFor }: Props) {
   const translate = useTranslate(langue)

   const chartConfig = {
      men: {
         label: translate('men'),
         color: 'hsl(var(--sky-blue))',
      },
      women: {
         label: translate('women'),
         color: 'hsl(var(--rose))',
      },
      other: {
         label: translate('others'),
         color: 'hsl(var(--gray))',
      },
   } satisfies ChartConfig

   return (
      <div className='flex col-span-12 xl:col-span-4 2xl:col-span-4 flex-col items-center justify-center h-72 rounded-lg bg-[var(--background-secondary)] gap-2 p-4'>
         <h1 className='text-2xl font-bold'>{translate('gender')}</h1>

         <div className='flex justify-around w-full'>
            <div className='flex flex-col w-3/4 justify-center gap-2.5'>
               <div className='flex items-center gap-2'>
                  <div className='w-3.5 h-3.5 rounded-[5px] bg-[var(--green)]' />
                  <p className='text-sm font-bold text-[var(--green)]'>
                     {translate('all')} : {total}
                  </p>
               </div>
               <div className='flex items-center gap-2'>
                  <div className='w-3.5 h-3.5 rounded-[5px] bg-[var(--sky-blue)]' />
                  <p className='text-sm'>
                     {translate('men')} :{' '}
                     {total > 0
                        ? ((chartData[0].users / total) * 100).toFixed(2)
                        : '0.00'}{' '}
                     %
                  </p>
               </div>
               <div className='flex items-center gap-2'>
                  <div className='w-3.5 h-3.5 rounded-[5px] bg-[var(--rose)]' />
                  <p className='text-sm'>
                     {translate('women')} :{' '}
                     {total > 0
                        ? ((chartData[1].users / total) * 100).toFixed(2)
                        : '0.00'}{' '}
                     %
                  </p>
               </div>
               <div className='flex items-center gap-2'>
                  <div className='w-3.5 h-3.5 rounded-[5px] bg-[var(--gray)]' />
                  <p className='text-sm'>
                     {translate('others')} :{' '}
                     {total > 0
                        ? ((chartData[2].users / total) * 100).toFixed(2)
                        : '0.00'}{' '}
                     %
                  </p>
               </div>
            </div>

            <ChartContainer
               config={chartConfig}
               className='mx-auto aspect-square h-[200px] w-[200px] '
            >
               <PieChart>
                  <ChartTooltip
                     cursor={false}
                     content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                     data={chartData}
                     dataKey='users'
                     nameKey='gender'
                     innerRadius={50}
                     strokeWidth={8}
                  >
                     <Label
                        content={({ viewBox }) => {
                           if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                              return (
                                 <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor='middle'
                                    dominantBaseline='middle'
                                 >
                                    <tspan
                                       x={viewBox.cx}
                                       y={viewBox.cy}
                                       className='fill-foreground text-2xl font-bold'
                                    >
                                       {total.toLocaleString()}
                                    </tspan>
                                    <tspan
                                       x={viewBox.cx}
                                       y={(viewBox.cy || 0) + 24}
                                       className='fill-muted-foreground'
                                    >
                                       {translate(genderFor)}
                                    </tspan>
                                 </text>
                              )
                           }
                        }}
                     />
                  </Pie>
               </PieChart>
            </ChartContainer>
         </div>
      </div>
   )
}

export default GenderComponentChart
