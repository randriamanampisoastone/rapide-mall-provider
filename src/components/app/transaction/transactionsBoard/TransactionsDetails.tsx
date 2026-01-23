import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaArrowRight } from 'react-icons/fa'
import { GiPayMoney } from 'react-icons/gi'
import { GoTasklist } from 'react-icons/go'
import type { IconType } from 'react-icons/lib'
import { SlPaperClip } from 'react-icons/sl'
import { TbCashBanknoteFilled, TbSitemapFilled } from 'react-icons/tb'
import { TiCalendarOutline } from 'react-icons/ti'
import langue from '@/data/language/app/finance/transactionsBoard/TransactionsDetails.json'
import useTranslate from '@/hooks/useTranslate'
import { useGetFullTransactionDetails } from '@/api/transaction/get.full.transaction.details'
import { ScaleLoader } from 'react-spinners'
import { unitConvert } from '@/utils/formats/unit.convert.utils'
import { format } from 'date-fns'
import { ImageViewer } from '@/components/ImageViewer'
import { useState } from 'react'

interface TransactionsDetailsProps {
   transactionIdToShow: string
   isShowDetailOpen: boolean
   setIsShowDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Items = ({
   name,
   value,
   Icon,
}: {
   name: string
   value: string
   Icon: IconType
}) => {
   return (
      <div className='flex justify-between text-nowrap items-center gap-1'>
         <h1 className='flex font-bold gap-2 items-center'>
            <Icon size={20} />
            <span>{name}: </span>
         </h1>
         <div className='border-b-2 border-dashed w-full p-2' />
         <p>{value}</p>
      </div>
   )
}

function TransactionsDetails({
   isShowDetailOpen,
   setIsShowDetailOpen,
   transactionIdToShow,
}: TransactionsDetailsProps) {
   const translate = useTranslate(langue)
   const {
      data: dataGetFullTransactionDetails,
      isSuccess: isGetFullTransactionDetailsSuccess,
   } = useGetFullTransactionDetails({ transactionId: transactionIdToShow })

   const [isSenderImageViewerOpen, setIsSenderImageViewerOpen] = useState(false)
   const [isReceiverImageViewerOpen, setIsReceiverImageViewerOpen] =
      useState(false)

   return (
      <>
         <ResponsiveDialog
            title=''
            isOpen={isShowDetailOpen}
            setIsOpen={setIsShowDetailOpen}
         >
            {isGetFullTransactionDetailsSuccess ? (
               <div>
                  <div className='flex justify-around items-center'>
                     {dataGetFullTransactionDetails.senderProfile && (
                        <div className='text-center flex flex-col items-center'>
                           <Avatar
                              className='cursor-pointer h-15 w-15'
                              onClick={() => setIsSenderImageViewerOpen(true)}
                           >
                              <AvatarImage
                                 src={
                                    dataGetFullTransactionDetails.senderProfile
                                       .profilePhoto
                                 }
                                 alt='@shadcn'
                              />
                              <AvatarFallback>
                                 {dataGetFullTransactionDetails.senderProfile.firstName
                                    .charAt(0)
                                    .toUpperCase()}
                                 {dataGetFullTransactionDetails.senderProfile
                                    .lastName &&
                                    dataGetFullTransactionDetails.senderProfile.lastName
                                       .charAt(0)
                                       .toUpperCase()}
                              </AvatarFallback>
                           </Avatar>
                           <div>
                              <p className='font-bold text-base truncate cursor-pointer'>
                                 {
                                    dataGetFullTransactionDetails.senderProfile
                                       .firstName
                                 }
                              </p>
                              <p className='font-bold text-xs opacity-60 truncate cursor-pointer'>
                                 {
                                    dataGetFullTransactionDetails.senderProfile
                                       .lastName
                                 }
                              </p>
                              <p className='font-bold text-xs opacity-60 truncate'>
                                 {
                                    dataGetFullTransactionDetails.senderProfile
                                       .phoneNumber
                                 }
                              </p>
                              <p className='font-bold text-xs opacity-60 truncate'>
                                 {dataGetFullTransactionDetails.senderSiteName}
                              </p>
                           </div>
                        </div>
                     )}
                     {dataGetFullTransactionDetails.receiverProfile &&
                        dataGetFullTransactionDetails.senderProfile && (
                           <FaArrowRight />
                        )}
                     {dataGetFullTransactionDetails.receiverProfile && (
                        <div className='text-center flex flex-col items-center'>
                           <Avatar
                              className='cursor-pointer h-15 w-15'
                              onClick={() => setIsReceiverImageViewerOpen(true)}
                           >
                              <AvatarImage
                                 src={
                                    dataGetFullTransactionDetails
                                       .receiverProfile.profilePhoto
                                 }
                                 alt='@shadcn'
                              />
                              <AvatarFallback>
                                 {dataGetFullTransactionDetails.receiverProfile.firstName
                                    .charAt(0)
                                    .toUpperCase()}
                                 {dataGetFullTransactionDetails.receiverProfile
                                    .lastName &&
                                    dataGetFullTransactionDetails.receiverProfile.lastName
                                       .charAt(0)
                                       .toUpperCase()}
                              </AvatarFallback>
                           </Avatar>
                           <div>
                              <p className='font-bold text-base truncate cursor-pointer'>
                                 {
                                    dataGetFullTransactionDetails
                                       .receiverProfile.firstName
                                 }
                              </p>
                              <p className='font-bold text-xs opacity-60 truncate cursor-pointer'>
                                 {
                                    dataGetFullTransactionDetails
                                       .receiverProfile.lastName
                                 }
                              </p>

                              <p className='font-bold text-xs opacity-60 truncate'>
                                 {
                                    dataGetFullTransactionDetails
                                       .receiverProfile.phoneNumber
                                 }
                              </p>
                              <p className='font-bold text-xs opacity-60 truncate'>
                                 {
                                    dataGetFullTransactionDetails.receiverSiteName
                                 }
                              </p>
                           </div>
                        </div>
                     )}
                  </div>
                  <hr className='mt-2 mb-2' />
                  <div>
                     <Items
                        name={translate('reference')}
                        value={String(
                           dataGetFullTransactionDetails.reference,
                        ).padStart(6, '0')}
                        Icon={SlPaperClip}
                     />
                     {dataGetFullTransactionDetails.mvolaReference && (
                        <Items
                           name={translate('mvola_reference')}
                           value={dataGetFullTransactionDetails.mvolaReference}
                           Icon={SlPaperClip}
                        />
                     )}
                     {dataGetFullTransactionDetails.orangeMoneyReference && (
                        <Items
                           name={translate('orange_money_reference')}
                           value={
                              dataGetFullTransactionDetails.orangeMoneyReference
                           }
                           Icon={SlPaperClip}
                        />
                     )}
                     {dataGetFullTransactionDetails.cardReference && (
                        <Items
                           name={translate('card_reference')}
                           value={dataGetFullTransactionDetails.cardReference}
                           Icon={SlPaperClip}
                        />
                     )}
                     <Items
                        name={translate('status')}
                        value={translate(
                           dataGetFullTransactionDetails.transactionStatus,
                        )}
                        Icon={GoTasklist}
                     />
                     <Items
                        name={translate('action')}
                        value={translate(
                           dataGetFullTransactionDetails.transactionAction,
                        )}
                        Icon={GiPayMoney}
                     />
                     {dataGetFullTransactionDetails.rideInvoiceId && (
                        <Items
                           name={translate('item')}
                           value='RIDE'
                           Icon={TbSitemapFilled}
                        />
                     )}
                     <Items
                        name={translate('amount')}
                        value={
                           unitConvert(dataGetFullTransactionDetails.amount) +
                           ' ' +
                           dataGetFullTransactionDetails.currency
                        }
                        Icon={TbCashBanknoteFilled}
                     />
                     {dataGetFullTransactionDetails.fees > 0 && (
                        <Items
                           name={translate('fees')}
                           value={
                              unitConvert(dataGetFullTransactionDetails.fees) +
                              ' %'
                           }
                           Icon={TbCashBanknoteFilled}
                        />
                     )}
                     <Items
                        name={translate('total')}
                        value={
                           unitConvert(dataGetFullTransactionDetails.total) +
                           ' ' +
                           dataGetFullTransactionDetails.currency
                        }
                        Icon={TbCashBanknoteFilled}
                     />
                     <Items
                        name={translate('source')}
                        value={translate(
                           dataGetFullTransactionDetails.transactionMethod
                              .split('_TO_')[0]
                              .toLowerCase(),
                        )}
                        Icon={GiPayMoney}
                     />
                     <Items
                        name={translate('destination')}
                        value={translate(
                           dataGetFullTransactionDetails.transactionMethod
                              .split('_TO_')[1]
                              .toLowerCase(),
                        )}
                        Icon={GiPayMoney}
                     />
                     <Items
                        name={translate('date')}
                        value={format(
                           dataGetFullTransactionDetails.createdAt,
                           'dd MMM yyyy - HH:mm:ss',
                        )}
                        Icon={TiCalendarOutline}
                     />
                     {dataGetFullTransactionDetails.description && (
                        <div>
                           <h4 className='font-bold'>
                              {translate('description')} :
                           </h4>
                           <p className='border rounded-md py-1 px-2 text-justify text-muted-foreground font-bold text-xs'>
                              {dataGetFullTransactionDetails.description}
                           </p>
                        </div>
                     )}
                  </div>
               </div>
            ) : (
               <div className='w-full h-full flex items-center justify-center'>
                  <ScaleLoader color='var(--green)' />
               </div>
            )}
         </ResponsiveDialog>

         {dataGetFullTransactionDetails?.senderProfile && (
            <ImageViewer
               firstName={
                  dataGetFullTransactionDetails?.senderProfile.firstName || ''
               }
               lastName={
                  dataGetFullTransactionDetails?.senderProfile.lastName || ''
               }
               isOpen={isSenderImageViewerOpen}
               setIsOpen={setIsSenderImageViewerOpen}
            />
         )}

         {dataGetFullTransactionDetails?.receiverProfile && (
            <ImageViewer
               firstName={
                  dataGetFullTransactionDetails?.receiverProfile.firstName || ''
               }
               lastName={
                  dataGetFullTransactionDetails?.receiverProfile.lastName || ''
               }
               isOpen={isReceiverImageViewerOpen}
               setIsOpen={setIsReceiverImageViewerOpen}
            />
         )}
      </>
   )
}

export default TransactionsDetails
