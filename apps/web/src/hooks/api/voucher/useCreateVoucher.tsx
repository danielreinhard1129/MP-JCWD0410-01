"use client";

import useAxios from "@/hooks/use.Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateVoucherPayload {
  name: string;
  code: string;
  quota: number;
  nominal: number;
  expDate: Date | undefined;
  eventId: number;
}

const useCreateVoucher = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateVoucherPayload) => {
      const response = await axiosInstance.post("/api/voucher", payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Voucher created successfully");
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      router.push("/dashboard/transaction/voucher");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateVoucher;
