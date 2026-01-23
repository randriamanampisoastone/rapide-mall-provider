import type { Lang } from './formats/time.utils'

export const martProductDetailReduxToJson = (
   key: {
      en: string[]
      fr: string[]
      mg: string[]
      zh: string[]
   },
   contents: {
      en: (string | number)[]
      fr: (string | number)[]
      mg: (string | number)[]
      zh: (string | number)[]
   },
) => {
   const data = ['en', 'fr', 'mg', 'zh'].map((lang) =>
      key[lang as Lang].reduce<Record<string, string | number>>(
         (acc, value, index) => {
            acc[value] = contents[lang as Lang][index]
            return acc
         },
         {},
      ),
   )

   return {
      en: data[0],
      fr: data[1],
      mg: data[2],
      zh: data[3],
   }
}
