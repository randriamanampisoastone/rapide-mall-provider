export const PlatformOS = {
   IOS: 'IOS',
   ANDROID: 'ANDROID',
   DESKTOP: 'DESKTOP',
   OTHER: 'OTHER',
} as const

export type PlatformOS = keyof typeof PlatformOS
