import React, { useState } from 'react';

const TextAreaExample: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextValue(value);
    setCharCount(value.length);
    
    // Auto-expand functionality
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div style={{ 
      padding: '15px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <h3 style={{ 
          color: '#333', 
          marginBottom: '15px',
          fontSize: '18px'
        }}>
          Simple TextArea Example
        </h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label 
            htmlFor="simple-textarea"
            style={{ 
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#555'
            }}
          >
            Your Text:
          </label>
          
          <textarea
            id="simple-textarea"
            value={textValue}
            onChange={handleTextChange}
            placeholder="Type something here..."
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'inherit',
              fontSize: '14px',
              resize: 'none',
              overflow: 'hidden'
            }}
            data-testid="simple-textarea"
          />
        </div>

        <div style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '10px'
        }}>
          Character count: <strong>{charCount}</strong>
        </div>

        <button
          onClick={() => {
            setTextValue('');
            setCharCount(0);
          }}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
          data-testid="clear-simple-btn"
        >
          Clear Text
        </button>

        <div style={{ 
          marginTop: '15px', 
          padding: '8px',
          backgroundColor: '#d1ecf1',
          borderRadius: '4px',
          fontSize: '11px',
          color: '#0c5460'
        }}>
          This textarea auto-expands as you type and is embedded in an iframe.
        </div>
      </div>
    </div>
  );
};

export default TextAreaExample;