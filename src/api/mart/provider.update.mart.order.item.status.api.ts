import type { MartOrderItemStatusType } from '@/enums/mart/mart.order.item.status.enum'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { ROUTE_PROVIDER_UPDATE_MART_ORDER_ITEM_STATUS } from '@/constants/api.constant'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorSound } from '@/utils/audio.player.util'

interface ProviderUpdateMartOrderItemStatusDto {
   martOrderItemId: string
   newStatus: MartOrderItemStatusType
   providerPassword: string
   locale: string
}

const providerUpdateMartOrderItemStatus = async (
   data: ProviderUpdateMartOrderItemStatusDto,
) => {
   try {
      const response = await apiClient.patch(
         ROUTE_PROVIDER_UPDATE_MART_ORDER_ITEM_STATUS,
         data,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useProviderUpdateMartOrderItemStatus = () => {
   const handleError = (error: Error) => {
      toast.error(error.message)
      errorSound.play()
   }
   return useMutation({
      mutationFn: providerUpdateMartOrderItemStatus,
      onError: handleError,
   })
}
