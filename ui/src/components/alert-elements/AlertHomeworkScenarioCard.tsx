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


  return (
    <div className={`card-base card-extra-large ${isCompleted ? 'card-completed' : ''}`}>
      <div className="card-header horizontal">
        <h3 className="card-title">{scenario.title}</h3>
        <span 
          className={`card-badge ${scenario.difficulty.toLowerCase()}`}
        >
          {scenario.difficulty}
        </span>
      </div>
      
      <div className="card-content">
        <p className="card-description">{scenario.description}</p>
        
        <div className="scenario-instructions">
          <h4>Instructions:</h4>
          <ol>
            {scenario.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
      
      <div className="card-footer left">
        <span className="points">Points: {scenario.points}</span>
        {attempts && (
          <div className="attempts">
            Attempts: {attempts}
          </div>
        )}
      </div>
      
      <div className="card-button-container right">
        <button 
          className="start-scenario-btn"
          onClick={() => onStart(scenario.id)}
          disabled={isDisabled}
        >
          {isCompleted ? 'Retry' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default AlertHomeworkScenarioCard;