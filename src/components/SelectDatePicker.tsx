import { format } from 'date-fns'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CalendarDays } from 'lucide-react'
import ScrollText from './ScrollText'
import type { DateRange } from 'react-day-picker'

interface DateRangePickerProps {
   selectedDate: DateRange
   setSelectedDate: React.Dispatch<React.SetStateAction<DateRange>>
   onChange?: (value: DateRange) => void
   from: string
   to: string
}

export default function DateRangePicker({
   selectedDate,
   setSelectedDate,
   onChange,
   from,
   to,
}: DateRangePickerProps) {
   const today = new Date()

   const handleChange = (newValue: DateRange) => {
      setSelectedDate(newValue)
      onChange?.(newValue)
   }

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant='outline'>
               <CalendarDays />
               {selectedDate && (
                  <div className='font-bold flex items-center gap-1'>
                     <ScrollText
                        text={
                           (selectedDate.from
                              ? format(selectedDate.from, 'dd MMM yyyy HH:mm')
                              : '') +
                           (selectedDate.to
                              ? ' - ' +
                                format(selectedDate.to, 'dd MMM yyyy HH:mm')
                              : '')
                        }
                        className='max-w-25'
                     />
                  </div>
               )}
            </Button>
         </PopoverTrigger>

         <PopoverContent className='w-fit p-2 grid grid-cols-2 font-bold gap-2'>
            {/* From DateTime */}
            <div>
               <label>{from} :</label>
               <Input
                  type='datetime-local'
                  value={
                     selectedDate.from
                        ? selectedDate.from.toISOString().slice(0, 16)
                        : new Date(today.setDate(today.getDate() - 7))
                             .toISOString()
                             .slice(0, 16)
                  }
                  onChange={(e) => {
                     handleChange({
                        from: e.target.value
                           ? new Date(e.target.value)
                           : undefined,
                        to: selectedDate.to,
                     })
                  }}
               />
            </div>

            {/* To DateTime */}
            <div>
               <label>{to} :</label>
               <Input
                  type='datetime-local'
                  value={
                     selectedDate.to
                        ? selectedDate.to.toISOString().slice(0, 16)
                        : new Date().toISOString().slice(0, 16)
                  }
                  onChange={(e) => {
                     handleChange({
                        to: e.target.value
                           ? new Date(e.target.value)
                           : undefined,
                        from: selectedDate.from,
                     })
                  }}
               />
            </div>
         </PopoverContent>
      </Popover>
   )
}
