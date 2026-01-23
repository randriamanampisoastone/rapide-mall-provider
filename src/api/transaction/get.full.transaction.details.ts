import { ROUTE_GET_FULL_TRANSACTION_DETAILS } from '@/constants/api.constant'
import { AxiosErrorCustom } from '../axios.error.custum'
import apiClient from '../main'
import { useQuery } from '@tanstack/react-query'
import type { UserRole } from '@/enums/profile.enum'
import type { TransactionActionType } from '@/enums/transaction/transaction.action.enum'
import type { TransactionFlowType } from '@/enums/transaction/transaction.flow.enum'
import type { TransactionStatusType } from '@/enums/transaction/transaction.status.enum'
import type { TransactionMethodType } from '@/enums/transaction/transaction.method.enum'

interface GetFullTransactionDetailsQuery {
   transactionId: string
}

interface GetFullTransactionDetailsProfile {
   sub: string
   firstName: string
   lastName?: string
   phoneNumber: string
   profilePhoto?: string
   roles: UserRole[]
}

interface GetFullTransactionDetailsResponse {
   transactionId: string
   amount: number /** */
   total: number /** */
   fees: number /** */
   reference: number /** */
   cardReference?: string /** */
   orangeMoneyReference?: string /** */
   mvolaReference?: string /** */
   currency: string /** */
   description: string /** */
   senderSiteName?: string /** */
   receiverSiteName?: string /** */
   senderProfile: GetFullTransactionDetailsProfile /** */
   receiverProfile: GetFullTransactionDetailsProfile /** */
   createdAt: Date /** */
   transactionAction: TransactionActionType /** */
   transactionFlow: TransactionFlowType
   transactionStatus: TransactionStatusType /** */
   transactionMethod: TransactionMethodType /** */
   meta: { [key: string]: any }
   rideInvoiceId?: string /** */
}

const getFullTransactionDetails = async ({
   transactionId,
}: GetFullTransactionDetailsQuery) => {
   try {
      const response = await apiClient<GetFullTransactionDetailsResponse>(
         `${ROUTE_GET_FULL_TRANSACTION_DETAILS}?transactionId=${transactionId}`,
      )
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetFullTransactionDetails = ({
   transactionId,
}: GetFullTransactionDetailsQuery) => {
   return useQuery({
      queryKey: ['getFullTransactionDetails', transactionId],
      queryFn: () => getFullTransactionDetails({ transactionId }),
   })
}
