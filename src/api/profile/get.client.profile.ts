import { ROUTE_GET_CLIENT_PROFILE_BY_ID } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useQuery } from '@tanstack/react-query'

export interface ClientProfileResponse {
   sub: string
   phoneNumber: string
   firstName: string
   lastName: string
   birthday: Date
   gender: string
   profilePhoto?: string
   profileStatus: string
}

const getClientProfile = async () => {
   try {
      const response = await apiClient.get<ClientProfileResponse>(
         ROUTE_GET_CLIENT_PROFILE_BY_ID,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetClientProfile = () => {
   return useQuery({
      queryKey: ['getClientProfile'],
      queryFn: () => getClientProfile(),
   })
}
