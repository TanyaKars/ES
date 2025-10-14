import React from 'react';

export interface ScenarioItem {
  text: string;
}

export interface ScenarioConfig {
  id: string;
  title: string;
  icon: string;
  items: ScenarioItem[];
  testId: string;
}

interface ScenarioCardProps {
  scenario: ScenarioConfig;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  return (
    <div className="card-base card-medium" data-testid={scenario.testId}>
      <div className="card-header">
        <h4 className="card-title">{scenario.icon} {scenario.title}</h4>
      </div>
      <div className="card-content">
        <ul>
          {scenario.items.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScenarioCard;