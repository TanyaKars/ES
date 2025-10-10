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
    <div className="scenario-card" data-testid={scenario.testId}>
      <h4>{scenario.icon} {scenario.title}</h4>
      <ul>
        {scenario.items.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScenarioCard;