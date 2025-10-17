import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';
import CallToAction from '../../components/CallToAction';
import { callToActionConfigs } from '../../data/callToActionData';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/ClassPages.css';

const ShadowDomClass: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const shadowHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let attemptCount = 0;
    const maxAttempts = 10;
    
    const createShadowDOM = () => {
      const hostElement = shadowHostRef.current || document.getElementById('shadow-host');
      
      if (hostElement && !hostElement.shadowRoot) {
        try {
          // Clear any existing content first
          hostElement.innerHTML = '';
          const shadowRoot = hostElement.attachShadow({ mode: 'open' });        shadowRoot.innerHTML = `
          <style>
            .shadow-container {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 30px;
              border-radius: 12px;
              color: white;
              text-align: center;
              font-family: Arial, sans-serif;
              box-shadow: 0 8px 25px rgba(0,0,0,0.15);
              margin: 20px 0;
            }
            .shadow-button {
              background: white;
              color: #667eea;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
              font-weight: bold;
              margin-top: 15px;
              transition: all 0.3s ease;
            }
            .shadow-button:hover {
              background: #f0f0f0;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }
            .shadow-result {
              margin-top: 15px;
              padding: 10px;
              background: rgba(255,255,255,0.2);
              border-radius: 6px;
              border: 1px solid rgba(255,255,255,0.3);
              display: none;
            }
          </style>
          <div class="shadow-container">
            <h3>🌑 Shadow DOM Component</h3>
            <p>This content is completely isolated from the main page styles!</p>
            <button class="shadow-button" data-testid="shadow-button">
              Click Me!
            </button>
            <div class="shadow-result" id="result">
              ✅ Button clicked successfully! This message is also in Shadow DOM.
            </div>
          </div>
        `;

        // Add event listener for the button inside Shadow DOM
        const button = shadowRoot.querySelector('.shadow-button');
        const result = shadowRoot.querySelector('#result') as HTMLElement;
        
        if (button && result) {
          button.addEventListener('click', () => {
            result.style.display = 'block';
            setTimeout(() => {
              result.style.display = 'none';
            }, 3000);
          });
        }
        } catch (error) {
          console.error('Error creating Shadow DOM:', error);
        }
      } else if (attemptCount < maxAttempts) {
        // If element not found, try again
        attemptCount++;
        setTimeout(createShadowDOM, 50);
      }
    };

    // Start creation after a small delay
    const timer = setTimeout(createShadowDOM, 100);

    return () => {
      clearTimeout(timer);
      // Clean up shadow DOM when component unmounts
      if (shadowHostRef.current && shadowHostRef.current.shadowRoot) {
        shadowHostRef.current.innerHTML = '';
      }
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="class-page">
      <Header user={user!} title="Web Development: Shadow DOM" />
      
      <NavigationBar 
        buttons={[
          {
            text: "← Back to Dashboard",
            onClick: () => navigate('/dashboard'),
            testId: "back-to-dashboard"
          }
        ]}
      />

      <div className="class-content">
        <div className="class-intro">
          <h2>What is Shadow DOM?</h2>
          <p>
            Shadow DOM is a web standard that provides encapsulation for DOM and CSS. It allows you to 
            attach a hidden, separate DOM tree to an element, creating isolated components that don't 
            interfere with the main document's styling or structure.
          </p>
          
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ color: '#333', marginBottom: '1rem', fontSize: '1.3rem' }}>Key Benefits:</h3>
            <ul style={{ 
              textAlign: 'left', 
              maxWidth: '600px', 
              margin: '0 auto',
              listStylePosition: 'inside',
              color: '#666',
              lineHeight: '1.6'
            }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Style Isolation:</strong> CSS styles don't leak in or out</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>DOM Isolation:</strong> Hidden from main document queries</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Component Encapsulation:</strong> Perfect for reusable components</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Framework Independence:</strong> Native browser feature</li>
            </ul>
          </div>
        </div>

        <section className="shadow-example">
          <div className="example-box">

            <div className="shadow-demo">
              <div ref={shadowHostRef} id="shadow-host" data-testid="shadow-host"></div>
            </div>
          </div>
        </section>

        <section className="shadow-testing">
          <div className="testing-tips">
            <h3>Key Testing Strategies:</h3>
            <ul>
              <li>
                Use <code>locator()</code> in <strong>Playwright</strong> or <code>shadowRoot()</code> in <strong>Cypress</strong> to traverse into shadow trees
              </li>
              <li>
                <strong>Style Isolation:</strong> Verify that shadow styles don't affect the main document
              </li>
              <li>
                <strong>DOM Isolation:</strong> Confirm shadow content doesn't appear in main DOM queries
              </li>
              <li>
                <strong>Custom Elements:</strong> Test element registration and lifecycle methods
              </li>
              <li>
                <strong>Nested Shadows:</strong> Chain multiple locator calls for nested structures
              </li>
            </ul>
          </div>
        </section>

        <CallToAction {...callToActionConfigs.shadowDomHomework} />
      </div>
    </div>
  );
};

export default ShadowDomClass;