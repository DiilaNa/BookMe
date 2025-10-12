import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom"; // 👈 New: Import Link for navigation
import "./Styles/SignUp.scss";
import FormInput from "../components/FormInput.tsx";

/*
import { signUpUser } from "../../services/api";
*/

// 1. Define Regex Patterns
const validationPatterns = {
    password: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"),
    email: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
    phone: new RegExp("^\\d{10}$"),
    name: new RegExp("^[a-zA-Z\\s]{3,}$"),
};

interface SignUpForm {
    name: string;
    email: string;
    password: string;
    phone: string
}

const SignUp = () => {
    const [form, setForm] = useState<SignUpForm>({ name: "", email: "", password: "",phone : ""});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        setValidationErrors(prev => ({ ...prev, [name]: "" }));
    };


    const validateForm = () => {
        const errors: Record<string, string> = {};
        let isValid = true;

        if (!validationPatterns.name.test(form.name)) {
            errors.name = "Name must be at least 3 characters and contain only letters/spaces.";
            isValid = false;
        }

        if (!validationPatterns.email.test(form.email)) {
            errors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (!validationPatterns.password.test(form.password)) {
            errors.password = "Password must be 8+ chars, with at least one uppercase, lowercase, and number.";
            isValid = false;
        }

        if (!validationPatterns.phone.test(form.phone)) {
            errors.phone = "Phone number must be exactly 10 digits.";
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            setMessage("✅ Account created successfully!");
            setForm({ name: "", email: "", password: "", phone:""});
        } catch (err: any) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <h1>Join Us Today ✨</h1>
                <p>Create your free account to get started</p>

                {message && <div className="alert">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="User Name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        errorMessage={validationErrors.name}
                    />
                    <FormInput
                        label="Email Address"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        errorMessage={validationErrors.email}
                    />
                    <FormInput
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        errorMessage={validationErrors.phone}
                    />

                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        errorMessage={validationErrors.password}
                    />

                    <FormInput
                        label="Confirm Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        errorMessage={validationErrors.password}
                    />


                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                    <p className="login-link-container">
                        Already have an account? <Link to="/login">Click here to log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;