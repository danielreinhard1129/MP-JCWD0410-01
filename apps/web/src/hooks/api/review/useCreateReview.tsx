"use client";

import useAxios from "@/hooks/use.Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateReviewPayload {
  rating: number;
  comment: string;
  eventId: number;
}

const useCreateReview = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      // Sending payload as JSON directly
      const { data } = await axiosInstance.post("/api/reviews", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Create review success");
      queryClient.invalidateQueries({ queryKey: ["review"] });
      router.push("/orders");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateReview;
