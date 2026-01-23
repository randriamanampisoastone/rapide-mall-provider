export const TransmissionType = {
   AUTOMATIC: 'AUTOMATIC',
   MANUAL: 'MANUAL',
   CVT: 'CVT',
   DUAL_CLUTCH: 'DUAL_CLUTCH',
   AMT: 'AMT',
}

export type TransmissionType = keyof typeof TransmissionType
