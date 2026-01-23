import axios from 'axios'
import { AxiosErrorCustom } from '../axios.error.custum'
import { RAPIDE_APP_FOKONTANY_URL } from '@/constants/api.constant'
import { useQuery } from '@tanstack/react-query'

interface GetFokotanyDetailQuery {
   lat: number
   lon: number
}

const getFokotanyDetail = async ({ lat, lon }: GetFokotanyDetailQuery) => {
   try {
      const query = `?lat=${lat ?? ''}&lon=${lon ?? ''}`
      const response = await axios.get(RAPIDE_APP_FOKONTANY_URL + query)
      return response.data
   } catch (error) {
      throw new AxiosErrorCustom(error)
   }
}

export const useGetFokotanyDetail = ({ lat, lon }: GetFokotanyDetailQuery) => {
   return useQuery({
      queryKey: ['getFokotanyDetail', lat, lon],
      queryFn: () => getFokotanyDetail({ lat, lon }),
   })
}
