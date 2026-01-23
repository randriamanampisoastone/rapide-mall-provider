import useTranslate from '@/hooks/useTranslate'
import { TbReportSearch } from 'react-icons/tb'
import langue from '@/data/language/NotFoundComponent.json'

function NotFoundComponent({ item }: { item: string }) {
   const translate = useTranslate(langue)

   return (
      <div className='flex flex-col flex-1 items-center justify-center h-full gap-2'>
         <TbReportSearch className='text-9xl text-[var(--gray)]' />
         <p className='text-3xl text-[var(--gray)]'>
            {translate('no')} {item} {translate('found')}
         </p>
      </div>
   )
}

export default NotFoundComponent
