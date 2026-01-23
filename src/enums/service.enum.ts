export const ServiceEnum = {
   RIDE: 'RIDE',
   EXPRESS: 'EXPRESS',
   FOOD: 'FOOD',
   MART: 'MART',
}

export type ServiceEnum = keyof typeof ServiceEnum

export const ServiceColor = {
   [ServiceEnum.RIDE]: 'var(--green-secondary)',
   [ServiceEnum.EXPRESS]: 'var(--brown-secondary)',
   [ServiceEnum.FOOD]: 'var(--yellow-secondary)',
   [ServiceEnum.MART]: 'var(--blue-secondary)',
}
