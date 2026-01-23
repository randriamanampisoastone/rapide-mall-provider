import type { ShiftType } from '@/enums/shift.enum'
import apiClient from '../main'
import { ROUTE_GET_SHIFT } from '@/constants/api.constant'
import { useQuery } from '@tanstack/react-query'

const getShift = async () => {
   try {
      const response = await apiClient.get<{ shift: ShiftType }>(
         ROUTE_GET_SHIFT,
      )

      return response.data
   } catch (error) {
      throw error
   }
}

export const useGetShift = () => {
   return useQuery({
      queryFn: getShift,
      queryKey: ['getShift'],
      staleTime: 0,
   })
}
