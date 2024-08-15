"use client";

import useAxios from "@/hooks/use.Axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface LoginPayload {
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'CUSTOMER';
  token: string;
}

const useLogin = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axiosInstance.post<UserResponse>("/api/auth/login", payload);
      return data;
    },
    onSuccess: async (data) => {
      await signIn('credentials', { ...data, redirect: false });

      // Cek role dan arahkan pengguna berdasarkan role-nya
      if (data.role === 'ADMIN') {
        router.replace("/dashboard"); // Arahkan admin ke dashboard
      } else if (data.role === 'CUSTOMER') {
        router.replace("/"); // Arahkan customer ke home
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useLogin;
