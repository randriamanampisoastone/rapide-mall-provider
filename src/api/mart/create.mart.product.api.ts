import { useMutation } from '@tanstack/react-query'
import { AxiosErrorCustom } from '../axios.error.custum'
import { toast } from 'react-toastify'
import { errorSound } from '@/utils/audio.player.util'
import apiClient from '../main'
import { ROUTE_CREATE_MART_PRODUCT } from '@/constants/api.constant'

interface MartItemDto {
   code: string
   quantity: number
   oldPrice: number
   price: number
   description: string[]
   isMain: boolean
   images: string[]
}

interface CreateMartProductDto {
   name: string
   description: string[]
   martItems: MartItemDto[]
   width: number
   height: number
   length: number
   weight: number
   providerPassword: string
   locale: string
}

const createMartProduct = async (data: CreateMartProductDto) => {
   try {
      const response = await apiClient.post(ROUTE_CREATE_MART_PRODUCT, data)
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useCreateMartProduct = () => {
   const handleError = (error: Error) => {
      toast.error(error.message)
      errorSound.play()
   }
   return useMutation({
      onError: handleError,
      mutationFn: createMartProduct,
   })
}
