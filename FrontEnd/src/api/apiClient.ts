import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const publicEndpoints = ["/auth/login", "/auth/register", "/auth/refresh-token"];

    if (!publicEndpoints.includes(config.url || "")) {
        const token = localStorage.getItem("accessToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.warn("No refresh token found.");
                localStorage.clear();
                window.location.href = "/";
                return Promise.reject(error);
            }

            try {
                const res = await axios.post("http://localhost:8080/auth/refresh-token", { refreshToken });

                const token = res.data?.data || res.data;

                if (!token?.accessToken) throw new Error("Invalid refresh token response");

                localStorage.setItem("accessToken", token.accessToken);
                localStorage.setItem("refreshToken", token.refreshToken);
                localStorage.setItem("userId",token.userId)

                originalRequest.headers.Authorization = `Bearer ${token.accessToken}`;
                return axios(originalRequest);
            } catch (refreshErr) {
                localStorage.clear();
                window.location.href = "/";
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(error);
    }
);

export default api;

