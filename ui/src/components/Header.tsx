import React from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface HeaderProps {
  user: User;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ user, title = "QA Academy Dashboard" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1 data-testid="dashboard-title">{title}</h1>
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
  );
};

export default Header;