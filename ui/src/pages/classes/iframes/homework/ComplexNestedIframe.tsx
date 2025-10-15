import React, { useState } from 'react';

const ComplexNestedIframe: React.FC = () => {
  const [level1Data, setLevel1Data] = useState('');
  const [level2Data, setLevel2Data] = useState('');
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);
  const [communicationLog, setCommunicationLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setCommunicationLog(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleLevel1Action = () => {
    addToLog(`Level 1 Action: "${level1Data}"`);
    setActiveLevel(2);
  };

  const handleLevel2Action = () => {
    addToLog(`Level 2 Action: "${level2Data}"`);
    setActiveLevel(3);
  };

  const resetDemo = () => {
    setLevel1Data('');
    setLevel2Data('');
    setActiveLevel(1);
    setCommunicationLog([]);
    addToLog('Demo reset to Level 1');
  };

  return (
    <div style={{ 
      padding: '15px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f3e5f5',
      minHeight: '100vh',
      border: '4px solid #9c27b0'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
        margin: '5px'
      }}>
        <h2 style={{ 
          color: '#9c27b0', 
          marginBottom: '10px',
          textAlign: 'center',
          fontSize: '18px'
        }}>
          🚀 Complex Nested iFrame Challenge
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
          gap: '10px'
        }}>
          {[1, 2, 3].map(level => (
            <div
              key={level}
              style={{
                padding: '5px 10px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: activeLevel >= level ? 'white' : '#9c27b0',
                backgroundColor: activeLevel >= level ? '#9c27b0' : 'transparent',
                border: '2px solid #9c27b0'
              }}
            >
              Level {level}
            </div>
          ))}
        </div>

        {/* Level 1 Controls */}
        <div style={{
          border: '2px solid #9c27b0',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '15px',
          backgroundColor: activeLevel >= 1 ? '#fce4ec' : '#f5f5f5'
        }}>
          <h3 style={{ color: '#9c27b0', fontSize: '16px', marginBottom: '10px' }}>
            📊 Level 1 - Master Control
          </h3>
          
          <input
            type="text"
            value={level1Data}
            onChange={(e) => setLevel1Data(e.target.value)}
            placeholder="Enter Level 1 data..."
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              border: '1px solid #9c27b0',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            data-testid="level1-input"
          />
          
          <button
            onClick={handleLevel1Action}
            disabled={!level1Data}
            style={{
              backgroundColor: level1Data ? '#9c27b0' : '#ccc',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: level1Data ? 'pointer' : 'not-allowed',
              fontSize: '12px'
            }}
            data-testid="level1-action-btn"
          >
            Activate Level 2
          </button>
        </div>

        {/* Level 2 - First Nested iFrame */}
        {activeLevel >= 2 && (
          <div style={{
            border: '3px dashed #ff5722',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '15px',
            backgroundColor: '#fff3e0'
          }}>
            <h3 style={{ color: '#ff5722', fontSize: '14px', marginBottom: '10px' }}>
              🎯 Level 2 - First Nested iFrame
            </h3>
            
            <input
              type="text"
              value={level2Data}
              onChange={(e) => setLevel2Data(e.target.value)}
              placeholder="Enter Level 2 data..."
              style={{
                width: '100%',
                padding: '6px',
                marginBottom: '8px',
                border: '1px solid #ff5722',
                borderRadius: '3px',
                fontSize: '12px',
                boxSizing: 'border-box'
              }}
              data-testid="level2-input"
            />
            
            <button
              onClick={handleLevel2Action}
              disabled={!level2Data}
              style={{
                backgroundColor: level2Data ? '#ff5722' : '#ccc',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '3px',
                cursor: level2Data ? 'pointer' : 'not-allowed',
                fontSize: '11px',
                marginBottom: '10px'
              }}
              data-testid="level2-action-btn"
            >
              Load Level 3 iFrame
            </button>

            {/* Level 3 - Double Nested iFrame */}
            {activeLevel >= 3 && (
              <div style={{
                border: '2px solid #4caf50',
                borderRadius: '6px',
                padding: '10px',
                backgroundColor: '#e8f5e8'
              }}>
                <h4 style={{ color: '#4caf50', fontSize: '12px', marginBottom: '8px' }}>
                  🌟 Level 3 - Double Nested iFrame
                </h4>
                
                <iframe
                  src="/class/iframes/examples/form"
                  width="100%"
                  height="250px"
                  title="Level 3 Nested iFrame"
                  style={{
                    border: '2px solid #4caf50',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                  }}
                  data-testid="level3-iframe"
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
                
                <div style={{
                  marginTop: '8px',
                  padding: '6px',
                  backgroundColor: '#c8e6c9',
                  borderRadius: '3px',
                  fontSize: '10px',
                  color: '#2e7d32'
                }}>
                  <strong>Success!</strong> You've reached the deepest level. 
                  This iframe contains the TextAreaGroup component nested 3 levels deep!
                </div>
              </div>
            )}
          </div>
        )}

        {/* Communication Log */}
        <div style={{
          backgroundColor: '#263238',
          color: '#4fc3f7',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '11px',
          fontFamily: 'monospace',
          maxHeight: '120px',
          overflowY: 'auto'
        }}>
          <div style={{ color: '#81c784', marginBottom: '5px', fontWeight: 'bold' }}>
            🖥️ Communication Log:
          </div>
          {communicationLog.length === 0 ? (
            <div style={{ color: '#78909c' }}>No activity yet...</div>
          ) : (
            communicationLog.map((log, index) => (
              <div key={index} style={{ marginBottom: '2px' }}>
                {log}
              </div>
            ))
          )}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '15px' 
        }}>
          <button
            onClick={resetDemo}
            style={{
              backgroundColor: '#607d8b',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            data-testid="reset-demo-btn"
          >
            🔄 Reset Demo
          </button>
        </div>

        <div style={{ 
          marginTop: '15px', 
          padding: '10px',
          backgroundColor: '#e0f2f1',
          borderRadius: '5px',
          fontSize: '11px',
          color: '#00695c',
          border: '1px solid #4db6ac'
        }}>
          <strong>Testing Challenge:</strong> This homework tests your ability to handle deeply nested iframes. 
          Try to interact with elements across all three levels and verify data flow between nested contexts.
        </div>
      </div>
    </div>
  );
};

export default ComplexNestedIframe;