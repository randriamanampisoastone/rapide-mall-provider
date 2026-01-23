import { ROUTE_UPDATE_PROVIDER_PROFILE } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { errorSound } from '@/utils/audio.player.util'

interface UpdateProviderProfileDto {
   businessLogo?: string
   businessCoverPhoto?: string
   businessName?: string
   isOpen?: boolean
   businessDescriptionFr?: string
   businessAddress?: string
   businessEmail?: string
   businessPhoneNumber?: string
   openHours: string[]
   closeHours: string[]
   openDays: boolean[]
   latitude?: number
   longitude?: number
   providerPassword: string
   locale: string
}

const updateProviderProfile = async (data: UpdateProviderProfileDto) => {
   try {
      const response = await apiClient.patch(
         ROUTE_UPDATE_PROVIDER_PROFILE,
         data,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useUpdateProviderProfile = () => {
   const handleError = (error: Error) => {
      toast.error(error.message)
      errorSound.play()
   }
   return useMutation({
      onError: handleError,
      mutationFn: updateProviderProfile,
   })
}
