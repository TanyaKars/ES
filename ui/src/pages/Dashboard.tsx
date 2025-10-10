import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 data-testid="dashboard-title">QA Academy Dashboard</h1>
          <div className="user-menu">
            <span data-testid="user-welcome">
              Welcome, {user.firstName || user.email}!
            </span>
            <button 
              onClick={handleLogout} 
              className="btn btn-secondary"
              data-testid="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="welcome-section" data-testid="welcome-section">
            <h2>Welcome to Your Learning Dashboard</h2>
            <p>Start your QA automation journey with our comprehensive courses.</p>
          </div>

          <div className="courses-grid">
            <div className="course-card" data-testid="forms-course">
              <div className="course-icon">�</div>
              <h3>Class 1: Forms</h3>
              <p>Learn to test login forms and form validation</p>
              <div className="course-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <span>0% Complete</span>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/class/forms')}
                data-testid="start-forms-class"
              >
                Start Class
              </button>
            </div>

            <div className="course-card" data-testid="form-elements-course">
              <div className="course-icon">☑️</div>
              <h3>Class 2: Form Elements</h3>
              <p>Checkboxes, radio buttons, and disabled elements</p>
              <div className="course-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <span>0% Complete</span>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/class/form-elements')}
                data-testid="start-form-elements-class"
              >
                Start Class
              </button>
            </div>

            <div className="course-card" data-testid="iframes-course">
              <div className="course-icon">�️</div>
              <h3>Class 3: iFrames</h3>
              <p>Test content within embedded frames</p>
              <div className="course-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <span>0% Complete</span>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/class/iframes')}
                data-testid="start-iframes-class"
              >
                Start Class
              </button>
            </div>

            <div className="course-card" data-testid="alerts-course">
              <div className="course-icon">⚠️</div>
              <h3>Class 4: Alerts & Prompts</h3>
              <p>Handle JavaScript alerts, confirms, and prompts</p>
              <div className="course-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <span>0% Complete</span>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/class/alerts')}
                data-testid="start-alerts-class"
              >
                Start Class
              </button>
            </div>

            <div className="course-card" data-testid="mouse-actions-course">
              <div className="course-icon">�️</div>
              <h3>Class 5: Mouse Actions</h3>
              <p>Click, hover, drag, and double-click interactions</p>
              <div className="course-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <span>0% Complete</span>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/class/mouse-actions')}
                data-testid="start-mouse-actions-class"
              >
                Start Class
              </button>
            </div>
          </div>

          <div className="practice-section" data-testid="practice-section">
            <h2>Practice Arena</h2>
            <p>Test your skills on real applications with various scenarios</p>
            
            <div className="practice-grid">
              <div className="practice-card" data-testid="login-practice">
                <h4>Login/Authentication</h4>
                <p>Practice testing login flows, validation, and security</p>
                <button className="btn btn-outline" data-testid="practice-login">
                  Practice Now
                </button>
              </div>

              <div className="practice-card" data-testid="forms-practice">
                <h4>Form Validation</h4>
                <p>Test complex forms with various validation rules</p>
                <button className="btn btn-outline" data-testid="practice-forms">
                  Practice Now
                </button>
              </div>

              <div className="practice-card" data-testid="api-practice">
                <h4>API Endpoints</h4>
                <p>Test REST APIs with different methods and responses</p>
                <button className="btn btn-outline" data-testid="practice-api">
                  Practice Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;