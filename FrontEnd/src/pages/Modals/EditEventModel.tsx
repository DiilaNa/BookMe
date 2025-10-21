import  { updateEvent } from "../../api/authService.ts"; // adjust path as needed
import React, { useState, useMemo, useEffect } from "react";
import type { FormEvent } from "react";
import FormInput from "../../components/FormInput.tsx";
import ImageUpload from "../../components/ImageUpload.tsx";
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/EventModel.scss";
import {toast, ToastContainer} from "react-toastify";

interface EventForm {
    id: string;
    userID: string;
    title: string;
    description: string;
    date: string;
    location: string;
    totalSeats: number;
    price: number;
    eventImageBase64: string | null;
    eventImageFileName: string | null;
}

interface EventData {
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

interface EventEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventToEdit: EventData | null;
    onSuccess: (title: string) => void;
}
const EventEditModal: React.FC<EventEditModalProps> = ({ isOpen, onClose, eventToEdit, onSuccess }) => {
    const [form, setForm] = useState<EventForm>({
        id: "", userID: "",
        title: "", description: "", date: "", location: "", totalSeats: 0, price: 0.00,
        eventImageBase64: null, eventImageFileName: null
    });
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (eventToEdit) {
            const formatForInput = (isoDate: string) => {
                const date = new Date(isoDate);
                date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                return date.toISOString().slice(0, 16);
            };

            setForm({
                id:  eventToEdit.id,
                userID: localStorage.getItem("userId") || "",
                title: eventToEdit.title,
                description: eventToEdit.description,
                date: formatForInput(eventToEdit.date),
                location: eventToEdit.location,
                totalSeats: eventToEdit.totalSeats,
                price: eventToEdit.price,
                eventImageBase64: eventToEdit.eventImageBase64,
                eventImageFileName: eventToEdit.eventImageFileName
            });
            setValidationErrors({});
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
             setForm(prev => ({ ...prev, eventImageBase64: null, eventImageFileName: null }));
        }
    };


    const validateForm = () => {
        const errors: Record<string, string> = {};
        let isValid = true;
        if (validationErrors.image) isValid = false;
        setValidationErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm() || !eventToEdit) return;

        setLoading(true);

        try {
            await updateEvent(form);
            onSuccess(form.title);
            toast.success("Updated Successfully",{
                autoClose :3000,
                pauseOnHover:true
            })
        } catch (err) {
            toast.error("Failed to update",{
                autoClose :3000,
                pauseOnHover:true
            })
            setValidationErrors({ api: "Failed to update event. Please try again." });
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
                                imagePreviewBase64={form.eventImageBase64}
                            />
                        </div>

                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? "Updating..." : "Save Changes"}
                        </button>
                        <button type="button" className="action-button secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <ToastContainer position="top-right" autoClose={3000} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventEditModal;