// export const API_BASE_URL = 'http://127.0.0.1:3000'
// export const API_BASE_URL = 'http://192.168.88.79:3000'
export const API_BASE_URL = 'https://apis.rapideapp.mg'

export const RAPIDE_APP_FOKONTANY_URL =
   'https://madagascar-map.rapideapp.mg/getFokotany'

export const TIMEOUT = 15000

//auth
export const ROUTE_SIGN_IN = '/auth/signIn'
export const ROUTE_CONFIRM_SIGN_IN = '/auth/confirmSignIn'
export const ROUTE_RESEND_CONFIRM_SIGN_IN = '/auth/resendConfirmSignIn'
export const ROUTE_UPDATE_PROVIDER_PROFILE = '/auth/update-provider-profile'
export const ROUTE_PROVIDER_UPDATE_PASSWORD = '/auth/provider-update-password'
export const ROUTE_GET_PROVIDER_FINANCE = '/auth/get-provider-finance'

//Profile
export const ROUTE_GET_CLIENT_PROFILE_BY_ID =
   '/profile/get-client-profile-by-id'

export const ROUTE_GET_SHIFT = '/shift/get-shift'

// Transaction
export const ROUTE_GET_TRANSACTIONS_FOR_BACK_OFFICE =
   '/transaction/getTransactionsForBackOffice'
export const ROUTE_GET_FULL_TRANSACTION_DETAILS =
   '/transaction/getFullTransactionDetails'

// Mart upload
export const ROUTE_UPLOAD_MART_PHOTO = '/upload-mart-file/upload-mart-photo'
export const ROUTE_UPLOAD_MART_PRODUCT = '/upload-mart-file/upload-mart-product'

// Provider mart
export const ROUTE_CREATE_MART_PRODUCT = '/provider-mart/create-mart-product'
export const ROUTE_GET_MART_PRODUCT = '/provider-mart/get-mart-product'
export const ROUTE_GET_MART_PRODUCT_DETAIL =
   '/provider-mart/get-mart-product-detail'
export const ROUTE_GET_PROVIDER_FULL_PROFILE =
   '/provider-mart/get-provider-full-profile'
export const ROUTE_UPDATE_MART_PRODUCT = '/provider-mart/update-mart-product'
export const ROUTE_PROVIDER_GET_ORDER_ITEMS =
   '/provider-mart/provider-get-order-items'
export const ROUTE_PROVIDER_GET_MART_TRANSACTION =
   '/provider-mart/provider-get-mart-transaction'

// Dashboard
export const ROUTE_GET_BEST_ITEMS = '/provider-mart-dashboard/get-best-items'
export const ROUTE_GET_LAST_SALES = '/provider-mart-dashboard/get-last-sales'
export const ROUTE_GET_PRODUCT_SALES_CHART =
   '/provider-mart-dashboard/get-product-sales-chart'
export const ROUTE_GET_PROVIDER_INCOMES =
   '/provider-mart-dashboard/get-provider-incomes'
