import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
   addDays,
   addMonths,
   endOfMonth,
   endOfWeek,
   format,
   isSameMonth,
   isSameDay,
   isWithinInterval,
   startOfMonth,
   startOfWeek,
   subMonths,
} from 'date-fns'
import {
   ChevronDown,
   ChevronLeft,
   ChevronRight,
   ChevronUp,
   CircleCheckBig,
} from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

/* ----------  UTILS  ---------- */
type Range = { from: Date; to: Date }

function groupContinuous(dates: Date[]): Range[] {
   if (!dates.length) return []
   const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime())
   const ranges: Range[] = []
   let from = sorted[0]
   let to = from
   for (let i = 1; i < sorted.length; i++) {
      if (+sorted[i] === +addDays(to, 1)) to = sorted[i]
      else {
         ranges.push({ from, to })
         from = sorted[i]
         to = from
      }
   }
   ranges.push({ from, to })
   return ranges
}

/* ----------  GRID  ---------- */
const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

function Grid({
   currentMonth,
   dates,
   onToggle,
   readOnly,
}: {
   currentMonth: Date
   dates: Date[]
   onToggle?: (d: Date) => void
   readOnly?: boolean
}) {
   const ranges = React.useMemo(() => groupContinuous(dates), [dates])

   const startMonth = startOfMonth(currentMonth)
   const endMonth = endOfMonth(currentMonth)
   const calendarStart = startOfWeek(startMonth, { weekStartsOn: 1 })
   const calendarEnd = endOfWeek(endMonth, { weekStartsOn: 1 })

   const days: Date[] = []
   for (let cur = calendarStart; cur <= calendarEnd; cur = addDays(cur, 1))
      days.push(cur)

   const isStart = (d: Date) => ranges.some((r) => isSameDay(d, r.from))
   const isEnd = (d: Date) => ranges.some((r) => isSameDay(d, r.to))
   const isMiddle = (d: Date) =>
      ranges.some(
         (r) =>
            !isSameDay(d, r.from) &&
            !isSameDay(d, r.to) &&
            isWithinInterval(d, { start: r.from, end: r.to }),
      )

   return (
      <div className='grid grid-cols-7 gap-0 text-center text-sm'>
         {/* headers */}
         {weekDays.map((head) => (
            <div key={head} className='pb-2 font-medium text-muted-foreground'>
               {head}
            </div>
         ))}

         {/* days */}
         {days.map((d) => {
            const outside = !isSameMonth(d, currentMonth)
            return (
               <button
                  key={d.toISOString()}
                  type='button'
                  onClick={() => !readOnly && onToggle?.(d)}
                  disabled={readOnly}
                  className={[
                     'flex items-center justify-center w-10 h-10 transition',
                     'hover:bg-accent rounded-none',
                     !readOnly && 'cursor-pointer',
                     readOnly && 'cursor-default',
                     outside && 'text-muted-foreground opacity-50',
                     isMiddle(d) &&
                        'bg-primary text-primary-foreground border-y border-[var(--background)]',
                     isStart(d) &&
                        'bg-primary text-primary-foreground rounded-l-md border-y border-l border-[var(--background)]',
                     isEnd(d) &&
                        'bg-primary text-primary-foreground rounded-r-md border-y border-r border-[var(--background)]',
                  ]
                     .filter(Boolean)
                     .join(' ')}
               >
                  {format(d, 'd')}
               </button>
            )
         })}
      </div>
   )
}

/* ----------  MAIN COMPONENT  ---------- */
export interface CustomCalendarProps {
   dates: Date[]
   setDates?: React.Dispatch<React.SetStateAction<Date[]>>
   readOnly?: boolean
   monthsDisplayed?: number // ← new
}

