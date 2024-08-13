import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";

const useLogin = () => {
  return useMutation(
    async (payload: { email: string; password: string }) => {
      const { data } = await axiosInstance.post("/api/auth/login", payload);
      return data;
    }
  );
};

export default useLogin;
