import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { Button } from '@/components/ui/button'
import langue from '@/data/language/adminInfo/LogOut.json'
import useTranslate from '@/hooks/useTranslate'
import { removeToken } from '@/utils/token.util'
import { useRouter } from '@tanstack/react-router'

interface LogOutProps {
   open: boolean
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function LogOut({ open, setOpen }: LogOutProps) {
   const translate = useTranslate(langue)
   const navigation = useRouter()

   return (
      <ResponsiveDialog
         isOpen={open}
         setIsOpen={setOpen}
         title={translate('title_logout')}
      >
         <div className='grid grid-cols-2 min-w-90 gap-3'>
            <Button
               onClick={() => {
                  setOpen(false)
               }}
               className='w-full bg-[var(--green-secondary)] text-[var(--green)] hover:bg-[var(--green-secondary)] cursor-pointer hover:scale-110 duration-300'
            >
               {translate('cancel')}
            </Button>
            <Button
               onClick={() => {
                  removeToken()
                  navigation.navigate({ to: '/sign-in', replace: true })
               }}
               className='w-full bg-[var(--red-secondary)] text-[var(--red)] hover:bg-[var(--red-secondary)] cursor-pointer hover:scale-110 duration-300'
            >
               {translate('yes')}
            </Button>
         </div>
      </ResponsiveDialog>
   )
}

export default LogOut
