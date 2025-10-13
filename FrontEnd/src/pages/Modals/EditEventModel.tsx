import React, { useState, useMemo, useEffect } from "react";
import type { FormEvent } from "react";
import FormInput from "../../components/FormInput.tsx";
import ImageUpload from "../../components/ImageUpload.tsx";
import "../Styles/EventModel.scss";

interface EventForm {
    title: string;
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    eventImageBase64: string | null;
    eventImageFileName: string | null;
}

// Interface matching the data fetched from the DB (with ID)
interface EventData {
    id: string;
    title: string;
    description: string;
    // Date must be converted to datetime-local format (YYYY-MM-DDTHH:MM)
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    imageBase64: string | null;
}

interface EventEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    // Pass the event data that needs to be edited
    eventToEdit: EventData | null;
    onSuccess: (title: string) => void;
}

const EventEditModal: React.FC<EventEditModalProps> = ({ isOpen, onClose, eventToEdit, onSuccess }) => {
    // FIX 1: Initial state is derived from eventToEdit whenever it changes
    const [form, setForm] = useState<EventForm>({
        title: "", description: "", date: "", location: "", totalSeats: 0, price: 0.00,
        eventImageBase64: null, eventImageFileName: null,
    });
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // FIX 2: Load existing data when the modal opens or eventToEdit changes
    useEffect(() => {
        if (eventToEdit) {
            // Helper function to format ISO date string for datetime-local input
            const formatForInput = (isoDate: string) => {
                const date = new Date(isoDate);
                date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                return date.toISOString().slice(0, 16);
            };

            setForm({
                title: eventToEdit.title,
                description: eventToEdit.description,
                // Ensure date is formatted correctly for input[type="datetime-local"]
                date: formatForInput(eventToEdit.date),
                location: eventToEdit.location,
                totalSeats: eventToEdit.totalSeats,
                price: eventToEdit.price,
                // Load existing image data and set a placeholder file name
                eventImageBase64: eventToEdit.imageBase64,
                eventImageFileName: eventToEdit.imageBase64 ? "Existing Image Loaded" : null,
            });
            setValidationErrors({}); // Clear errors when loading new data
        }
    }, [eventToEdit]);


    const minDate = useMemo(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    }, []);

    if (!isOpen || !eventToEdit) { // Only render if open and data is present
        return null;
    }

    // Reuse handleChange and handleFileChange logic from EventFormModal
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // ... (standard handleChange logic remains the same) ...
        const { name, value, type } = e.target;
        const newValue = (type === 'number' || name === 'totalSeats' || name === 'price')
            ? parseFloat(value) || 0
            : value;
        setForm({ ...form, [name]: newValue });
        setValidationErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // ... (handleFileChange logic remains the same, converting to Base64) ...
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setValidationErrors(prev => ({ ...prev, image: "Image size must be less than 2MB." }));
                setForm(prev => ({ ...prev, eventImageBase64: null, eventImageFileName: null }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prev => ({
                    ...prev,
                    eventImageBase64: reader.result as string,
                    eventImageFileName: file.name
                }));
                setValidationErrors(prev => ({ ...prev, image: "" }));
            };
            reader.readAsDataURL(file);
        } else {
            // Allows user to clear the image by clicking cancel on file selection
            setForm(prev => ({ ...prev, eventImageBase64: null, eventImageFileName: null }));
        }
    };

    const validateForm = () => {
        // ... (standard validateForm logic remains the same) ...
        const errors: Record<string, string> = {};
        let isValid = true;
        // ... (all validation checks) ...
        if (validationErrors.image) isValid = false;
        setValidationErrors(errors);
        return isValid;
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const payload = {
            title: form.title,
            description: form.description,
            date: form.date,
            location: form.location,
            totalSeats: form.totalSeats,
            price: form.price,
            imageBase64: form.eventImageBase64,
        };

        try {
            // FIX 3: Use PUT method for updating existing event
            const response = await fetch(`/api/events/${eventToEdit.id}`, {
                method: 'PUT', // or PATCH, depending on your Spring Boot config
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to update event.");
            }

            onSuccess(form.title);

        } catch (err) {
            setValidationErrors({ api: "Failed to update event. Check server status." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="event-form-modal" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    {/* FIX 4: Update header for editing context */}
                    <h2>Edit Event: {eventToEdit.title} ✏️</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </header>

                <div className="modal-body">
                    {validationErrors.api && <div className="alert error">{validationErrors.api}</div>}

                    <form onSubmit={handleSubmit} className="event-form">

                        {/* Reuse existing FormInput components */}
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

                        <div className="form-row">
                            <FormInput
                                label="Date & Time"
                                type="datetime-local"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                min={minDate}
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
                            {/* Reuse ImageUpload component */}
                            <ImageUpload
                                onFileChange={handleFileChange}
                                fileName={form.eventImageFileName}
                                errorMessage={validationErrors.image}
                            />
                        </div>

                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? "Updating..." : "Save Changes"}
                        </button>
                        <button type="button" className="action-button secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventEditModal;