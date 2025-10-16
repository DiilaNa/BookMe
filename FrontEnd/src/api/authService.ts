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
    const userID = localStorage.getItem('userId');
    if (!userID) throw new Error("User ID not found. Cannot post event.");

    const formData = new FormData();

    formData.append("event", new Blob([JSON.stringify({
        ...eventData,
        userID,
        totalSeats: Number(eventData.totalSeats),
        price: Number(eventData.price)
    })], { type: "application/json" }));

    // Append the image file (if available)
    if (eventData.eventImageBase64) {
        const response = await fetch(eventData.eventImageBase64);
        const blob = await response.blob();
        formData.append("file", blob, eventData.eventImageFileName || "image.jpg");
    }

    const response = await api.post("/admin/saveEvent", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

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


export interface EventFormUpdate {
    title: string;
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    eventImageBase64: string | null;
    eventImageFileName: string | null;
}
export const updateEvent = async (id: string, eventData: EventFormUpdate) => {
    const userID = localStorage.getItem('userId');
    console.log(userID + "inside update event")
    if (!userID) throw new Error("User ID not found. Cannot update event.");

    const formData = new FormData();

    formData.append("event",
        new Blob(
            [JSON.stringify({
                ...eventData,
                date: new Date(eventData.date).toISOString(),
                userID,
                totalSeats: Number(eventData.totalSeats),
                price: Number(eventData.price),
            })],
            { type: "application/json" }
        )
    );

    if (eventData.eventImageBase64) {
        const response = await fetch(eventData.eventImageBase64);
        const blob = await response.blob();
        formData.append("file", blob, eventData.eventImageFileName || "image.jpg");
    }

    const response = await api.put(`/admin/updateEvent/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
};