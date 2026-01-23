import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function ImageViewer({
   isOpen,
   setIsOpen,
   firstName,
   lastName,
   profilePhoto,
}: {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
   firstName: string
   lastName?: string
   profilePhoto?: string
}) {
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

   const modal = (
      <div
         onClick={() => setIsOpen(false)}
         className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            animateIn ? 'opacity-100' : 'opacity-0'
         }`}
      >
         <div
            onClick={(e) => e.stopPropagation()}
            className={`flex  flex-col items-center bg-transparent  rounded-xl p-2 w-[90%] max-w-lg shadow-lg transform transition-transform duration-300 ${
               animateIn ? 'scale-100' : 'scale-95'
            }`}
         >
            <Avatar className='rounded-xl w-120 h-120'>
               <AvatarImage src={profilePhoto} />
               <AvatarFallback className='text-9xl'>
                  {firstName.charAt(0).toUpperCase()}
                  {lastName?.charAt(0).toUpperCase()}
               </AvatarFallback>
            </Avatar>
         </div>
      </div>
   )

   return createPortal(modal, document.body)
}
