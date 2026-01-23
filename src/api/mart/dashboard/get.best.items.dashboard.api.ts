import apiClient from '@/api/main'
import { ROUTE_GET_BEST_ITEMS } from '@/constants/api.constant'
import { useQuery } from '@tanstack/react-query'

interface GetBestItemsDashboardResponse {
   martProductId: string
   martItemId: string
   nameEn: string
   nameFr: string
   nameMg: string
   nameZh: string
   salesQuantity: number
   images: string[]
   descriptionEn: string[]
   descriptionFr: string[]
   descriptionMg: string[]
   descriptionZh: string[]
   price: number
   oldPrice: number
   quantity: number
}

const getBestItemsDashboard = async () => {
   try {
      const response =
         await apiClient.get<GetBestItemsDashboardResponse[]>(
            ROUTE_GET_BEST_ITEMS,
         )
      return response.data
   } catch (error) {
      throw error
   }
}

export const useGetBestItemsDashboard = () => {
   return useQuery({
      queryKey: ['getBestItemsDashboard'],
      queryFn: getBestItemsDashboard,
      staleTime: 0,
   })
}
