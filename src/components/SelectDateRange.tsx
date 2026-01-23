import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Popover } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarFold, CircleX } from 'lucide-react'
import type { DateRange, Matcher } from 'react-day-picker'

interface SelectDateRangeProps {
   selectedDate: DateRange | undefined
   setSelectedDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
   disabledBefore?: Matcher | Matcher[]
   textLabel?: string
}

function SelectDateRange({
   selectedDate,
   setSelectedDate,
   disabledBefore,
   textLabel,
}: SelectDateRangeProps) {
   function toUTCDateOnly(date: Date): Date {
      return new Date(
         Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
      )
   }
   return (
      <div className='flex items-center gap-1'>
         <Popover>
            <PopoverTrigger className='flex'>
               <Button
                  variant='outline'
                  className={cn('flex items-center cursor-pointer gap-2', {
                     'rounded-r-none':
                        selectedDate &&
                        (selectedDate?.from || selectedDate?.to),
                  })}
               >
                  <CalendarFold className='cursor-pointer hover:scale-90 duration-300' />
                  {selectedDate && selectedDate.from && (
                     <div className='text-xs px-2 py-1 border rounded-md'>
                        {format(selectedDate.from, 'dd MMMM yyyy')}
                     </div>
                  )}
                  {selectedDate && selectedDate.to && (
                     <>
                        {' - '}
                        <div className='text-xs px-2 py-1 border rounded-md'>
                           {format(selectedDate.to, 'dd MMMM yyyy')}
                        </div>
                     </>
                  )}
                  {!selectedDate?.from && !selectedDate?.to && textLabel && (
                     <label className='text-muted-foreground'>{textLabel}</label>
                  )}
               </Button>
               {selectedDate && (selectedDate?.from || selectedDate?.to) && (
                  <Button
                     variant={'outline'}
                     className='rounded-l-none'
                     onClick={() =>
                        setSelectedDate({ from: undefined, to: undefined })
                     }
                  >
                     <CircleX />
                  </Button>
               )}
            </PopoverTrigger>
            <PopoverContent>
               <Calendar
                  mode='range'
                  selected={selectedDate}
                  disabled={disabledBefore}
                  onSelect={(range) => {
                     if (!range) return

                     const fromUTC = range.from
                        ? toUTCDateOnly(range.from)
                        : undefined
                     const toUTC = range.to
                        ? toUTCDateOnly(range.to)
                        : undefined

                     setSelectedDate({
                        from: fromUTC,
                        to: toUTC,
                     })
                  }}
               />
            </PopoverContent>
         </Popover>
      </div>
   )
}

export default SelectDateRange
