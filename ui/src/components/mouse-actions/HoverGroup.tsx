import React, { useState } from 'react';

export interface HoverConfig {
  id: string;
  text: string;
  hoverText: string;
  testId: string;
  statusTestId: string;
  sequence?: number; // For sequence-based hover challenges
}

interface HoverGroupProps {
  title: string;
  hovers: HoverConfig[];
  requiresSequence?: boolean;
  onHover?: (hoverId: string, isHovering: boolean) => void;
  containerTestId?: string;
}

const HoverGroup: React.FC<HoverGroupProps> = ({
  title,
  hovers,
  requiresSequence = false,
  onHover,
  containerTestId
}) => {
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({});
  const [hoverSequence, setHoverSequence] = useState<string[]>([]);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);

  const handleMouseEnter = (hover: HoverConfig) => {
    setHoverStates(prev => ({ ...prev, [hover.id]: true }));
    
    if (requiresSequence) {
      const newSequence = [...hoverSequence, hover.id];
      setHoverSequence(newSequence);
      
      // Check if sequence is complete and correct
      const sortedHovers = [...hovers].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
      const expectedSequence = sortedHovers.map(h => h.id);
      
      if (newSequence.length === expectedSequence.length) {
        const isCorrect = newSequence.every((id, index) => id === expectedSequence[index]);
        setIsSequenceComplete(isCorrect);
      }
    }
    
    onHover?.(hover.id, true);
  };

  const handleMouseLeave = (hover: HoverConfig) => {
    setHoverStates(prev => ({ ...prev, [hover.id]: false }));
    onHover?.(hover.id, false);
  };

  const resetHovers = () => {
    setHoverStates({});
    setHoverSequence([]);
    setIsSequenceComplete(false);
  };

  const getHoverStatus = (hover: HoverConfig) => {
    const isHovered = hoverStates[hover.id];
    const sequenceIndex = hoverSequence.indexOf(hover.id);
    
    if (requiresSequence) {
      if (sequenceIndex >= 0) {
        return `Hovered (${sequenceIndex + 1}${getOrdinalSuffix(sequenceIndex + 1)})`;
      }
      return 'Not hovered';
    }
    
    return isHovered ? 'Currently hovering' : 'Not hovering';
  };

  const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  };

  const getSequenceStatus = () => {
    if (!requiresSequence) return '';
    
    if (isSequenceComplete) {
      return '✅ Sequence completed correctly!';
    }
    
    if (hoverSequence.length === 0) {
      return 'Hover over elements in the correct order';
    }
    
    const sortedHovers = [...hovers].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
    const expectedNext = sortedHovers[hoverSequence.length];
    
    return `Next: Hover over "${expectedNext?.text}" (${hoverSequence.length + 1}/${hovers.length})`;
  };

  return (
    <div className="mouse-action-group" data-testid={containerTestId}>
      <h3>{title}</h3>
      
      {requiresSequence && (
        <div className="sequence-status">
          <strong>Sequence Status:</strong> {getSequenceStatus()}
        </div>
      )}
      
      <div className="hover-container">
        <div className="hover-elements">
          {hovers.map((hover) => (
            <div
              key={hover.id}
              className={`class-hover-element ${hoverStates[hover.id] ? 'hovered' : ''} ${requiresSequence && hoverSequence.includes(hover.id) ? 'sequence-hovered' : ''}`}
              data-testid={hover.testId}
              onMouseEnter={() => handleMouseEnter(hover)}
              onMouseLeave={() => handleMouseLeave(hover)}
            >
              <div className="hover-content">
                <div className="default-text">
                  {hover.text}
                  {hover.sequence && (
                    <span className="sequence-number">({hover.sequence})</span>
                  )}
                </div>
                <div className="hover-text">{hover.hoverText}</div>
              </div>
              
              <div className="hover-status" data-testid={hover.statusTestId}>
                <strong>Status:</strong> {getHoverStatus(hover)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="hover-controls">
        </div>
        
        {requiresSequence && (
          <div className="sequence-display">
            <h4>Hover Sequence:</h4>
            <div className="sequence-list">
              {hoverSequence.length === 0 ? (
                <span className="no-sequence">No hovers yet</span>
              ) : (
                hoverSequence.map((hoverId, index) => {
                  const hover = hovers.find(h => h.id === hoverId);
                  return (
                    <span key={index} className="sequence-item">
                      {index + 1}. {hover?.text}
                      {index < hoverSequence.length - 1 ? ' → ' : ''}
                    </span>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoverGroup;