export const utcConvert = (date: Date | string | number) => {
   const d = new Date(date)
   return new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000)
}
