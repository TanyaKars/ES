import React from 'react';

export interface TextAreaConfig {
  id: string;
  label: string;
  placeholder: string;
  testId: string;
  labelTestId: string;
}

interface TextAreaGroupProps {
  title: string;
  textAreas: TextAreaConfig[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  statusTestId?: string;
  onTextAreaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, setter: (value: string) => void) => void;
}

const TextAreaGroup: React.FC<TextAreaGroupProps> = ({ 
  title, 
  textAreas, 
  values, 
  onChange, 
  statusTestId,
  onTextAreaChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: string) => {
    if (onTextAreaChange) {
      onTextAreaChange(e, (value) => onChange(id, value));
    } else {
      onChange(id, e.target.value);
    }
  };

  return (
    <div className="element-group">
      <h3>{title}</h3>
      <div className="textarea-group">
        {textAreas.map((textArea) => (
          <div key={textArea.id} className="form-group horizontal">
            <label htmlFor={textArea.id} data-testid={textArea.labelTestId}>
              {textArea.label}
            </label>
            <textarea
              id={textArea.id}
              value={values[textArea.id] || ''}
              onChange={(e) => handleChange(e, textArea.id)}
              placeholder={textArea.placeholder}
              rows={1}
              data-testid={textArea.testId}
              className="auto-expand"
            />
          </div>
        ))}
      </div>
      
      <div className="element-status" data-testid={statusTestId}>
        {textAreas.map((textArea) => (
          <p key={textArea.id}>
            <strong>{textArea.label.replace(':', '')} length:</strong> {(values[textArea.id] || '').length} characters
          </p>
        ))}
      </div>
    </div>
  );
};

export default TextAreaGroup;