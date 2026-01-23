import useTranslate from '@/hooks/useTranslate'
import langue from '@/data/language/NotFoundComponent.json'
import notFound from '@/assets/images/notFound/not_found.png'
function NotFound404Component({ item }: { item: string }) {
   const translate = useTranslate(langue)

   return (
      <div className='flex flex-col items-center justify-center h-[100vh] gap-2'>
         <img src={notFound} className='w-150 object-contain' />
         <p className='text-3xl sm:text-6xl text-[var(--gray)]'>
            {translate('no')} {item} {translate('found')}
         </p>
      </div>
   )
}

export default NotFound404Component
