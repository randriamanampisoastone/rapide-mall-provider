import React, { useState, useRef, useEffect } from 'react'
import { Upload, X, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import langue from '@/data/language/app/mart/AddProductImage.json'
import useTranslate from '@/hooks/useTranslate'
import { ScaleLoader } from 'react-spinners'
import { ImageViewer } from '@/components/ImageViewer'
import { useUploadMartProduct } from '@/api/mart/upload/upload.mart.product.api'

interface ImageData {
   file?: File
   preview: string
}

interface CurrentImage {
   src: string
   name: string
   img: HTMLImageElement
   originalFile: File
}

interface CropArea {
   x: number
   y: number
   size: number
}

interface DragStart {
   x: number
   y: number
}

type ResizeCorner = 'tl' | 'tr' | 'bl' | 'br' | false

interface AddProductImageProps {
   files: string[]
   setFiles: React.Dispatch<React.SetStateAction<string[]>>
}

export default function AddProductImage({
   files,
   setFiles,
}: AddProductImageProps) {
   const translate = useTranslate(langue)
   const [images, setImages] = useState<ImageData[]>([])
   const [currentImage, setCurrentImage] = useState<CurrentImage | null>(null)
   const [cropMode, setCropMode] = useState<boolean>(false)
   const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, size: 200 })
   const [isDragging, setIsDragging] = useState<boolean>(false)
   const [isResizing, setIsResizing] = useState<ResizeCorner>(false)
   const [dragStart, setDragStart] = useState<DragStart>({ x: 0, y: 0 })
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const fileInputRef = useRef<HTMLInputElement>(null)
   const [currentIndex, setCurrentIndex] = useState<number>(0)
   const [imageUrlToSee, setImageUrlToSee] = useState<string>('')

   // Upload file
   const {
      mutate: mutateUploadMartProduct,
      isPending: isPendingUploadMartProduct,
      isSuccess: isSuccessUploadMartProduct,
      data: dataUploadMartProduct,
   } = useUploadMartProduct()

   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0]
      if (!file) return

      if (file.type.startsWith('image/')) {
         const reader = new FileReader()
         reader.onload = (event: ProgressEvent<FileReader>) => {
            const img = new Image()
            img.onload = () => {
               setCurrentImage({
                  src: event.target?.result as string,
                  name: file.name,
                  img: img,
                  originalFile: file,
               })
               setCropMode(true)
               // Initialiser la zone de crop au centre
               const size = Math.min(img.width, img.height) * 0.8
               setCropArea({
                  x: (img.width - size) / 2,
                  y: (img.height - size) / 2,
                  size: size,
               })
            }
            img.src = event.target?.result as string
         }
         reader.readAsDataURL(file)
      }
      // Reset input pour permettre de sélectionner le même fichier
      e.target.value = ''
   }

   useEffect(() => {
      if (isSuccessUploadMartProduct) {
         setFiles((prev) => [...prev, dataUploadMartProduct])
      }
   }, [isSuccessUploadMartProduct])

   useEffect(() => {
      if (cropMode && currentImage && canvasRef.current) {
         drawCanvas()
      }
   }, [cropMode, currentImage, cropArea])

   useEffect(() => {
      if (files) {
         setImages(
            files.map((value) => ({
               file: typeof value === 'string' ? undefined : value,
               preview:
                  typeof value === 'string'
                     ? value
                     : URL.createObjectURL(value),
            })),
         )
      }
   }, [files])

   const drawCanvas = (): void => {
      const canvas = canvasRef.current
      if (!canvas || !currentImage) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const img = currentImage.img

      // Ajuster la taille du canvas pour l'affichage
      const maxWidth = 500
      const maxHeight = 400
      let scale = 1

      if (img.width > maxWidth || img.height > maxHeight) {
         scale = Math.min(maxWidth / img.width, maxHeight / img.height)
      }

      canvas.width = img.width * scale
      canvas.height = img.height * scale

      // Dessiner l'image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Assombrir tout sauf la zone de crop
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Effacer la zone de crop (carré)
      ctx.clearRect(
         cropArea.x * scale,
         cropArea.y * scale,
         cropArea.size * scale,
         cropArea.size * scale,
      )

      // Redessiner l'image dans la zone de crop
      ctx.drawImage(
         img,
         cropArea.x,
         cropArea.y,
         cropArea.size,
         cropArea.size,
         cropArea.x * scale,
         cropArea.y * scale,
         cropArea.size * scale,
         cropArea.size * scale,
      )

      // Dessiner le cadre de sélection
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.strokeRect(
         cropArea.x * scale,
         cropArea.y * scale,
         cropArea.size * scale,
         cropArea.size * scale,
      )

      // Dessiner les poignées de redimensionnement aux 4 coins
      const handleSize = 12
      ctx.fillStyle = '#3b82f6'

      // Coin supérieur gauche
      ctx.fillRect(
         cropArea.x * scale - handleSize / 2,
         cropArea.y * scale - handleSize / 2,
         handleSize,
         handleSize,
      )

      // Coin supérieur droit
      ctx.fillRect(
         (cropArea.x + cropArea.size) * scale - handleSize / 2,
         cropArea.y * scale - handleSize / 2,
         handleSize,
         handleSize,
      )

      // Coin inférieur gauche
      ctx.fillRect(
         cropArea.x * scale - handleSize / 2,
         (cropArea.y + cropArea.size) * scale - handleSize / 2,
         handleSize,
         handleSize,
      )

      // Coin inférieur droit
      ctx.fillRect(
         (cropArea.x + cropArea.size) * scale - handleSize / 2,
         (cropArea.y + cropArea.size) * scale - handleSize / 2,
         handleSize,
         handleSize,
      )
   }

   // Fonction pour gérer les événements tactiles et souris
   const getCoordinates = (
      e:
         | React.MouseEvent<HTMLCanvasElement>
         | React.TouchEvent<HTMLCanvasElement>,
   ): { x: number; y: number } => {
      const canvas = canvasRef.current
      if (!canvas || !currentImage) return { x: 0, y: 0 }

      const rect = canvas.getBoundingClientRect()
      const scale = currentImage.img.width / canvas.width

      let clientX: number, clientY: number

      if ('touches' in e) {
         // Événement tactile
         const touch = e.touches[0] || e.changedTouches[0]
         clientX = touch.clientX
         clientY = touch.clientY
      } else {
         // Événement souris
         clientX = e.clientX
         clientY = e.clientY
      }

      const x = (clientX - rect.left) * scale
      const y = (clientY - rect.top) * scale

      return { x, y }
   }

   const handleStart = (
      e:
         | React.MouseEvent<HTMLCanvasElement>
         | React.TouchEvent<HTMLCanvasElement>,
   ): void => {
      e.preventDefault()
      const { x, y } = getCoordinates(e)
      const handleSize = 12

      // Vérifier si le clic/touch est sur une poignée de redimensionnement
      const corners: Array<{ x: number; y: number; corner: ResizeCorner }> = [
         { x: cropArea.x, y: cropArea.y, corner: 'tl' },
         { x: cropArea.x + cropArea.size, y: cropArea.y, corner: 'tr' },
         { x: cropArea.x, y: cropArea.y + cropArea.size, corner: 'bl' },
         {
            x: cropArea.x + cropArea.size,
            y: cropArea.y + cropArea.size,
            corner: 'br',
         },
      ]

      for (const corner of corners) {
         if (
            Math.abs(x - corner.x) < handleSize * 2 &&
            Math.abs(y - corner.y) < handleSize * 2
         ) {
            setIsResizing(corner.corner)
            return
         }
      }

      // Vérifier si le clic/touch est dans la zone de crop pour déplacement
      if (
         x >= cropArea.x &&
         x <= cropArea.x + cropArea.size &&
         y >= cropArea.y &&
         y <= cropArea.y + cropArea.size
      ) {
         setIsDragging(true)
         setDragStart({ x: x - cropArea.x, y: y - cropArea.y })
      }
   }

   const handleMove = (
      e:
         | React.MouseEvent<HTMLCanvasElement>
         | React.TouchEvent<HTMLCanvasElement>,
   ): void => {
      e.preventDefault()
      if (!currentImage) return

      const { x, y } = getCoordinates(e)

      if (isResizing) {
         const minSize = 50
         let newSize = cropArea.size
         let newX = cropArea.x
         let newY = cropArea.y

         if (isResizing === 'br') {
            newSize = Math.max(
               minSize,
               Math.min(x - cropArea.x, y - cropArea.y),
            )
         } else if (isResizing === 'bl') {
            const deltaX = cropArea.x - x
            newSize = Math.max(
               minSize,
               Math.min(cropArea.size + deltaX, y - cropArea.y),
            )
            newX = cropArea.x + cropArea.size - newSize
         } else if (isResizing === 'tr') {
            const deltaY = cropArea.y - y
            newSize = Math.max(
               minSize,
               Math.min(x - cropArea.x, cropArea.size + deltaY),
            )
            newY = cropArea.y + cropArea.size - newSize
         } else if (isResizing === 'tl') {
            const deltaX = cropArea.x - x
            const deltaY = cropArea.y - y
            newSize = Math.max(
               minSize,
               Math.min(cropArea.size + deltaX, cropArea.size + deltaY),
            )
            newX = cropArea.x + cropArea.size - newSize
            newY = cropArea.y + cropArea.size - newSize
         }

         // Limiter dans les bordures de l'image
         if (newX < 0) {
            newSize += newX
            newX = 0
         }
         if (newY < 0) {
            newSize += newY
            newY = 0
         }
         if (newX + newSize > currentImage.img.width) {
            newSize = currentImage.img.width - newX
         }
         if (newY + newSize > currentImage.img.height) {
            newSize = currentImage.img.height - newY
         }

         setCropArea({ x: newX, y: newY, size: newSize })
         return
      }

      if (isDragging) {
         let newX = x - dragStart.x
         let newY = y - dragStart.y

         // Limiter le déplacement dans les bordures de l'image
         newX = Math.max(
            0,
            Math.min(newX, currentImage.img.width - cropArea.size),
         )
         newY = Math.max(
            0,
            Math.min(newY, currentImage.img.height - cropArea.size),
         )

         setCropArea((prev) => ({ ...prev, x: newX, y: newY }))
      }
   }

   const handleEnd = (): void => {
      setIsDragging(false)
      setIsResizing(false)
   }

   const compressImage = async (
      canvas: HTMLCanvasElement,
      maxSizeKB: number = 500,
      //  targetSizeKB: number = 100,
   ): Promise<Blob> => {
      return new Promise((resolve, reject) => {
         let quality = 0.9
         const minQuality = 0.1

         const tryCompress = () => {
            canvas.toBlob(
               (blob) => {
                  if (!blob) {
                     reject(new Error('Failed to create blob'))
                     return
                  }

                  const sizeKB = blob.size / 1024

                  // console.log(
                  //   `🔄 Tentative de compression - Qualité: ${(quality * 100).toFixed(0)}% - Taille: ${sizeKB.toFixed(2)} Ko`,
                  // );

                  // Si la taille est acceptable (< maxSizeKB) et proche de la cible
                  if (sizeKB <= maxSizeKB) {
                     //   console.log(
                     //     `✅ Compression réussie - Taille finale: ${sizeKB.toFixed(2)} Ko`,
                     //   );
                     resolve(blob)
                     return
                  }

                  // Si on a atteint la qualité minimale, on résout avec ce qu'on a
                  if (quality <= minQuality) {
                     //   console.log(
                     //     `⚠️ Qualité minimale atteinte - Taille finale: ${sizeKB.toFixed(2)} Ko`,
                     //   );
                     resolve(blob)
                     return
                  }

                  // Réduire la qualité pour la prochaine tentative
                  quality -= 0.1
                  tryCompress()
               },
               'image/jpeg', // JPEG pour meilleure compression
               quality,
            )
         }

         tryCompress()
      })
   }

   const handleCropConfirm = async (): Promise<void> => {
      if (!currentImage) return

      const canvas = document.createElement('canvas')
      canvas.width = cropArea.size
      canvas.height = cropArea.size
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(
         currentImage.img,
         cropArea.x,
         cropArea.y,
         cropArea.size,
         cropArea.size,
         0,
         0,
         cropArea.size,
         cropArea.size,
      )

      try {
         // console.log(
         //   `📸 Image avant compression - Dimensions: ${cropArea.size}x${cropArea.size}px`,
         // );

         // Compresser l'image
         const compressedBlob = await compressImage(canvas, 200 /*, 100*/)

         // console.log(
         //   `✨ Compression terminée - Taille: ${(compressedBlob.size / 1024).toFixed(2)} Ko`,
         // );

         // Créer un nouveau File à partir du Blob compressé
         const croppedFile = new File(
            [compressedBlob],
            `cropped_${currentImage.originalFile.name.replace(/\.[^/.]+$/, '')}.jpg`,
            { type: 'image/jpeg' },
         )

         // Créer une URL de prévisualisation
         const previewUrl = URL.createObjectURL(compressedBlob)

         setImages((prev) => [
            ...prev,
            { file: croppedFile, preview: previewUrl },
         ])
         mutateUploadMartProduct({ file: croppedFile })
         setCropMode(false)
         setCurrentImage(null)
      } catch (error) {
         console.error('❌ Erreur lors de la compression:', error)
      }
   }

   const handleCropCancel = (): void => {
      setCropMode(false)
      setCurrentImage(null)
   }

   const removeImage = (index: number): void => {
      // Révoquer l'URL de prévisualisation pour libérer la mémoire
      URL.revokeObjectURL(images[index].preview)
      setImages((prev) => prev.filter((_, i) => i !== index))
      setFiles(files.filter((_, i) => i !== index))
      setCurrentIndex(0)
   }

   const handleNext = () => {
      const maxLength = images.length
      setCurrentIndex((prev) => (prev + 1) % maxLength)
   }

   const handlePrev = () => {
      const maxLength = images.length
      setCurrentIndex((prev) => (prev - 1 + maxLength) % maxLength)
   }

   // Nettoyer les URLs de prévisualisation lors du démontage du composant
   useEffect(() => {
      return () => {
         images.forEach((img) => URL.revokeObjectURL(img.preview))
      }
   }, [])

   return (
      <div className='relative'>
         {isPendingUploadMartProduct && (
            <div className='absolute w-full h-full flex items-center justify-center'>
               <ScaleLoader color='var(--green)' />
            </div>
         )}
         <div
            className={`${isPendingUploadMartProduct ? 'opacity-15' : 'opacity-100'}`}
         >
            <div className='h-40 flex gap-2 md:max-w-full overflow-hidden'>
               {!cropMode && (
                  <label htmlFor='image-resize'>
                     <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        onChange={handleFileSelect}
                        className='hidden'
                        id='image-resize'
                     />
                     <div
                        onClick={() => fileInputRef.current?.click()}
                        className='h-40 aspect-square rounded-md border-2 border-[var(--foreground)] border-dashed flex items-center justify-center cursor-pointer group'
                     >
                        <Upload className='size-10 group-hover:scale-110 duration-300' />
                     </div>
                  </label>
               )}

               <div className='flex gap-2 overflow-hidden flex-1'>
                  <button
                     className='bg-[var(--background-secondary)] p-2 rounded-md cursor-pointer'
                     onClick={handlePrev}
                  >
                     <ChevronLeft />
                  </button>

                  <div className='flex-1 overflow-hidden relative'>
                     <div
                        className='flex duration-500'
                        style={{
                           transform: `translate(-${currentIndex * 176}px)`,
                        }}
                     >
                        {images.map((image, index) => (
                           <div className='w-44 px-2' key={index}>
                              <div className='aspect-square h-40 overflow-hidden rounded-md relative group'>
                                 <img
                                    src={image.preview}
                                    alt={image.file?.name}
                                    className='w-full h-full object-cover rounded-md'
                                    onClick={() =>
                                       setImageUrlToSee(image.preview)
                                    }
                                 />
                                 <button
                                    onClick={() => removeImage(index)}
                                    className='absolute top-2 left-2 bg-[var(--red)] text-[var(--foreground)] rounded cursor-pointer hover:scale-110 duration-300'
                                 >
                                    <X size={16} />
                                 </button>
                              </div>
                           </div>
                        ))}

                        {images.length === 0 && (
                           <div className='w-full h-40 flex font-bold items-center justify-center text-2xl text-[var(--gray)] border rounded-md text-center'>
                              {translate('no_images')}
                           </div>
                        )}
                     </div>

                     <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
                        {images.map((_, index) => (
                           <div
                              key={index}
                              className={`${index === currentIndex ? 'w-4 opacity-100' : 'w-2 opacity-50'} h-2 cursor-pointer bg-[var(--foreground)] rounded-full duration-300`}
                              onClick={() => setCurrentIndex(index)}
                           />
                        ))}
                     </div>
                  </div>

                  <button
                     className='bg-[var(--background-secondary)] p-2 rounded-md cursor-pointer'
                     onClick={handleNext}
                  >
                     <ChevronRight />
                  </button>
               </div>
            </div>

            {cropMode && currentImage && (
               <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
                  <div className='bg-[var(--background)] rounded-md p-8 space-y-2'>
                     <canvas
                        ref={canvasRef}
                        onMouseDown={handleStart}
                        onMouseMove={handleMove}
                        onMouseUp={handleEnd}
                        onMouseLeave={handleEnd}
                        onTouchStart={handleStart}
                        onTouchMove={handleMove}
                        onTouchEnd={handleEnd}
                        className='rounded touch-none'
                        style={{ touchAction: 'none' }}
                     />

                     <div className='grid grid-cols-2 gap-2'>
                        <Button
                           className='bg-[var(--red-secondary)] hover:bg-[var(--red-secondary)] text-[var(--red)] cursor-pointer'
                           onClick={handleCropCancel}
                        >
                           <X /> {translate('cancel')}
                        </Button>
                        <Button
                           className='bg-[var(--green-secondary)] hover:bg-[var(--green-secondary)] text-[var(--green)] cursor-pointer'
                           onClick={handleCropConfirm}
                        >
                           <Check /> {translate('confirm')}
                        </Button>
                     </div>
                  </div>
               </div>
            )}

            {imageUrlToSee && (
               <ImageViewer
                  isOpen={imageUrlToSee.length > 0}
                  setIsOpen={() => setImageUrlToSee('')}
                  profilePhoto={imageUrlToSee}
                  firstName=''
               />
            )}
         </div>
      </div>
   )
}
