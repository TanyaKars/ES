import React from 'react';
import { MouseActionHomeworkScenario } from '../../data/mouse-actions/mouseActionsHomeworkData';

interface MouseActionHomeworkScenarioCardProps {
  scenario: MouseActionHomeworkScenario;
  isCompleted: boolean;
  attempts?: number;
  onStart: (scenarioId: string) => void;
  isDisabled: boolean;
}

const MouseActionHomeworkScenarioCard: React.FC<MouseActionHomeworkScenarioCardProps> = ({
  scenario,
  isCompleted,
  attempts,
  onStart,
  isDisabled
}) => {
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'drag-drop': return '🖱️';
      case 'click-sequence': return '👆';
      case 'hover-chain': return '✨';
      case 'complex-combo': return '🎯';
      default: return '🖱️';
    }
  };

  const getInteractionLabel = (type: string) => {
    switch (type) {
      case 'drag-drop': return 'Drag & Drop';
      case 'click-sequence': return 'Click Sequence';
      case 'hover-chain': return 'Hover Chain';
      case 'complex-combo': return 'Mixed Interactions';
      default: return 'Mouse Action';
    }
  };

  return (
    <div className={`card-base card-extra-large ${isCompleted ? 'card-completed' : ''}`}>
      <div className="card-header horizontal">
        <h3 className="card-title">
          {getInteractionIcon(scenario.interactionType)} {scenario.title}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span 
            className={`card-badge ${scenario.difficulty.toLowerCase()}`}
          >
            {scenario.difficulty}
          </span>
          <span className="interaction-type-badge">
            {getInteractionLabel(scenario.interactionType)}
          </span>
        </div>
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
        
        <div className="scenario-actions">
          <h4>Expected Actions:</h4>
          <div className="action-tags">
            {scenario.expectedActions.map((action, index) => (
              <span key={index} className="action-tag">
                {action.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card-footer left">
        <span className="points">Points: {scenario.points}</span>
        {attempts && attempts > 0 && (
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
          {isCompleted ? 'Retry' : 'Start Challenge'}
        </button>
      </div>
    </div>
  );
};

export default MouseActionHomeworkScenarioCard;