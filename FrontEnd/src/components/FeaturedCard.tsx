// components/FeaturedEventCard.tsx

import React from 'react';
import type {UserEvent} from "../types/Events";
interface FeaturedEventCardProps {
    event: UserEvent;
    onBuy?: (event: UserEvent) => Promise<void>;
}

const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({ event, onBuy }) => {
    const imageSrc = event.eventImageBase64 || '/placeholder-featured.jpg';
    const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="event-card featured-card">
            <div className="featured-image-wrapper">
                <img src={imageSrc} alt={event.title} className="event-image"/>
            </div>
            <div className="featured-content">
                <span className="card-badge">Most Recent</span>
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-meta">
                    <p>📍 {event.location}</p>
                    <p>⏰ {formattedDate}</p>
                    <p><strong>💰 ${event.price.toFixed(2)}</strong></p>
                </div>

                {onBuy && (
                    <button
                        className="buy-button primary-buy-button"
                        onClick={() => onBuy(event)}
                    >
                        Buy Tickets Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default FeaturedEventCard;