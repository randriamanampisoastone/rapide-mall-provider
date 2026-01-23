import { ImageViewer } from '@/components/ImageViewer'
import ScrollText from '@/components/ScrollText'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatTimeDifference } from '@/utils/formats/time.utils'
import { Image, Plus, SendHorizonal, X } from 'lucide-react'
import { useState } from 'react'
import langue from '@/data/language/app/mart/MartDetail.json'
import useTranslate from '@/hooks/useTranslate'

const fakeCommentData = [
   {
      firstName: 'RAZAFIMAHALEO',
      lastName: 'Andriniaina Tsiresy',
      phoneNumber: '+261330000000',
      profilePhoto:
         'https://i.pinimg.com/736x/bb/00/fb/bb00fbabd0a58d0bc918cb8bd5664837.jpg',
      commend:
         "It's a good product, I chose this one and since then I don't have any problem.",
      photos: [
         'https://i.pinimg.com/1200x/fe/f7/b3/fef7b3cbaeb59afc974ab04dd20741e6.jpg',
      ],
      createdAt: '2025-12-28T09:15:00.000Z',
   },
   {
      firstName: 'RABE',
      lastName: 'Jean Claude',
      phoneNumber: '+261340112233',
      profilePhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      commend:
         'Very fast laptop, perfect for programming and daily work. Battery life is really impressive.',
      photos: [
         'https://i.pinimg.com/736x/0a/78/3a/0a783a7a351fea2aa95fc28162196471.jpg',
      ],
      createdAt: '2025-12-29T14:42:00.000Z',
   },
   {
      firstName: 'RANJARISON',
      lastName: 'Nomena',
      phoneNumber: '+261320445566',
      profilePhoto: 'https://randomuser.me/api/portraits/women/45.jpg',
      commend:
         'Good value for money. I use it for design and light video editing, no overheating so far.',
      photos: [],
      createdAt: '2025-12-30T08:05:00.000Z',
   },
   {
      firstName: 'ANDRIAMAMONJY',
      lastName: 'Kevin',
      phoneNumber: '+261380778899',
      profilePhoto: 'https://randomuser.me/api/portraits/men/76.jpg',
      commend:
         'The screen quality is amazing and the keyboard is very comfortable. Totally recommended for students.',
      photos: [
         'https://i.pinimg.com/736x/19/87/d7/1987d79828b7a3522578bb72ca8770f3.jpg',
         'https://i.pinimg.com/736x/ee/45/c3/ee45c3733115b281d74fbd7d13f6bb0f.jpg',
         'https://i.pinimg.com/736x/19/87/d7/1987d79828b7a3522578bb72ca8770f3.jpg',
         'https://i.pinimg.com/736x/ee/45/c3/ee45c3733115b281d74fbd7d13f6bb0f.jpg',
         'https://i.pinimg.com/736x/19/87/d7/1987d79828b7a3522578bb72ca8770f3.jpg',
         'https://i.pinimg.com/736x/ee/45/c3/ee45c3733115b281d74fbd7d13f6bb0f.jpg',
      ],
      createdAt: '2026-01-01T17:30:00.000Z',
   },
   {
      firstName: 'RASOLO',
      lastName: 'Mialy',
      phoneNumber: '+261331234567',
      profilePhoto: 'https://randomuser.me/api/portraits/women/12.jpg',
      commend:
         'I bought this laptop for office work and online meetings. It is silent, fast, and easy to carry.',
      photos: [],
      createdAt: '2026-01-03T11:10:00.000Z',
   },
]

