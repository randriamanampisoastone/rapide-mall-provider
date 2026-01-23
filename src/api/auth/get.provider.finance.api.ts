import { ROUTE_GET_PROVIDER_FINANCE } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useQuery } from '@tanstack/react-query'

interface GetProviderFinanceInterface {
   financeId: string
   mart: {
      card: number
      cash: number
      mvola: number
      orangeMoney: number
      rapideWallet: number
   }
   express: {
      card: number
      cash: number
      mvola: number
      orangeMoney: number
      rapideWallet: number
   }
}

const getProviderFinance = async () => {
   try {
      const response = await apiClient.get<GetProviderFinanceInterface>(
         ROUTE_GET_PROVIDER_FINANCE,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetProviderFinance = () => {
   return useQuery({
      queryKey: ['getProviderFinance'],
      queryFn: () => getProviderFinance(),
   })
}
