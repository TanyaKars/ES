import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      if (formData.email && formData.password) {
        // Store user session (in real app, this would be JWT token)
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        navigate('/dashboard');
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="brand-link" data-testid="brand-link">
              <h1>QA Academy</h1>
            </Link>
            <h2 data-testid="login-title">Welcome Back</h2>
            <p data-testid="login-subtitle">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" data-testid="login-form">
            {error && (
              <div className="error-message" data-testid="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
                disabled={loading}
                data-testid="email-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  data-testid="password-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="password-toggle"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" data-testid="remember-me" />
                <span className="checkbox-text">Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link" data-testid="forgot-password-link">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
              data-testid="login-button"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link" data-testid="register-link">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Demo credentials for QA testing */}
          <div className="demo-section" data-testid="demo-credentials">
            <h4>Demo Credentials for Testing:</h4>
            <div className="demo-credentials">
              <div className="demo-credential">
                <strong>Valid User:</strong>
                <br />
                Email: demo@qaacademy.com
                <br />
                Password: password123
              </div>
              <div className="demo-credential">
                <strong>Admin User:</strong>
                <br />
                Email: admin@qaacademy.com
                <br />
                Password: admin123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;