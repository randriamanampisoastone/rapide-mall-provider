import { useEffect, useState } from 'react'
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from './ui/pagination'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectSeparator,
   SelectTrigger,
   SelectValue,
} from './ui/select'
import useTranslate from '@/hooks/useTranslate'
import langue from '@/data/language/PaginationBar.json'

interface PaginationBarProps {
   totalElement: number
   pageSetting: { page: number; pageSize: number }
   setPageSetting: React.Dispatch<
      React.SetStateAction<{ page: number; pageSize: number }>
   >
}

function PaginationBar({
   totalElement,
   pageSetting,
   setPageSetting,
}: PaginationBarProps) {
   const translate = useTranslate(langue)
   const [maxPageSize, setMaxPageSize] = useState<number>(1)
   const [showPagination, setShowPagination] = useState<boolean>(false)

   useEffect(() => {
      setMaxPageSize(Math.ceil(totalElement / pageSetting.pageSize))
   }, [totalElement, pageSetting.pageSize])

   const handleIncreasePage = () => {
      if (maxPageSize >= pageSetting.page + 1) {
         setPageSetting({
            ...pageSetting,
            page: pageSetting.page + 1,
         })
      }
   }
   const handleDecreasePage = () => {
      if (pageSetting.page !== 1) {
         setPageSetting({
            ...pageSetting,
            page: pageSetting.page > 1 ? pageSetting.page - 1 : 1,
         })
      }
   }

   return (
      <Pagination className='w-full'>
         <PaginationContent
            className={cn('fixed flex flex-col gap-0 duration-300 -space-y-1', {
               'bottom-3': showPagination,
               '-bottom-12': !showPagination,
            })}
         >
            <div
               className='bg-[var(--background-secondary)] text-[var(--foreground)] rounded-t-md px-3 border-2 border-b-4 border-b-[var(--background-secondary)] z-10'
               onClick={() => setShowPagination(!showPagination)}
            >
               {showPagination ? <ChevronDown /> : <ChevronUp />}
            </div>
            <div className='flex items-center bg-[var(--background-secondary)] rounded-md border-2 p-1 gap-1'>
               <div className='text-muted-foreground text-xs font-bold flex items-center gap-2'>
                  <Select
                     defaultValue={pageSetting.pageSize.toString()}
                     onValueChange={(value) =>
                        setPageSetting({
                           page: 1,
                           pageSize: parseInt(value),
                        })
                     }
                  >
                     <SelectTrigger className='cursor-pointer'>
                        <SelectValue placeholder='PageSize' />
                     </SelectTrigger>
                     <SelectContent>
                        <h1 className='font-bold text-center'>
                           {translate('page_size')}
                        </h1>
                        <SelectSeparator />
                        <SelectItem value='10' className='cursor-pointer'>
                           10
                        </SelectItem>
                        <SelectItem value='20' className='cursor-pointer'>
                           20
                        </SelectItem>
                        <SelectItem value='30' className='cursor-pointer'>
                           30
                        </SelectItem>
                        <SelectItem value='40' className='cursor-pointer'>
                           40
                        </SelectItem>
                        <SelectItem value='50' className='cursor-pointer'>
                           50
                        </SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <PaginationItem>
                  <PaginationPrevious
                     className={cn('cursor-pointer', {
                        'cursor-not-allowed': pageSetting.page === 1,
                     })}
                     onClick={() => handleDecreasePage()}
                  />
               </PaginationItem>

               <PaginationItem>
                  {maxPageSize > 1 && (
                     <>
                        {pageSetting.page + 1 <= maxPageSize && (
                           <PaginationLink
                              onClick={() =>
                                 setPageSetting({
                                    ...pageSetting,
                                    page: pageSetting.page + 1,
                                 })
                              }
                              className='cursor-pointer'
                           >
                              {pageSetting.page + 1}
                           </PaginationLink>
                        )}
                        {pageSetting.page + 2 <= maxPageSize && (
                           <PaginationLink
                              onClick={() =>
                                 setPageSetting({
                                    ...pageSetting,
                                    page: pageSetting.page + 2,
                                 })
                              }
                              className='cursor-pointer'
                           >
                              {pageSetting.page + 2}
                           </PaginationLink>
                        )}
                        {pageSetting.page + 3 <= maxPageSize && (
                           <PaginationLink
                              onClick={() =>
                                 setPageSetting({
                                    ...pageSetting,
                                    page: pageSetting.page + 3,
                                 })
                              }
                              className='cursor-pointer'
                           >
                              {pageSetting.page + 3}
                           </PaginationLink>
                        )}
                     </>
                  )}
               </PaginationItem>

               <PaginationItem>
                  <PaginationNext
                     className={cn('cursor-pointer', {
                        'cursor-not-allowed': pageSetting.page === maxPageSize,
                     })}
                     onClick={handleIncreasePage}
                  />
               </PaginationItem>

               <div className='text-muted-foreground text-xs font-bold'>
                  {pageSetting.page} / {maxPageSize} {translate('page')}
               </div>
            </div>
         </PaginationContent>
      </Pagination>
   )
}

export default PaginationBar
