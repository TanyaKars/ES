import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  testId: string;
  labelTestId: string;
}

interface RadioGroupProps {
  title: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  statusTestId?: string;
  containerTestId?: string;
  statusLabel?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ 
  title, 
  name,
  options, 
  value, 
  onChange, 
  statusTestId,
  containerTestId,
  statusLabel = "Selected"
}) => {
  return (
    <div className="element-group">
      <h3>{title}</h3>
      <div className="radio-group" data-testid={containerTestId}>
        {options.map((option) => (
          <label 
            key={option.value}
            className="radio-label" 
            data-testid={option.labelTestId}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              data-testid={option.testId}
            />
            {option.label}
          </label>
        ))}
      </div>
      
      <div className="element-status" data-testid={statusTestId}>
        <p><strong>{statusLabel}:</strong> {value || 'None'}</p>
      </div>
    </div>
  );
};

export default RadioGroup;