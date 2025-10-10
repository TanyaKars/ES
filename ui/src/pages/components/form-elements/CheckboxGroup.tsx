import React from 'react';

export interface CheckboxOption {
  id: string;
  label: string;
  disabled?: boolean;
  testId: string;
  labelTestId: string;
}

interface CheckboxGroupProps {
  title: string;
  options: CheckboxOption[];
  values: Record<string, boolean>;
  onChange: (id: string) => void;
  statusTestId?: string;
  containerTestId?: string;
  statusLabel?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
  title, 
  options, 
  values, 
  onChange, 
  statusTestId,
  containerTestId,
  statusLabel = "Selected options"
}) => {
  const getSelectedOptions = () => {
    return Object.entries(values)
      .filter(([, value]) => value)
      .map(([key]) => {
        const option = options.find(opt => opt.id === key);
        return option ? option.label.replace(/\s*\(.*?\)\s*/, '') : key;
      })
      .join(', ') || 'None';
  };

  return (
    <div className="element-group">
      <h3>{title}</h3>
      <div className="checkbox-group" data-testid={containerTestId}>
        {options.map((option) => (
          <label 
            key={option.id}
            className={`checkbox-label ${option.disabled ? 'disabled' : ''}`} 
            data-testid={option.labelTestId}
          >
            <input
              type="checkbox"
              checked={values[option.id] || false}
              disabled={option.disabled}
              onChange={() => !option.disabled && onChange(option.id)}
              data-testid={option.testId}
            />
            {option.label}
          </label>
        ))}
      </div>
      
      <div className="element-status" data-testid={statusTestId}>
        <p><strong>{statusLabel}:</strong> {getSelectedOptions()}</p>
      </div>
    </div>
  );
};

export default CheckboxGroup;