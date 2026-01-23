import { ROUTE_PROVIDER_UPDATE_PASSWORD } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorSound } from '@/utils/audio.player.util'

interface providerUpdatePasswordDto {
   currentProviderPassword: string
   newProviderPassword: string
   locale: string
}

const providerUpdatePassword = async (data: providerUpdatePasswordDto) => {
   try {
      const response = await apiClient.patch(
         ROUTE_PROVIDER_UPDATE_PASSWORD,
         data,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useProviderUpdatePassword = () => {
   const handleError = (error: Error) => {
      toast.error(error.message)
      errorSound.play()
   }
   return useMutation({
      onError: handleError,
      mutationFn: providerUpdatePassword,
   })
}
