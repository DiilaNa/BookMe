import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import "./Styles/Login.scss"; // 👈 Use the same styling structure
import FormInput from "../components/FormInput.tsx";

/*
import { loginUser } from "../../services/api"; // Placeholder for API function
*/


const validationPatterns = {
    password: new RegExp(".{8,}"), // At least 8 characters
};

interface LoginForm {
    name: string;
    password: string;
}

const Login = () => {
    const [form, setForm] = useState<LoginForm>({ name: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Clear validation error as the user types
        setValidationErrors(prev => ({ ...prev, [name]: "" }));
    };


    const validateForm = () => {
        const errors: Record<string, string> = {};
        let isValid = true;

        if (!validationPatterns.password.test(form.password)) {
            errors.password = "Password must be at least 8 characters.";
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
            setMessage("✅ Login successful! Redirecting...");

            // In a real app, you'd handle setting auth tokens and redirecting here
            // setTimeout(() => window.location.href = "/dashboard", 1000);

        } catch (err: any) {
            setMessage(`❌ Login failed. Please check your credentials.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Welcome Back 👋</h1>
                <p>Sign in to continue to your account</p>

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
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        errorMessage={validationErrors.password}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging In..." : "Log In"}
                    </button>

                    <p className="signup-link-container">
                        Don't have an account? <Link to="/signup">Click here to sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;