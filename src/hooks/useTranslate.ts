import { useSelector } from 'react-redux'
import { I18n } from 'i18n-js'
import type { RootState } from '@/redux/store'

type TranslationJson = {
   [lang: string]: {
      [key: string]: string
   }
}

const useTranslate = (json: TranslationJson) => {
   const i18n = new I18n(json)

   const locale = useSelector((state: RootState) => state.language.locale)

   i18n.locale = locale

   return (key: string) => {
      return i18n.t(key)
   }
}

export default useTranslate
