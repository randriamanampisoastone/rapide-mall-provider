import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function useMediaQuery(query: string): boolean {
   const [matches, setMatches] = useState(false)
   useEffect(() => {
      const media = window.matchMedia(query)
      if (media.matches !== matches) setMatches(media.matches)
      const listener = () => setMatches(media.matches)
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
   }, [matches, query])
   return matches
}

export function ResponsiveDialog({
   children,
   isOpen,
   setIsOpen,
   title,
   isDisableCloseOnClickOutside = false,
   closeOnBlur = true,
}: {
   children: React.ReactNode
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
   title: string
   isDisableCloseOnClickOutside?: boolean
   closeOnBlur?: boolean
}) {
   const isDesktop = useMediaQuery('(min-width: 768px)')

   const [shouldRender, setShouldRender] = useState(false)
   const [animateIn, setAnimateIn] = useState(false)

   useEffect(() => {
      if (isOpen) {
         setShouldRender(true)
         requestAnimationFrame(() => {
            setAnimateIn(true)
         })
      } else {
         setAnimateIn(false)
         const timeout = setTimeout(() => setShouldRender(false), 300)
         return () => clearTimeout(timeout)
      }
   }, [isOpen])

   const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
   }

   useEffect(() => {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
   }, [])

   if (!shouldRender) return null

   const drawer = (
      <div
         onClick={() => {
            if (closeOnBlur) setIsOpen(false)
         }}
         className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end transition-opacity duration-300 ${
            animateIn ? 'opacity-100' : 'opacity-0'
         }`}
      >
         <div
            onClick={(e) => e.stopPropagation()}
            className={`flex flex-col items-center bg-white dark:bg-neutral-900 w-full rounded-t-2xl p-6 shadow-lg max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
               animateIn ? 'translate-y-0' : 'translate-y-full'
            }`}
         >
            <h2 className='text-lg font-semibold'>{title}</h2>

            <div className='mt-4'>{children}</div>
         </div>
      </div>
   )

   const modal = (
      <div
         onClick={() => {
            if (!isDisableCloseOnClickOutside && closeOnBlur) setIsOpen(false)
         }}
         className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            animateIn ? 'opacity-100' : 'opacity-0'
         }`}
      >
         <div
            onClick={(e) => e.stopPropagation()}
            className={`flex  flex-col items-center bg-white dark:bg-neutral-900 rounded-xl p-6 w-[90%] max-w-md shadow-lg transform transition-transform duration-300 ${
               animateIn ? 'scale-100' : 'scale-95'
            }`}
         >
            <h2 className='text-lg font-semibold'>{title}</h2>

            <div className='flex flex-col w-full mt-4'>{children}</div>
         </div>
      </div>
   )

   return createPortal(isDesktop ? modal : drawer, document.body)
}
