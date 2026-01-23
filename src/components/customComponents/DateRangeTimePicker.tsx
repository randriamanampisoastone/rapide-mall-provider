import * as React from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarIcon } from 'lucide-react'
import type { DateRange, Matcher } from 'react-day-picker'
import ScrollText from '../ScrollText'

interface DateRangeTimePickerInterface {
   date: DateRange | undefined
   setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
   disabled?: Matcher | Matcher[] | undefined
   label?: string
}

export function DateRangeTimePicker({
   date,
   setDate,
   disabled,
   label,
}: DateRangeTimePickerInterface) {
   const [isOpen, setIsOpen] = React.useState(false)

   // Heures en 24h (0 → 23)
   const hours = Array.from({ length: 24 }, (_, i) => i)

   const handleDateSelect = (selectedDate: DateRange | undefined) => {
      setDate(selectedDate)
   }

   const handleTimeChange = (
      type: 'hour' | 'minute',
      value: string,
      target: 'from' | 'to',
   ) => {
      if (date?.[target]) {
         const newDate = new Date(date[target]!)
         if (type === 'hour') {
            newDate.setHours(parseInt(value))
         } else if (type === 'minute') {
            newDate.setMinutes(parseInt(value))
         }
         setDate({ ...date, [target]: newDate })
      }
   }

   return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
         <PopoverTrigger asChild>
            <Button
               variant='outline'
               className={cn(
                  ' justify-start text-left font-normal ',
                  !date && 'text-muted-foreground',
               )}
            >
               <CalendarIcon className='mr-2 h-4 w-4' />
               {label === undefined && date?.from ? (
                  date.to ? (
                     <ScrollText
                        text={
                           format(date.from, 'MM/dd/yyyy HH:mm') +
                           ' - ' +
                           format(date.to, 'MM/dd/yyyy HH:mm')
                        }
                        className='max-w-35 sm:max-w-none'
                     />
                  ) : (
                     format(date.from, 'MM/dd/yyyy HH:mm')
                  )
               ) : (
                  label === undefined && (
                     <span>MM/DD/YYYY HH:mm – MM/DD/YYYY HH:mm</span>
                  )
               )}

               {label && <span className='ml-auto'>{label}</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-auto p-0'>
            <div className='flex sm:flex-row flex-col'>
               {/* FROM */}
               <div className='flex flex-col items-center border-r p-2'>
                  <span className='text-center font-semibold py-1'>From</span>
                  <div className='flex flex-row gap-1'>
                     <ScrollArea className='w-16 h-80'>
                        {/* Heures */}
                        <div className='flex flex-col'>
                           {hours.map((hour) => (
                              <Button
                                 key={hour}
                                 size='sm'
                                 variant={
                                    date?.from && date.from.getHours() === hour
                                       ? 'default'
                                       : 'ghost'
                                 }
                                 className='w-full'
                                 onClick={() =>
                                    handleTimeChange(
                                       'hour',
                                       hour.toString(),
                                       'from',
                                    )
                                 }
                              >
                                 {hour.toString().padStart(2, '0')}
                              </Button>
                           ))}
                        </div>
                     </ScrollArea>

                     {/* Minutes */}
                     <ScrollArea className='w-16 h-80'>
                        <div className='flex flex-col'>
                           {Array.from({ length: 60 }, (_, i) => i).map(
                              (minute) => (
                                 <Button
                                    key={minute}
                                    size='sm'
                                    variant={
                                       date?.from?.getMinutes() === minute
                                          ? 'default'
                                          : 'ghost'
                                    }
                                    className='w-full'
                                    onClick={() =>
                                       handleTimeChange(
                                          'minute',
                                          minute.toString(),
                                          'from',
                                       )
                                    }
                                 >
                                    {minute.toString().padStart(2, '0')}
                                 </Button>
                              ),
                           )}
                        </div>
                     </ScrollArea>
                  </div>
               </div>

               {/* CALENDRIER AU CENTRE */}
               <div className='p-2 border-r'>
                  <Calendar
                     mode='range'
                     selected={date}
                     onSelect={handleDateSelect}
                     disabled={disabled}
                     initialFocus
                  />
               </div>

               {/* TO */}
               <div className='flex flex-col items-center p-2'>
                  <span className='text-center font-semibold py-1'>To</span>
                  <div className='flex flex-row gap-1'>
                     {/* Heures */}
                     <ScrollArea className='w-16 h-80'>
                        <div className='flex flex-col'>
                           {hours.map((hour) => (
                              <Button
                                 key={hour}
                                 size='sm'
                                 variant={
                                    date?.to && date.to.getHours() === hour
                                       ? 'default'
                                       : 'ghost'
                                 }
                                 className='w-full'
                                 onClick={() =>
                                    handleTimeChange(
                                       'hour',
                                       hour.toString(),
                                       'to',
                                    )
                                 }
                              >
                                 {hour.toString().padStart(2, '0')}
                              </Button>
                           ))}
                        </div>
                     </ScrollArea>

                     {/* Minutes */}
                     <ScrollArea className='w-16 h-80'>
                        <div className='flex flex-col'>
                           {Array.from({ length: 60 }, (_, i) => i).map(
                              (minute) => (
                                 <Button
                                    key={minute}
                                    size='sm'
                                    variant={
                                       date?.to?.getMinutes() === minute
                                          ? 'default'
                                          : 'ghost'
                                    }
                                    className='w-full'
                                    onClick={() =>
                                       handleTimeChange(
                                          'minute',
                                          minute.toString(),
                                          'to',
                                       )
                                    }
                                 >
                                    {minute.toString().padStart(2, '0')}
                                 </Button>
                              ),
                           )}
                        </div>
                     </ScrollArea>
                  </div>
               </div>
            </div>
         </PopoverContent>
      </Popover>
   )
}
