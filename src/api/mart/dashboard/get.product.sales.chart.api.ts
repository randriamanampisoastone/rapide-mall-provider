import { AxiosErrorCustom } from '@/api/axios.error.custum'
import apiClient from '@/api/main'
import { ROUTE_GET_PRODUCT_SALES_CHART } from '@/constants/api.constant'
import type { MartOrderStatusType } from '@/enums/mart/mart.order.status.enum'
import { useQuery } from '@tanstack/react-query'

interface GetProductSalesChartQuery {
   martOrderStatus?: MartOrderStatusType[]
   selectedDateFrom?: Date
   selectedDateTo?: Date
}

export interface GetProductSalesChartResponse {
   chartData: {
      date: string
      count: number
      quantity: number
      totalSales: number
      providerProfit: number
   }[]
   totalAmount: number
   totalQuantity: number
   totalCount: number
}

const getProductSalesChart = async ({
   martOrderStatus,
   selectedDateFrom,
   selectedDateTo,
}: GetProductSalesChartQuery) => {
   try {
      const martOrderStatusQuery = martOrderStatus?.join('&martOrderStatus=')
      const query = `?selectedDateFrom=${selectedDateFrom || ''}&selectedDateTo=${selectedDateTo || ''}&martOrderStatus=${martOrderStatusQuery || ''}`
      const response = await apiClient.get<GetProductSalesChartResponse>(
         ROUTE_GET_PRODUCT_SALES_CHART + query,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetProductSalesChart = (query: GetProductSalesChartQuery) => {
   return useQuery({
      queryKey: ['getProductSalesChart', query],
      queryFn: () => getProductSalesChart(query),
      staleTime: 0,
   })
}
