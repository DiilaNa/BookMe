import api from "./apiClient";
import type {EventForm} from "../types/Events.ts";
import type {EventPost} from "../types/Events.ts";

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

    const { accessToken, refreshToken,userId} = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId",userId)
    return response.data;
};



export const postNewEvent = async (eventData: EventForm) => {
    const userId = localStorage.getItem('userId');

    console.log(userId+" in auth service")

    if (!userId) {
        throw new Error("User ID not found. Cannot post event.");
    }
    const cleanedData = {
        ...eventData,
        totalSeats: Number(eventData.totalSeats),
        price: Number(eventData.price),
        userID:userId
    };

    const response = await api.post("/admin/saveEvent", cleanedData);

    return response.data;
};

export const getAdminEvents = async (userId: string): Promise<EventPost[]> => {
    try {
        const response = await api.get(`/admin/getMyEvents/${userId}`);
        const events: EventPost[] = response.data.data;
        return events;

    } catch (error) {
        console.error("Error fetching admin events:", error);
        throw new Error("Failed to fetch events from server.");
    }
};