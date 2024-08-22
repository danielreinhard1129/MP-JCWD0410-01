export interface Voucher {
    id: number;
    name: string;
    code: string;
    quota: number;
    nominal: number;
    claimed: number;
    expDate: string;
    createdAt: string;
    updatedAt: string;
    event: {
      id: number;
      name: string;
      thumbnail: string;
      description: string;
      location: string;
      startDate: string;
      endDate: string;
      price: number;
      discount: number;
      quota: number;
      booked: number;
      isDeleted: boolean;
      user: {
        name: string;
        profilePic: string;
      };
      category: {
        title: string;
      };
    };
  }
  