function ProductClientReview() {
   const translate = useTranslate(langue)
   const [imageSrc, setImageSrc] = useState<string>('')
   const [isImageViewrOpen, setIsImageViewerOpen] = useState<boolean>(false)
   const [content, setContent] = useState<string>('')
   const [commentImages, setCommentImages] = useState<File[]>([])

   const handleOpenImageViewer = (src: string) => {
      setImageSrc(src)
      setIsImageViewerOpen(true)
   }

   const handleRemoveCommentImage = (index: number) => {
      setCommentImages((prev) => {
         const newImages = [...prev].filter((_, i) => i !== index)
         return newImages
      })
   }

   return (
      <>
         <div className='h-100 flex flex-col gap-2'>
            <div className='overflow-auto space-y-4 scrollbar-none flex-1'>
               {fakeCommentData.map((comment, index) => (
                  <div className='space-y-2' key={index}>
                     <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                           <Avatar
                              className='size-13 cursor-pointer'
                              onClick={() =>
                                 handleOpenImageViewer(comment.profilePhoto)
                              }
                           >
                              <AvatarImage src={comment.profilePhoto} />
                              <AvatarFallback>
                                 {comment.firstName.charAt(0).toUpperCase()}
                                 {comment.lastName.charAt(0).toUpperCase()}
                              </AvatarFallback>
                           </Avatar>
                           <div>
                              <ScrollText
                                 text={comment.firstName}
                                 className='font-bold text-base'
                              />
                              <ScrollText
                                 text={comment.lastName}
                                 className='text-[var(--gray)] text-xs'
                              />
                              <ScrollText
                                 text={comment.phoneNumber}
                                 className='text-[var(--gray)] text-xs'
                              />
                           </div>
                        </div>

                        <p className='text-xs text-[var(--gray)]'>
                           {formatTimeDifference(
                              new Date(comment.createdAt).getTime(),
                           )}
                        </p>
                     </div>

                     <p>{comment.commend}</p>

                     <div className='flex gap-2'>
                        {comment.photos.map((src, i) => (
                           <div
                              key={i}
                              className='aspect-square w-15 overflow-hidden rounded cursor-pointer'
                              onClick={() => handleOpenImageViewer(src)}
                           >
                              <img
                                 src={src}
                                 alt={'img ' + i}
                                 className='w-full h-full object-cover'
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>

            <div className='p-2 rounded-xl bg-[var(--background-secondary)]'>
               {commentImages.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                     {commentImages.map((image, index) => (
                        <div
                           className='aspect-square w-15 overflow-hidden rounded relative group'
                           key={index}
                        >
                           <button
                              className='z-10 absolute top-1 right-1 bg-[var(--red)] rounded hidden group-hover:block cursor-pointer'
                              onClick={() => handleRemoveCommentImage(index)}
                           >
                              <X className='size-4' />
                           </button>
                           <img
                              src={URL.createObjectURL(image)}
                              alt={`commentImage ${index}`}
                              className='w-full h-full object-cover'
                              onClick={() =>
                                 handleOpenImageViewer(
                                    URL.createObjectURL(image),
                                 )
                              }
                           />
                        </div>
                     ))}

                     <label htmlFor='comment-image'>
                        <div className='cursor-pointer hover:bg-[var(--background)] p-1 rounded-md flex items-center justify-center size-15 border'>
                           <Plus />
                        </div>
                     </label>
                  </div>
               )}
               <div className='flex items-end'>
                  {commentImages.length === 0 && (
                     <label htmlFor='comment-image'>
                        <div className='cursor-pointer hover:bg-[var(--background)] p-1 rounded-md flex items-center justify-center size-9'>
                           <Image />
                        </div>
                     </label>
                  )}
                  <textarea
                     onChange={(e) => setContent(e.target.value)}
                     className='h-9 flex-1 focus:outline-0 p-1'
                     placeholder={translate('enter_a_comment')}
                  >
                     {content}
                  </textarea>
                  {(content || commentImages.length > 0) && (
                     <button className='cursor-pointer bg-[var(--green)] text-[var(--foreground)] p-1 rounded-md flex items-center justify-center size-9'>
                        <SendHorizonal />
                     </button>
                  )}
               </div>
            </div>
         </div>

         {isImageViewrOpen && (
            <ImageViewer
               firstName=''
               lastName=''
               isOpen={isImageViewrOpen}
               setIsOpen={setIsImageViewerOpen}
               profilePhoto={imageSrc}
            />
         )}

         <input
            type='file'
            accept='image/*'
            className='hidden'
            id='comment-image'
            multiple
            onChange={(e) => {
               const fileArray = Array.from(e.target.files || [])
               setCommentImages((prev) => [...prev, ...fileArray])
            }}
         />
      </>
   )
}

export default ProductClientReview
