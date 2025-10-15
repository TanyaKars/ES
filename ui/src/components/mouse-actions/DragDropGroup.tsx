import React, { useState } from 'react';

export interface DragDropConfig {
  id: string;
  draggableText: string;
  dropZoneText: string;
  successMessage: string;
  draggableTestId: string;
  dropZoneTestId: string;
  statusTestId: string;
}

interface DragDropGroupProps {
  title: string;
  config: DragDropConfig;
  onDrop?: (success: boolean) => void;
  containerTestId?: string;
}

const DragDropGroup: React.FC<DragDropGroupProps> = ({
  title,
  config,
  onDrop,
  containerTestId
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const [dragOverTarget, setDragOverTarget] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', config.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOverTarget(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverTarget(true);
  };

  const handleDragLeave = () => {
    setDragOverTarget(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    
    if (draggedId === config.id) {
      setIsDropped(true);
      setDragOverTarget(false);
      onDrop?.(true);
    }
  };

  const resetDragDrop = () => {
    setIsDropped(false);
    setIsDragging(false);
    setDragOverTarget(false);
  };

  return (
    <div className="mouse-action-group" data-testid={containerTestId}>
      <h3>{title}</h3>
      <div className="drag-drop-container">
        <div className="drag-drop-content">
          <div
            className={`draggable-element ${isDragging ? 'dragging' : ''} ${isDropped ? 'dropped' : ''}`}
            draggable={!isDropped}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            data-testid={config.draggableTestId}
            style={{
              visibility: isDropped ? 'hidden' : 'visible'
            }}
          >
            {config.draggableText}
          </div>
          
          <div className="drag-drop-arrow">→</div>
          
          <div
            className={`drop-zone ${dragOverTarget ? 'drag-over' : ''} ${isDropped ? 'success' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            data-testid={config.dropZoneTestId}
          >
            {isDropped ? (
              <div className="dropped-element" data-testid={`${config.draggableTestId}-dropped`}>
                Dropped
              </div>
            ) : (
              config.dropZoneText
            )}
          </div>
        </div>
        
        <div className="action-controls">
          <button
            onClick={resetDragDrop}
            className="btn btn-secondary btn-small"
            data-testid={`${config.id}-reset`}
          >
            Reset
          </button>
        </div>
        
        <div className="status-display" data-testid={config.statusTestId}>
          <strong>Status:</strong> {
            isDropped ? 'Successfully dropped!' :
            isDragging ? 'Dragging...' :
            'Ready to drag'
          }
        </div>
      </div>
    </div>
  );
};

export default DragDropGroup;