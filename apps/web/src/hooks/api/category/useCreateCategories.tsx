"use client";

import useAxios from "@/hooks/use.Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateCategoryPayload {
  title: string;
}

const useCreateCategory = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCategoryPayload) => {
      // Sending payload as JSON directly
      const { data } = await axiosInstance.post("/api/category", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Create category success");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      router.push("/dashboard/event/create-event");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateCategory;
