
import { useState, useMemo } from "react";
import type { FormEvent } from "react";
import FormInput from "../components/FormInput.tsx";
import "./Styles/EventModel.scss";

// Define the shape of the data based on your EventsDTO
interface EventForm {
    title: string;
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
}

const initialFormState: EventForm = {
    title: "",
    description: "",
    date: "",
    location: "",
    totalSeats: 0,
    price: 0.00,
};

interface EventFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (title: string) => void;
}

const EventFormModal: React.FC<EventFormModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [form, setForm] = useState<EventForm>(initialFormState);
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Memoize the minimum date (now, to prevent posting past events)
    const minDate = useMemo(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    }, []);

    if (!isOpen) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        const newValue = (type === 'number' || name === 'totalSeats' || name === 'price')
            ? parseFloat(value) || 0
            : value;

        setForm({ ...form, [name]: newValue });
        setValidationErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        let isValid = true;

        if (form.title.length < 5) {
            errors.title = "Title must be at least 5 characters.";
            isValid = false;
        }
        if (form.description.length < 20) {
            errors.description = "Description must be at least 20 characters.";
            isValid = false;
        }
        if (new Date(form.date) <= new Date()) {
            errors.date = "Event date must be in the future.";
            isValid = false;
        }
        if (form.totalSeats <= 0 || !Number.isInteger(form.totalSeats)) {
            errors.totalSeats = "Seats must be a positive whole number.";
            isValid = false;
        }
        if (form.price < 0) {
            errors.price = "Price cannot be negative.";
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // 💡 API Call Placeholder
            // const response = await postNewEvent(form);

            console.log("Event Data Posted:", form);

            // Clear form and notify parent on success
            setForm(initialFormState);
            onSuccess(form.title);

        } catch (err) {
            // Show error within the modal if API fails
            setValidationErrors({ api: "Failed to post event. Check server status." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="event-form-modal" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h2>Create New Event 📝</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </header>

                <div className="modal-body">
                    {validationErrors.api && <div className="alert error">{validationErrors.api}</div>}

                    <form onSubmit={handleSubmit} className="event-form">

                        {/* Title */}
                        <FormInput
                            label="Event Title"
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Annual Tech Summit 2025"
                            errorMessage={validationErrors.title}
                        />

                        {/* Description - Using a custom textarea group */}
                        <div className="form-group description-group">
                            <label htmlFor="description">Event Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>}
                                rows={4}
                                required
                                placeholder="Provide a detailed and engaging description..."
                            />
                            {validationErrors.description && <span className="error-message">{validationErrors.description}</span>}
                        </div>

                        {/* Date & Location Row */}
                        <div className="form-row">
                            <FormInput
                                label="Date & Time"
                                type="datetime-local"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                min={minDate} // Prevent selecting past times
                                errorMessage={validationErrors.date}
                            />
                            <FormInput
                                label="Location"
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                required
                                placeholder="e.g., University Auditorium"
                                errorMessage={validationErrors.location}
                            />
                        </div>

                        {/* Seats and Price Row */}
                        <div className="form-row">
                            <FormInput
                                label="Total Seats"
                                type="number"
                                name="totalSeats"
                                value={form.totalSeats.toString()}
                                onChange={handleChange}
                                required
                                min="1"
                                errorMessage={validationErrors.totalSeats}
                            />
                            <FormInput
                                label="Ticket Price ($)"
                                type="number"
                                name="price"
                                value={form.price.toString()}
                                onChange={handleChange}
                                required
                                step="0.01"
                                min="0"
                                errorMessage={validationErrors.price}
                            />
                        </div>

                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? "Publishing..." : "Publish Event"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventFormModal;