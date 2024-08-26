import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { IPageableResponse, IPagintaionQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetReviewsQuery extends IPagintaionQueries {
  userId?: number;
}

const useGetReviews = (queries: GetReviewsQuery) => {
  return useQuery({
    queryKey: ["review", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<Review>>(
        "/api/reviews",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetReviews;
