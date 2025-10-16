import React, { useState, useEffect } from 'react';

interface NavigationSequenceChallengeProps {
  onComplete: (success: boolean) => void;
  isActive: boolean;
}

const NavigationSequenceChallenge: React.FC<NavigationSequenceChallengeProps> = ({ onComplete, isActive }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContext, setShowContext] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });

  const steps = [
    'Click the "Start" button',
    'Double click the "Documents" folder to open it',
    'Right click on "important.txt" file',
    'Click "Properties" from context menu',
    'Click "OK" to close properties dialog'
  ];

  useEffect(() => {
    if (isActive) {
      setCurrentStep(0);
      setShowContext(false);
      setShowDialog(false);
      setFolderOpen(false);
    }
  }, [isActive]);

  const handleStartClick = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    }
  };

  const handleFolderDoubleClick = () => {
    if (currentStep === 1) {
      setFolderOpen(true);
      setCurrentStep(2);
    }
  };

  const handleFileRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep === 2) {
      setContextPosition({ x: e.clientX, y: e.clientY });
      setShowContext(true);
      setCurrentStep(3);
    }
  };

  const handlePropertiesClick = () => {
    if (currentStep === 3) {
      setShowContext(false);
      setShowDialog(true);
      setCurrentStep(4);
    }
  };

  const handleDialogOK = () => {
    if (currentStep === 4) {
      setShowDialog(false);
      setCurrentStep(5);
      setTimeout(() => onComplete(true), 500);
    }
  };

  if (!isActive) return null;

  return (
    <div className="navigation-sequence-challenge">
      <div className="challenge-header">
        <h3>📁 Navigation Sequence Challenge</h3>
        <p>Follow the steps exactly in the correct order using different click types!</p>
      </div>

      <div className="challenge-content">
        <div className="steps-indicator">
          <h4>Steps:</h4>
          <ol>
            {steps.map((step, index) => (
              <li 
                key={index} 
                className={`step-container ${index < currentStep ? 'completed' : index === currentStep ? 'current' : 'pending'}`}
              >
                <div className={`step ${index < currentStep ? 'completed' : index === currentStep ? 'current' : 'pending'}`}>
                  {index + 1}
                </div>
                <span className="step-text">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="interaction-area">
          {currentStep === 0 && (
            <button 
              className="start-button"
              onClick={handleStartClick}
              data-testid="start-button"
            >
              Start
            </button>
          )}

          {currentStep >= 1 && (
            <div className="file-system">
              <div 
                className={`folder ${folderOpen ? 'open' : ''}`}
                onDoubleClick={handleFolderDoubleClick}
                data-testid="documents-folder"
              >
                📁 Documents {folderOpen ? '(Open)' : ''}
              </div>

              {folderOpen && currentStep >= 2 && (
                <div 
                  className="file"
                  onContextMenu={handleFileRightClick}
                  data-testid="important-file"
                >
                  📄 important.txt
                </div>
              )}
            </div>
          )}

          {showContext && (
            <div 
              className="context-menu"
              style={{ 
                position: 'fixed', 
                left: contextPosition.x, 
                top: contextPosition.y,
                zIndex: 1000
              }}
              data-testid="context-menu"
            >
              <div className="context-item" onClick={handlePropertiesClick}>
                Properties
              </div>
              <div className="context-item">Delete</div>
              <div className="context-item">Rename</div>
            </div>
          )}

          {showDialog && (
            <div className="dialog-overlay">
              <div className="properties-dialog" data-testid="properties-dialog">
                <div className="dialog-header">File Properties</div>
                <div className="dialog-content">
                  <p>Name: important.txt</p>
                  <p>Size: 1.2 KB</p>
                  <p>Modified: Today</p>
                </div>
                <div className="dialog-buttons">
                  <button onClick={handleDialogOK} data-testid="ok-button">
                    OK
                  </button>
                  <button>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="challenge-status">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  );
};

export default NavigationSequenceChallenge;