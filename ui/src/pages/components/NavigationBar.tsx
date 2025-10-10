import React from 'react';

interface NavigationButton {
  text: string;
  onClick: () => void;
  testId: string;
}

interface NavigationBarProps {
  buttons: NavigationButton[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ buttons }) => {
  return (
    <div className="navigation-bar">
      <div className="navigation-buttons">
        {buttons.map((button, index) => (
          <button 
            key={index}
            onClick={button.onClick}
            className="btn btn-secondary"
            data-testid={button.testId}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;