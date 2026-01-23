export function formatNumberShort(num: number) {
   if (num === null || num === undefined) return ''

   const absNum = Math.abs(num)
   const sign = num < 0 ? '-' : ''

   if (absNum >= 1_000_000_000) {
      return `${sign}${(absNum / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`
   }
   if (absNum >= 1_000_000) {
      return `${sign}${(absNum / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
   }
   if (absNum >= 1_000) {
      return `${sign}${(absNum / 1_000).toFixed(1).replace(/\.0$/, '')}K`
   }
   return `${sign}${absNum}`
}
