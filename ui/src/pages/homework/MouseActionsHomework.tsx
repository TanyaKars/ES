import React from 'react';
import HomeworkLayout from '../../components/homework/HomeworkLayout';
import HomeworkResults from '../../components/homework/HomeworkResults';
import CallToAction from '../../components/CallToAction.tsx';
import InfoCard from '../../components/alert-elements/InfoCard';
import ShoppingCartChallenge from '../../components/mouse-actions/challenges/ShoppingCartChallenge';
import NavigationSequenceChallenge from '../../components/mouse-actions/challenges/NavigationSequenceChallenge';
import TooltipExplorerChallenge from '../../components/mouse-actions/challenges/TooltipExplorerChallenge';
import { useAuth } from '../../hooks/useAuth';
import { useHomeworkState } from '../../hooks/useHomeworkState';
import { callToActionConfigs } from '../../data/callToActionData.ts';
import { mouseActionsHomeworkScenarios, mouseActionsHomeworkConfig } from '../../data/mouse-actions/mouseActionsHomeworkData';
import '../../styles/components/MouseActionsHomework.css';

const MouseActionsHomework: React.FC = () => {
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
    maxPoints: mouseActionsHomeworkConfig.maxPoints,
    totalScenarios: mouseActionsHomeworkScenarios.length
  });

  const handleScenarioComplete = (scenarioId: string, success: boolean) => {
    if (success) {
      const scenario = mouseActionsHomeworkScenarios.find(s => s.id === scenarioId);
      if (scenario) {
        completeScenario(scenarioId, scenario.points);
        // Completion feedback is handled by the challenge components themselves
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <HomeworkLayout
      user={user!}
      title="Mouse Actions Homework - Interactive Challenges"
      description="Master advanced mouse interactions through hands-on challenges including drag-drop, complex click sequences, hover chains, and precision targeting."
      backToClassPath="/class/mouse-actions"
      backToClassText="← Back to Mouse Actions Class"
      completedScenarios={completedScenarios.length}
      totalScenarios={mouseActionsHomeworkScenarios.length}
      totalPoints={totalPoints}
      maxPoints={mouseActionsHomeworkConfig.maxPoints}
      passingScore={mouseActionsHomeworkConfig.passingScore}
      isStarted={isStarted}
      showResults={showResults}
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
              description={`${mouseActionsHomeworkConfig.passingScore}% (${Math.round(mouseActionsHomeworkConfig.maxPoints * mouseActionsHomeworkConfig.passingScore / 100)} points)`} 
            />
            <InfoCard 
              title="Retry Policy" 
              description={mouseActionsHomeworkConfig.allowRetry ? 'Unlimited retries allowed' : 'One attempt only'} 
            />
          </div>
        </div>
      )}

      {isStarted && !showResults && (
        <div className="practice-section">
          {/* Shopping Cart Challenge */}
          <ShoppingCartChallenge
            onComplete={(success) => handleScenarioComplete('basic-drag-drop', success)}
            isActive={true}
          />

          {/* Navigation Sequence Challenge */}
          <NavigationSequenceChallenge
            onComplete={(success) => handleScenarioComplete('sequential-clicks', success)}
            isActive={true}
          />

          {/* Tooltip Explorer Challenge */}
          <TooltipExplorerChallenge
            onComplete={(success) => handleScenarioComplete('hover-tooltip-chain', success)}
            isActive={true}
          />
        </div>
      )}

      {showResults && (
        <>
          <HomeworkResults
            totalPoints={totalPoints}
            maxPoints={mouseActionsHomeworkConfig.maxPoints}
            completedScenarios={completedScenarios.length}
            totalScenarios={mouseActionsHomeworkScenarios.length}
          />
          <CallToAction {...callToActionConfigs.mouseActionsComplete} />
        </>
      )}
    </HomeworkLayout>
  );
};

export default MouseActionsHomework;