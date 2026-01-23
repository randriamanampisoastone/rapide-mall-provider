import type { PlatformOS } from '@/enums/platform.os.enum'
import apiClient from '../main'
import { ROUTE_CONFIRM_SIGN_IN } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import { useRouter } from '@tanstack/react-router'
import { setToken } from '@/utils/token.util'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { welcomeSound } from '@/utils/audio.player.util'

export interface ConfirmSignInDto {
   phoneNumber: string
   confirmationCode: string
   platformOS: PlatformOS
   locale: string
}
export interface ConfirmSignInResponse {
   token: string
}

const confirmSignIn = async (confirmSignInDto: ConfirmSignInDto) => {
   try {
      const rep = await apiClient.post(ROUTE_CONFIRM_SIGN_IN, confirmSignInDto)
      return rep.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useConfirmSignIn = () => {
   const navigation = useRouter()

   const handleSuccess = async (
      confirmSignInResponse: ConfirmSignInResponse,
   ) => {
      await setToken(confirmSignInResponse.token)
      welcomeSound.play()
      navigation.navigate({ to: '/app', replace: true })
   }
   const handleError = (error: Error) => {
      toast.error(error.message)
   }

   return useMutation({
      mutationFn: confirmSignIn,
      onSuccess: handleSuccess,
      onError: handleError,
   })
}
