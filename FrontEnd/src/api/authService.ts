// src/api/authService.ts
import api from "./apiClient";

export const signUpUser = async (userData: {
    username: string;
    email: string;
    password: string;
    phone: string;
}) => {
    console.log(userData + "user data inside sign up user method")
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const loginUser = async (credentials: {
    username: string;
    password: string;
}) => {
    const response = await api.post("/auth/login", credentials);

    const { accessToken, refreshToken} = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
};
