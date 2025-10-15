import React, { useState } from 'react';

export interface ClickActionConfig {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  actionType: 'single' | 'double' | 'right' | 'hold';
  testId: string;
  statusTestId: string;
}

interface ClickActionsGroupProps {
  title: string;
  actions: ClickActionConfig[];
  onActionPerformed?: (actionType: string, actionId: string) => void;
  containerTestId?: string;
}

const ClickActionsGroup: React.FC<ClickActionsGroupProps> = ({
  title,
  actions,
  onActionPerformed,
  containerTestId
}) => {
  const [actionStates, setActionStates] = useState<Record<string, {
    performed: boolean;
    isHolding: boolean;
    clickCount: number;
  }>>({});

  const updateActionState = (actionId: string, updates: Partial<{
    performed: boolean;
    isHolding: boolean;
    clickCount: number;
  }>) => {
    setActionStates(prev => ({
      ...prev,
      [actionId]: {
        ...prev[actionId],
        performed: false,
        isHolding: false,
        clickCount: 0,
        ...updates
      }
    }));
  };

  const handleSingleClick = (action: ClickActionConfig) => {
    updateActionState(action.id, { 
      performed: true, 
      clickCount: (actionStates[action.id]?.clickCount || 0) + 1 
    });
    onActionPerformed?.(action.actionType, action.id);
  };

  const handleDoubleClick = (action: ClickActionConfig) => {
    updateActionState(action.id, { 
      performed: true, 
      clickCount: (actionStates[action.id]?.clickCount || 0) + 2 
    });
    onActionPerformed?.(action.actionType, action.id);
  };

  const handleRightClick = (action: ClickActionConfig, e: React.MouseEvent) => {
    e.preventDefault();
    updateActionState(action.id, { 
      performed: true, 
      clickCount: (actionStates[action.id]?.clickCount || 0) + 1 
    });
    onActionPerformed?.(action.actionType, action.id);
  };

  const handleMouseDown = (action: ClickActionConfig) => {
    if (action.actionType === 'hold') {
      updateActionState(action.id, { isHolding: true, performed: true });
      onActionPerformed?.(action.actionType, action.id);
    }
  };

  const handleMouseUp = (action: ClickActionConfig) => {
    if (action.actionType === 'hold') {
      updateActionState(action.id, { isHolding: false });
    }
  };

  const resetAction = (actionId: string) => {
    updateActionState(actionId, { 
      performed: false, 
      isHolding: false, 
      clickCount: 0 
    });
  };

  const resetAllActions = () => {
    setActionStates({});
  };

  const getActionStatus = (action: ClickActionConfig) => {
    const state = actionStates[action.id];
    if (!state) return 'Ready';
    
    if (action.actionType === 'hold' && state.isHolding) return 'Holding...';
    if (state.performed) {
      switch (action.actionType) {
        case 'single':
          return `Single clicked (${state.clickCount} times)`;
        case 'double':
          return `Double clicked (${state.clickCount / 2} times)`;
        case 'right':
          return `Right clicked (${state.clickCount} times)`;
        case 'hold':
          return 'Hold completed';
        default:
          return 'Action performed';
      }
    }
    return 'Ready';
  };

  return (
    <div className="mouse-action-group" data-testid={containerTestId}>
      <h3>{title}</h3>
      <div className="click-actions-container">
        <div className="actions-grid">
          {actions.map((action) => (
            <div key={action.id} className="action-card">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
              
              <button
                className={`action-button ${action.actionType} ${actionStates[action.id]?.performed ? 'performed' : ''} ${actionStates[action.id]?.isHolding ? 'holding' : ''}`}
                data-testid={action.testId}
                onClick={() => {
                  if (action.actionType === 'single') handleSingleClick(action);
                }}
                onDoubleClick={() => {
                  if (action.actionType === 'double') handleDoubleClick(action);
                }}
                onContextMenu={(e) => {
                  if (action.actionType === 'right') handleRightClick(action, e);
                }}
                onMouseDown={() => {
                  if (action.actionType === 'hold') handleMouseDown(action);
                }}
                onMouseUp={() => {
                  if (action.actionType === 'hold') handleMouseUp(action);
                }}
                onMouseLeave={() => {
                  if (action.actionType === 'hold') handleMouseUp(action);
                }}
              >
                {action.buttonText}
              </button>
              
              <div className="action-status" data-testid={action.statusTestId}>
                <strong>Status:</strong> {getActionStatus(action)}
              </div>
              
              <button
                onClick={() => resetAction(action.id)}
                className="btn btn-secondary btn-small"
                data-testid={`${action.id}-reset`}
              >
                Reset
              </button>
            </div>
          ))}
        </div>
        
        <div className="group-controls">
          <button
            onClick={resetAllActions}
            className="btn btn-secondary"
            data-testid="reset-all-clicks"
          >
            Reset All Actions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClickActionsGroup;