import  { useState, useEffect } from "react";
import EventFormModal from "./Modals/EventModel.tsx";
import EventPostCard from "../components/EventPostsCards.tsx";
import "./Styles/Admin.scss";
import ActionCard from "../components/ActionCard.tsx";
import ReportModal from "../pages/Modals/Report.tsx";
import EditEventModel from "./Modals/EditEventModel.tsx";
import UserDetailsModal from "./Modals/UserDetailsModel.tsx";
import { useNavigate } from "react-router-dom";
import type { EventPost } from "../types/Events.ts";
import { getAdminEvents } from "../api/authService.ts";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<EventPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventPost | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState<EventPost | null>(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                console.error("User ID not found in localStorage. Cannot fetch events.");
                navigate("/");
                return;
            }
            const data = await getAdminEvents(userId);
            setEvents(data);
        } catch (error) {
           toast.error("Loading Failed", {
               autoClose: 3000,
               pauseOnHover: true,
           })
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const admin = localStorage.getItem("role");

        if (!admin || admin !== "ADMIN") {
            navigate("/");
            return;
        }

        fetchEvents();
    }, []);

    const handleEventPosted = () => {
        setIsModalOpen(false);
        fetchEvents();
    };

    const handleGoToReports = () => {
        if (events.length > 0) {
            toast.info("Still on working", {
                autoClose: 3000,
                pauseOnHover: true,
            })
            setSelectedEvent(events[0]);
            setIsReportModalOpen(true);
        } else {
            toast.error("No events posted yet to view a report.", {
                autoClose: 3000,
                pauseOnHover: true,
            })
        }
    };

    const handleEditEvent = (event: EventPost) => {
        setEventToEdit(event);
        setIsEditModalOpen(true);
    };

    const handleManageUsers = () => {
        setIsUserModalOpen(true);
    };

    const handleSignOut = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };

    const renderEventPosts = () => {
        if (isLoading) {
            return (
                <div className="no-posts-message">
                    <h3>Loading Events...</h3>
                </div>
            );
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
                {events.map((event) => (
                    <EventPostCard
                        key={event.id}
                        event={event}
                        onEditClick={handleEditEvent}
                    />
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
                    description="Create a fresh listing for university events, set ticket details, and publish."
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
                    title="Manage User Details"
                    description="View all users, their tickets, and event participation."
                    buttonContent="Show Users"
                    onButtonClick={handleManageUsers}
                />

                <div className="event-posts-list">
                    <h2>Active Event Posts ({events.length})</h2>
                    {renderEventPosts()}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />

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

            <UserDetailsModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
            />
        </div>
    );
};

export default AdminDashboard;
