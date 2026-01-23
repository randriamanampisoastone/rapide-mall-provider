export const CouponTriggerEnum = {
   SIGN_UP: 'SIGN_UP',
   FIRST_SIGN_IN: 'FIRST_SIGN_IN',
   FIRST_RIDE: 'FIRST_RIDE',
   FIRST_DEPOSIT: 'FIRST_DEPOSIT',
   FIRST_TRANSFERT: 'FIRST_TRANSFERT',
   GIFT: 'GIFT',
}

export type CouponTriggerEnum = keyof typeof CouponTriggerEnum
