"use client";

import useAxios from "@/hooks/use.Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateTransactionPayload {
  qty: number;
  eventId: number;
}

const useCreateTransaction = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      // Sending payload as JSON directly
      const { data } = await axiosInstance.post("/api/transactions", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Create Transaction success");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.push(`/orders/${data.id}`);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateTransaction;
