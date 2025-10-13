import { useState, useEffect } from "react";
import EventFormModal from "./Modals/EventModel.tsx";
import EventPostCard from "../components/EventPostsCards.tsx";
import "./Styles/Admin.scss";
import ActionCard from "../components/Card.tsx";

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


const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<EventPost[]>([]); // State to hold events
    const [isLoading, setIsLoading] = useState(true); // State for loading status

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/events');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data: EventPost[] = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventPosted = (title: string) => {
        setIsModalOpen(false); // Close the modal
        alert(`🎉 Event "${title}" successfully posted and ready for sale!`);
        fetchEvents();
    };

    const handleActionClick = (action: string) => {
        console.log(`Navigating to ${action}...`);
    }

    // FIX 5: Conditional rendering for the event posts section
    const renderEventPosts = () => {
        if (isLoading) {
            return <div className="no-posts-message"><h3>Loading Events...</h3></div>;
        }

        if (events.length === 0) {
            return (
                <div className="no-posts-message">
                    <h3>No Events Posted Yet 😞</h3>
                    <p>Click "Add New Event Post" above to start selling tickets!</p>
                </div>
            );
        }

        return (
            <div className="posts-grid">
                {events.map(event => (
                    <EventPostCard key={event.id} event={event} />
                ))}
            </div>
        );
    };

    return (
        <div className="admin-dashboard-page">
            <header className="dashboard-header">
                <h1>Admin Control Center 🌟</h1>
                <p>Manage University Events and Ticket Inventory.</p>
            </header>

            <div className="dashboard-content">
                {/* Action Cards at the top */}
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
                    onButtonClick={() => handleActionClick('Reports')}
                />

                <ActionCard
                    icon="🎫"
                    title="Manage Inventory"
                    description="Adjust available seats and ticket prices for existing events."
                    buttonContent="Edit Events"
                    onButtonClick={() => handleActionClick('Inventory')}
                />

                <div className="event-posts-list">
                    <h2>Active Event Posts ({events.length})</h2>
                    {renderEventPosts()}
                </div>
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