import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface MartItemInterface {
   martItemId: string
   quantity: number
   oldPrice: number
   price: number
   description: string[]
   isMain: boolean
   images: string[]
   code: string
}

export interface MartProductInterface {
   name: string
   description: string[]
   martItems: MartItemInterface[]
   selectedItem?: string
   width: number
   height: number
   length: number
   weight: number
}

const initialState: MartProductInterface = {
   name: '',
   description: [],
   martItems: [],
   width: 0,
   height: 0,
   length: 0,
   weight: 0,
}

const martProductSlice = createSlice({
   name: 'martProduct',
   initialState,
   reducers: {
      upsertProductItem(state, action: PayloadAction<MartItemInterface>) {
         let martItemId
         if (!action.payload.martItemId) {
            const now = Date.now()
            state.martItems.push({
               ...action.payload,
               martItemId: 'timestamp-' + now.toString(),
            })
            martItemId = now
         } else {
            const productIndex = state.martItems.findIndex(
               (value) => value.martItemId === action.payload.martItemId,
            )
            if (productIndex === -1) return
            state.martItems[productIndex] = action.payload
            martItemId = state.martItems[productIndex].martItemId
         }

         if (action.payload.isMain) {
            const updatedProductItem = [...state.martItems].map((value) => {
               if (value.martItemId !== martItemId)
                  return { ...value, isMain: false }
               return value
            })
            state.martItems = updatedProductItem
         }

         state.selectedItem = undefined
      },
      setProductItem(state, action: PayloadAction<MartItemInterface[]>) {
         state.martItems = action.payload.map((value) => {
            return { ...value }
         })
      },
      upsertSizeAndWeight(
         state,
         action: PayloadAction<{
            width: number
            height: number
            length: number
            weight: number
         }>,
      ) {
         state.width = action.payload.width
         state.height = action.payload.height
         state.length = action.payload.length
         state.weight = action.payload.weight
      },
      deleteItem(state, action: PayloadAction<number>) {
         state.martItems.splice(action.payload, 1)
      },
      setProductName(state, action: PayloadAction<string>) {
         state.name = action.payload
      },
      setProductDescription(state, action: PayloadAction<string[]>) {
         state.description = action.payload
      },
      setSelectedItem(state, action: PayloadAction<string | undefined>) {
         state.selectedItem = action.payload
      },
      resetMartProduct(state) {
         state.name = ''
         state.description = []
         state.martItems = []
         state.width = 0
         state.height = 0
         state.length = 0
         state.weight = 0
      },
   },
})

export const {
   upsertProductItem,
   setProductName,
   setProductDescription,
   setSelectedItem,
   deleteItem,
   upsertSizeAndWeight,
   setProductItem,
   resetMartProduct,
} = martProductSlice.actions
export default martProductSlice.reducer
