import React, { useState, useEffect } from 'react';
import FeaturedEventCard from '../components/FeaturedCard.tsx';
import StandardEventCard from '../components/StandardCard.tsx';
import './Styles/User.scss';
import {useNavigate} from "react-router-dom";
import {getAllEvents, getPurchasedEvents, processPayment} from "../api/authService.ts";
import type {UserEvent} from "../types/Events.ts";


const UserEventsPage: React.FC = () => {
    const [events, setEvents] = useState<UserEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const fetchEvents = async () => {
        try {
            const [eventsData, purchased] = await Promise.all([
                getAllEvents(),
                getPurchasedEvents(userId!)
            ]);

            // extract all purchased eventIds
            const purchasedIds = purchased.map((p: any) => p.eventId);

            // mark bought events
            const updatedEvents = eventsData.map((event: UserEvent) => ({
                ...event,
                isBought: purchasedIds.includes(event.id)
            }));

            setEvents(updatedEvents);
        } catch (err) {
            console.error("Error loading events:", err);
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


    const handleBuyNow = async (event: UserEvent) => {
        const paymentData = {
            userId: localStorage.getItem("userId"),
            eventId: event.id,
            amount: event.price,
            method: "CARD",
        };
        try {
            const result = await processPayment(paymentData);

            alert("Payment Successful! Ticket will be emailed to you.");
            console.log("Payment result:", result);

            setEvents(prevEvents =>
                prevEvents.map(e =>
                    e.id === event.id
                        ? { ...e, isBought: true }
                        : e
                )
            );

        } catch (error) {
            alert((error as Error).message);
        }
    };

    const handleSignOut = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };


    const featuredEvent = events[0];
    const standardEvents = events.slice(1);

    if (isLoading) return <div className="loading">Loading exciting events...</div>;
    if (events.length === 0) return <div className="no-events"><h1>No upcoming events scheduled.</h1></div>;

    return (
        <div className="user-events-page">
            <button className="sout" onClick={handleSignOut}>
                Sign Out
            </button>
            <header className="page-header">
                <h1>Discover University Events 🎟️</h1>
                <p>Find your next experience and grab your tickets now!</p>
            </header>

            {featuredEvent && (
                <section className="featured-section">
                    <h2 className="section-title">✨ Featured Event</h2>
                    <FeaturedEventCard event={featuredEvent} onBuy={handleBuyNow}/>
                </section>
            )}

            {standardEvents.length > 0 && (
                <section className="events-grid-section">
                    <div className="events-grid">
                        {standardEvents.map(event => (
                            <StandardEventCard key={event.id} event={event} onBuy={handleBuyNow}/>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default UserEventsPage;