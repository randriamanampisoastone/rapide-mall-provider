import { ROUTE_GET_MART_PRODUCT } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useQuery } from '@tanstack/react-query'

export interface GetMartProductItemResponseData {
   descriptionEn: string[]
   descriptionFr: string[]
   descriptionMg: string[]
   descriptionZh: string[]
   martItemId: string
   quantity: number
   oldPrice: number
   price: number
   code: string
   isMain: boolean
   images: string[]
   salesQuantity: number
}

export interface GetMartProductResponseData {
   martProductId: string
   nameEn?: string
   nameFr?: string
   nameMg?: string
   nameZh?: string
   descriptionEn: string[]
   descriptionFr: string[]
   descriptionMg: string[]
   descriptionZh: string[]
   isAvailable: boolean
   martProductItem: GetMartProductItemResponseData[]
}

interface GetMartProductResponse {
   data: GetMartProductResponseData[]
   hasMore: boolean
   totalCount: number
}

interface GetMartProductQuery {
   page?: number
   pageSize?: number
   term?: string
}

const getMartProduct = async ({
   page,
   pageSize,
   term,
}: GetMartProductQuery) => {
   try {
      const query = `?page=${page || 1}&pageSize=${pageSize || 10}&term=${term || ''}`
      const response = await apiClient.get<GetMartProductResponse>(
         ROUTE_GET_MART_PRODUCT + query,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetMartProduct = ({
   page = 1,
   pageSize = 10,
   term,
}: GetMartProductQuery) => {
   return useQuery({
      queryKey: ['getMartProduct', page, pageSize, term],
      queryFn: () => getMartProduct({ page, pageSize, term }),
   })
}
