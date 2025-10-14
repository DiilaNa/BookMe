import api from "./apiClient";

export const signUpUser = async (userData: {
    username: string;
    email: string;
    password: string;
    phone: string;
}) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const loginUser = async ( LoginForm:{
    username:string;
    password:string
})    => {
    const response = await api.post("/auth/login", LoginForm);

    const { accessToken, refreshToken} = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
};
