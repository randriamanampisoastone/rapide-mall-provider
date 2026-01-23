import { GenderType } from '@/enums/gender.enum'

export const getGender = (gender: GenderType) => {
   switch (gender) {
      case GenderType.MALE:
         return 'Mr.'
      case GenderType.FEMALE:
         return 'Ms.'
      default:
         return ''
   }
}
