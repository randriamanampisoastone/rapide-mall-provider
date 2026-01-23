export type TimeUnit = 'h' | 'mn' | 's'

export interface ParsedTime {
   value: number
   unit: TimeUnit
}

export function parseTime(input: number): ParsedTime {
   if (input >= 1) {
      return { value: input, unit: 'h' }
   }

   const decimalCount = (input.toString().split('.')[1] || '').length
   if (decimalCount === 1) {
      return { value: input * 60, unit: 'mn' }
   }

   return { value: input * 3600, unit: 's' }
}

export function toHours(value: number, unit: TimeUnit): number {
   switch (unit) {
      case 'h':
         return value
      case 'mn':
         return value / 60
      case 's':
         return value / 3600
      default:
         throw new Error('Unité inconnue')
   }
}
