import "./Styles/FormInput.scss";
import React from "react";

interface FormInputProps {
    label: string,
    type: string,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    errorMessage?: string,
    min?: string,
    placeholder?: string,
    step?: string
}

const FormInput = ({label, type, name, value, onChange, required, errorMessage, min, placeholder, step}: FormInputProps) => {
    const inputClass = errorMessage ? 'input-error' : '';
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={inputClass}
                min={min}
                placeholder={placeholder}
                step={step}
            />
            {errorMessage && (
                <span className="error-message">{errorMessage}</span>
            )}
        </div>
    );
};

export default FormInput;
