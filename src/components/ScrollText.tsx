import { useEffect, useRef, useState } from 'react'

interface ScrollTextProps {
   text: string
   className?: string
}

function ScrollText({ text, className = '' }: ScrollTextProps) {
   const [index, setIndex] = useState(0)
   const [isPaused, setIsPaused] = useState(false)
   const [shouldAnimate, setShouldAnimate] = useState(false)

   const textRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      // Vérifier si le texte dépasse le conteneur
      const el = textRef.current
      if (el && el.scrollWidth > el.offsetWidth) {
         setShouldAnimate(true)
      } else {
         setShouldAnimate(false)
      }
   }, [text])

   useEffect(() => {
      if (!shouldAnimate) return

      if (isPaused) {
         const pauseTimeout = setTimeout(() => setIsPaused(false), 1000)
         return () => clearTimeout(pauseTimeout)
      }

      const interval = setInterval(() => {
         setIndex((prevIndex) => {
            const nextIndex = prevIndex + 1
            if (nextIndex >= text.length + 1) {
               setIsPaused(true)
               return 0
            }
            return nextIndex
         })
      }, 100)

      return () => clearInterval(interval)
   }, [isPaused, shouldAnimate, text])

   return (
      <div
         ref={textRef}
         className={`whitespace-nowrap overflow-hidden w-full ${className}`}
      >
         {shouldAnimate
            ? (text + ' ').slice(index) + (text + ' ').slice(0, index)
            : text}
      </div>
   )
}

export default ScrollText
