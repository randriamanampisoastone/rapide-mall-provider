import { useEffect, useState } from 'react'

interface TextWriteAnimationProps {
   texts: string[]
   className?: string
}

function TextWriteAnimation({ texts, className }: TextWriteAnimationProps) {
   const [currentText, setCurrentText] = useState('')
   const [isDeleting, setIsDeleting] = useState(false)
   const [textIndex, setTextIndex] = useState(0)

   useEffect(() => {
      const fullText = texts[textIndex]
      let timeout: NodeJS.Timeout

      if (!isDeleting && currentText.length < fullText.length) {
         // Typing phase
         timeout = setTimeout(() => {
            setCurrentText(fullText.slice(0, currentText.length + 1))
         }, 100)
      } else if (!isDeleting && currentText.length >= fullText.length) {
         // Pause before deleting
         timeout = setTimeout(() => {
            setIsDeleting(true)
         }, 1000)
      } else if (isDeleting && currentText.length > 0) {
         // Deleting phase
         timeout = setTimeout(() => {
            setCurrentText(fullText.slice(0, currentText.length - 1))
         }, 50)
      } else if (isDeleting && currentText.length === 0) {
         // Finished deleting, move to next text
         timeout = setTimeout(() => {
            setIsDeleting(false)
            setTextIndex((prev) => (prev + 1) % texts.length)
         }, 500)
      }

      return () => clearTimeout(timeout)
   }, [currentText, isDeleting, texts, textIndex])

   return <div className={className || ''}>{currentText}</div>
}

export default TextWriteAnimation
