export function capitalizeFirstLetter(str: string): string {
   if (!str) return ''
   return str.charAt(0).toUpperCase() + str.slice(1)
}

export function snaketoCamelCase(input: string): string {
   return input
      .toLowerCase()
      .split('_')
      .map((word, index) => (index === 0 ? word : capitalizeFirstLetter(word)))
      .join('')
}
