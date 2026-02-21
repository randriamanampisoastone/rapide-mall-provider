import { useProviderGetPendingMartProductSubmissions } from '@/api/mart/provider.get.pending.mart.product.submissions.api'
import { useProviderGetMartProductReviewDecisions } from '@/api/mart/provider.get.mart.product.review.decisions.api'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import RefetchButton from '@/components/customComponents/RefetchButton'
import langue from '@/data/language/app/mart/PendingProducts.json'
import useTranslate from '@/hooks/useTranslate'
import { utcConvert } from '@/utils/utc.convert.util'
import { createFileRoute } from '@tanstack/react-router'
import { Clock3, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { infoSound } from '@/utils/audio.player.util'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'

export const Route = createFileRoute('/app/mart/pending-products')({
   component: RouteComponent,
})

const EVENT_MART_PRODUCT_REVIEW_DECISION = 'martProductReviewDecision'

function RouteComponent() {
   const translate = useTranslate(langue)
   const socket = useSelector((state: RootState) => state.socket.socket)
   const [term, setTerm] = useState('')
   const { data, refetch, isLoading } =
      useProviderGetPendingMartProductSubmissions({
         refetchIntervalMs: 30_000,
      })
   const { data: decisionData, refetch: refetchDecision } =
      useProviderGetMartProductReviewDecisions({
         page: 1,
         pageSize: 10,
         refetchIntervalMs: 30_000,
      })
   const previousDecisionCountRef = useRef(0)

   useEffect(() => {
      const count = decisionData?.totalCount ?? 0
      if (previousDecisionCountRef.current === 0) {
         previousDecisionCountRef.current = count
         return
      }

      // If socket is available, realtime event handles sound/toast to avoid duplicates.
      if (socket) {
         previousDecisionCountRef.current = count
         return
      }

      if (count > previousDecisionCountRef.current) {
         const latest = decisionData?.data?.[0]
         if (latest) {
            infoSound.play()
            toast.info(
               latest.decision === 'APPROVED'
                  ? `${latest.productName || 'Product'} ${translate('approved')}`
                  : `${latest.productName || 'Product'} ${translate('rejected')}`,
            )
         }
      }
      previousDecisionCountRef.current = count
   }, [decisionData, translate, socket])

   useEffect(() => {
      if (!socket) return

      const onDecision = (latest: { decision: 'APPROVED' | 'REJECTED'; productName?: string }) => {
         infoSound.play()
         toast.info(
            latest.decision === 'APPROVED'
               ? `${latest.productName || 'Product'} ${translate('approved')}`
               : `${latest.productName || 'Product'} ${translate('rejected')}`,
         )
         refetchDecision()
         refetch()
      }

      socket.on(EVENT_MART_PRODUCT_REVIEW_DECISION, onDecision)
      return () => {
         socket.off(EVENT_MART_PRODUCT_REVIEW_DECISION, onDecision)
      }
   }, [socket, refetchDecision, refetch, translate])

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
                  refetchDecision()
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

         <div className='space-y-2'>
            <h2 className='font-bold text-lg'>{translate('recent_decisions')}</h2>
            <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-2'>
               {(decisionData?.data ?? []).map((item) => (
                  <div className='rounded-md border p-3 space-y-2'>
                     <div className='flex items-center justify-between'>
                        <h3 className='font-bold line-clamp-1'>
                           {item.productName || item.submissionId.slice(0, 8)}
                        </h3>
                        <Badge
                           className={
                              item.decision === 'APPROVED'
                                 ? 'bg-[var(--green)] text-white'
                                 : 'bg-[var(--red)] text-white'
                           }
                        >
                           {item.decision === 'APPROVED'
                              ? translate('approved')
                              : translate('rejected')}
                        </Badge>
                     </div>
                     <div className='text-xs text-[var(--gray)] flex items-center gap-1'>
                        <Clock3 className='size-3' />
                        {utcConvert(item.reviewedAt).toLocaleString()}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
