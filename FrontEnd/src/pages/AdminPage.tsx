import { useState, useEffect } from "react";
import EventFormModal from "./Modals/EventModel.tsx";
import EventPostCard from "../components/EventPostsCards.tsx";
import "./Styles/Admin.scss";
import ActionCard from "../components/Card.tsx";
import ReportModal from "../pages/Modals/Report.tsx"
import EditEventModel from "./Modals/EditEventModel.tsx";
import {useNavigate} from "react-router-dom";

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
    const [events, setEvents] = useState<EventPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventPost | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // NEW: State for Edit modal
    const [eventToEdit, setEventToEdit] = useState<EventPost | null>(null); // NEW: State for event being edited
    const navigate = useNavigate();


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
        const admin = localStorage.getItem("role");

        if ( !admin || admin  !== "ADMIN") {
            navigate("/");
            return;
        }

        fetchEvents();
    }, []);

    const handleEventPosted = (title: string) => {
        setIsModalOpen(false);
        alert(`🎉 Event "${title}" successfully posted and ready for sale!`);
        fetchEvents();
    };


    const handleGoToReports = () => {
        if (events.length > 0) {
            setSelectedEvent(events[0]);
            setIsReportModalOpen(true);
        } else {
            alert("No events posted yet to view a report.");
        }
    };

    const handleEditEvent = () => {
        if (events.length > 0){
            setEventToEdit(events[0]);
            setIsEditModalOpen(true);
        }else {
            alert("No events posted yet to manage.");
        }
    };
    const handleSignOut = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };


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
            <button className="sout" onClick={handleSignOut}>
                Sign Out
            </button>
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
                    onButtonClick={handleGoToReports}
                />

                <ActionCard
                    icon="🎫"
                    title="Manage Inventory"
                    description="Adjust available seats and ticket prices for existing events."
                    buttonContent="Edit Events"
                    onButtonClick={handleEditEvent}
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
            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                event={selectedEvent}
            />

            <EditEventModel
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                eventToEdit={eventToEdit}
                onSuccess={handleEventPosted}
            />
        </div>
    );
};

export default AdminDashboard;