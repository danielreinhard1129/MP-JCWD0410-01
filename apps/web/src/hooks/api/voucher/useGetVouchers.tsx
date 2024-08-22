import { axiosInstance } from "@/lib/axios";// Pastikan Anda memiliki tipe data Voucher
import { IPageableResponse, IPagintaionQueries } from "@/types/pagination";
import { Voucher } from "@/types/voucher";
import { useQuery } from "@tanstack/react-query";

interface GetVouchersQuery extends IPagintaionQueries {
  search?: string;
  eventId?: number; 
}

const useGetVouchers = (queries: GetVouchersQuery) => {
  return useQuery({
    queryKey: ["vouchers", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IPageableResponse<Voucher>>(
        "/api/voucher",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetVouchers;
