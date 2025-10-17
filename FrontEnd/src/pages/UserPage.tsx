import React, { useState, useEffect } from 'react';
import FeaturedEventCard from '../components/FeaturedCard.tsx';
import StandardEventCard from '../components/StandardCard.tsx';
import './Styles/User.scss';
import {useNavigate} from "react-router-dom";
import {getAllEvents} from "../api/authService.ts";
import type {UserEvent} from "../types/Events.ts";


const UserEventsPage: React.FC = () => {
    const [events, setEvents] = useState<UserEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const data = await getAllEvents();
            setEvents(data); // already sorted by latest
        } catch (error) {
            console.error("Error fetching events:", error);
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
        // navigate(`/checkout/${eventId}`);
    };

    const featuredEvent = events[0];
    const standardEvents = events.slice(1);

    if (isLoading) return <div className="loading">Loading exciting events...</div>;
    if (events.length === 0) return <div className="no-events"><h1>No upcoming events scheduled.</h1></div>;

    return (
        <div className="user-events-page">
            <header className="page-header">
                <h1>Discover University Events 🎟️</h1>
                <p>Find your next experience and grab your tickets now!</p>
            </header>

            {featuredEvent && (
                <section className="featured-section">
                    <h2 className="section-title">✨ Featured Event</h2>
                    <FeaturedEventCard event={featuredEvent} onBuy={handleBuyNow} />
                </section>
            )}

            {standardEvents.length > 0 && (
                <section className="events-grid-section">
                    <div className="events-grid">
                        {standardEvents.map(event => (
                            <StandardEventCard key={event.id} event={event} onBuy={handleBuyNow} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default UserEventsPage;