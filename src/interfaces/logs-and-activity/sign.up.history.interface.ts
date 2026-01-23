export interface GetSignUpDataHistoryResponseInterface {
   profile: string
   role: 'ADMIN' | 'CLIENT' | 'DRIVER' | 'PROVIDER'
   date: string
   device: 'ANDROID' | 'IOS' | 'PC'
   adminAssign: string
   status: 'ACTIVE' | 'INACTIVE'
}
