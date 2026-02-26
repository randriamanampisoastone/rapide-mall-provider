import { ROUTE_PROVIDER_GET_PENDING_MART_PRODUCT_SUBMISSIONS } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useQuery } from '@tanstack/react-query'

interface PendingCreatePayload {
   name: string
   description: string[]
   locale: string
}

interface PendingUpdatePayload {
   martProductId: string
   name?: string
   description?: string[]
   locale: string
}

export interface ProviderPendingMartProductSubmission {
   submissionId: string
   providerBusinessName: string
   submittedAt: string
   submissionType: 'CREATE' | 'UPDATE'
   reviewStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
   reviewedAt?: string
   createPayload?: PendingCreatePayload
   updatePayload?: PendingUpdatePayload
   expiresInSeconds: number
}

interface ProviderGetPendingMartProductSubmissionsResponse {
   data: ProviderPendingMartProductSubmission[]
   hasMore: boolean
   totalCount: number
}

const providerGetPendingMartProductSubmissions = async () => {
   try {
      const response =
         await apiClient.get<ProviderGetPendingMartProductSubmissionsResponse>(
            ROUTE_PROVIDER_GET_PENDING_MART_PRODUCT_SUBMISSIONS,
         )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

interface UseProviderPendingOptions {
   refetchIntervalMs?: number
}

export const useProviderGetPendingMartProductSubmissions = ({
   refetchIntervalMs = 30_000,
}: UseProviderPendingOptions = {}) =>
   useQuery({
      queryKey: ['providerGetPendingMartProductSubmissions'],
      queryFn: () => providerGetPendingMartProductSubmissions(),
      refetchInterval: refetchIntervalMs,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
      staleTime: 15_000,
   })
