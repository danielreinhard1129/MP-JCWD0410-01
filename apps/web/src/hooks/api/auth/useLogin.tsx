import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterArgs {
  email: string;
  password: string;// Tambahkan role di sini
}

const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (payload: RegisterArgs) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("api/auth/login", {
        email: payload.email,
        password: payload.password,
      });

      alert("Register success");
      router.push("/homepage");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;
