export const ProfileStatus = {
   ACTIVE: 'ACTIVE',
   PENDING: 'PENDING',
   SUSPENDED: 'SUSPENDED',
   LOCKED: 'LOCKED',
   DESACTIVATED: 'DESACTIVATED',
   CLOSED: 'CLOSED',
   UNDER_REVIEW: 'UNDER_REVIEW',
   UNVERIFIED: 'UNVERIFIED',
   BANNED: 'BANNED',
} as const

export type ProfileStatus = keyof typeof ProfileStatus

export const ProfileStatusColor: Record<ProfileStatus, string> = {
   [ProfileStatus.ACTIVE]: 'green',
   [ProfileStatus.PENDING]: 'yellow',
   [ProfileStatus.SUSPENDED]: 'red',
   [ProfileStatus.LOCKED]: 'red',
   [ProfileStatus.DESACTIVATED]: 'grey',
   [ProfileStatus.CLOSED]: 'red',
   [ProfileStatus.UNDER_REVIEW]: 'orange',
   [ProfileStatus.UNVERIFIED]: 'yellow',
   [ProfileStatus.BANNED]: 'red',
}

export const UserRole = {
   CLIENT: 'CLIENT',
   DRIVER: 'DRIVER',
   PROVIDER: 'PROVIDER',
   SUPER_ADMIN: 'SUPER_ADMIN',
   CFO: 'CFO',
   DIRECTOR_MANAGER: 'DIRECTOR_MANAGER',
   CTO: 'CTO',
   HUB_MANAGER: 'HUB_MANAGER',
   CALL_CENTER: 'CALL_CENTER',
   COORDINATOR: 'COORDINATOR',
   DISPATCH_MANAGER: 'DISPATCH_MANAGER',
   DEPOSITOR: 'DEPOSITOR',
   INVESTISOR: 'INVESTISOR',
   MARKETING: 'MARKETING',
   PARTNER: 'PARTNER',
}

export type UserRole = keyof typeof UserRole
