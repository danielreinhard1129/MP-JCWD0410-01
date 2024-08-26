export interface Event {
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
  userId: number;
  isDeleted: boolean;
  user: {
    id: number;
    name: string;
    profilePic: string;
    userPoints: {
      points: number;
    }[];
  };
  category: {
    title: string;
  };
  reviews: {
    rating: number;
    comment: string;
  }[];
}
