import { ROUTE_PROVIDER_GET_MART_PRODUCT_REVIEW_DECISIONS } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useQuery } from '@tanstack/react-query'

export interface ProviderMartProductReviewDecision {
   submissionId: string
   providerProfileId: string
   decision: 'APPROVED' | 'REJECTED'
   reviewedAt: string
   reviewedByAdminProfileId: string
   productName?: string
}

interface ProviderGetMartProductReviewDecisionsResponse {
   data: ProviderMartProductReviewDecision[]
   hasMore: boolean
   totalCount: number
}

interface ProviderGetMartProductReviewDecisionsQuery {
   page?: number
   pageSize?: number
   refetchIntervalMs?: number
}

const providerGetMartProductReviewDecisions = async ({
   page,
   pageSize,
}: ProviderGetMartProductReviewDecisionsQuery) => {
   try {
      const query = `?page=${page || 1}&pageSize=${pageSize || 20}`
      const response =
         await apiClient.get<ProviderGetMartProductReviewDecisionsResponse>(
            `${ROUTE_PROVIDER_GET_MART_PRODUCT_REVIEW_DECISIONS}${query}`,
         )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useProviderGetMartProductReviewDecisions = ({
   page = 1,
   pageSize = 20,
   refetchIntervalMs = 30_000,
}: ProviderGetMartProductReviewDecisionsQuery = {}) =>
   useQuery({
      queryKey: ['providerGetMartProductReviewDecisions', page, pageSize],
      queryFn: () =>
         providerGetMartProductReviewDecisions({
            page,
            pageSize,
         }),
      refetchInterval: refetchIntervalMs,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
      staleTime: 15_000,
   })
