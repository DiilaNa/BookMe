import React from 'react';

interface TicketBuyer {
    id: number;
    name: string;
    email: string;
    ticketsPurchased: number;
}

interface EventReport {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    eventImageBase64: string | null;
    eventImageFileName: string | null;
}

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: EventReport | null; // The event whose report is being viewed
}

const DUMMY_BUYERS: TicketBuyer[] = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", ticketsPurchased: 2 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", ticketsPurchased: 1 },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", ticketsPurchased: 4 },
    { id: 4, name: "Diana Prince", email: "diana@example.com", ticketsPurchased: 2 },
];

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, event }) => {
    if (!isOpen || !event) {
        return null;
    }

   /* const imageSrc = event.eventImageBase64 || '/placeholder-event-image.svg';*/
    const totalRevenue = DUMMY_BUYERS.reduce((sum, user) => sum + user.ticketsPurchased, 0) * event.price;
    const ticketsSold = DUMMY_BUYERS.reduce((sum, user) => sum + user.ticketsPurchased, 0);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="report-modal" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h2>📊 Event Report: {event.title}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </header>

                <div className="modal-body-report">
                    <div className="report-grid">

                        {/* 1. Image and Key Stats */}
                        <div className="event-summary-card">
                            <div className="report-image-container">
                                <img alt={event.title} className="report-image" />
                            </div>
                            <div className="key-stats">
                                <div className="stat-box revenue">
                                    <h3>Total Revenue</h3>
                                    <span>${totalRevenue.toFixed(2)}</span>
                                </div>
                                <div className="stat-box sold">
                                    <h3>Tickets Sold</h3>
                                    <span>{ticketsSold} / {event.totalSeats}</span>
                                </div>
                                <div className="stat-box remaining">
                                    <h3>Seats Left</h3>
                                    <span>{event.totalSeats - ticketsSold}</span>
                                </div>
                            </div>
                        </div>
                        <div className="event-details-card">
                            <h3>Event Details</h3>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                            <p><strong>Ticket Price:</strong> ${event.price.toFixed(2)}</p>
                            <p><strong>Description:</strong> {event.description}</p>
                        </div>

                        {/* 3. Ticket Buyers List */}
                        <div className="buyers-list-card">
                            <h3>Ticket Buyers ({DUMMY_BUYERS.length})</h3>
                            <div className="buyers-table-container">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Tickets</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {DUMMY_BUYERS.map(buyer => (
                                        <tr key={buyer.id}>
                                            <td>{buyer.name}</td>
                                            <td>{buyer.email}</td>
                                            <td>{buyer.ticketsPurchased}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;