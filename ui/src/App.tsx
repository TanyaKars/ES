import React, { useState, useEffect } from 'react';
import { User } from '@es/shared';
import { healthCheck } from './services/api';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await healthCheck();
      setApiStatus('online');
    } catch (error) {
      setApiStatus('offline');
      console.error('API health check failed:', error);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleUserCreate = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setSelectedUser(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>ES Monorepo</h1>
        <div className="api-status">
          <span className={`status-indicator ${apiStatus}`}></span>
          API: {apiStatus}
          {apiStatus === 'offline' && (
            <button onClick={checkApiHealth} className="retry-btn">
              Retry
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {apiStatus === 'offline' ? (
          <div className="offline-message">
            <h2>API Offline</h2>
            <p>Please make sure the API server is running on port 3001</p>
            <p>Run: <code>npm run dev:api</code></p>
            <button onClick={checkApiHealth} className="retry-btn">
              Check Again
            </button>
          </div>
        ) : (
          <UserList
            onUserSelect={handleUserSelect}
            onUserCreate={handleUserCreate}
            refreshTrigger={refreshTrigger}
          />
        )}
      </main>

      {showForm && (
        <UserForm
          user={selectedUser || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default App;