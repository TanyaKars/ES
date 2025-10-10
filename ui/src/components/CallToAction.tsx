import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonRoute: string;
  buttonTestId: string;
  containerTestId?: string;
  icon?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonRoute,
  buttonTestId,
  containerTestId,
  icon
}) => {
  const navigate = useNavigate();

  return (
    <div className="call-to-action-section" data-testid={containerTestId}>
      <h2>{icon && `${icon} `}{title}</h2>
      <p>{description}</p>
      <button 
        onClick={() => navigate(buttonRoute)}
        className="btn btn-primary btn-large"
        data-testid={buttonTestId}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default CallToAction;