function CustomCalendar({
   dates,
   setDates,
   readOnly = false,
   monthsDisplayed = 1,
}: CustomCalendarProps) {
   const [month, setMonth] = React.useState(new Date()) // mois de gauche
   const [yearsOffset, setYearsOffset] = React.useState(0)

   const toggle = (d: Date) => {
      if (readOnly || !setDates) return
      setDates((prev) =>
         prev.some((x) => isSameDay(x, d))
            ? prev.filter((x) => !isSameDay(x, d))
            : [...prev, d].sort((a, b) => a.getTime() - b.getTime()),
      )
   }

   // Liste des mois à afficher
   const months = React.useMemo(
      () =>
         Array.from({ length: monthsDisplayed }, (_, i) => addMonths(month, i)),
      [month, monthsDisplayed],
   )

   return (
      <div>
         {/* Navigation */}
         <div className='flex items-center justify-between mb-3 gap-2'>
            <Button
               variant='ghost'
               size='icon'
               onClick={() => setMonth((m) => subMonths(m, 1))}
            >
               <ChevronLeft />
            </Button>

            <div className='flex items-center gap-2'>
               <Popover>
                  <PopoverTrigger asChild>
                     <Button variant={'outline'}>
                        {format(new Date(2000, month.getMonth(), 1), 'MMMM')}
                        <ChevronDown />
                     </Button>
                  </PopoverTrigger>

                  <PopoverContent className='max-h-40 overflow-auto w-45 p-1'>
                     {Array.from({ length: 12 }).map((_, i) => (
                        <div
                           key={i}
                           onClick={() =>
                              setMonth(
                                 new Date(month.getFullYear(), Number(i), 1),
                              )
                           }
                           className='cursor-pointer p-1 rounded-md hover:bg-[var(--background-secondary)] font-bold flex items-center'
                        >
                           <div className='w-6'>
                              {month.getMonth() === i && (
                                 <CircleCheckBig className='size-4' />
                              )}
                           </div>
                           <div>{format(new Date(2000, i, 1), 'MMMM')}</div>
                        </div>
                     ))}
                  </PopoverContent>
               </Popover>

               <Popover>
                  <PopoverTrigger asChild>
                     <Button variant='outline'>
                        {month.getFullYear()} <ChevronDown />
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent className='max-h-40 overflow-auto w-25 p-1'>
                     <Button
                        variant={'outline'}
                        className='cursor-pointer w-full'
                        onClick={() => setYearsOffset(yearsOffset - 10)}
                     >
                        <ChevronUp />
                     </Button>
                     {Array.from(
                        { length: 15 },
                        (_, i) => new Date().getFullYear() - i,
                     ).reverse().map((y) => (
                        <div
                           key={y + yearsOffset}
                           onClick={() =>
                              setMonth(
                                 (m) =>
                                    new Date(y + yearsOffset, m.getMonth(), 1),
                              )
                           }
                           className='cursor-pointer p-1 rounded-md hover:bg-[var(--background-secondary)] font-bold flex justify-between items-center'
                        >
                           <div>
                              {month.getFullYear() === y + yearsOffset && (
                                 <CircleCheckBig className='size-4' />
                              )}
                           </div>
                           <div>{y + yearsOffset}</div>
                        </div>
                     ))}
                     <Button
                        variant={'outline'}
                        className='cursor-pointer w-full'
                        onClick={() => setYearsOffset(yearsOffset + 10)}
                     >
                        <ChevronDown />
                     </Button>
                  </PopoverContent>
               </Popover>
            </div>

            <Button
               variant='ghost'
               size='icon'
               onClick={() => setMonth((m) => addMonths(m, 1))}
            >
               <ChevronRight />
            </Button>
         </div>

         {/* Mois affichés côte-à-côte */}
         <div
            className='flex justify-between gap-6 flex-wrap'
            style={{ gridTemplateColumns: `repeat(${monthsDisplayed}, 1fr)` }}
         >
            {months.map((m) => (
               <div
                  key={m.toISOString()}
                  className='flex-1 min-w-[200px] flex flex-col items-center justify-center'
               >
                  {/* TITRE du mois uniquement si plusieurs calendriers */}
                  {monthsDisplayed > 1 && (
                     <div className='text-center font-semibold mb-2'>
                        {format(m, 'MMMM yyyy')}
                     </div>
                  )}
                  <Grid
                     currentMonth={m}
                     dates={dates}
                     onToggle={toggle}
                     readOnly={readOnly}
                  />
               </div>
            ))}
         </div>
      </div>
   )
}

export default CustomCalendar
