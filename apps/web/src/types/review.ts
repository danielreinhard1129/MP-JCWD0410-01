interface Review {
  userId: number;
  eventId: number;
  comment: string;
  rating: number;
  user: {
    name: string;
    profilePic: string;
  };
  event: {
    name: string;
  };
}
