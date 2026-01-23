import { ROUTE_PROVIDER_GET_ORDER_ITEMS } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import type { MartOrderStatusType } from '@/enums/mart/mart.order.status.enum'
import { useQuery } from '@tanstack/react-query'

interface ProviderGetOrderItemsQuery {
   martProductId?: string
   page?: number
   pageSize?: number
   term?: string
   orderStatus?: MartOrderStatusType[]
   createdAtFrom?: Date
   createdAtTo?: Date
   updatedAtFrom?: Date
   updatedAtTo?: Date
}

type ProfileType = {
   firstName: string
   lastName?: string
   phoneNumber: string
   profilePhoto?: string
}

export interface ProviderGetOrderItemsResponseData {
   createdAt: string
   updateAt: string
   martOrderItemId: string
   martOrderId: string
   quantity: number
   priceAtTime: number
   martItem: {
      code: string
      images: string[]
      descriptionEn: string[]
      descriptionFr: string[]
      descriptionMg: string[]
      descriptionZh: string[]
      nameEn?: string
      nameFr?: string
      nameMg?: string
      nameZh?: string
   }
   orderStatus: MartOrderStatusType
   orderCode: number
   martOrderShortCode: string
   clientProfile: ProfileType
   transactionReference?: number
   driverPickedUp?: ProfileType
   driverDelivered?: ProfileType
}

interface ProviderGetOrderItemsResponse {
   data: ProviderGetOrderItemsResponseData[]
   hasMore: boolean
   totalCount: number
   totalAmount: number
}

const providerGetOrderItems = async ({
   martProductId,
   page,
   pageSize,
   term,
   orderStatus,
   createdAtFrom,
   createdAtTo,
   updatedAtFrom,
   updatedAtTo,
}: ProviderGetOrderItemsQuery) => {
   try {
      const query = `?page=${page || 1}&pageSize=${pageSize || 10}&term=${term || ''}&martProductId=${martProductId || ''}&orderStatus=${orderStatus?.join('&orderStatus=') || ''}&createdAtFrom=${createdAtFrom || ''}&createdAtTo=${createdAtTo || ''}&updatedAtFrom=${updatedAtFrom || ''}&updatedAtTo=${updatedAtTo || ''}`
      const response = await apiClient.get<ProviderGetOrderItemsResponse>(
         ROUTE_PROVIDER_GET_ORDER_ITEMS + query,
      )
      console.log(response.data)
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useProviderGetOrderItem = ({
   martProductId,
   page,
   pageSize,
   term,
   orderStatus,
   createdAtFrom,
   createdAtTo,
   updatedAtFrom,
   updatedAtTo,
}: ProviderGetOrderItemsQuery) => {
   return useQuery({
      queryKey: [
         'providerGetOrderItem',
         martProductId,
         page,
         pageSize,
         term,
         orderStatus,
         createdAtFrom,
         createdAtTo,
         updatedAtFrom,
         updatedAtTo,
      ],
      queryFn: () =>
         providerGetOrderItems({
            martProductId,
            page,
            pageSize,
            term,
            orderStatus,
            createdAtFrom,
            createdAtTo,
            updatedAtFrom,
            updatedAtTo,
         }),
   })
}
