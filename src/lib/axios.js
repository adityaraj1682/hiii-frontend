import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
    withCredentials:true //send cookies with request
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            // Inject the token into the standard Authorization Header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);