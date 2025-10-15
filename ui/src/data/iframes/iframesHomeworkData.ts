export interface IframeHomeworkScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instructions: string[];
  expectedActions: string[];
  points: number;
  iframeUrl?: string;
  height?: string;
}

export interface IframeUserStats {
  totalPoints: number;
  completedScenarios: string[];
  attempts: Record<string, number>;
  bestScore: number;
}

export const iframesHomeworkScenarios: IframeHomeworkScenario[] = [
  {
    id: 'nested-iframe-challenge',
    title: 'Nested iFrame Navigation',
    description: 'Master navigation between outer iframe and inner nested iframe',
    difficulty: 'Hard',
    instructions: [
      'Enter text in the outer iframe input field',
      'Click "Show Inner iFrame" to reveal nested content',
      'Switch context to the inner iframe',
      'Interact with the textarea inside the nested iframe',
      'Submit both outer and inner forms',
      'Hide and show the inner iframe again'
    ],
    expectedActions: ['outer_input', 'toggle_inner', 'nested_context', 'inner_interaction', 'dual_submit', 'toggle_verify'],
    points: 50,
    iframeUrl: '/class/iframes/homework/nested',
    height: '600px'
  },
  {
    id: 'complex-multilevel-iframe',
    title: 'Multi-Level iFrame Mastery',
    description: 'Navigate through 3 levels of nested iframes with state management',
    difficulty: 'Hard',
    instructions: [
      'Complete Level 1 by entering data and activating Level 2',
      'Navigate to Level 2 iframe and enter required data',
      'Trigger Level 3 iframe to appear',
      'Switch to the deeply nested Level 3 iframe context',
      'Complete the TextAreaGroup form in the deepest level',
      'Verify communication log shows all interactions',
      'Reset the demo and repeat the process'
    ],
    expectedActions: ['level1_complete', 'level2_navigate', 'level3_trigger', 'deep_context', 'nested_form', 'verify_log', 'reset_repeat'],
    points: 75,
    iframeUrl: '/class/iframes/homework/complex',
    height: '700px'
  }
];

export const iframeHomeworkConfig = {
  maxPoints: 125,
  passingScore: 70,
  allowRetry: true,
  showHints: true
};

export const iframeHomeworkInitialState: IframeUserStats = {
  totalPoints: 0,
  completedScenarios: [],
  attempts: {},
  bestScore: 0
};