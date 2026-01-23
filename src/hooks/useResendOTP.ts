import { RESEND_OTP } from '@/constants/timer.constant'
import { useTimer } from 'react-timer-hook'

export const useResendOTP = () => {
   const time = new Date()
   time.setSeconds(time.getSeconds() + RESEND_OTP)

   const { minutes, seconds, restart } = useTimer({ expiryTimestamp: time })

   const restartResendOTP = () => {
      const time = new Date()
      time.setSeconds(time.getSeconds() + RESEND_OTP)
      restart(time)
   }

   return {
      minutes,
      seconds,
      restart: restartResendOTP,
   }
}
