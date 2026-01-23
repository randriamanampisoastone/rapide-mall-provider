import usaFlag from '@/assets/images/flag/usa.png'
import franceFlag from '@/assets/images/flag/france.png'
import madagascarFlag from '@/assets/images/flag/madagascar.png'
import chinaFlag from '@/assets/images/flag/china.png'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useTheme } from '../ThemeProvider'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { changeLanguage } from '@/redux/slices/language.slice'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '../ui/select'
import langue from '@/data/language/Navbar.json'
import useTranslate from '@/hooks/useTranslate'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'

function AppProperties() {
   const { theme, setTheme } = useTheme()
   const translate = useTranslate(langue)
   const dispatch = useDispatch()
   const locale = useSelector((state: RootState) => state.language.locale)
   return (
      <div className='flex items-center gap-2'>
         <HoverCard>
            <HoverCardTrigger className='cursor-pointer' asChild>
               <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
               >
                  {theme === 'dark' ? (
                     <MdLightMode className='text-2xl' />
                  ) : (
                     <MdDarkMode className='text-2xl' />
                  )}
               </button>
            </HoverCardTrigger>
            <HoverCardContent className='flex justify-center w-35'>
               {translate(theme === 'light' ? 'light' : 'dark')}
            </HoverCardContent>
         </HoverCard>

         <Select
            value={locale}
            onValueChange={(val) => dispatch(changeLanguage(val))}
         >
            <SelectTrigger className='cursor-pointer'>
               <SelectValue placeholder={translate('language')} />
            </SelectTrigger>
            <SelectContent>
               <SelectItem
                  value='en'
                  className='flex items-center gap-2 cursor-pointer'
               >
                  <img src={usaFlag} alt='flag' className='h-4' />
                  <span className='hidden md:inline'>
                     {translate('english')}
                  </span>
               </SelectItem>
               <SelectItem
                  value='fr'
                  className='flex items-center gap-2 cursor-pointer'
               >
                  <img src={franceFlag} alt='flag' className='h-4' />
                  <span className='hidden md:inline'>
                     {translate('french')}
                  </span>
               </SelectItem>
               <SelectItem
                  value='mg'
                  className='flex items-center gap-2 cursor-pointer'
               >
                  <img src={madagascarFlag} alt='flag' className='h-4' />
                  <span className='hidden md:inline'>
                     {translate('malagasy')}
                  </span>
               </SelectItem>
               <SelectItem
                  value='zh'
                  className='flex items-center gap-2 cursor-pointer'
               >
                  <img src={chinaFlag} alt='flag' className='h-4' />
                  <span className='hidden md:inline'>
                     {translate('chinese')}
                  </span>
               </SelectItem>
            </SelectContent>
         </Select>
      </div>
   )
}

export default AppProperties
