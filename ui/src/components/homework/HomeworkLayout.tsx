import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import NavigationBar from '../NavigationBar';
import StatCard from '../alert-elements/StatCard';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface HomeworkLayoutProps {
  user: User;
  title: string;
  description: string;
  backToClassPath: string;
  backToClassText: string;
  // Stats
  completedScenarios: number;
  totalScenarios: number;
  totalPoints: number;
  maxPoints: number;
  passingScore: number;
  // Controls
  isStarted: boolean;
  showResults: boolean;
  onStartHomework: () => void;
  onSubmitHomework: () => void;
  onTryAgain: () => void;
  // Content
  children: React.ReactNode;
}

const HomeworkLayout: React.FC<HomeworkLayoutProps> = ({
  user,
  title,
  description,
  backToClassPath,
  backToClassText,
  completedScenarios,
  totalScenarios,
  totalPoints,
  maxPoints,
  passingScore,
  isStarted,
  showResults,
  onStartHomework,
  onSubmitHomework,
  onTryAgain,
  children
}) => {
  const navigate = useNavigate();

  return (
    <div className="homework-page">
      <Header user={user} title={title} />
      
      <NavigationBar 
        buttons={[
          {
            text: backToClassText,
            onClick: () => navigate(backToClassPath),
            testId: "back-to-class"
          },
          {
            text: "← Back to Dashboard",
            onClick: () => navigate('/dashboard'),
            testId: "back-to-dashboard"
          }
        ]}
      />

      <div className="homework-container">
        <div className="homework-header">
          <div className="homework-header-content">
            <h1>{title.replace(/^.*: /, '').replace(' - ', ' - ')}</h1>
            <p>{description}</p>
          </div>
          
          <div className="homework-header-sidebar">
            <div className="homework-stats">
              <StatCard 
                title="Progress" 
                value={`${completedScenarios}/${totalScenarios} scenarios`} 
              />
              <StatCard 
                title="Points" 
                value={`${totalPoints}/${maxPoints}`} 
              />
              <StatCard 
                title="Status" 
                value={totalPoints >= passingScore ? 'PASSING' : 'NEEDS WORK'} 
              />
            </div>

            <div className="homework-controls">
              {!isStarted && !showResults && (
                <button className="homework-btn primary" onClick={onStartHomework}>
                  Start Homework
                </button>
              )}
              {isStarted && !showResults && (
                <button className="homework-btn success" onClick={onSubmitHomework}>
                  Submit Homework
                </button>
              )}
              {showResults && (
                <button 
                  className="homework-btn primary" 
                  onClick={onTryAgain}
                  data-testid="try-again-btn"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default HomeworkLayout;