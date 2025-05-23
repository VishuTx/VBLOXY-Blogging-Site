import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserPlus } from 'lucide-react';
import './SignUpPage.css';

const SignUpPage = ({ onSignupSuccess = () => {} }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        source: "",
        password: "",
        address: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Success message state
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, firstName, lastName, password, address, source } = formData;

        if (!username || !email || !firstName || !lastName || !password || !address || !source) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Successfully registered! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login"); // Redirect after showing the message
                }, 3000); // 2-second delay before redirection
                onSignupSuccess(data);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-container">
                    {/* Header Section */}
                    <div className="signup-header">
                        <h2 className="header-title">Create Account</h2>
                        <p className="header-subtitle">Join us today!</p>
                    </div>

                    {/* Form Section */}
                    <div className="signup-form-container">
                        {errorMessage && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="success-message">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-input"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-input"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-input"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-input"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">How did you hear about us?</label>
                                    <select
                                        name="source"
                                        className="form-select"
                                        value={formData.source}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select an option</option>
                                        <option value="friend">Friend</option>
                                        <option value="advertisement">Advertisement</option>
                                        <option value="socialMedia">Social Media</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        name="address"
                                        className="form-textarea"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating Account..." : "Sign Up"}
                            </button>
                        </form>

                        <div className="login-section">
                            Already have an account?
                            <a href="/login" className="login-link">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;