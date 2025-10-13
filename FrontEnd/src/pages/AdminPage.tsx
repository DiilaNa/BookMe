import { useState } from "react";
import EventFormModal from "./EventModel.tsx"; // 👈 New Modal Component
import "./Styles/Admin.scss";
import ActionCard from "../components/Card.tsx";

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
                <ActionCard
                    icon="➕"
                    title=" Post a New Event"
                    description="create a fresh listing for university events, set ticket details, and publish."
                    buttonContent="Add New Event Post"
                    buttonClassName="primary"
                    onButtonClick={() => setIsModalOpen(true)}
                />

                <ActionCard
                    icon="📊"
                    title="View Analytics"
                    description="Check sales performance, revenue reports, and event popularity metrics."
                    buttonContent="Go to Reports"
                    onButtonClick={()=>handleEventPosted}
                />

                <ActionCard
                    icon="🎫"
                    title="Manage Inventory"
                    description="Adjust available seats and ticket prices for existing events."
                    buttonContent="Edit Events"
                    onButtonClick={()=> handleEventPosted}
                />
            </div>

            <EventFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleEventPosted}
            />
        </div>
    );
};

export default AdminDashboard;