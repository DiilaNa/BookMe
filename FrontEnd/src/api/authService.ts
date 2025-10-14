import api from "./apiClient";
import type {EventForm} from "../types/Events.ts";

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

    const { accessToken, refreshToken} = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
};



export const postNewEvent = async (eventData: EventForm) => {
    const cleanedData = {
        ...eventData,
        totalSeats: Number(eventData.totalSeats),
        price: Number(eventData.price),
    };

    const response = await api.post("/admin/saveEvent", cleanedData);

    return response.data;
};