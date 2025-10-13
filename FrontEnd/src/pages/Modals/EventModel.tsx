import { useState, useMemo } from "react";
import type { FormEvent } from "react";
import FormInput from "../../components/FormInput.tsx";
import "../Styles/EventModel.scss";
import ImageUpload from "../../components/ImageUpload.tsx";

// Define the shape of the data based on your EventsDTO
interface EventForm {
    title: string;
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    eventImageBase64: string | null;
    // FIX 1: Add state field for displaying the file name to the user
    eventImageFileName: string | null;
}

const initialFormState: EventForm = {
    title: "",
    description: "",
    date: "",
    location: "",
    totalSeats: 0,
    price: 0.00,
    eventImageBase64: null,
    // FIX 2: Initialize the new file name state field
    eventImageFileName: null,
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            // Check file size (optional, but good practice for Base64 limits)
            if (file.size > 2 * 1024 * 1024) { // Limit to 2MB
                setValidationErrors(prev => ({ ...prev, image: "Image size must be less than 2MB." }));
                // Use null for both base64 and file name on error
                setForm(prev => ({ ...prev, eventImageBase64: null, eventImageFileName: null }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                // reader.result is the Base64 string (e.g., "data:image/jpeg;base64,.....")
                setForm(prev => ({
                    ...prev,
                    eventImageBase64: reader.result as string, // Save the Base64 string
                    eventImageFileName: file.name // Save the file name for display
                }));
                setValidationErrors(prev => ({ ...prev, image: "" }));
            };
            // Read the file content as a Data URL (which produces the Base64 string)
            reader.readAsDataURL(file);
        } else {
            // Reset state if file selection is cancelled
            setForm(prev => ({ ...prev, eventImageBase64: null, eventImageFileName: null }));
        }
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
        // Validation check for image error added during file selection
        if (validationErrors.image) {
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

        // Prepare the JSON payload including the Base64 image string
        const payload = {
            title: form.title,
            description: form.description,
            date: form.date,
            location: form.location,
            totalSeats: form.totalSeats,
            price: form.price,
            imageBase64: form.eventImageBase64, // The name must match the Spring Boot DTO field
        };

        try {

            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to post event.");
            }

            // Assuming the API call was successful
            // const result = await response.json(); // Uncomment this line if your backend returns data

            console.log("Event Data Posted:", payload);

            setForm(initialFormState);
            onSuccess(form.title);

        } catch (err) {
            // Show error within the modal if API fails
            setValidationErrors({ api: "Failed to post event. Check server status or file size." });
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

                        <div className="form-group image-upload-group">
                            <ImageUpload
                                onFileChange={handleFileChange}
                                fileName={form.eventImageFileName}
                                errorMessage={validationErrors.image}
                                 required={true}
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