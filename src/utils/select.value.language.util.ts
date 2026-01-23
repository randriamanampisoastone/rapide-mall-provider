import type { Lang } from './formats/time.utils'

export function selectValueLanguage(
   locale: Lang | string,
   value: {
      valueEn: any
      valueFr: any
      valueMg: any
      valueZh: any
   },
) {
   if (locale === 'en' && value.valueEn && value.valueEn.length > 0) {
      return value.valueEn
   } else if (locale === 'fr' && value.valueFr && value.valueFr.length > 0) {
      return value.valueFr
   } else if (locale === 'mg' && value.valueMg && value.valueMg.length > 0) {
      return value.valueMg
   } else if (locale === 'zh' && value.valueZh && value.valueZh.length > 0) {
      return value.valueZh
   } else {
      return value.valueFr
   }
}
