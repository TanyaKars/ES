import React from 'react';
import AlertButton from './AlertButton';
import { AlertButtonConfig } from '../../data/alerts/alertsClassData';

interface AlertCardProps {
  config: AlertButtonConfig;
  onResult: (type: string, result: any) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ config, onResult }) => {
  const getCardIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return '🚨';
      case 'confirm':
        return '❓';
      case 'prompt':
        return '💬';
      case 'ajax':
        return '🌐';
      default:
        return '📋';
    }
  };

  const getDescription = (type: string) => {
    switch (type) {
      case 'alert':
        return 'Click the button to trigger a JavaScript alert dialog.';
      case 'confirm':
        return 'Click the button to trigger a confirmation dialog with OK/Cancel options.';
      case 'prompt':
        return 'Click the button to trigger a prompt dialog that accepts user input. Your input will be displayed below.';
      case 'ajax':
        return 'Click the button to open a new tab with an AJAX loader, then see a success page with a return button.';
      default:
        return '';
    }
  };

  return (
    <div className="alert-card" data-testid={`${config.type}-card`}>
      <div className="alert-card-header">
        <span className="alert-icon">{getCardIcon(config.type)}</span>
        <h3>{config.title}</h3>
      </div>
      <p className="alert-description">{getDescription(config.type)}</p>
      <div className="alert-button-container">
        <AlertButton config={config} onResult={onResult} />
      </div>
    </div>
  );
};

export default AlertCard;