import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = ({ onSignupSuccess = () => {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password || !profileImage) {
      setErrorMessage('Please fill in all fields including profile image.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('profile', profileImage); // 🔥 MUST match backend multer field

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: data
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Successfully registered! Redirecting to login...');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
        onSignupSuccess(result);
      } else {
        throw new Error(result.msg || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-container">
          <div className="signup-header">
            <h2 className="header-title">Sign Up</h2>
            <p className="header-subtitle">Join SmartHive now</p>
          </div>

          <div className="signup-form-container">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="avatar-upload">
                <label htmlFor="profile-upload">
                  <div className="avatar-preview">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="avatar-image" />
                    ) : (
                      <span className="avatar-placeholder">+</span>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  name="profile"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </div>

              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
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

              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="login-section">
              Already have an account?
              <a href="/signin" className="login-link">Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
