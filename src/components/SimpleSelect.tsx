import * as React from 'react'
import { CheckIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command'

interface SimpleSelectProps {
   options: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
   }[]
   value: string | null
   onValueChange: (value: string) => void
   placeholder?: string
   search_placeholder?: string
   className?: string
   disabled?: boolean
}

export const SimpleSelect = ({
   options,
   value,
   onValueChange,
   placeholder = 'Select option',
   search_placeholder = 'Search...',
   className,
   disabled = false,
}: SimpleSelectProps) => {
   const [open, setOpen] = React.useState(false)

   const selectedOption = options.find((o) => o.value === value)

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               disabled={disabled}
               role='combobox'
               aria-expanded={open}
               className={cn(
                  'flex w-full justify-between items-center p-2 border rounded-md bg-inherit hover:bg-inherit text-sm text-[var(--foreground)]',
                  className,
               )}
            >
               {selectedOption ? (
                  <div className='flex items-center gap-2'>
                     {selectedOption.icon && (
                        <selectedOption.icon className='w-4 h-4 text-muted-foreground' />
                     )}
                     {selectedOption.label}
                  </div>
               ) : (
                  <span className='text-muted-foreground'>{placeholder}</span>
               )}
               <ChevronDown className='h-4 w-4 text-muted-foreground' />
            </Button>
         </PopoverTrigger>
         <PopoverContent className='p-0 w-[--radix-popover-trigger-width] min-w-[200px]'>
            <Command>
               <CommandInput placeholder={search_placeholder} />
               <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                     {options.map((option) => {
                        const isSelected = option.value === value
                        return (
                           <CommandItem
                              key={option.value}
                              onSelect={() => {
                                 onValueChange(option.value)
                                 setOpen(false)
                              }}
                              className='cursor-pointer'
                           >
                              <div className='flex items-center gap-2'>
                                 <div
                                    className={cn(
                                       'h-4 w-4 rounded-sm border flex items-center justify-center',
                                       isSelected
                                          ? 'bg-primary text-primary-foreground'
                                          : 'border-muted-foreground/30',
                                    )}
                                 >
                                    {isSelected && (
                                       <CheckIcon className='w-4 h-4' />
                                    )}
                                 </div>
                                 {option.icon && (
                                    <option.icon className='w-4 h-4 text-muted-foreground' />
                                 )}
                                 {option.label}
                              </div>
                           </CommandItem>
                        )
                     })}
                  </CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   )
}
