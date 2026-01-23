export interface GetLoginDataHistoryResponseInterface {
   registrationNumber: string
   profile: string
   role: 'ADMIN' | 'CLIENT' | 'DRIVER' | 'PROVIDER'
   date: string
   device: 'ANDROID' | 'IOS' | 'PC'
   status: 'ACTIVE' | 'INACTIVE'
}
