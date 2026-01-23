import { ROUTE_UPDATE_MART_PRODUCT } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { toast } from 'react-toastify'
import { errorSound } from '@/utils/audio.player.util'
import { useMutation } from '@tanstack/react-query'

interface UpdateMartItemDto {
   martItemId?: string
   code?: string
   quantity?: number
   oldPrice?: number
   price?: number
   description: string[]
   isMain?: boolean
   images: string[]
}

interface UpdateMartProductDto {
   martProductId: string
   name?: string
   description: string[]
   martItems: UpdateMartItemDto[]
   width?: number
   height?: number
   length?: number
   weight?: number
   providerPassword: string
   locale: string
}

const updateMartProduct = async (data: UpdateMartProductDto) => {
   try {
      const response = await apiClient.patch(ROUTE_UPDATE_MART_PRODUCT, data)
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useUpdateMartProduct = () => {
   const handleError = (error: Error) => {
      toast.error(error.message)
      errorSound.play()
   }
   return useMutation({
      onError: handleError,
      mutationFn: updateMartProduct,
   })
}
