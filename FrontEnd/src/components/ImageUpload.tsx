import React from "react";
import "./Styles/FormInput.scss";
import "././Styles/ImageUpload.scss"

interface ImageUploadInputProps {
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName: string | null;
    errorMessage: string | undefined;
    required?: boolean;
    imagePreviewBase64: string | null;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
                                                               onFileChange,
                                                               fileName,
                                                               errorMessage,
                                                               required = false,
                                                               imagePreviewBase64

                                                           }) => {
    return (
        <div className="form-group image-upload-group">
            <label htmlFor="eventImage">
                Event Picture (Saved in DB)
                {required && <span style={{ color: 'red', marginLeft: '5px' }}>*</span>}
            </label>
            <input
                id="event-image-upload"
                type="file"
                name="eventImage"
                accept="image/*"
                onChange={onFileChange}
                required={required}
                className={errorMessage ? 'input-error' : ''}
            />
            {imagePreviewBase64 && (
                <div className="image-preview-container">
                    <p>Current Image:</p>
                    <img src={imagePreviewBase64} alt="Current Event Poster" className="current-poster-preview"/>
                    {fileName && <p className="file-preview">File: {fileName}</p>}
                </div>
            )}
            {!imagePreviewBase64 && fileName && (
                <p className="file-preview">Selected: {fileName}</p>
            )}
            {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
    );
};

export default ImageUploadInput;