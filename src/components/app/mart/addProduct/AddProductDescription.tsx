import langue from '@/data/language/app/mart/AddMartProduct.json'
import useTranslate from '@/hooks/useTranslate'
import { Button } from '@/components/ui/button'
import { Trash2, Type, TypeOutline } from 'lucide-react'
import { Input } from '@/components/ui/input'
import ScrollText from '@/components/ScrollText'

interface AddProductDescriptionProps {
   descriptions: string[]
   setDescriptions: (data: string[]) => void
}

function AddProductDescription({
   descriptions,
   setDescriptions,
}: AddProductDescriptionProps) {
   const translate = useTranslate(langue)

   return (
      <div>
         <h1 className='text-xl font-extrabold'>
            {translate('descriptions')} :
         </h1>

         <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-30 overflow-auto'>
            {descriptions.map((description, i) => {
               const hasKey = description.includes(': ')
               const key = hasKey ? description.split(': ')[0] : description
               const value = hasKey ? description.split(': ')[1] : description

               return (
                  <div key={i}>
                     {hasKey ? (
                        <div className='flex gap-3'>
                           <div className='w-1 rounded bg-[var(--blue)]' />

                           <div className='space-y-1 flex gap-1 flex-1'>
                              <Input
                                 placeholder={translate('key') + '...'}
                                 className='w-40'
                                 value={key}
                                 onChange={(e) => {
                                    const newDescriptions = [...descriptions]
                                    newDescriptions[i] =
                                       `${e.target.value}: ${value ?? ''}`
                                    setDescriptions(newDescriptions)
                                 }}
                              />
                              <Input
                                 placeholder={translate('value') + '...'}
                                 value={value}
                                 onChange={(e) => {
                                    const newDescriptions = [...descriptions]
                                    newDescriptions[i] =
                                       `${key ?? ''}: ${e.target.value}`
                                    setDescriptions(newDescriptions)
                                 }}
                              />
                           </div>

                           <Button
                              className='bg-[var(--red-secondary)] hover:bg-[var(--red-secondary)] text-[var(--red)] cursor-pointer'
                              onClick={() => {
                                 const copy = [...descriptions]
                                 copy.splice(i, 1)
                                 setDescriptions(copy)
                              }}
                           >
                              <Trash2 />
                           </Button>
                        </div>
                     ) : (
                        <div className='flex gap-3'>
                           <div className='w-1 rounded bg-[var(--blue)]' />

                           <Input
                              placeholder={translate('value') + '...'}
                              value={description}
                              onChange={(e) => {
                                 const newDescriptions = [...descriptions]
                                 newDescriptions[i] = e.target.value
                                 setDescriptions(newDescriptions)
                              }}
                           />

                           <Button
                              className='bg-[var(--red-secondary)] hover:bg-[var(--red-secondary)] text-[var(--red)] cursor-pointer'
                              onClick={() => {
                                 const copy = [...descriptions]
                                 copy.splice(i, 1)
                                 setDescriptions(copy)
                              }}
                           >
                              <Trash2 />
                           </Button>
                        </div>
                     )}
                  </div>
               )
            })}

            <div className={`grid grid-cols-2 gap-2`}>
               <Button
                  className='w-full bg-[var(--blue)] hover:bg-[var(--blue)] text-[var(--foreground)] font-extrabold cursor-pointer hover:border-2 border-[var(--foreground)] h-full'
                  onClick={() => {
                     setDescriptions([...descriptions, ': '])
                  }}
               >
                  <TypeOutline className='shrink-0' />
                  <ScrollText
                     text={translate('add_key_value')}
                     className='min-w-0 flex-1'
                  />
               </Button>
               <Button
                  className='w-full bg-[var(--blue)] hover:bg-[var(--blue)] text-[var(--foreground)] font-extrabold cursor-pointer hover:border-2 border-[var(--foreground)] h-full'
                  onClick={() => {
                     setDescriptions([...descriptions, ''])
                  }}
               >
                  <Type className='shrink-0' />
                  <ScrollText
                     text={translate('add_description')}
                     className='min-w-0 flex-1'
                  />
               </Button>
            </div>
         </div>
      </div>
   )
}

export default AddProductDescription
