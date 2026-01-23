import Look from '@/components/navbar/AppProperties'
import SignIn from '@/components/signIn/SignIn'
import { createFileRoute } from '@tanstack/react-router'
import foodBackground from '../assets/images/background/food-background.png'
import signInImg from '@/assets/images/auth/signIn.png'

export const Route = createFileRoute('/sign-in')({
   component: RouteComponent,
})

function RouteComponent() {
   return (
      <div className='p-2 flex flex-col h-screen relative'>
         <div
            className='absolute inset-0 z-0'
            style={{
               WebkitMaskImage: `url("${foodBackground}")`,
               maskImage: `url("${foodBackground}")`,
               WebkitMaskRepeat: 'no-repeat',
               maskRepeat: 'no-repeat',
               WebkitMaskSize: 'cover',
               maskSize: 'cover',
               backgroundColor: 'var(--green)',
            }}
         />
         <div className='relative z-10 flex flex-col h-full gap-5'>
            <div className='flex items-center gap-2 w-full justify-end'>
               <Look />
            </div>
            <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 items-center gap-5'>
               <div className='m-auto'>
                  <SignIn />
               </div>
               <div className='m-auto'>
                  <img src={signInImg} alt='sign-in' />
               </div>
            </div>
         </div>
      </div>
   )
}
