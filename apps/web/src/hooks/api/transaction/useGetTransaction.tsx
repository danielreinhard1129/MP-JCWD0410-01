import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionDetail = (transactionId: string) => {
  return useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction>(
        `/api/transactions/${transactionId}`,
      );

      return data;
    },
  });
};

export default useGetTransactionDetail;
