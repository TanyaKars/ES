import { useState } from 'react';

interface UseHomeworkStateProps {
  maxPoints: number;
  totalScenarios: number;
}

interface UseHomeworkStateReturn {
  isStarted: boolean;
  showResults: boolean;
  completedScenarios: string[];
  totalPoints: number;
  startHomework: () => void;
  submitHomework: () => void;
  completeScenario: (scenarioId: string, points: number) => void;
  resetHomework: () => void;
}

export const useHomeworkState = ({ 
  maxPoints, 
  totalScenarios 
}: UseHomeworkStateProps): UseHomeworkStateReturn => {
  const [isStarted, setIsStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const startHomework = () => {
    setIsStarted(true);
    setShowResults(false);
    setCompletedScenarios([]);
    setTotalPoints(0);
  };

  const submitHomework = () => {
    setShowResults(true);
    setIsStarted(false);
    alert(`Homework submitted! You completed ${completedScenarios.length}/${totalScenarios} scenarios with ${totalPoints}/${maxPoints} points.`);
  };

  const completeScenario = (scenarioId: string, points: number) => {
    if (!completedScenarios.includes(scenarioId)) {
      setCompletedScenarios(prev => [...prev, scenarioId]);
      setTotalPoints(prev => prev + points);
    }
  };

  const resetHomework = () => {
    setIsStarted(false);
    setShowResults(false);
    setCompletedScenarios([]);
    setTotalPoints(0);
  };

  return {
    isStarted,
    showResults,
    completedScenarios,
    totalPoints,
    startHomework,
    submitHomework,
    completeScenario,
    resetHomework
  };
};