import React from 'react';

interface HomeworkResultsProps {
  completedScenarios: number;
  totalScenarios: number;
  totalPoints: number;
  maxPoints?: number;
  className?: string;
}

const HomeworkResults: React.FC<HomeworkResultsProps> = ({
  completedScenarios,
  totalScenarios,
  totalPoints,
  maxPoints,
  className = ''
}) => {
  const completionPercentage = totalScenarios > 0 ? Math.round((completedScenarios / totalScenarios) * 100) : 0;
  const scorePercentage = maxPoints && maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  return (
    <div className={`results-section ${className}`}>
      <h2>🎉 Homework Results</h2>
      <div className="results-stats">
        <p>
          <strong>Scenarios Completed:</strong> {completedScenarios}/{totalScenarios} ({completionPercentage}%)
        </p>
        {maxPoints && (
          <p>
            <strong>Points Earned:</strong> {totalPoints}/{maxPoints} ({scorePercentage}%)
          </p>
        )}
      </div>
      {completionPercentage === 100 && (
        <p className="completion-message">
          🌟 Congratulations! You've completed all scenarios!
        </p>
      )}
    </div>
  );
};

export default HomeworkResults;