import React, { useState } from 'react';
import type { UserEvent } from "../types/Events.ts";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface StandardEventCardProps {
    event: UserEvent;
    onBuy?: (event: UserEvent) => Promise<void>;
}

const StandardEventCard: React.FC<StandardEventCardProps> = ({ event, onBuy }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const imageSrc = event.eventImageBase64 || '/placeholder-standard.jpg';
    const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: '2-digit'
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
            toast.error("error loading")
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="event-card standard-card">
            <div className="card-image-wrapper">
                <img src={imageSrc} alt={event.title} className="event-image" />
                <span className="card-price">Rs.{event.price.toFixed(2)}</span>
            </div>

            <div className="card-body">
                <h4>{event.title}</h4>
                <p className="event-date">📅 {formattedDate}</p>
                <p className="event-location">📍 {event.location}</p>
            </div>

            <div className="card-footer">
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
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default StandardEventCard;
