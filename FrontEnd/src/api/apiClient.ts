// src/api/apiClient.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080", // your backend base URL
    headers: { "Content-Type": "application/json" },
});

// Automatically attach access token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle 401 errors → refresh token flow
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.warn("No refresh token found.");
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const res = await axios.post("http://localhost:8080/auth/refresh-token", {
                    refreshToken,
                });

                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);

                // Retry original request
                api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return api(originalRequest);
            } catch (refreshErr) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
