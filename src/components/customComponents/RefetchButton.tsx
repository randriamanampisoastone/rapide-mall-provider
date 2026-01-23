import { RefreshCcw } from 'lucide-react'
import { Button } from '../ui/button'
import { useRef, useState, useEffect } from 'react'
import { HoverCard, HoverCardContent } from '../ui/hover-card'
import { HoverCardTrigger } from '@radix-ui/react-hover-card'
import langue from '@/data/language/customComponents/RefetchButton.json'
import useTranslate from '@/hooks/useTranslate'

interface RefetchButtonProps {
   refetchFn: () => void
}

function RefetchButton({ refetchFn }: RefetchButtonProps) {
   const translate = useTranslate(langue)

   const [animate, setAnimate] = useState(false)
   const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

   useEffect(() => {
      return () => {
         if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current)
         }
      }
   }, [])

   return (
      <HoverCard>
         <HoverCardTrigger asChild>
            <Button
               variant={'outline'}
               className='cursor-pointer hover:scale-95 duration-300'
               onClick={() => {
                  refetchFn()
                  setAnimate(true)
                  animationTimeoutRef.current = setTimeout(() => {
                     setAnimate(false)
                  }, 1000)
               }}
            >
               <RefreshCcw
                  style={{
                     animation: animate
                        ? 'rotation-animation 1s linear infinite'
                        : '',
                  }}
               />
            </Button>
         </HoverCardTrigger>
         <HoverCardContent className='font-bold text-center'>
            {translate('refresh')}
         </HoverCardContent>
      </HoverCard>
   )
}

export default RefetchButton
