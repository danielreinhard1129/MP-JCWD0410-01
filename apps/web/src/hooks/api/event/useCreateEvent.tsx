"use client";

import useAxios from "@/hooks/use.Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateEventPayload {
  name: string;
  description: string;
  location: string;
  start_date: Date | undefined;
  end_date: Date | undefined;
  price: number;
  discount: number;
  quota: number;
  thumbnail: File | null;
  categoryId: number;
}

const useCreateEvent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      //karena createnya bawa image jadi harus pake form data
      const createEventForm = new FormData();

      createEventForm.append("name", payload.name);
      createEventForm.append("description", payload.description);
      createEventForm.append("location", payload.location);
      createEventForm.append("start_date", payload.start_date!.toString());
      createEventForm.append("end_date", payload.end_date!.toString());
      createEventForm.append("price", payload.price.toString());
      createEventForm.append("discount", payload.discount.toString());
      createEventForm.append("quota", payload.quota.toString());
      createEventForm.append("thumbnail", payload.thumbnail!);
      createEventForm.append("categoryId", payload.categoryId.toString());

      const { data } = await axiosInstance.post("/api/events", createEventForm);
      return data;
    },
    onSuccess: () => {
      toast.success("Create event success");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateEvent;
