export interface EventForm {
    title: string;
    userId:string
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    eventImageBase64: string | null;
    eventImageFileName: string | null;
}


export interface EventPost {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    eventImageBase64: string | null;
    eventImageFileName: string | null;
}

export interface UserEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    eventImageBase64: string | null;
    eventImageFileName: string | null;
    isBought: boolean;
}

export interface PaymentData {
    userId: string | null;
    eventId: string;
    amount: number;
    method: string; // e.g., "CARD"
}