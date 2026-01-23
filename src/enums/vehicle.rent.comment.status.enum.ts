export const VehicleRentCommentStatusType = {
   PENDING: 'PENDING',
   APPROVED: 'APPROVED',
   REJECTED: 'REJECTED',
}

export type VehicleRentCommentStatusType =
   keyof typeof VehicleRentCommentStatusType
