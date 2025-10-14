import React from 'react';
import ScenarioCard from './ScenarioCard.tsx';
import { ScenarioConfig } from './ScenarioCard';

interface ScenariosGridProps {
  title: string;
  scenarios: ScenarioConfig[];
}

const ScenariosGrid: React.FC<ScenariosGridProps> = ({ title, scenarios }) => {
  return (
    <div className="testing-scenarios">
      <h2>{title}</h2>
      <div className="cards-grid large">
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}
      </div>
    </div>
  );
};

export default ScenariosGrid;