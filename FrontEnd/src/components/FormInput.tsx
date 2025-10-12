import "./Styles/FormInput.scss";
import React from "react";

interface FormInputProps {
    label: string,
    type: string,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    errorMessage?: string
}

const FormInput = ({label, type, name, value, onChange, required,errorMessage}: FormInputProps) => {
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
                />
            {errorMessage &&(
                <span className="error-message">{errorMessage}</span>
            )}
        </div>
    );
};

export default FormInput;
