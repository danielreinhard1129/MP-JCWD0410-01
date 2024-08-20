export interface Event {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  price: number;
  discount: number;
  quota: number;
  booked: number;
  userId: number;
  isDeleted: boolean;
  user: {
    name: string;
    profilePic: string;
  };
  category: {
    title: string;
  };
}
