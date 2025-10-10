import React from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  testId: string;
}

export interface DropdownConfig {
  id: string;
  label: string;
  placeholder: string;
  options: DropdownOption[];
  testId: string;
  labelTestId: string;
  placeholderTestId: string;
}

interface DropdownGroupProps {
  title: string;
  dropdowns: DropdownConfig[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  statusTestId?: string;
  containerTestId?: string;
}

const DropdownGroup: React.FC<DropdownGroupProps> = ({ 
  title, 
  dropdowns, 
  values, 
  onChange, 
  statusTestId,
  containerTestId 
}) => {
  return (
    <div className="element-group">
      <h3>{title}</h3>
      <div className="dropdowns-container" data-testid={containerTestId}>
        {dropdowns.map((dropdown) => (
          <div key={dropdown.id} className="dropdown-item">
            <label htmlFor={dropdown.id} data-testid={dropdown.labelTestId}>
              {dropdown.label}
            </label>
            <select
              id={dropdown.id}
              value={values[dropdown.id] || ''}
              onChange={(e) => onChange(dropdown.id, e.target.value)}
              data-testid={dropdown.testId}
            >
              <option value="" data-testid={dropdown.placeholderTestId}>
                {dropdown.placeholder}
              </option>
              {dropdown.options.map((option) => (
                <option 
                  key={option.value} 
                  value={option.value} 
                  data-testid={option.testId}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      
      <div className="element-status" data-testid={statusTestId}>
        <p><strong>Selected values:</strong></p>
        {dropdowns.map((dropdown) => (
          <p key={dropdown.id}>
            {dropdown.label.replace(':', '')}: {values[dropdown.id] || 'None'}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DropdownGroup;