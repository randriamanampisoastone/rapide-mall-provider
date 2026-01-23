import { getItem, removeItem, setItem } from './state.util'
import { jwtDecode } from 'jwt-decode'

export const setToken = async (token: string) => {
   await setItem('token_rapide', token)
}

export const getToken = async () => {
   return await getItem('token_rapide')
}

export const removeToken = async () => {
   await removeItem('token_rapide')
}

export const isTokenExpired = (token: string) => {
   try {
      const decoded = jwtDecode(token)
      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.exp ? decoded.exp < currentTime : true
   } catch (error) {
      console.log(error)
      return true
   }
}