import React from 'react';
import "./Styles/EventPostCards.scss"

interface EventPost {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    imageBase64: string | null;
}

interface EventPostCardProps {
    event: EventPost;
}

const EventPostCard: React.FC<EventPostCardProps> = ({ event }) => {
    const imageSrc = event.imageBase64 || '/placeholder-event-image.svg';

    const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="action-card event-post-card">
            <div className="event-image-container">
                <img src={imageSrc} alt={event.title} className="event-image" />
            </div>

            <div className="card-content">
                <h2>{event.title}</h2>
                <p className="event-details">
                    📅 {formattedDate} at {event.location}
                </p>
                <p className="event-description">{event.description.substring(0, 100)}...</p>

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