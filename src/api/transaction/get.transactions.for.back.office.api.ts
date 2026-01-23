import type { TransactionActionType } from '@/enums/transaction/transaction.action.enum'
import type { TransactionFlowType } from '@/enums/transaction/transaction.flow.enum'
import type { TransactionMethodType } from '@/enums/transaction/transaction.method.enum'
import type { TransactionStatusType } from '@/enums/transaction/transaction.status.enum'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useQuery } from '@tanstack/react-query'
import type { DateRange } from 'react-day-picker'
import type { UserRole } from '@/enums/profile.enum'
import { ROUTE_PROVIDER_GET_MART_TRANSACTION } from '@/constants/api.constant'

export interface GetTransactionForBackOfficeResponse {
   data: GetTransactionForBackOfficeResponseData[]
   hasMore: boolean
   totalCount: number
   totalAmount: number
}

export interface GetTransactionForBackOfficeProfileResponse {
   sub: string
   firstName: string
   lastName?: string
   phoneNumber: string
   roles: UserRole[]
   profilePhoto?: string
}

export interface GetTransactionForBackOfficeResponseData {
   transactionId: string
   reference: number
   amount: number
   createdAt: Date
   transactionAction: TransactionActionType
   transactionFlow: TransactionFlowType
   transactionStatus: TransactionStatusType
   transactionMethod: TransactionMethodType
   fees: number
   total: number
   senderProfile?: GetTransactionForBackOfficeProfileResponse
   receiverProfile?: GetTransactionForBackOfficeProfileResponse
}

export interface GetTransactionForBackOfficeQuery {
   selectedReference?: number
   selectedTransactionStatus?: TransactionStatusType[]
   selectedTransactionMethod?: TransactionMethodType[]
   page?: number
   pageSize?: number
   selectedDate?: DateRange
}

const getTransactionForBackOffice = async (
   data: GetTransactionForBackOfficeQuery,
) => {
   try {
      const selectedTransactionStatus = data.selectedTransactionStatus?.join(
         '&selectedTransactionStatus=',
      )
      const selectedTransactionMethod = data.selectedTransactionMethod?.join(
         '&selectedTransactionMethod=',
      )
      const selectedDate = `&selectedDateFrom=${data.selectedDate?.from ?? ''}&selectedDateTo=${data.selectedDate?.to ?? ''}`
      const query = `?page=${data.page}&pageSize=${data.pageSize}&selectedReference=${data.selectedReference ?? ''}&selectedTransactionStatus=${selectedTransactionStatus ?? ''}&selectedTransactionMethod=${selectedTransactionMethod ?? ''}${selectedDate}`

      const response = await apiClient.get<GetTransactionForBackOfficeResponse>(
         `${ROUTE_PROVIDER_GET_MART_TRANSACTION + query}`,
      )

      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetTransactionForBackOffice = ({
   page = 1,
   pageSize = 20,
   selectedReference,
   selectedTransactionMethod,
   selectedTransactionStatus,
   selectedDate,
}: GetTransactionForBackOfficeQuery) => {
   return useQuery({
      queryKey: [
         'GetTransactionForBackOffice',
         page,
         pageSize,
         selectedReference,
         selectedTransactionMethod,
         selectedTransactionStatus,
         selectedDate?.from,
         selectedDate?.to,
      ],
      queryFn: () =>
         getTransactionForBackOffice({
            page,
            pageSize,
            selectedReference,
            selectedTransactionMethod,
            selectedTransactionStatus,
            selectedDate,
         }),
   })
}
