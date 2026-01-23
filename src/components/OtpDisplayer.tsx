import { UserRole } from '@/enums/profile.enum'
import type { RootState } from '@/redux/store'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

function OtpDisplayer() {
   const otps = useSelector((state: RootState) => state.otp.otps)
   const ownerRoles = useSelector((state: RootState) => state.hostOwner.roles)
   return (
      <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
         {[...otps]
            .reverse()
            .filter(() =>
               ownerRoles.some((role) =>
                  [UserRole.CTO, UserRole.SUPER_ADMIN].includes(role),
               ),
            )
            .map((item) => (
               <div
                  key={item.createdAt}
                  className='rounded-md bg-[var(--background-secondary)] p-2 text-xs'
               >
                  <p>
                     <span className='font-bold'>Created At :</span>{' '}
                     {format(
                        new Date(item.createdAt),
                        'EEEE dd MMMM yyyy - HH:mm',
                     )}
                  </p>
                  <p>
                     <span className='font-bold'>Phone number :</span>{' '}
                     {item.phoneNumber}
                  </p>
                  <p>
                     <span className='font-bold'>Otp code :</span> {item.otp}
                  </p>
                  <p>
                     <span className='font-bold'>Motif :</span> {item.motif}
                  </p>
               </div>
            ))}
      </div>
   )
}

export default OtpDisplayer
