import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface Course {
  id: string;
  classNumber: number;
  title: string;
  description: string;
  icon: string;
  route: string;
  testId: string;
  progress: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const courses: Course[] = [
    {
      id: 'forms',
      classNumber: 1,
      title: 'Forms',
      description: 'Learn to test forms, dropdowns, checkboxes, radio buttons, and disabled elements',
      icon: '📝',
      route: '/class/forms',
      testId: 'forms-course',
      progress: 0
    },
    {
      id: 'alerts',
      classNumber: 2,
      title: 'Alerts & Prompts',
      description: 'Handle JavaScript alerts, confirms, and prompts',
      icon: '⚠️',
      route: '/class/alerts',
      testId: 'alerts-course',
      progress: 0
    },
    {
      id: 'iframes',
      classNumber: 3,
      title: 'iFrames',
      description: 'Test content within embedded frames',
      icon: '🖼️',
      route: '/class/iframes',
      testId: 'iframes-course',
      progress: 0
    },
    {
      id: 'mouse-actions',
      classNumber: 4,
      title: 'Mouse Actions',
      description: 'Click, hover, drag, and double-click interactions',
      icon: '🖱️',
      route: '/class/mouse-actions',
      testId: 'mouse-actions-course',
      progress: 0
    }
  ];

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <Header user={user} title="QA Academy Dashboard" />

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="welcome-section" data-testid="welcome-section">
            <h2>Welcome to Your Learning Dashboard</h2>
            <p>Start your QA automation journey with our comprehensive courses.</p>
          </div>

          <div className="cards-grid medium">
            {courses.map((course) => (
              <div key={course.id} className="card-base card-large card-centered" data-testid={course.testId}>
                <div className="card-header">
                  <span className="card-icon">{course.icon}</span>
                  <h3 className="card-title">Class {course.classNumber}: {course.title}</h3>
                </div>
                <div className="card-content">
                  <p className="card-description">{course.description}</p>
                  <div className="card-progress">
                    <div className="card-progress-bar">
                      <div className="card-progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <div className="card-progress-text">{course.progress}% Complete</div>
                  </div>
                </div>
                <div className="card-button-container">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => navigate(course.route)}
                    data-testid={`start-${course.id}-class`}
                  >
                    Start Class
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="practice-section" data-testid="practice-section">
            <h2>Practice Arena</h2>
            <p>Test your skills on real applications with various scenarios</p>
            
            <div className="cards-grid small">
              <div className="card-base card-small" data-testid="login-practice">
                <div className="card-header">
                  <h4 className="card-title">Login/Authentication</h4>
                </div>
                <div className="card-content">
                  <p className="card-description">Practice testing login flows, validation, and security</p>
                </div>
                <div className="card-button-container small">
                  <button className="btn btn-outline" data-testid="practice-login">
                    Practice Now
                  </button>
                </div>
              </div>

              <div className="card-base card-small" data-testid="forms-practice">
                <div className="card-header">
                  <h4 className="card-title">Form Validation</h4>
                </div>
                <div className="card-content">
                  <p className="card-description">Test complex forms with various validation rules</p>
                </div>
                <div className="card-button-container small">
                  <button className="btn btn-outline" data-testid="practice-forms">
                    Practice Now
                  </button>
                </div>
              </div>

              <div className="card-base card-small" data-testid="api-practice">
                <div className="card-header">
                  <h4 className="card-title">API Endpoints</h4>
                </div>
                <div className="card-content">
                  <p className="card-description">Test REST APIs with different methods and responses</p>
                </div>
                <div className="card-button-container small">
                  <button className="btn btn-outline" data-testid="practice-api">
                    Practice Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;