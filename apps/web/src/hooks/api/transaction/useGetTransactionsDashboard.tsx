import { axiosInstance } from "@/lib/axios";
import { Transaction, Status } from "@/types/transaction";
import { IPageableResponse, IPagintaionQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionsQuery extends IPagintaionQueries {
  search?: string;
  status?: Status; // Menggunakan enum Status yang diimpor
  paymentMethod?: string; // Menggunakan enum PaymentMethod yang diimpor
}

const useGetTransactionsDashboard = (queries: GetTransactionsQuery) => {
  return useQuery({
    queryKey: ["transactions", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<Transaction>>(
        "/api/transaction",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetTransactionsDashboard;
