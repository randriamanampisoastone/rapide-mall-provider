import { useEffect, useRef } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { Result } from '@zxing/library'
import rapideQrScan from '@/assets/images/qrCode/rapide_qr_scan.png'

type QRCodeScannerProps = {
   width?: number
   height?: number
   deviceId?: string
   isPendingExpressQrScanAction?: boolean
   seconds: number
   handleScanQrCode: (text: string) => void
}

export default function QRCodeScanner({
   width = 400,
   height = 400,
   deviceId,
   isPendingExpressQrScanAction,
   seconds,
   handleScanQrCode,
}: QRCodeScannerProps) {
   const videoRef = useRef<HTMLVideoElement | null>(null)
   const readerRef = useRef<BrowserMultiFormatReader | null>(null)
   const scanningRef = useRef(false)
   const frameRef = useRef<number>(0)

   useEffect(() => {
      const reader = new BrowserMultiFormatReader()
      readerRef.current = reader

      const startCamera = async () => {
         try {
            const stream = await navigator.mediaDevices.getUserMedia({
               video: {
                  deviceId: deviceId ? { exact: deviceId } : undefined,
                  width: { ideal: width, max: width },
                  height: { ideal: height, max: height },
                  facingMode: 'environment',
                  frameRate: { ideal: 30, max: 30 }, // stabilité FPS
               },
            })

            if (videoRef.current) {
               videoRef.current.srcObject = stream
               await videoRef.current.play()
               startDecodingLoop(reader)
            }
         } catch (err) {
            console.error('Camera init failed:', err)
         }
      }

      const startDecodingLoop = (reader: BrowserMultiFormatReader) => {
         const decodeFrame = async () => {
            if (
               videoRef.current &&
               !isPendingExpressQrScanAction &&
               seconds === 0 &&
               !scanningRef.current
            ) {
               try {
                  const result: Result | undefined =
                     await reader.decodeOnceFromVideoElement(videoRef.current)
                  if (result) {
                     scanningRef.current = true
                     handleScanQrCode(result.getText())
                     setTimeout(() => {
                        scanningRef.current = false
                     }, 1500)
                  }
               } catch {
                  // Rien, ça échoue souvent sans QR visible
               }
            }
            frameRef.current = requestAnimationFrame(decodeFrame)
         }

         frameRef.current = requestAnimationFrame(decodeFrame)
      }

      startCamera()

      return () => {
         if (frameRef.current) cancelAnimationFrame(frameRef.current)
         const stream = videoRef.current?.srcObject as MediaStream
         if (stream) {
            stream.getTracks().forEach((t) => t.stop())
         }
         readerRef.current = null
      }
   }, [
      deviceId,
      width,
      height,
      isPendingExpressQrScanAction,
      seconds,
      handleScanQrCode,
   ])

   return (
      <div className='rounded-md overflow-hidden w-fit relative'>
         <div className='absolute inset-0 flex items-center justify-center z-10'>
            <img
               src={rapideQrScan}
               alt='rapideQrScan'
               className='size-65'
               style={{ animation: 'pulseScale 2s ease-in-out infinite' }}
            />
            <style>
               {`
                  @keyframes pulseScale {
                     0%, 100% { transform: scale(1); }
                     50% { transform: scale(1.05); }
                  }
               `}
            </style>
         </div>

         <video
            ref={videoRef}
            width={width}
            height={height}
            muted
            playsInline
            style={{
               borderRadius: 8,
               width: width,
               height: height,
               objectFit: 'cover',
            }}
         />
      </div>
   )
}
