import React from 'react';
import "../Styles/Reports.scss"

/*interface TicketBuyer {
    id: number;
    name: string;
    email: string;
    ticketsPurchased: number;
}*/

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


const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, event }) => {
    if (!isOpen || !event) {
        return null;
    }

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
                                    <span>{}</span>
                                </div>
                                <div className="stat-box sold">
                                    <h3>Tickets Sold</h3>
                                    <span>{} / {event.totalSeats}</span>
                                </div>
                                <div className="stat-box remaining">
                                    <h3>Seats Left</h3>
                                    {/*<span>{event.totalSeats - ticketsSold}</span>*/}
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
                           {/* <h3>Ticket Buyers ({DUMMY_BUYERS.length})</h3>*/}
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