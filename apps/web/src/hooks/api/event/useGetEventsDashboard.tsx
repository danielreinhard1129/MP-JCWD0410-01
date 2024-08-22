import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { IPageableResponse, IPagintaionQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery extends IPagintaionQueries {
  search?: string;
  category?: string;
  location?: string;
}

const useGetEventsDashboard = (queries: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<Event>>(
        "/api/events",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetEventsDashboard;
