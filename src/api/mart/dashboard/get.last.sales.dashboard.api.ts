import { AxiosErrorCustom } from '@/api/axios.error.custum'
import apiClient from '@/api/main'
import { ROUTE_GET_LAST_SALES } from '@/constants/api.constant'
import { useQuery } from '@tanstack/react-query'

interface GetLastSalesDashboardResponse {
   createdAt: string
   clientProfile: {
      phoneNumber: string
      firstName: string
      lastName: string
      profilePhoto: string
   }
   quantity: number
   priceAtTime: number
   martItem: {
      martProductId: string
      nameEn: string
      nameFr: string
      nameMg: string
      nameZh: string
      descriptionEn: string[]
      descriptionFr: string[]
      descriptionMg: string[]
      descriptionZh: string[]
      images: string[]
   }
}

const getLastSalesDashboard = async () => {
   try {
      const response =
         await apiClient.get<GetLastSalesDashboardResponse[]>(
            ROUTE_GET_LAST_SALES,
         )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetLastSalesDashboard = () => {
   return useQuery({
      queryKey: ['getLastSalesDashboard'],
      queryFn: getLastSalesDashboard,
      staleTime: 0,
   })
}
