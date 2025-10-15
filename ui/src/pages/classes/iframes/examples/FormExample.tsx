import React, { useState } from 'react';
import TextAreaGroup from '../../../../components/form-elements/TextAreaGroup';

const FormExample: React.FC = () => {
  const [textAreaValues, setTextAreaValues] = useState({
    message: '',
    feedback: ''
  });

  const textAreas = [
    { 
      id: 'message', 
      label: 'Message:', 
      placeholder: 'Enter your message here...', 
      testId: 'message-textarea', 
      labelTestId: 'message-label' 
    },
    { 
      id: 'feedback', 
      label: 'Feedback:', 
      placeholder: 'Enter your feedback here...', 
      testId: 'feedback-textarea', 
      labelTestId: 'feedback-label' 
    }
  ];

  const handleTextAreaChange = (id: string, value: string) => {
    setTextAreaValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    alert(`Message: ${textAreaValues.message}\nFeedback: ${textAreaValues.feedback}`);
  };

  const handleClear = () => {
    setTextAreaValues({ message: '', feedback: '' });
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: '#333', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          iFrame Form Example
        </h2>
        
        <p style={{ 
          color: '#666', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          This content is loaded inside an iframe and reuses the TextAreaGroup component.
        </p>

        <TextAreaGroup
          title="Contact Form"
          textAreas={textAreas}
          values={textAreaValues}
          onChange={handleTextAreaChange}
          statusTestId="textarea-status"
        />

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            data-testid="submit-btn"
          >
            Submit
          </button>
          
          <button
            onClick={handleClear}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            data-testid="clear-btn"
          >
            Clear
          </button>
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '10px',
          backgroundColor: '#e9ecef',
          borderRadius: '5px',
          fontSize: '12px',
          color: '#495057'
        }}>
          <strong>Note:</strong> This is iframe content demonstrating component reuse. 
          The TextAreaGroup component is being used within an iframe context.
        </div>
      </div>
    </div>
  );
};

export default FormExample;