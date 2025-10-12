import { useState } from "react";
import EventFormModal from "./EventModel.tsx"; // 👈 New Modal Component
import "./Styles/Admin.scss";

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEventPosted = (title: string) => {
        setIsModalOpen(false); // Close the modal
        alert(`🎉 Event "${title}" successfully posted and ready for sale!`);
    };

    return (
        <div className="admin-dashboard-page">
            <header className="dashboard-header">
                <h1>Admin Control Center 🌟</h1>
                <p>Manage University Events and Ticket Inventory.</p>
            </header>

            <div className="dashboard-content">
                <div className="action-card new-event-card">
                    <div className="card-icon">➕</div>
                    <h2>Post a New Event</h2>
                    <p>Create a fresh listing for university events, set ticket details, and publish.</p>
                    <button
                        className="action-button primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add New Event Post
                    </button>
                </div>

                {/* Placeholder for other admin cards */}
                <div className="action-card stats-card">
                    <div className="card-icon">📊</div>
                    <h2>View Analytics</h2>
                    <p>Check sales performance, revenue reports, and event popularity metrics.</p>
                    <button className="action-button secondary">Go to Reports</button>
                </div>

                <div className="action-card inventory-card">
                    <div className="card-icon">🎫</div>
                    <h2>Manage Inventory</h2>
                    <p>Adjust available seats and ticket prices for existing events.</p>
                    <button className="action-button secondary">Edit Events</button>
                </div>
            </div>

            {/* The Modal Component */}
            <EventFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleEventPosted}
            />
        </div>
    );
};

export default AdminDashboard;