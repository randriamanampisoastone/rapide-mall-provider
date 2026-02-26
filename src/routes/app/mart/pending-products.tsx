import { useProviderGetPendingMartProductSubmissions } from '@/api/mart/provider.get.pending.mart.product.submissions.api'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import RefetchButton from '@/components/customComponents/RefetchButton'
import langue from '@/data/language/app/mart/PendingProducts.json'
import useTranslate from '@/hooks/useTranslate'
import { utcConvert } from '@/utils/utc.convert.util'
import { createFileRoute } from '@tanstack/react-router'
import { Clock3, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/app/mart/pending-products')({
   component: RouteComponent,
})

function RouteComponent() {
   const translate = useTranslate(langue)
   const [term, setTerm] = useState('')
   const { data, refetch, isLoading } =
      useProviderGetPendingMartProductSubmissions({
         refetchIntervalMs: 30_000,
      })

   const normalizedTerm = term.trim().toLowerCase()
   const filteredSubmissions = useMemo(() => {
      const list = data?.data ?? []
      if (!normalizedTerm) return list
      return list.filter((value) => {
         const productName =
            value.createPayload?.name ?? value.updatePayload?.name ?? ''
         const productId = value.updatePayload?.martProductId ?? ''
         return (
            value.providerBusinessName.toLowerCase().includes(normalizedTerm) ||
            productName.toLowerCase().includes(normalizedTerm) ||
            productId.toLowerCase().includes(normalizedTerm)
         )
      })
   }, [data?.data, normalizedTerm])

   const formatRemainingTime = (seconds: number) => {
      if (seconds <= 0) return translate('expired')
      const days = Math.floor(seconds / 86400)
      const hours = Math.floor((seconds % 86400) / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const secs = seconds % 60
      if (days > 0) return `${days}d ${hours}h`
      if (hours > 0) return `${hours}h ${minutes}m`
      if (minutes > 0) return `${minutes}m ${secs}s`
      return `${secs}s`
   }

   return (
      <div className='space-y-2'>
         <h1 className='text-2xl font-bold'>{translate('title')}</h1>
         <div className='flex items-center gap-2'>
            <div className='relative max-w-md flex-1'>
               <Search className='size-4 absolute top-2.5 left-2 text-[var(--gray)]' />
               <Input
                  className='pl-8'
                  placeholder={translate('search_placeholder')}
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
               />
            </div>
            <RefetchButton
               refetchFn={() => {
                  refetch()
               }}
            />
         </div>

         {isLoading && (
            <div className='text-sm text-[var(--gray)]'>{translate('loading')}</div>
         )}

         <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-2'>
            {filteredSubmissions.map((item) => {
               const productName =
                  item.createPayload?.name ??
                  item.updatePayload?.name ??
                  item.updatePayload?.martProductId ??
                  '-'
               return (
                  <div className='rounded-md border p-3 space-y-2'>
                     <div className='flex items-center justify-between'>
                        <h2 className='font-bold line-clamp-1'>{productName}</h2>
                        <Badge variant='outline'>
                           {item.submissionType === 'CREATE'
                              ? translate('create')
                              : translate('update')}
                        </Badge>
                     </div>
                     <div className='text-xs text-[var(--gray)] flex items-center gap-1'>
                        <Clock3 className='size-3' />
                        {utcConvert(item.submittedAt).toLocaleString()}
                     </div>
                     <div className='text-xs text-[var(--orange)]'>
                        {translate('expires_in')}{' '}
                        {formatRemainingTime(item.expiresInSeconds)}
                     </div>
                     <div className='text-sm'>
                        {translate('status')}:{' '}
                        <span className='font-bold'>
                           {(item.reviewStatus ?? 'PENDING') === 'APPROVED'
                              ? translate('approved')
                              : (item.reviewStatus ?? 'PENDING') === 'REJECTED'
                                ? translate('rejected')
                                : translate('pending_review')}
                        </span>
                     </div>
                  </div>
               )
            })}
         </div>

      </div>
   )
}
