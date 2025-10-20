import React, { useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import { getUserModalDetails} from "../../api/authService.ts";
import "../Styles/UserDetailsModel.scss";

interface UserSummary {
    id: string;
    name: string;
    email: string;
    phone: string;
    ticketCount: number;
    totalPayments: number;
    paymentStatus: string;
    eventNames: string;
}


interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const UserDetailsModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [users, setUsers] = useState<UserSummary[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) fetchUsers();
    }, [isOpen]);

    const fetchUsers = async (keyword?: string) => {
        setLoading(true);
        try {
            const data = await getUserModalDetails(keyword || "");
            setUsers(data);
        } catch (e) {
            console.error("Error fetching users:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchUsers(search);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container user-modal">
                <header>
                    <h2>👥 User Details & Ticket Summary</h2>
                    <button className="close-btn" onClick={onClose}><X size={22} /></button>
                </header>

                <div className="search-section">
                    <div className="search-input-wrapper">
                        <Search className="search-icon" size={18}/>
                        <input
                            type="text"
                            placeholder="Search by email... "
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                    </div>
                    <button className="search-btn" onClick={handleSearch}>Search</button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="loader"></div>
                        <p>Loading users...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="no-users-container">
                        <h3>No User Details Found </h3>
                        <p>Try adjusting your search or check back later.</p>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="user-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Tickets Bought</th>
                                <th>Total Payments (LKR)</th>
                                <th>Payment Status</th>
                                <th>Event Names</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.phone || "—"}</td>
                                    <td>{u.ticketCount}</td>
                                    <td>{u.totalPayments.toFixed(2)}</td>
                                    <td>{u.paymentStatus}</td>
                                    <td className="event-names">{u.eventNames || "—"}</td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetailsModal;

