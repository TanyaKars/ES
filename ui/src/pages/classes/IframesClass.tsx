import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';
import CallToAction from '../../components/CallToAction';
import { callToActionConfigs } from '../../data/callToActionData.ts';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/IframesClass.css';

const IframesClass: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [iframeUrl, setIframeUrl] = useState('/class/iframes/examples/form');
  const [iframeHeight, setIframeHeight] = useState('400px');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const iframeExamples = [
    { url: '/class/iframes/examples/form', label: 'Form with TextAreaGroup', height: '400px' },
    { url: 'https://shouldideploy.today/', label: 'External Site Example', height: '500px' }
  ];

  const handleIframeChange = (url: string, height: string) => {
    setIframeUrl(url);
    setIframeHeight(height);
  };

  return (
    <div className="class-page">
      <Header user={user!} title="Web Development: iFrames" />
      
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
          <h2>What are iFrames?</h2>
          <p>
            An iframe (inline frame) is an HTML element that allows you to embed another HTML document 
            within the current document. iFrames are commonly used to display content from external 
            sources, embed videos, maps, or create sandboxed environments.
          </p>
          
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ color: '#333', marginBottom: '1rem', fontSize: '1.3rem' }}>Key Properties:</h3>
            <ul style={{ 
              textAlign: 'left', 
              maxWidth: '600px', 
              margin: '0 auto',
              listStylePosition: 'inside',
              color: '#666',
              lineHeight: '1.6'
            }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>src:</strong> Specifies the URL of the document to embed</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>width & height:</strong> Define the dimensions of the iframe</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>sandbox:</strong> Applies security restrictions to the iframe content</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>title:</strong> Provides accessibility information</li>
            </ul>
          </div>
        </div>

        <section className="iframe-examples">
            
            <div className="iframe-controls">
              <h3>Choose an Example:</h3>
              <div className="example-buttons">
                {iframeExamples.map((example, index) => (
                  <button
                    key={index}
                    className={`iframe-btn ${iframeUrl === example.url ? 'active' : ''}`}
                    onClick={() => handleIframeChange(example.url, example.height)}
                    data-testid={`iframe-example-${index}`}
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="iframe-container">
              <div className="iframe-info">
                <p><strong>Current URL:</strong> {iframeUrl}</p>
                <p><strong>Height:</strong> {iframeHeight}</p>
              </div>
              
              <iframe
                src={iframeUrl}
                width="100%"
                height={iframeHeight}
                title="iFrame Example"
                className="demo-iframe"
                data-testid="demo-iframe"
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            </div>
          </section>

          <section className="iframe-testing">
            <div className="testing-tips">
              <h3>Key Testing Strategies:</h3>
              <ul>
                <li>
                  <strong>Content Loading:</strong> Verify the iframe loads the correct content
                </li>
                <li>
                  <strong>Responsive Behavior:</strong> Test how iframes adapt to different screen sizes
                </li>
                <li>
                  <strong>Cross-Origin Issues:</strong> Handle security restrictions for external content
                </li>
                <li>
                  <strong>Performance:</strong> Monitor loading times and resource usage
                </li>
                <li>
                  <strong>Accessibility:</strong> Ensure proper title attributes and screen reader support
                </li>
              </ul>
            </div>
          </section>

        <CallToAction {...callToActionConfigs.iframesHomework} />
      </div>
    </div>
  );
};

export default IframesClass;