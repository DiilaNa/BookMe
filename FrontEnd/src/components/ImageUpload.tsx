import React from "react";
import "./Styles/FormInput.scss";
import "././Styles/ImageUpload.scss"

interface ImageUploadInputProps {
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName: string | null;
    errorMessage: string | undefined;
    required?: boolean;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
                                                               onFileChange,
                                                               fileName,
                                                               errorMessage,
                                                               required = false,
                                                           }) => {
    return (
        <div className="form-group image-upload-group">
            <label htmlFor="eventImage">
                Event Picture (Saved in DB)
                {required && <span style={{ color: 'red', marginLeft: '5px' }}>*</span>}
            </label>
            <input
                id="eventImage"
                type="file"
                name="eventImage"
                accept="image/*"
                onChange={onFileChange}
                required={required}
                className={errorMessage ? 'input-error' : ''}
            />
            {fileName && (
                <p className="file-preview">Selected: {fileName}</p>
            )}
            {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
    );
};

export default ImageUploadInput;