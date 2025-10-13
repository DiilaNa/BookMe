// components/FeaturedEventCard.tsx

import React from 'react';
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

interface FeaturedEventCardProps {
    event: UserEvent;
    onBuy: (id: string, title: string) => void;
}

const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({ event, onBuy }) => {
    const imageSrc = event.imageBase64 || '/placeholder-featured.jpg';
    const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
        weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="event-card featured-card">
            <div className="featured-image-wrapper">
                <img src={imageSrc} alt={event.title} className="event-image" />
            </div>
            <div className="featured-content">
                <span className="card-badge">Most Recent</span>
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-meta">
                    <p>📍 {event.location}</p>
                    <p>⏰ {formattedDate}</p>
                    <p>💰 **${event.price.toFixed(2)}**</p>
                </div>

                <button
                    className="buy-button primary-buy-button"
                    onClick={() => onBuy(event.id, event.title)}
                >
                    Buy Tickets Now
                </button>
            </div>
        </div>
    );
};

export default FeaturedEventCard;