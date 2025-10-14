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
    <div className={`scenario-card ${className}`} data-testid={testId}>
      <h4>{icon} {title}</h4>
      <ul>
        {scenarios.map((scenario, index) => (
          <li key={index}>{scenario}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomeworkScenarioCard;