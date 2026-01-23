const SAFE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateProductCode(prefix = 'RPD', length = 4): string {
   // Timestamp abrégé (base36, 3 caractères)
   const timestampPart = Date.now().toString(36).slice(-3).toUpperCase()

   // Random safe
   let randomPart = ''
   for (let i = 0; i < length; i++) {
      randomPart += SAFE_CHARS.charAt(
         Math.floor(Math.random() * SAFE_CHARS.length),
      )
   }

   return `${prefix}-${timestampPart}-${randomPart}`
}
