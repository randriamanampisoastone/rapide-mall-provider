import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import langue from '@/data/language/customComponents/ServiceTypeIcon.json'
import useTranslate from '@/hooks/useTranslate'
import { ServiceEnum } from '@/enums/service.enum'
import {
   HamburgerIcon,
   PackageIcon,
   RouteIcon,
   ShoppingCartIcon,
} from 'lucide-react'

interface ServiceTypeIconProps {
   className?: string
   serviceType: ServiceEnum
}

function ServiceTypeIcon({ className, serviceType }: ServiceTypeIconProps) {
   const translate = useTranslate(langue)

   switch (serviceType) {
      case ServiceEnum.RIDE:
         return (
            <HoverCard>
               <HoverCardTrigger className='cursor-pointer' asChild>
                  <RouteIcon
                     size={30}
                     className={className ?? '' + 'text-[var(--green)] size-6'}
                  />
               </HoverCardTrigger>
               <HoverCardContent className='flex justify-center w-35 font-bold text-center'>
                  {translate('ride')}
               </HoverCardContent>
            </HoverCard>
         )
      case ServiceEnum.EXPRESS:
         return (
            <HoverCard>
               <HoverCardTrigger className='cursor-pointer' asChild>
                  <PackageIcon
                     size={30}
                     className={className ?? '' + 'text-[var(--green)] size-6'}
                  />
               </HoverCardTrigger>
               <HoverCardContent className='flex justify-center w-35 font-bold text-center'>
                  {translate('express')}
               </HoverCardContent>
            </HoverCard>
         )
      case ServiceEnum.FOOD:
         return (
            <HoverCard>
               <HoverCardTrigger className='cursor-pointer' asChild>
                  <HamburgerIcon
                     size={30}
                     className={className ?? '' + 'text-[var(--green)] size-6'}
                  />
               </HoverCardTrigger>
               <HoverCardContent className='flex justify-center w-35 font-bold text-center'>
                  {translate('food')}
               </HoverCardContent>
            </HoverCard>
         )
      case ServiceEnum.MART:
         return (
            <HoverCard>
               <HoverCardTrigger className='cursor-pointer' asChild>
                  <ShoppingCartIcon
                     size={30}
                     className={className ?? '' + 'text-[var(--green)] size-6'}
                  />
               </HoverCardTrigger>
               <HoverCardContent className='flex justify-center w-35 font-bold text-center'>
                  {translate('mart')}
               </HoverCardContent>
            </HoverCard>
         )
   }
}

export default ServiceTypeIcon
