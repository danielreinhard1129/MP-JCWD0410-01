export interface User {
  id: number;
  name: string;
  email: string;
  provider: string;
  profilePic: string;
  phoneNumber: string;
  referral: string;
  address: string;
  role: "ADMIN" | "CUSTOMER"; // Tambahkan role di sini
  review: {
    rating: number;
  };
  userPoints: {
    points: number;
  }[];
}

export enum Provider {
  CREDENTIALS = "CREDENTIALS",
  GOOGLE = "GOOGLE",
}
