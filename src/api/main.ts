import { API_BASE_URL, TIMEOUT } from '@/constants/api.constant'
import { getToken } from '@/utils/token.util'
import axios from 'axios'
import { toast } from 'react-toastify'

const apiClient = axios.create({
   baseURL: API_BASE_URL,
   timeout: TIMEOUT,
})

apiClient.interceptors.request.use(
   async (config) => {
      const token = await getToken()

      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
   (response) => response,
   async (error) => {
      const status = error?.response?.status

      if (status === 401) {
         // Token invalide ou expiré
         toast.warn('Token expiré. Redirection vers sign-up...')

         // Option 2 : si tu es dans une SPA avec useNavigate (React Router v6)
         // import { useNavigate } from 'react-router-dom'
         window.location.href = '/sign-in'

         return Promise.reject(error)
      }

      return Promise.reject(error)
   },
)

export default apiClient
