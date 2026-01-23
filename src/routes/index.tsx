import { createFileRoute, Link } from '@tanstack/react-router'
import foodBackground from '../assets/images/background/food-background.png'
import about from '@/assets/images/about/about_us_illustration.png'
import TextWriteAnimation from '@/components/customComponents/TextWriteAnimation'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { AiOutlineDesktop } from 'react-icons/ai'
import Look from '@/components/navbar/AppProperties'
import langue from '@/data/language/LendingPage.json'
import useTranslate from '@/hooks/useTranslate'

export const Route = createFileRoute('/')({
   component: RouteComponent,
})

function RouteComponent() {
   const translate = useTranslate(langue)

   return (
      <div className='flex flex-col h-screen relative'>
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

         <div className='flex items-center gap-2 w-full justify-end z-50 p-3'>
            <Look />
         </div>

         <div className='w-full h-full flex flex-col items-center justify-center z-50'>
            <div className='size-100'>
               <img src={about} alt='about' />
            </div>
            <div className='h-20'>
               <TextWriteAnimation
                  texts={[
                     translate('welcome_message'),
                     'Your all needs everyday app',
                  ]}
                  className='font-bold text-3xl text-center'
               />
            </div>
            <div className='grid grid-cols-2 gap-5 w-100'>
               <Button
                  className='rounded-full cursor-pointer bg-[var(--background-secondary)] text-[var(--foreground)] font-bold hover:bg-[var(--background-secondary)] hover:scale-105 duration-300'
                  asChild
               >
                  <a href='https://rapideapp.mg' target='_blank'>
                     {translate('open_web_site')} <ArrowUpRight />
                  </a>
               </Button>
               <Button
                  className='rounded-full cursor-pointer bg-[var(--green-secondary)] text-[var(--green)] font-bold hover:bg-[var(--green-secondary)] hover:scale-105 duration-300'
                  asChild
               >
                  <Link to='/app'>
                     {translate('open_console')} <AiOutlineDesktop />
                  </Link>
               </Button>
            </div>
         </div>
      </div>
   )
}
