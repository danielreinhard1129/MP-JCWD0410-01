import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

const useGetEventDetail = (eventId: string) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event>(`/api/events/${eventId}`);

      return data;
    },
  });
};

export default useGetEventDetail;
