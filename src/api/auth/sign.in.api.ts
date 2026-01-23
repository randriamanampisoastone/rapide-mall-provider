import { ROUTE_SIGN_IN } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { UserRole } from '@/enums/profile.enum'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export interface SignInDto {
   phoneNumber: string
   roles: UserRole[]
   locale: string
   method: 'sms' | 'whatsapp'
}

const signIn = async (signInDto: SignInDto) => {
   try {
      const rep = await apiClient.post<void>(ROUTE_SIGN_IN, {
         ...signInDto,
         roles: [UserRole.PROVIDER],
      })
      return rep.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useSignIn = () => {
   const handleError = (error: Error) => {
      toast.error(error.message)
   }
   return useMutation({
      mutationFn: signIn,
      onError: handleError,
   })
}
