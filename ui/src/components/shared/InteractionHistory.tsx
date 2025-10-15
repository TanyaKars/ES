import React from 'react';

export interface InteractionHistoryEntry {
  type: string;
  action: string;
  element?: string;
  result?: any;
  timestamp: number;
  details?: any;
}

interface InteractionHistoryProps {
  history: InteractionHistoryEntry[];
  title?: string;
  maxEntries?: number;
  showDetails?: boolean;
}

const InteractionHistory: React.FC<InteractionHistoryProps> = ({ 
  history, 
  title = "Interaction History",
  maxEntries = 10,
  showDetails = false
}) => {
  const getActionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'drag_drop':
        return '🎯';
      case 'click_single':
        return '👆';
      case 'click_double':
        return '👆👆';
      case 'click_right':
        return '👉';
      case 'click_hold':
        return '🖱️';
      case 'hover_enter':
        return '✨';
      case 'hover_leave':
        return '💨';
      case 'alert':
        return '🚨';
      case 'confirm':
        return '❓';
      case 'prompt':
        return '💬';
      case 'ajax':
        return '🌐';
      case 'dropdown':
        return '📋';
      case 'checkbox':
        return '☑️';
      case 'radio':
        return '🔘';
      case 'textarea':
        return '📝';
      case 'form':
        return '📄';
      case 'iframe':
        return '🖼️';
      default:
        return '📋';
    }
  };

  const formatAction = (entry: InteractionHistoryEntry) => {
    const baseAction = entry.action.replace(/_/g, ' ').toLowerCase();
    return baseAction.charAt(0).toUpperCase() + baseAction.slice(1);
  };

  const formatResult = (entry: InteractionHistoryEntry) => {
    if (!entry.result && !entry.details) return '';
    
    switch (entry.type.toLowerCase()) {
      case 'alert':
      case 'ajax':
        return 'OK';
      case 'confirm':
        return entry.result ? 'OK' : 'Cancel';
      case 'prompt':
        return entry.result === null ? 'Cancel' : `"${entry.result}"`;
      case 'drag_drop':
        return entry.details?.success ? '✅ Success' : '❌ Failed';
      case 'hover_enter':
      case 'hover_leave':
        return entry.details?.isHovering ? 'Hovering' : 'Left';
      default:
        return entry.result ? String(entry.result) : '';
    }
  };

  const getElementDisplay = (entry: InteractionHistoryEntry) => {
    if (!entry.element) return '';
    
    // Clean up element names for display
    const cleanElement = entry.element
      .replace(/-/g, ' ')
      .replace(/button|element/gi, '')
      .trim();
    
    return cleanElement ? `on ${cleanElement}` : '';
  };

  return (
    <div className="interaction-history" data-testid="interaction-history">
      <h3>{title}</h3>
      {history.length === 0 ? (
        <p className="no-history">No interactions yet. Try the activities above to see your progress!</p>
      ) : (
        <div className="history-list">
          {history.slice(-maxEntries).reverse().map((entry, index) => (
            <div key={`${entry.timestamp}-${index}`} className="history-item" data-testid={`history-item-${index}`}>
              <div className="history-header">
                <span className="action-icon">{getActionIcon(entry.type)}</span>
                <span className="action-label">{formatAction(entry)}</span>
                {entry.element && (
                  <span className="element-label">{getElementDisplay(entry)}</span>
                )}
                <span className="result">{formatResult(entry)}</span>
                <span className="timestamp">{new Date(entry.timestamp).toLocaleTimeString()}</span>
              </div>
              {showDetails && entry.details && (
                <div className="history-details">
                  {JSON.stringify(entry.details, null, 2)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InteractionHistory;