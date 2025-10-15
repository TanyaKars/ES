import React, { useState } from 'react';

const NestedIframeExample: React.FC = () => {
  const [outerMessage, setOuterMessage] = useState('');
  const [showInnerIframe, setShowInnerIframe] = useState(false);

  const handleToggleInner = () => {
    setShowInnerIframe(!showInnerIframe);
  };

  const handleOuterSubmit = () => {
    console.log(`Outer iframe message: ${outerMessage}`);
    // Outer form submitted successfully
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#e3f2fd',
      minHeight: '100vh',
      border: '3px solid #1976d2'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        margin: '10px'
      }}>
        <h2 style={{ 
          color: '#1976d2', 
          marginBottom: '15px',
          textAlign: 'center',
          borderBottom: '2px solid #1976d2',
          paddingBottom: '10px'
        }}>
          🎯 Outer iFrame (Level 1)
        </h2>
        
        <p style={{ 
          color: '#666', 
          marginBottom: '20px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          This is the first level iframe. It contains controls and can embed another iframe inside it.
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="outer-message"
            style={{ 
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#1976d2'
            }}
          >
            Outer iFrame Message:
          </label>
          
          <input
            id="outer-message"
            type="text"
            value={outerMessage}
            onChange={(e) => setOuterMessage(e.target.value)}
            placeholder="Type a message for the outer iframe..."
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #1976d2',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            data-testid="outer-message-input"
          />
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleOuterSubmit}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
            data-testid="outer-submit-btn"
          >
            Submit Outer
          </button>
          
          <button
            onClick={handleToggleInner}
            style={{
              backgroundColor: showInnerIframe ? '#f44336' : '#4caf50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
            data-testid="toggle-inner-btn"
          >
            {showInnerIframe ? 'Hide Inner iFrame' : 'Show Inner iFrame'}
          </button>
        </div>

        {showInnerIframe && (
          <div style={{
            border: '3px dashed #ff9800',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#fff3e0',
            margin: '20px 0'
          }}>
            <h3 style={{ 
              color: '#ff9800', 
              textAlign: 'center',
              marginBottom: '15px'
            }}>
              📱 Inner iFrame Container (Level 2)
            </h3>
            
            <p style={{ 
              fontSize: '12px', 
              color: '#666',
              textAlign: 'center',
              marginBottom: '15px'
            }}>
              This iframe is nested inside the outer iframe. Testing iframe-within-iframe scenarios.
            </p>

            <iframe
              src="/class/iframes/examples/textarea"
              width="100%"
              height="300px"
              title="Inner iFrame Example"
              style={{
                border: '2px solid #ff9800',
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
              data-testid="inner-iframe"
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
            
            <div style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#ffecb3',
              borderRadius: '4px',
              fontSize: '11px',
              color: '#e65100',
              textAlign: 'center'
            }}>
              <strong>Challenge:</strong> This inner iframe loads the TextArea example. 
              Try interacting with both the outer controls and the inner iframe content!
            </div>
          </div>
        )}

        <div style={{ 
          marginTop: '20px', 
          padding: '15px',
          backgroundColor: '#e1f5fe',
          borderRadius: '5px',
          fontSize: '12px',
          color: '#0277bd',
          border: '1px solid #29b6f6'
        }}>
          <strong>Testing Instructions:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Enter text in the outer iframe input field</li>
            <li>Click "Show Inner iFrame" to reveal the nested iframe</li>
            <li>Interact with the textarea inside the inner iframe</li>
            <li>Try submitting both outer and inner forms</li>
            <li>Test hiding/showing the inner iframe multiple times</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NestedIframeExample;