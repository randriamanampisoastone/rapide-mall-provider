import { GripVerticalIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface CustomSliderProps {
   value: number
   setValue: React.Dispatch<React.SetStateAction<number>>
}

function CustomSlider({ value, setValue }: CustomSliderProps) {
   const [isDragging, setIsDragging] = useState(false)
   const sliderRef = useRef<HTMLDivElement>(null)

   const updateValue = (clientX: number) => {
      if (sliderRef.current) {
         const rect = sliderRef.current.getBoundingClientRect()
         const x = clientX - rect.left
         const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100))
         setValue(Math.round(percentage))
      }
   }

   const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true)
      updateValue(e.clientX)
   }

   const handleTouchStart = (e: React.TouchEvent) => {
      setIsDragging(true)
      updateValue(e.touches[0].clientX)
   }

   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         if (isDragging) {
            updateValue(e.clientX)
         }
      }

      const handleTouchMove = (e: TouchEvent) => {
         if (isDragging) {
            e.preventDefault() // Empêche le scroll pendant le drag
            updateValue(e.touches[0].clientX)
         }
      }

      const handleEnd = () => {
         setIsDragging(false)
      }

      if (isDragging) {
         document.addEventListener('mousemove', handleMouseMove)
         document.addEventListener('mouseup', handleEnd)
         document.addEventListener('touchmove', handleTouchMove, {
            passive: false,
         })
         document.addEventListener('touchend', handleEnd)
      }

      return () => {
         document.removeEventListener('mousemove', handleMouseMove)
         document.removeEventListener('mouseup', handleEnd)
         document.removeEventListener('touchmove', handleTouchMove)
         document.removeEventListener('touchend', handleEnd)
      }
   }, [isDragging])

   return (
      <div
         ref={sliderRef}
         onMouseDown={handleMouseDown}
         onTouchStart={handleTouchStart}
         className='relative h-9 rounded-md border overflow-hidden flex cursor-grab touch-none'
      >
         <div
            className='bg-[var(--blue)] h-full rounded flex items-center justify-end'
            style={{ width: `${value}%` }}
         >
            <GripVerticalIcon className='opacity-15' />
         </div>
         <div className='absolute z-10 w-full h-full flex items-center justify-center font-bold cursor-grab select-none'>
            {value} %
         </div>
      </div>
   )
}

export default CustomSlider
