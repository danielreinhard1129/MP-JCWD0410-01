import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"http://Localhost:8000",
})