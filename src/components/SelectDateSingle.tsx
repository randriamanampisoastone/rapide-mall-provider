import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Popover } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarFold, CircleX } from 'lucide-react'
import type { Matcher } from 'react-day-picker'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from './ui/select'
import { useMemo } from 'react'
import ScrollText from './ScrollText'

interface SelectDateProps {
   selectedDate: Date | undefined
   setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
   disabledBefore?: Matcher | Matcher[]
   fromHour: number | undefined
   toHour: number | undefined
   fromMinute: number | undefined
   toMinute: number | undefined
   setFromHour: React.Dispatch<React.SetStateAction<number | undefined>>
   setToHour: React.Dispatch<React.SetStateAction<number | undefined>>
   setFromMinute: React.Dispatch<React.SetStateAction<number | undefined>>
   setToMinute: React.Dispatch<React.SetStateAction<number | undefined>>
   textLabel?: string
   onChangeDateTimeRange?: (range: { start: Date; end: Date }) => void
   fromLabel?: string
   toLabel?: string
}

function SelectDate({
   selectedDate,
   fromHour,
   toHour,
   fromMinute,
   toMinute,
   setFromHour,
   setToHour,
   setFromMinute,
   setToMinute,
   setSelectedDate,
   disabledBefore,
   textLabel,
   onChangeDateTimeRange,
   fromLabel = 'From',
   toLabel = 'To',
}: SelectDateProps) {
   const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), [])
   const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), [])
   const pad2 = (n: number) => n.toString().padStart(2, '0')

   // construit la plage et notifie le parent
   function updateRange(
      baseDate: Date | undefined,
      fh = fromHour,
      fm = fromMinute,
      th = toHour,
      tm = toMinute,
   ) {
      if (
         !baseDate ||
         fh === undefined ||
         fm === undefined ||
         th === undefined ||
         tm === undefined
      )
         return

      const start = new Date(baseDate)
      start.setHours(fh, fm, 0, 0)

      const end = new Date(baseDate)
      end.setHours(th, tm, 0, 0)

      // auto correction : si end < start → end = start +30min
      if (end < start) {
         end.setTime(start.getTime() + 30 * 60 * 1000)
      }

      setSelectedDate(start)
      onChangeDateTimeRange?.({ start, end })
   }

   // texte affiché
   const buttonText =
      selectedDate &&
      fromHour !== undefined &&
      fromMinute !== undefined &&
      toHour !== undefined &&
      toMinute !== undefined
         ? `${format(selectedDate, 'dd MMMM yyyy')} • ${pad2(fromHour)}:${pad2(fromMinute)} → ${pad2(toHour)}:${pad2(toMinute)}`
         : selectedDate
           ? format(selectedDate, 'dd MMMM yyyy')
           : textLabel || 'Select date & time range'

   const clearAll = () => {
      setSelectedDate(undefined)
      setFromHour(undefined)
      setFromMinute(undefined)
      setToHour(undefined)
      setToMinute(undefined)
   }

   return (
      <div className='flex items-center gap-1'>
         <Popover>
            <PopoverTrigger className='flex'>
               <Button
                  variant='outline'
                  className={cn(
                     'flex items-center cursor-pointer gap-2 font-bold',
                     {
                        'rounded-r-none': selectedDate,
                     },
                  )}
               >
                  <CalendarFold className='cursor-pointer hover:scale-90 duration-300' />
                  <ScrollText
                     text={buttonText}
                     className='text-xs px-2 py-1 border rounded-md max-w-15'
                  />
               </Button>
               {selectedDate && (
                  <Button
                     variant='outline'
                     className='rounded-l-none'
                     onClick={clearAll}
                  >
                     <CircleX />
                  </Button>
               )}
            </PopoverTrigger>

            <PopoverContent className='w-full flex flex-col items-center'>
               {/* Date */}
               <Calendar
                  mode='single'
                  selected={selectedDate}
                  disabled={disabledBefore}
                  onSelect={(date) => {
                     if (!date) return
                     const d = new Date(
                        Date.UTC(
                           date.getFullYear(),
                           date.getMonth(),
                           date.getDate(),
                        ),
                     )
                     setSelectedDate(d)
                     updateRange(d)
                  }}
               />

               {/* Time Range */}
               <div className='mt-3 grid grid-cols-2 gap-3'>
                  {/* From */}
                  <div className='space-y-2'>
                     <div className='text-xs font-medium text-muted-foreground'>
                        {fromLabel}
                     </div>
                     <div className='flex gap-2'>
                        <Select
                           value={fromHour?.toString()}
                           onValueChange={(v) => {
                              const h = Number(v)
                              setFromHour(h)
                              updateRange(
                                 selectedDate,
                                 h,
                                 fromMinute,
                                 toHour,
                                 toMinute,
                              )
                           }}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder='HH' />
                           </SelectTrigger>
                           <SelectContent className='max-h-60'>
                              {hours.map((h) => (
                                 <SelectItem key={`fh-${h}`} value={String(h)}>
                                    {pad2(h)}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>

                        <Select
                           value={fromMinute?.toString()}
                           onValueChange={(v) => {
                              const m = Number(v)
                              setFromMinute(m)
                              updateRange(
                                 selectedDate,
                                 fromHour,
                                 m,
                                 toHour,
                                 toMinute,
                              )
                           }}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder='MM' />
                           </SelectTrigger>
                           <SelectContent className='max-h-60'>
                              {minutes.map((m) => (
                                 <SelectItem key={`fm-${m}`} value={String(m)}>
                                    {pad2(m)}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </div>

                  {/* To */}
                  <div className='space-y-2'>
                     <div className='text-xs font-medium text-muted-foreground'>
                        {toLabel}
                     </div>
                     <div className='flex gap-2'>
                        <Select
                           value={toHour?.toString()}
                           onValueChange={(v) => {
                              const h = Number(v)
                              setToHour(h)
                              updateRange(
                                 selectedDate,
                                 fromHour,
                                 fromMinute,
                                 h,
                                 toMinute,
                              )
                           }}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder='HH' />
                           </SelectTrigger>
                           <SelectContent className='max-h-60'>
                              {hours.map((h) => (
                                 <SelectItem key={`th-${h}`} value={String(h)}>
                                    {pad2(h)}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>

                        <Select
                           value={toMinute?.toString()}
                           onValueChange={(v) => {
                              const m = Number(v)
                              setToMinute(m)
                              updateRange(
                                 selectedDate,
                                 fromHour,
                                 fromMinute,
                                 toHour,
                                 m,
                              )
                           }}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder='MM' />
                           </SelectTrigger>
                           <SelectContent className='max-h-60'>
                              {minutes.map((m) => (
                                 <SelectItem key={`tm-${m}`} value={String(m)}>
                                    {pad2(m)}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
               </div>
            </PopoverContent>
         </Popover>
      </div>
   )
}

export default SelectDate
