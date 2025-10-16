import React, { useState } from 'react';
import HomeworkLayout from '../../components/homework/HomeworkLayout';
import HomeworkResults from '../../components/homework/HomeworkResults';
import CallToAction from '../../components/CallToAction.tsx';
import InfoCard from '../../components/alert-elements/InfoCard';
import { useAuth } from '../../hooks/useAuth';
import { useHomeworkState } from '../../hooks/useHomeworkState';
import { callToActionConfigs } from '../../data/callToActionData.ts';
import { iframesHomeworkScenarios, iframeHomeworkConfig } from '../../data/iframes/iframesHomeworkData';
import '../../styles/pages/IframesClass.css';

const IframesHomework: React.FC = () => {
  const { user, isLoading } = useAuth();
  const {
    isStarted,
    showResults,
    completedScenarios,
    totalPoints,
    startHomework,
    submitHomework,
    resetHomework
  } = useHomeworkState({
    maxPoints: iframeHomeworkConfig.maxPoints,
    totalScenarios: iframesHomeworkScenarios.length
  });

  const [currentIframeUrl, setCurrentIframeUrl] = useState(iframesHomeworkScenarios[0]?.iframeUrl || '');
  const [currentIframeHeight, setCurrentIframeHeight] = useState(iframesHomeworkScenarios[0]?.height || '400px');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleIframeChange = (url: string, height: string) => {
    setCurrentIframeUrl(url);
    setCurrentIframeHeight(height);
  };

  if (showResults) {
    const passed = totalPoints >= (iframeHomeworkConfig.maxPoints * iframeHomeworkConfig.passingScore / 100);
    
    return (
      <HomeworkLayout
        user={user!}
        title="iFrames: Homework Results"
        description={`You ${passed ? 'passed' : 'did not pass'} the iFrames homework with ${totalPoints}/${iframeHomeworkConfig.maxPoints} points.`}
        isStarted={true}
        showResults={true}
        completedScenarios={completedScenarios.length}
        totalScenarios={iframesHomeworkScenarios.length}
        totalPoints={totalPoints}
        maxPoints={iframeHomeworkConfig.maxPoints}
        passingScore={(iframeHomeworkConfig.maxPoints * iframeHomeworkConfig.passingScore / 100)}
        backToClassText="← Back to iFrames Class"
        backToClassPath="/class/iframes"
        onStartHomework={startHomework}
        onSubmitHomework={submitHomework}
        onTryAgain={resetHomework}
      >
        <HomeworkResults
          completedScenarios={completedScenarios.length}
          totalScenarios={iframesHomeworkScenarios.length}
          totalPoints={totalPoints}
          maxPoints={iframeHomeworkConfig.maxPoints}
        />
        <CallToAction {...callToActionConfigs.iframesComplete} />
      </HomeworkLayout>
    );
  }

  return (
    <HomeworkLayout
      user={user!}
      title="iFrames: Homework Assignment"
      description="Master iframe testing by completing scenarios with nested frames, form interactions, and complex navigation challenges."
      isStarted={isStarted}
      showResults={showResults}
      completedScenarios={completedScenarios.length}
      totalScenarios={iframesHomeworkScenarios.length}
      totalPoints={totalPoints}
      maxPoints={iframeHomeworkConfig.maxPoints}
        passingScore={(iframeHomeworkConfig.maxPoints * iframeHomeworkConfig.passingScore / 100)}
      backToClassText="← Back to iFrames Class"
      backToClassPath="/class/iframes"
      onStartHomework={startHomework}
      onSubmitHomework={submitHomework}
      onTryAgain={resetHomework}
    >
      {!isStarted && !showResults && (
        <div className="pre-start-info">
          <h2>Before You Start</h2>
          <div className="cards-grid small">
            <InfoCard 
              title="Passing Score" 
              description={`${iframeHomeworkConfig.passingScore}% (${(iframeHomeworkConfig.maxPoints * iframeHomeworkConfig.passingScore / 100)} points)`} 
            />
            <InfoCard 
              title="Retry Policy" 
              description={iframeHomeworkConfig.allowRetry ? 'Unlimited retries allowed' : 'One attempt only'} 
            />
          </div>
        </div>
      )}

      {isStarted && (
        <div className="scenarios-section">
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px',
            border: '1px solid #2196f3'
          }}>
            <h2 style={{ color: '#1976d2', marginBottom: '15px', fontSize: '1.5rem' }}>
              🎯 iFrame Testing Challenges
            </h2>
            <p style={{ color: '#555', marginBottom: '15px' }}>
              These scenarios will test your ability to navigate and interact with content within iframes, 
              including nested iframe structures and complex form interactions.
            </p>
            <div style={{
              backgroundColor: '#fff3e0',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #ff9800'
            }}>
              <h3 style={{ color: '#f57c00', marginBottom: '10px', fontSize: '1.1rem' }}>
                💡 Testing Tips:
              </h3>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#666' }}>
                <li>Always switch to iframe context before interacting with elements</li>
                <li>For nested iframes, you may need to switch contexts multiple times</li>
                <li>Remember to switch back to main content when needed</li>
                <li>Pay attention to iframe loading times and element availability</li>
                <li>Test both positive and negative scenarios within iframe contexts</li>
              </ul>
            </div>
          </div>

          <section className="iframe-examples">
            
            <div className="iframe-controls">
              <h3>Choose a Scenario to Test:</h3>
              <div className="example-buttons">
                {iframesHomeworkScenarios.map((scenario, index) => (
                  <button
                    key={index}
                    className={`iframe-btn ${currentIframeUrl === scenario.iframeUrl ? 'active' : ''}`}
                    onClick={() => handleIframeChange(scenario.iframeUrl || '', scenario.height || '400px')}
                    data-testid={`iframe-scenario-${index}`}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="iframe-container">
              <div className="iframe-info">
                <p><strong>Current Environment:</strong> {iframesHomeworkScenarios.find(s => s.iframeUrl === currentIframeUrl)?.title || 'Select a scenario'}</p>
                <p><strong>Height:</strong> {currentIframeHeight}</p>
              </div>
              
              {currentIframeUrl && (
                <iframe
                  src={currentIframeUrl}
                  width="100%"
                  height={currentIframeHeight}
                  title="Homework Testing Environment"
                  className="demo-iframe"
                  data-testid="homework-iframe"
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
              )}
            </div>
          </section>
        </div>
      )}
    </HomeworkLayout>
  );
};

export default IframesHomework;