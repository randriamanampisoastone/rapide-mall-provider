import { useMutation } from '@tanstack/react-query'
import apiClient from '../main'
import { AxiosErrorCustom } from '../axios.error.custum'
import { ROUTE_RESEND_CONFIRM_SIGN_IN } from '@/constants/api.constant'
import { toast } from 'react-toastify'

export interface ResendConfirmSignInDto {
   phoneNumber: string
   locale: string
}

export const resendConfirmSignIn = async (
   resendConfirmSignInDto: ResendConfirmSignInDto,
) => {
   try {
      const response = await apiClient.post(
         ROUTE_RESEND_CONFIRM_SIGN_IN,
         resendConfirmSignInDto,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useResendConfirmSignIn = () => {
   const handleError = (error: Error) => {
      toast.error(error.message)
   }
   return useMutation({
      mutationFn: resendConfirmSignIn,
      onError: handleError,
   })
}
