import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function InputNumber({
   label,
   value,
   setValue,
}: {
   label: string
   value: number
   setValue: (data: number) => void
}) {
   return (
      <div>
         <label htmlFor='' className='font-bold'>
            {label}
         </label>
         <div className='flex gap-2'>
            <Button
               variant='outline'
               onClick={() => setValue(value - 1)}
               disabled={value === 0}
            >
               <Minus />
            </Button>
            <Input
               type='number'
               className='no-arrows'
               value={value}
               onChange={(e) => setValue(parseFloat(e.target.value))}
            />
            <Button variant='outline' onClick={() => setValue(value + 1)}>
               <Plus />
            </Button>
         </div>
      </div>
   )
}

export default InputNumber
