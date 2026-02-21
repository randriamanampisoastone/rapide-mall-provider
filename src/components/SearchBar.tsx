import { Search, SlidersHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import langue from '@/data/language/SearchBar.json'
import useTranslate from '@/hooks/useTranslate'
import React, { useState } from 'react'
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { cn } from '@/lib/utils'
import RefetchButton from './customComponents/RefetchButton'

interface SearchBarProps {
   totalCount: number
   setSearchValue: React.Dispatch<React.SetStateAction<string>>
   filterItems: { name: string; key: string }[]
   searchFilter: string[]
   setSearchFilter: React.Dispatch<React.SetStateAction<string[]>>
   refetchFn: () => void
   customComponent?: React.ReactNode
   placeholder?: string
}

function SearchBar({
   totalCount,
   setSearchValue,
   filterItems,
   searchFilter,
   setSearchFilter,
   refetchFn,
   customComponent,
   placeholder,
}: SearchBarProps) {
   const translate = useTranslate(langue)
   const [value, setValue] = useState('')

   return (
      <div className='bg-[var(--background)] p-1 rounded-md'>
         <div className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center min-w-0 flex-1'>
            {filterItems.length > 0 && (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant={'outline'}
                        className='mr-1 shrink-0'
                     >
                        <SlidersHorizontal />{' '}
                        {searchFilter.length < 3 ? (
                           searchFilter.map((value) => (
                              <div
                                 key={value}
                                 className='border rounded-full px-2 text-xs w-16 overflow-hidden'
                              >
                                 <div
                                    style={{
                                       animation:
                                          'over-text-animation 5s linear infinite',
                                    }}
                                 >
                                    {translate(
                                       filterItems.find(
                                          (item) => item.key === value,
                                       )?.name ?? '',
                                    )}
                                 </div>
                              </div>
                           ))
                        ) : (
                           <div className='border rounded-full px-2 text-xs'>
                              {searchFilter.length} {translate('selected')}
                           </div>
                        )}
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     {filterItems.map((item) => (
                        <DropdownMenuCheckboxItem
                           key={item.key}
                           checked={searchFilter.includes(item.key)}
                           onCheckedChange={(checked) => {
                              if (checked) {
                                 setSearchFilter([...searchFilter, item.key])
                              } else {
                                 setSearchFilter(
                                    searchFilter.filter(
                                       (filter) => filter !== item.key,
                                    ),
                                 )
                              }
                           }}
                        >
                           {translate(item.name)}
                        </DropdownMenuCheckboxItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>
            )}
            <Input
               type='search'
               className={cn('rounded-r-none min-w-0 w-fit')}
               placeholder={
                  placeholder || translate('search_placeholder') + ' ...'
               }
               onChange={(event) => setValue(event.target.value)}
               onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                     setSearchValue(value)
                  }
                  if (event.key === 'Backspace' && value.length === 1) {
                     setSearchValue('')
                  }
               }}
               value={value}
            />
            <Button
               variant={'outline'}
               className='rounded-l-none shrink-0'
               onClick={() => setSearchValue(value)}
            >
               <Search />
            </Button>
         </div>
            <div className='flex flex-wrap items-center gap-2 lg:gap-4 lg:justify-end'>
               <RefetchButton refetchFn={refetchFn} />
               {customComponent}
               <div className='font-bold text-end text-xs shrink-0'>
                  <h2 className='text-[var(--green)]'>{translate('total')}</h2>
                  <p>{unitConvert(totalCount)}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SearchBar
