import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'

interface InputGroupProps {
   label: string
   id: string
   mode?: 'text' | 'textarea'
   value: string
   onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
   className?: string
   customComponentAfterLabel?: React.ReactNode
   customComponentBeforeLabel?: React.ReactNode
   rightSideLabel?: React.ReactNode
}

function InputGroup({
   label,
   id,
   mode = 'text',
   value,
   onChange,
   className,
   customComponentAfterLabel,
   customComponentBeforeLabel,
   rightSideLabel,
}: InputGroupProps) {
   const [isFocus, setIsFocus] = useState(false)
   return (
      <div className='relative mt-1'>
         {mode === 'text' && (
            <div className='flex'>
               <Input
                  id={id}
                  className={
                     cn(className, {
                        'rounded-r-none': rightSideLabel,
                     }) ?? ''
                  }
                  placeholder=' '
                  value={value}
                  onChange={onChange}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
               />

               {rightSideLabel && (
                  <div className='border bg-[var(--background-secondary)] flex items-center justify-center px-2 rounded-r-md'>
                     {rightSideLabel}
                  </div>
               )}
            </div>
         )}
         {mode === 'textarea' && (
            <Textarea
               id={id}
               className={className ?? ''}
               placeholder=' '
               value={value}
               onChange={onChange}
               onFocus={() => setIsFocus(true)}
               onBlur={() => setIsFocus(false)}
            />
         )}
         <label
            htmlFor={id}
            className={cn(
               'absolute flex items-center text-gray top-1 font-bold text-[var(--gray)] left-2 gap-1 duration-300 cursor-text max-w-[80%] overflow-hidden',
               {
                  '-top-2 text-[var(--foreground)] px-2 bg-[var(--background-secondary)] rounded-full text-xs':
                     isFocus || value,
               },
            )}
         >
            {customComponentBeforeLabel}
            <span className='line-clamp-1'>{label}</span>
            {customComponentAfterLabel}
         </label>
      </div>
   )
}

export default InputGroup
