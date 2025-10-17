import React from 'react';
import type {UserEvent} from "../types/Events.ts";

interface  StandardEventCardProps {
    event: UserEvent;
    onBuy?: (event: UserEvent) => Promise<void>;
}

const StandardEventCard: React.FC<StandardEventCardProps> = ({ event, onBuy }) => {
    const imageSrc = event.eventImageBase64 || '/placeholder-standard.jpg';
    const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: '2-digit'
    });

    return (
        <div className="event-card standard-card">
            <div className="card-image-wrapper">
                <img src={imageSrc} alt={event.title} className="event-image" />
                <span className="card-price">${event.price.toFixed(2)}</span>
            </div>

            <div className="card-body">
                <h4>{event.title}</h4>
                <p className="event-date">📅 {formattedDate}</p>
                <p className="event-location">📍 {event.location}</p>
            </div>

            <div className="card-footer">
                <button
                    className="buy-button secondary-buy-button"
                    onClick={() => onBuy?.(event)}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default StandardEventCard;