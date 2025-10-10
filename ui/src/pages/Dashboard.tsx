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

          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card" data-testid={course.testId}>
                <div className="course-icon">{course.icon}</div>
                <h3>Class {course.classNumber}: {course.title}</h3>
                <p>{course.description}</p>
                <div className="course-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <span>{course.progress}% Complete</span>
                </div>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate(course.route)}
                  data-testid={`start-${course.id}-class`}
                >
                  Start Class
                </button>
              </div>
            ))}
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