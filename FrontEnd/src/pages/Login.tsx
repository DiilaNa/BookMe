import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/Login.scss";
import FormInput from "../components/FormInput.tsx";
import { loginUser } from "../api/authService.ts";

// Validation pattern
const validationPatterns = {
    password: new RegExp(".{8,}"), // At least 8 characters
};

// Form types
interface LoginForm {
    username: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user?: {
        id: string;
        username: string;
        role: string;
        status?: string;
    };
}

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setValidationErrors(prev => ({ ...prev, [name]: "" }));
    };

    // Form validation
    const validateForm = () => {
        const errors: Record<string, string> = {};
        let isValid = true;

        if (!form.username.trim()) {
            errors.username = "Username is required.";
            isValid = false;
        }

        if (!validationPatterns.password.test(form.password)) {
            errors.password = "Password must be at least 8 characters.";
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    // Handle form submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Call backend login
            const response: LoginResponse = await loginUser(form);

            // Save tokens
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);

            // Optionally store user info
            if (response.user) {
                localStorage.setItem("user", JSON.stringify(response.user));
            }

            setMessage("✅ Login successful! Redirecting...");

            // Redirect to dashboard after 1 second
            setTimeout(() => navigate("/user"), 1000);

        } catch (err: any) {
            setMessage(err.response?.data?.message || "❌ Login failed. Please check your credentials.");
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
                        label="Username"
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        errorMessage={validationErrors.username}
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
