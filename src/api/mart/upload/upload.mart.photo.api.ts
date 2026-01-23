import { AxiosErrorCustom } from '@/api/axios.error.custum'
import apiClient from '@/api/main'
import { ROUTE_UPLOAD_MART_PHOTO } from '@/constants/api.constant'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorSound } from '@/utils/audio.player.util'

interface UploadMartPhotoDto {
   file: File
}

const uploadMartPhoto = async ({ file }: UploadMartPhotoDto) => {
   try {
      const data = new FormData()
      data.append('file', file)
      const response = await apiClient.post(ROUTE_UPLOAD_MART_PHOTO, data, {
         headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useUploadMartPhoto = () => {
   const handleError = (error: Error) => {
      toast.error(error.message)
      errorSound.play()
   }
   return useMutation({
      mutationFn: uploadMartPhoto,
      onError: handleError,
   })
}
