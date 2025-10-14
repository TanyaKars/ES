import React from 'react';

interface HomeworkScenarioCardProps {
  title: string;
  icon: string;
  scenarios: string[];
  testId?: string;
  className?: string;
}

const HomeworkScenarioCard: React.FC<HomeworkScenarioCardProps> = ({ 
  title, 
  icon, 
  scenarios, 
  testId,
  className = '' 
}) => {
  return (
    <div className={`card-base card-medium ${className}`} data-testid={testId}>
      <div className="card-header">
        <h4 className="card-title">{icon} {title}</h4>
      </div>
      <div className="card-content">
        <ul>
          {scenarios.map((scenario, index) => (
            <li key={index}>{scenario}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeworkScenarioCard;