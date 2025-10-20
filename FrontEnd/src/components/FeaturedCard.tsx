import React, { useState } from 'react';
import type { UserEvent } from "../types/Events";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FeaturedEventCardProps {
    event: UserEvent;
    onBuy?: (event: UserEvent) => Promise<void>;
}

const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({ event, onBuy }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const imageSrc = event.eventImageBase64 || '/placeholder-featured.jpg';
    const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleBuy = async () => {
        if (!onBuy || event.isBought || isProcessing) return;

        const confirmed = window.confirm(`Do you want to buy "${event.title}" for Rs.${event.price.toFixed(2)}?`);
        if (!confirmed) return;

        try {
            setIsProcessing(true);
            await onBuy(event);
        } catch (err) {
            console.error("Purchase failed:", err);
            toast.error("error loading");
            setIsProcessing(false);
        }
    };

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
                    <p><strong>💰 Rs.{event.price.toFixed(2)}</strong></p>
                </div>

                {onBuy && (
                    <button
                        className={`buy-button ${event.isBought ? 'bought' : 'buy-now'}`}
                        onClick={handleBuy}
                        disabled={event.isBought || isProcessing}
                    >
                        {event.isBought
                            ? '🎟️ Bought'
                            : isProcessing
                                ? 'Processing...'
                                : 'Buy Now'}
                    </button>
                )}
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default FeaturedEventCard;
