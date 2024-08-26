import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetUser = (userId: number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/api/users/${userId}`);

      return data;
    },
  });
};

export default useGetUser;
