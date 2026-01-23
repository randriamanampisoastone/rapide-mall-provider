import { ROUTE_GET_PROVIDER_FULL_PROFILE } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useQuery } from '@tanstack/react-query'

export interface GetProviderFullPRofileResponse {
   registrationNumber: number
   businessName: string
   businessAddress: string
   businessPhoneNumber: string
   businessEmail: string
   businessDescriptionEn: string
   businessDescriptionFr: string
   businessDescriptionMg: string
   businessDescriptionZh: string
   openHours: string[]
   closeHours: string[]
   openDays: boolean[]
   latitude: number
   longitude: number
   businessLogo: string
   businessCoverPhoto: string
   isOpen: boolean
}

const getProviderFullProfile = async () => {
   try {
      const response = await apiClient.get<GetProviderFullPRofileResponse>(
         ROUTE_GET_PROVIDER_FULL_PROFILE,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetProviderFullProfile = () => {
   return useQuery({
      queryKey: ['getProviderFullProfile'],
      queryFn: getProviderFullProfile,
   })
}
