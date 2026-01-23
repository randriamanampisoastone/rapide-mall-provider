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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CalendarIcon } from 'lucide-react'
import ScrollText from '../ScrollText'
import type { Matcher } from 'react-day-picker'

interface DateTimePickerInterface {
   date: Date | undefined
   setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
   disabledDate?: Matcher | Matcher[] | undefined
}

export function DateTimePicker({
   date,
   setDate,
   disabledDate,
}: DateTimePickerInterface) {
   const [isOpen, setIsOpen] = React.useState(false)

   // Heures en 24h (0 → 23)
   const hours = Array.from({ length: 24 }, (_, i) => i)

   const handleDateSelect = (selectedDate: Date | undefined) => {
      if (selectedDate) {
         setDate(selectedDate)
      }
   }

   const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
      if (date) {
         const newDate = new Date(date)
         if (type === 'hour') {
            newDate.setHours(parseInt(value))
         } else if (type === 'minute') {
            newDate.setMinutes(parseInt(value))
         }
         setDate(newDate)
      }
   }

   return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
         <PopoverTrigger asChild>
            <Button
               variant='outline'
               className={cn(
                  'w-full justify-start text-left font-normal cursor-pointer',
                  !date && 'text-muted-foreground',
               )}
            >
               <CalendarIcon className='mr-2 h-4 w-4' />
               {date ? (
                  <ScrollText text={format(date, 'MM/dd/yyyy HH:mm')} />
               ) : (
                  <ScrollText text={'MM/DD/YYYY HH:mm'} />
               )}
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-auto p-0'>
            <div className='sm:flex'>
               <Calendar
                  mode='single'
                  disabled={disabledDate}
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
               />
               <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
                  {/* Sélecteur des heures */}
                  <ScrollArea className='w-64 sm:w-auto'>
                     <div className='flex sm:flex-col p-2'>
                        {hours.map((hour) => (
                           <Button
                              key={hour}
                              size='icon'
                              variant={
                                 date && date.getHours() === hour
                                    ? 'default'
                                    : 'ghost'
                              }
                              className='sm:w-full shrink-0 aspect-square'
                              onClick={() =>
                                 handleTimeChange('hour', hour.toString())
                              }
                           >
                              {hour}
                           </Button>
                        ))}
                     </div>
                     <ScrollBar
                        orientation='horizontal'
                        className='sm:hidden'
                     />
                  </ScrollArea>

                  {/* Sélecteur des minutes */}
                  <ScrollArea className='w-64 sm:w-auto'>
                     <div className='flex sm:flex-col p-2'>
                        {Array.from({ length: 60 }, (_, i) => i).map(
                           (minute) => (
                              <Button
                                 key={minute}
                                 size='icon'
                                 variant={
                                    date && date.getMinutes() === minute
                                       ? 'default'
                                       : 'ghost'
                                 }
                                 className='sm:w-full shrink-0 aspect-square'
                                 onClick={() =>
                                    handleTimeChange(
                                       'minute',
                                       minute.toString(),
                                    )
                                 }
                              >
                                 {minute}
                              </Button>
                           ),
                        )}
                     </div>
                     <ScrollBar
                        orientation='horizontal'
                        className='sm:hidden'
                     />
                  </ScrollArea>
               </div>
            </div>
         </PopoverContent>
      </Popover>
   )
}
