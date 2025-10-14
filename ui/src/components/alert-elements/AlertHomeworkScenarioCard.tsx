import React from 'react';
import { HomeworkScenario } from '../../data/alerts/alertsHomeworkData';

interface AlertHomeworkScenarioCardProps {
  scenario: HomeworkScenario;
  isCompleted: boolean;
  attempts?: number;
  onStart: (scenarioId: string) => void;
  isDisabled: boolean;
}

const AlertHomeworkScenarioCard: React.FC<AlertHomeworkScenarioCardProps> = ({
  scenario,
  isCompleted,
  attempts,
  onStart,
  isDisabled
}) => {
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <div className={`scenario-card ${isCompleted ? 'completed' : ''}`}>
      <div className="scenario-header">
        <h3>{scenario.title}</h3>
        <span 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(scenario.difficulty) }}
        >
          {scenario.difficulty}
        </span>
      </div>
      
      <p className="scenario-description">{scenario.description}</p>
      
      <div className="scenario-instructions">
        <h4>Instructions:</h4>
        <ol>
          {scenario.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      
      <div className="scenario-footer">
        <span className="points">Points: {scenario.points}</span>
        <button 
          className="start-scenario-btn"
          onClick={() => onStart(scenario.id)}
          disabled={isDisabled}
        >
          {isCompleted ? 'Retry' : 'Start'}
        </button>
      </div>
      
      {attempts && (
        <div className="attempts">
          Attempts: {attempts}
        </div>
      )}
    </div>
  );
};

export default AlertHomeworkScenarioCard;