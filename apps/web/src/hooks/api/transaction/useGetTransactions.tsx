"use client";

import useAxios from "@/hooks/use.Axios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetTransactions = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data } =
        await axiosInstance.get<Transaction[]>("/api/transactions");
      return data;
    },
  });
};

export default useGetTransactions;
