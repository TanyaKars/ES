import React from 'react';

interface AlertHistoryProps {
  history: Array<{
    type: string;
    message: string;
    result: any;
    timestamp: number;
  }>;
}

const AlertHistory: React.FC<AlertHistoryProps> = ({ history }) => {
  const formatResult = (type: string, result: any) => {
    switch (type) {
      case 'alert':
      case 'ajax':
        return 'OK';
      case 'confirm':
        return result ? 'OK' : 'Cancel';
      case 'prompt':
        return result === null ? 'Cancel' : `"${result}"`;
      default:
        return String(result);
    }
  };

  const getTypeIcon = (type: string) => {
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

  return (
    <div className="alert-history" data-testid="alert-history">
      <h3>Alert Interaction History</h3>
      {history.length === 0 ? (
        <p className="no-history">No alerts triggered yet. Click any button above to start!</p>
      ) : (
        <div className="history-list">
          {history.slice(-10).reverse().map((entry, index) => (
            <div key={`${entry.timestamp}-${index}`} className="history-item" data-testid={`history-item-${index}`}>
              <div className="history-header">
                <span className="type-icon">{getTypeIcon(entry.type)}</span>
                <span className="type-label">{entry.type.toUpperCase()}</span>
                <span className="result">{formatResult(entry.type, entry.result)}</span>
                <span className="timestamp">{new Date(entry.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="history-message">"{entry.message}"</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertHistory;