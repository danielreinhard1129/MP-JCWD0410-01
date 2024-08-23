export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  qty: number;
  total: number;
  status: Status;
  paymentProof: string;
  paymentMethod: string;
  pointUsed: number;
  voucherUsed: number;
  rewardUsed: number;
  createdAt: string;
  updateAt: string;
  event: {
    id: number;
    thumbnail: string;
    name: string;
    startDate: string;
    endDate: string;
    location: string;
  };
  user: {
    name: string;
    email: string;
    profilePic?: string;
  };
}

export enum Status {
  WAIITNG_FOR_PAYMENT = "WAIITNG_FOR_PAYMENT",
  WAITING_FOR_ADMIN_CONFIRMATION = "WAITING_FOR_ADMIN_CONFIRMATION",
  DONE = "DONE",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED",
}
