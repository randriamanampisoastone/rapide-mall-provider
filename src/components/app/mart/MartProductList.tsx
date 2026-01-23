import PaginationBar from '@/components/PaginationBar'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'
import MartProductCard from './MartProductCard'
import { useGetMartProduct } from '@/api/mart/get.mart.product.api'

function MartProductList() {
   const [searchValue, setSearchValue] = useState('')
   const [pageSetting, setPageSetting] = useState<{
      page: number
      pageSize: number
   }>({ page: 1, pageSize: 20 })

   const {
      data: dataGetMartProduct,
      isSuccess: isSuccessGetMartProduct,
      refetch: refetchGetMartProduct,
   } = useGetMartProduct({
      page: pageSetting.page,
      pageSize: pageSetting.pageSize,
      term: searchValue,
   })

   return (
      <div>
         <SearchBar
            filterItems={[]}
            refetchFn={refetchGetMartProduct}
            searchFilter={[]}
            setSearchFilter={() => {}}
            setSearchValue={setSearchValue}
            totalCount={dataGetMartProduct?.totalCount || 0}
         />

         <div className='grid sm:grid-cols-3 xl:grid-cols-4 gap-2'>
            {isSuccessGetMartProduct &&
               dataGetMartProduct.data.map((product) => (
                  <MartProductCard product={product} />
               ))}
         </div>

         <PaginationBar
            pageSetting={pageSetting}
            setPageSetting={setPageSetting}
            totalElement={dataGetMartProduct?.totalCount || 1}
         />
      </div>
   )
}

export default MartProductList
