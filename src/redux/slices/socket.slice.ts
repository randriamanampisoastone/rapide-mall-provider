import { API_BASE_URL } from '@/constants/api.constant'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { io, Socket } from 'socket.io-client'

interface SocketState {
   socket: Socket | null
   isConnected: boolean
}

const initialState: SocketState = {
   socket: null,
   isConnected: false,
}

const socketSlice = createSlice({
   name: 'socket',
   initialState,
   reducers: {
      connectSocket: (state, action: PayloadAction<string>) => {
         if (!state.socket) {
            const socket = io(API_BASE_URL, {
               transports: ['websocket'],
               reconnection: true,
               reconnectionAttempts: Infinity,
               reconnectionDelay: 1000,
               reconnectionDelayMax: 5000,
               auth: { token: action.payload },
            })
            ;(state.socket as any) = socket
         }
      },
      disconnectSocket: (state) => {
         state.socket?.disconnect()
         state.socket = null
         state.isConnected = false
      },
      setIsConnected: (state, action: PayloadAction<boolean>) => {
         state.isConnected = action.payload
      },
   },
})

export const { connectSocket, disconnectSocket, setIsConnected } =
   socketSlice.actions
export default socketSlice.reducer
