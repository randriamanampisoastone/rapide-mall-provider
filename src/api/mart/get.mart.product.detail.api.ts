import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { ROUTE_GET_MART_PRODUCT_DETAIL } from '@/constants/api.constant'
import { useQuery } from '@tanstack/react-query'
import type { GetMartProductItemResponseData } from './get.mart.product.api'

interface GetMartProductDetailResponse {
   martProductId: string
   nameEn?: string
   nameFr?: string
   nameMg?: string
   nameZh?: string
   descriptionEn: string[]
   descriptionFr: string[]
   descriptionMg: string[]
   descriptionZh: string[]
   width: number
   length: number
   height: number
   weight: number
   martProductItem: GetMartProductItemResponseData[]
   martCategory: {
      image: string
      nameEn?: string
      nameFr?: string
      nameMg?: string
      nameZh?: string
   }[]
}

interface GetMartProductDetailProps {
   martProductId: string
}

const getMartProductDetail = async ({
   martProductId,
}: GetMartProductDetailProps) => {
   try {
      const query = `?martProductId=${martProductId}`
      const response = await apiClient.get<GetMartProductDetailResponse>(
         ROUTE_GET_MART_PRODUCT_DETAIL + query,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetMartProductDetail = ({
   martProductId,
}: GetMartProductDetailProps) => {
   return useQuery({
      queryKey: ['getMartProductDetail', martProductId],
      queryFn: () => getMartProductDetail({ martProductId }),
   })
}
