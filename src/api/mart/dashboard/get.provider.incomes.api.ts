import { AxiosErrorCustom } from '@/api/axios.error.custum'
import apiClient from '@/api/main'
import { ROUTE_GET_PROVIDER_INCOMES } from '@/constants/api.constant'
import { useQuery } from '@tanstack/react-query'

interface GetProviderIncomesResponse {
   total: number
   daily: number
   weekly: number
   monthly: number
   yearly: number
}

const getProviderIncomes = async () => {
   try {
      const response = await apiClient.get<GetProviderIncomesResponse>(
         ROUTE_GET_PROVIDER_INCOMES,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetProviderIncomes = () => {
   return useQuery({
      queryKey: ['getProviderIncomes'],
      queryFn: getProviderIncomes,
      staleTime: 0,
   })
}
