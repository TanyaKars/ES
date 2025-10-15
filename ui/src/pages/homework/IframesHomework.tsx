import React, { useState } from 'react';
import HomeworkLayout from '../../components/homework/HomeworkLayout';
import HomeworkResults from '../../components/homework/HomeworkResults';
import InfoCard from '../../components/alert-elements/InfoCard';
import { useAuth } from '../../hooks/useAuth';
import { useHomeworkState } from '../../hooks/useHomeworkState';
import { iframesHomeworkScenarios, iframeHomeworkConfig } from '../../data/iframes/iframesHomeworkData';

interface IframeScenarioCardProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    instructions: string[];
    points: number;
    iframeUrl?: string;
    height?: string;
  };
  isCompleted: boolean;
  onStart: (scenarioId: string) => void;
}

const IframeScenarioCard: React.FC<IframeScenarioCardProps> = ({ scenario, isCompleted, onStart }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4caf50';
      case 'Medium': return '#ff9800';
      case 'Hard': return '#f44336';
      default: return '#2196f3';
    }
  };

  return (
    <div className="card-base card-medium" style={{ 
      border: isCompleted ? '2px solid #4caf50' : '1px solid #ddd',
      backgroundColor: isCompleted ? '#f1f8e9' : 'white'
    }}>
      <div className="card-header">
        <h3 style={{ 
          color: '#333', 
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {scenario.title}
          {isCompleted && <span style={{ color: '#4caf50', fontSize: '16px' }}>✅</span>}
        </h3>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <span style={{ 
            backgroundColor: getDifficultyColor(scenario.difficulty),
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {scenario.difficulty}
          </span>
          
          <span style={{ 
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {scenario.points} points
          </span>
        </div>
      </div>

      <p style={{ color: '#666', marginBottom: '15px', lineHeight: '1.5' }}>
        {scenario.description}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #2196f3',
          color: '#2196f3',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          marginBottom: '10px'
        }}
      >
        {isExpanded ? '🔼 Hide Details' : '🔽 Show Instructions'}
      </button>

      {isExpanded && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '6px',
          marginBottom: '15px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '14px' }}>
            📋 Testing Instructions:
          </h4>
          <ol style={{ 
            margin: '0', 
            paddingLeft: '20px',
            color: '#555',
            fontSize: '13px',
            lineHeight: '1.6'
          }}>
            {scenario.instructions.map((instruction, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {instruction}
              </li>
            ))}
          </ol>

          {scenario.iframeUrl && (
            <div style={{ marginTop: '15px' }}>
              <h4 style={{ color: '#333', marginBottom: '8px', fontSize: '14px' }}>
                🎯 Testing Environment:
              </h4>
              <iframe
                src={scenario.iframeUrl}
                width="100%"
                height={scenario.height || '300px'}
                title={`${scenario.title} Testing Environment`}
                style={{
                  border: '2px solid #2196f3',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            </div>
          )}
        </div>
      )}

      <div className="card-button-container">
        <button
          className="start-scenario-btn"
          onClick={() => onStart(scenario.id)}
          data-testid={`start-${scenario.id}`}
        >
          {isCompleted ? '🔄 Retry Scenario' : '🚀 Start Challenge'}
        </button>
      </div>
    </div>
  );
};

const IframesHomework: React.FC = () => {
  const { user, isLoading } = useAuth();
  const {
    isStarted,
    showResults,
    completedScenarios,
    totalPoints,
    startHomework,
    submitHomework,
    completeScenario,
    resetHomework
  } = useHomeworkState({
    maxPoints: iframeHomeworkConfig.maxPoints,
    totalScenarios: iframesHomeworkScenarios.length
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const startScenario = (scenarioId: string) => {
    if (completedScenarios.includes(scenarioId)) {
      if (!confirm('You have already completed this scenario. Do you want to retry?')) {
        return;
      }
    }

    // Award points for "completing" the scenario
    // In a real app, this would be based on actual test results
    const scenario = iframesHomeworkScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      alert(`Starting ${scenario.title}!\n\nThis scenario is worth ${scenario.points} points.\n\nIn a real testing environment, you would now run your automated tests against the iframe content.`);
      completeScenario(scenarioId, scenario.points);
    }
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

          <div className="cards-grid medium">
            {iframesHomeworkScenarios.map((scenario) => (
              <IframeScenarioCard
                key={scenario.id}
                scenario={scenario}
                isCompleted={completedScenarios.includes(scenario.id)}
                onStart={startScenario}
              />
            ))}
          </div>
        </div>
      )}
    </HomeworkLayout>
  );
};

export default IframesHomework;