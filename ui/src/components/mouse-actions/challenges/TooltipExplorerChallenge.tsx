import React, { useState, useEffect } from 'react';

interface TooltipExplorerChallengeProps {
  onComplete: (success: boolean) => void;
  isActive: boolean;
}

const TooltipExplorerChallenge: React.FC<TooltipExplorerChallengeProps> = ({ onComplete, isActive }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredElements, setHoveredElements] = useState<Set<string>>(new Set());
  const [showSecretButton, setShowSecretButton] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [showFairy, setShowFairy] = useState(false);

  const hoverChain = [
    { id: 'info-icon', clue: 'Look for the blue crystal in the corner' },
    { id: 'blue-crystal', clue: 'The ancient scroll holds the next secret' },
    { id: 'ancient-scroll', clue: 'Find the golden key near the treasure' },
    { id: 'golden-key', clue: 'The magic portal awaits your touch' },
    { id: 'magic-portal', clue: 'You have found the secret! Click the button!' }
  ];

  useEffect(() => {
    if (isActive) {
      setCurrentStep(0);
      setHoveredElements(new Set());
      setShowSecretButton(false);
      setTooltipVisible(false);
    }
  }, [isActive]);

  const handleHover = (elementId: string, enter: boolean) => {
    if (!enter) {
      setTooltipVisible(false);
      return;
    }

    const expectedElement = hoverChain[currentStep];
    if (expectedElement && elementId === expectedElement.id) {
      setHoveredElements(prev => new Set(prev).add(elementId));
      setTooltipText(expectedElement.clue);
      setTooltipVisible(true);
      
      if (currentStep < hoverChain.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Last hover completed, show secret button
        setShowSecretButton(true);
      }
    } else if (hoveredElements.has(elementId)) {
      // Allow re-hovering previously discovered elements
      const element = hoverChain.find(item => item.id === elementId);
      if (element) {
        setTooltipText(element.clue);
        setTooltipVisible(true);
      }
    }
  };

  const handleSecretButtonClick = () => {
    if (showSecretButton) {
      setShowFairy(true);
      // Hide fairy after animation completes (3 seconds)
      setTimeout(() => setShowFairy(false), 3000);
      // Complete challenge after fairy flies
      setTimeout(() => onComplete(true), 2500);
    }
  };

  if (!isActive) return null;

  return (
    <div className="tooltip-explorer-challenge">
      <div className="challenge-header">
        <h3>✨ Tooltip Explorer Challenge</h3>
        <p>Hover over elements to reveal clues and follow the chain to find the secret!</p>
      </div>

      <div className="challenge-content">
        <div className="explorer-area">
          {/* Info Icon - Starting point */}
          <div 
            className={`hover-element info-icon ${hoveredElements.has('info-icon') ? 'discovered' : ''}`}
            onMouseEnter={() => handleHover('info-icon', true)}
            onMouseLeave={() => handleHover('info-icon', false)}
            data-testid="info-icon"
          >
            ℹ️
          </div>

          {/* Blue Crystal */}
          <div 
            className={`hover-element blue-crystal ${hoveredElements.has('blue-crystal') ? 'discovered' : hoveredElements.has('info-icon') ? 'visible' : 'hidden'}`}
            onMouseEnter={() => handleHover('blue-crystal', true)}
            onMouseLeave={() => handleHover('blue-crystal', false)}
            data-testid="blue-crystal"
          >
            💎
          </div>

          {/* Ancient Scroll */}
          <div 
            className={`hover-element ancient-scroll ${hoveredElements.has('ancient-scroll') ? 'discovered' : hoveredElements.has('blue-crystal') ? 'visible' : 'hidden'}`}
            onMouseEnter={() => handleHover('ancient-scroll', true)}
            onMouseLeave={() => handleHover('ancient-scroll', false)}
            data-testid="ancient-scroll"
          >
            📜
          </div>

          {/* Golden Key */}
          <div 
            className={`hover-element golden-key ${hoveredElements.has('golden-key') ? 'discovered' : hoveredElements.has('ancient-scroll') ? 'visible' : 'hidden'}`}
            onMouseEnter={() => handleHover('golden-key', true)}
            onMouseLeave={() => handleHover('golden-key', false)}
            data-testid="golden-key"
          >
            🗝️
          </div>

          {/* Magic Portal */}
          <div 
            className={`hover-element magic-portal ${hoveredElements.has('magic-portal') ? 'discovered' : hoveredElements.has('golden-key') ? 'visible' : 'hidden'}`}
            onMouseEnter={() => handleHover('magic-portal', true)}
            onMouseLeave={() => handleHover('magic-portal', false)}
            data-testid="magic-portal"
          >
            🌀
          </div>

          {/* Secret Button */}
          {showSecretButton && (
            <button 
              className="secret-button"
              onClick={handleSecretButtonClick}
              data-testid="secret-button"
            >
              🎯 Secret Button
            </button>
          )}

          {/* Tooltip */}
          {tooltipVisible && (
            <div className="floating-tooltip">
              {tooltipText}
            </div>
          )}

          {/* Flying Magical Fairy */}
          {showFairy && (
            <div className="flying-fairy">
              🧚‍♀️
            </div>
          )}
        </div>

        <div className="progress-indicator">
          <h4>Discovery Progress:</h4>
          <div className="chain-progress">
            {hoverChain.map((item, index) => (
              <div 
                key={item.id}
                className={`chain-step ${hoveredElements.has(item.id) ? 'completed' : index === currentStep ? 'current' : 'pending'}`}
              >
                Step {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="challenge-status">
        Discovered: {hoveredElements.size} / {hoverChain.length} elements
      </div>
    </div>
  );
};

export default TooltipExplorerChallenge;