import useTranslate from '@/hooks/useTranslate'
import langue from '@/data/language/sidebar/DataSidebar.json'
import { HandCoinsIcon, ShoppingCartIcon, type LucideIcon } from 'lucide-react'
import type { IconType } from 'react-icons/lib'

export const useDataSidebar = () => {
   const translate = useTranslate(langue)

   const dataSidebar: {
      title: string
      url?: string
      icon?: LucideIcon | IconType
      isActive?: boolean
      items?: {
         title: string
         url: string
      }[]
   }[] = [
      // Car
      {
         title: translate('mart'),
         url: '/app/mart',
         icon: ShoppingCartIcon,
         items: [
            { title: translate('add_product'), url: '/add-product' },
            { title: translate('all_products'), url: '/all-products' },
            { title: translate('orders'), url: '/orders' },
         ],
      },
      {
         title: translate('transactions'),
         url: '/app/transactions',
         icon: HandCoinsIcon,
         items: [],
      },
   ]

   return { dataSidebar }
}
