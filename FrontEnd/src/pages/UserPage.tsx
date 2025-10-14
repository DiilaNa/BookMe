import React, { useState, useEffect } from 'react';
import FeaturedEventCard from '../components/FeaturedCard.tsx';
import StandardEventCard from '../components/FeaturedCard.tsx';
import './Styles/User.scss';
import {useNavigate} from "react-router-dom";

interface UserEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    price: number;
    imageBase64: string | null;
    totalSeats: number;
}

const UserEventsPage: React.FC = () => {
    const [events, setEvents] = useState<UserEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // FIX 1: Mocked data for initial UI testing (replace with actual fetch)
    const MOCK_EVENTS: UserEvent[] = [
        // Most Recent (Featured)
        { id: 'e01', title: 'Annual Tech Summit 2026', description: 'Explore the future of AI and blockchain technology in this flagship event. Limited seats available!', date: new Date(new Date().setHours(new Date().getHours() + 100)).toISOString(), location: 'Auditorium A', price: 99.99, totalSeats: 250, imageBase64: null },
        // Older (Standard)
        { id: 'e02', title: 'Spring Art Festival', description: 'A vibrant display of student photography and sculpture.', date: new Date(new Date().setHours(new Date().getHours() + 200)).toISOString(), location: 'Gallery Hall', price: 15.00, totalSeats: 100, imageBase64: null },
        { id: 'e03', title: 'Alumni Mixer Night', description: 'Network with graduates and university staff over drinks.', date: new Date(new Date().setHours(new Date().getHours() + 300)).toISOString(), location: 'University Club', price: 45.00, totalSeats: 80, imageBase64: null },
    ];

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            // In a real app, this would be:
            // const response = await fetch('/api/public/events');
            // const data: UserEvent[] = await response.json();

            // Simulating API latency and using mock data for now
            await new Promise(resolve => setTimeout(resolve, 500));
            setEvents(MOCK_EVENTS);
        } catch (error) {
            console.error("Error fetching public events:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const role = localStorage.getItem("role");

        if (!role || role !== "USER") {
            navigate("/");
            return;
        }
        fetchEvents();
    }, []);


    const handleBuyNow = (eventId: string, title: string) => {
        alert(`Redirecting to purchase page for event ID: ${eventId} (${title})`);
        // In a real app: navigate('/checkout/' + eventId);
    };

    // Separate the featured event (most recent) from the rest
    const featuredEvent = events[0];
    const standardEvents = events.slice(1);

    if (isLoading) {
        return <div className="user-events-page loading"><p>Loading exciting events...</p></div>;
    }

    if (events.length === 0) {
        return <div className="user-events-page no-events"><h1>No upcoming events scheduled.</h1></div>;
    }

    return (
        <div className="user-events-page">
            <header className="page-header">
                <h1>Discover University Events 🎟️</h1>
                <p>Find your next experience and grab your tickets now!</p>
            </header>

            {/* Featured Event Section */}
            {featuredEvent && (
                <section className="featured-section">
                    <h2 className="section-title">✨ Featured Event</h2>
                    <FeaturedEventCard
                        event={featuredEvent}
                        onBuy={handleBuyNow}
                    />
                </section>
            )}

            {/* Standard Events Grid */}
            {standardEvents.length > 0 && (
                <section className="events-grid-section">
                    <div className="events-grid">
                        {standardEvents.map(event => (
                            <StandardEventCard
                                key={event.id}
                                event={event}
                                onBuy={handleBuyNow}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default UserEventsPage;