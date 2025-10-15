import React from 'react';
import "./Styles/EventPostCards.scss"
import type {EventPost} from "../types/Events.ts";


interface EventPostCardProps {
    event: EventPost;
}

const EventPostCard: React.FC<EventPostCardProps> = ({ event }) => {
    const imageToDisplay = event.eventImageBase64
        ? `data:image/jpeg;base64,${event.eventImageBase64}`
        : '/placeholder-event-image.svg';

    const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="action-card event-post-card">

            <div className="card-image-wrapper">
                <img
                    src={imageToDisplay}
                    alt={`Poster for ${event.title}`}
                    className="event-poster-image"
                />
            </div>

            <div className="card-content">
                <h2>{event.title}</h2>
                <p className="event-details">
                    📅 {formattedDate} at {event.location}
                </p>
                <p className="event-description">
                    {event.description.length > 100
                        ? `${event.description.substring(0, 100)}...`
                        : event.description}
                </p>

                <div className="event-stats">
                    <span className="stat-item">🎫 Seats: {event.totalSeats}</span>
                    <span className="stat-item">💲 Price: ${event.price.toFixed(2)}</span>
                </div>
            </div>

            <button className="action-button secondary">
                View/Edit Post
            </button>
        </div>
    );
};

export default EventPostCard;