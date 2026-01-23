import logoLight from '@/assets/images/logo/logo_light.png'
import logoDark from '@/assets/images/logo/logo_dark.png'
import { PhoneInput } from '../phoneNumber/PhoneInput'
import { Button } from '../ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '../ui/card'
import { useEffect, useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useResendOTP } from '@/hooks/useResendOTP'
import { useTheme } from '../ThemeProvider'
import langue from '@/data/language/signIn/SignIn.json'
import useTranslate from '@/hooks/useTranslate'
import { useSignIn } from '@/api/auth/sign.in.api'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { PropagateLoader } from 'react-spinners'
import { useConfirmSignIn } from '@/api/auth/confirm.sign.in.api'
import { PlatformOS } from '@/enums/platform.os.enum'
import { useResendConfirmSignIn } from '@/api/auth/resend.confirmation.code.sign.in.api'
import { FaWhatsapp } from 'react-icons/fa'
import { MdOutlineSms } from 'react-icons/md'

function SignIn() {
   const translate = useTranslate(langue)
   const [showOTP, setShowOTP] = useState(false)
   const [phoneNumber, setPhoneNumber] = useState('')

   const { minutes, seconds, restart } = useResendOTP()
   const { theme } = useTheme()
   const locale = useSelector((state: RootState) => state.language.locale)

   const {
      mutate: mutateSignIn,
      isPending: isPendingSignIn,
      isSuccess: isSuccessSignIn,
   } = useSignIn()

   const { mutate: mutateConfirmSignIn, isPending: isPendingConfirmSignIn } =
      useConfirmSignIn()

   const {
      mutate: mutateResendConfirmSignIn,
      isPending: isPendingResendConfirmSignIn,
   } = useResendConfirmSignIn()

   useEffect(() => {
      if (isSuccessSignIn) {
         setShowOTP(true)
         restart()
      }
   }, [isSuccessSignIn])

   const handleSignIn = (method: 'sms' | 'whatsapp') => {
      mutateSignIn({
         phoneNumber,
         roles: [],
         locale,
         method,
      })
   }

   const handleConfirmSignIn = (otp: string) => {
      mutateConfirmSignIn({
         phoneNumber,
         confirmationCode: otp,
         platformOS: PlatformOS.DESKTOP,
         locale,
      })
   }

   const handleResendConfirmSignIn = () => {
      restart()
      mutateResendConfirmSignIn({
         phoneNumber,
         locale,
      })
   }

   return showOTP ? (
      <Card className='w-[400px] bg-[var(--background-secondary)]'>
         <CardHeader>
            <CardTitle>
               <div className='grid flex-1 text-left text-sm leading-tight'>
                  <img
                     src={theme === 'dark' ? logoLight : logoDark}
                     alt='logo'
                     className='w-50 m-auto'
                  />
               </div>
            </CardTitle>
            <hr />
            <CardDescription className='text-center'>
               {translate('otp-message')}
            </CardDescription>
         </CardHeader>
         <CardContent className='flex justify-center'>
            <InputOTP
               maxLength={6}
               className='w-full'
               pattern={REGEXP_ONLY_DIGITS}
               onComplete={handleConfirmSignIn}
            >
               <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
               </InputOTPGroup>
            </InputOTP>
         </CardContent>
         <CardFooter className='grid grid-cols-2 gap-2'>
            <Button
               className='w-full bg-[var(--red)] hover:bg-[var(--red)] hover:scale-102 font-bold cursor-pointer'
               onClick={() => setShowOTP(false)}
               disabled={isPendingResendConfirmSignIn || isPendingConfirmSignIn}
            >
               {translate('back')}
            </Button>
            <Button
               className={`w-full bg-[var(--green)] hover:bg-[var(--green)] hover:scale-102 font-bold ${(minutes > 0 || seconds > 0) && 'bg-[var(--gray)]'} cursor-pointer`}
               disabled={
                  minutes > 0 ||
                  seconds > 0 ||
                  isPendingResendConfirmSignIn ||
                  isPendingConfirmSignIn
               }
               onClick={handleResendConfirmSignIn}
            >
               {isPendingResendConfirmSignIn || isPendingConfirmSignIn ? (
                  <PropagateLoader
                     color='white'
                     size={8}
                     speedMultiplier={0.8}
                  />
               ) : (
                  <>
                     {translate('resend')}{' '}
                     {(minutes > 0 || seconds > 0) &&
                        `(${minutes}m ${seconds}s)`}
                  </>
               )}
            </Button>
         </CardFooter>
      </Card>
   ) : (
      <Card className='w-[400px] bg-[var(--background-secondary)]'>
         <CardHeader>
            <CardTitle>
               <div className='grid flex-1 text-left text-sm leading-tight'>
                  <img
                     src={theme === 'dark' ? logoLight : logoDark}
                     alt='logo'
                     className='w-50 m-auto'
                  />
               </div>
               <hr />
               <h1 className='text-2xl text-center'>{translate('sign-in')}</h1>
            </CardTitle>
            <CardDescription className='text-center'>
               {translate('welcome-message')}
            </CardDescription>
         </CardHeader>
         <CardContent className='flex flex-col gap-3'>
            {/*Phone Number*/}
            <PhoneInput
               className='w-full'
               defaultCountry='MG'
               onChange={setPhoneNumber}
               value={phoneNumber}
               onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                     handleSignIn('sms')
                  }
               }}
            />
         </CardContent>

         <CardFooter className='flex flex-col gap-2'>
            <Button
               className={`w-full bg-[var(--green)] bg-[var(${isPendingSignIn ? '--gray' : '--green'})] hover:bg-[var(${isPendingSignIn ? '--gray' : '--green'})] hover:scale-101 font-bold`}
               onClick={() => handleSignIn('sms')}
               disabled={isPendingSignIn}
            >
               {isPendingSignIn ? (
                  <PropagateLoader
                     color='white'
                     size={8}
                     speedMultiplier={0.8}
                  />
               ) : (
                  <>
                     <MdOutlineSms /> {translate('sign-in-by-sms')}
                  </>
               )}
            </Button>
            <Button
               className={`w-full bg-[var(--green)] bg-[var(${isPendingSignIn ? '--gray' : '--green'})] hover:bg-[var(${isPendingSignIn ? '--gray' : '--green'})] hover:scale-101 font-bold`}
               onClick={() => handleSignIn('whatsapp')}
               disabled={isPendingSignIn}
            >
               {isPendingSignIn ? (
                  <PropagateLoader
                     color='white'
                     size={8}
                     speedMultiplier={0.8}
                  />
               ) : (
                  <>
                     <FaWhatsapp /> {translate('sign-in-by-whatsapp')}
                  </>
               )}
            </Button>
         </CardFooter>
      </Card>
   )
}

export default SignIn
