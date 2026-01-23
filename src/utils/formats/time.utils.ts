export type Lang = 'en' | 'fr' | 'mg' | 'zh'

const TRANSLATIONS = {
   en: {
      ago: (v: string) => `${v} ago`,
      in: (v: string) => `in ${v}`,
      sec: 'sec',
      min: 'min',
      hour: 'hour',
      hours: 'hours',
      day: 'day',
      days: 'days',
      month: 'month',
      months: 'months',
      year: 'year',
      years: 'years',
      expired: 'Expired',
   },
   fr: {
      ago: (v: string) => `il y a ${v}`,
      in: (v: string) => `dans ${v}`,
      sec: 'sec',
      min: 'min',
      hour: 'heure',
      hours: 'heures',
      day: 'jour',
      days: 'jours',
      month: 'mois',
      months: 'mois',
      year: 'an',
      years: 'ans',
      expired: 'Expiré',
   },
   mg: {
      ago: (v: string) => `${v} lasa`,
      in: (v: string) => `ao anatin'ny ${v}`,
      sec: 'segondra',
      min: 'minitra',
      hour: 'ora',
      hours: 'ora',
      day: 'andro',
      days: 'andro',
      month: 'volana',
      months: 'volana',
      year: 'taona',
      years: 'taona',
      expired: 'Lany daty',
   },
   zh: {
      ago: (v: string) => `${v}前`,
      in: (v: string) => `${v}后`,
      sec: '秒',
      min: '分钟',
      hour: '小时',
      hours: '小时',
      day: '天',
      days: '天',
      month: '个月',
      months: '个月',
      year: '年',
      years: '年',
      expired: '已过期',
   },
}

export function formatTimeDifference(
   timestamp: number,
   lang: Lang = 'en',
): string {
   const now = Date.now()
   const diff = timestamp - now
   const absSeconds = Math.floor(Math.abs(diff) / 1000)

   const t = TRANSLATIONS[lang]

   if (diff < 0 && absSeconds < 60) return t.ago(`${absSeconds} ${t.sec}`)
   if (diff > 0 && absSeconds < 60) return t.in(`${absSeconds} ${t.sec}`)

   const minutes = Math.floor(absSeconds / 60)
   if (minutes < 60)
      return diff < 0
         ? t.ago(`${minutes} ${t.min}`)
         : t.in(`${minutes} ${t.min}`)

   const hours = Math.floor(minutes / 60)
   if (hours < 24)
      return diff < 0
         ? t.ago(`${hours} ${hours > 1 ? t.hours : t.hour}`)
         : t.in(`${hours} ${hours > 1 ? t.hours : t.hour}`)

   const days = Math.floor(hours / 24)
   if (days < 30)
      return diff < 0
         ? t.ago(`${days} ${days > 1 ? t.days : t.day}`)
         : t.in(`${days} ${days > 1 ? t.days : t.day}`)

   const months = Math.floor(days / 30)
   if (months < 12)
      return diff < 0
         ? t.ago(`${months} ${months > 1 ? t.months : t.month}`)
         : t.in(`${months} ${months > 1 ? t.months : t.month}`)

   const years = Math.floor(months / 12)
   return diff < 0
      ? t.ago(`${years} ${years > 1 ? t.years : t.year}`)
      : t.in(`${years} ${years > 1 ? t.years : t.year}`)
}
