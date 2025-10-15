import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header.tsx';
import NavigationBar from '../../components/NavigationBar.tsx';
import AlertCard from '../../components/alert-elements/AlertCard.tsx';
import InteractionHistory, { InteractionHistoryEntry } from '../../components/shared/InteractionHistory.tsx';
import CallToAction from '../../components/CallToAction.tsx';
import {
  alertButtons
} from '../../data/alerts/alertsClassData';
import { callToActionConfigs } from '../../data/callToActionData.ts';
import '../../styles/components/InteractionHistory.css';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

const AlertsClass: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [interactionHistory, setInteractionHistory] = useState<InteractionHistoryEntry[]>([]);
  const [promptResult, setPromptResult] = useState<string | null>(null);

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

  const handleAlertResult = (type: string, result: any) => {
    // For alerts and AJAX alerts, result is the message
    // For confirm, result is boolean (true/false)  
    // For prompt, result is string or null
    const action = `${type} dialog`;
    const element = type === 'ajax' ? 'AJAX alert' : `${type} dialog`;
    
    // Update prompt result if it's a prompt
    if (type === 'prompt') {
      setPromptResult(result);
    }
    
    const newHistoryEntry = {
      type: 'alert',
      action,
      element,
      result,
      timestamp: Date.now(),
      details: result
    };

    setInteractionHistory(prev => [...prev, newHistoryEntry]);
  };

  const clearHistory = () => {
    setInteractionHistory([]);
  };

  const clearPromptResult = () => {
    setPromptResult(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="class-page">
      <Header user={user} title="Class 2: Alert & Dialog Testing" />
      
      <NavigationBar 
        buttons={[
          {
            text: "← Back to Dashboard",
            onClick: () => navigate('/dashboard'),
            testId: "back-to-dashboard"
          }
        ]}
      />

      <div className="class-content">
        <div className="class-intro">
          <h2>Annoying Popup & Alerts!</h2>
          <p>
            Learn to handle JavaScript alerts, confirmations, prompts, and AJAX-triggered alerts. 
            This class covers all the essential dialog types you'll encounter in web automation testing.
          </p>
        </div>

        <div className="cards-grid medium">
          {alertButtons.map((buttonConfig) => (
            <AlertCard
              key={buttonConfig.id}
              config={buttonConfig}
              onResult={handleAlertResult}
            />
          ))}
        </div>

        {/* Prompt Result Display */}
        <div className="prompt-result-section">
          <h3>Prompt Input Display</h3>
          <div className="prompt-result-display" data-testid="prompt-result-display">
            {promptResult !== null ? (
              <div className="result-content">
                <div className="result-label">You entered:</div>
                <div className="result-value" data-testid="prompt-result-value">
                  {promptResult === '' ? (
                    <span className="empty-result">Empty string</span>
                  ) : (
                    `"${promptResult}"`
                  )}
                </div>
                <button
                  onClick={clearPromptResult}
                  className="btn btn-secondary btn-small"
                  data-testid="clear-prompt-button"
                >
                  Clear
                </button>
              </div>
            ) : (
              <div className="no-result">
                <span className="placeholder-text">No prompt input yet. Click the "JavaScript Prompt" button above to enter some text.</span>
              </div>
            )}
          </div>
        </div>

        <InteractionHistory 
          history={interactionHistory}
          title="Alerts Interaction History"
          maxEntries={10}
        />
        {interactionHistory.length > 0 && (
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <button
              onClick={clearHistory}
              className="btn btn-secondary"
              data-testid="clear-history-button"
            >
              Clear History
            </button>
          </div>
        )}

        <CallToAction {...callToActionConfigs.alertsHomework} />
      </div>
    </div>
  );
};

export default AlertsClass;