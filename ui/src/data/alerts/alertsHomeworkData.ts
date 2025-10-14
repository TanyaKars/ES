export interface HomeworkScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instructions: string[];
  expectedActions: string[];
  points: number;
}

export interface UserStats {
  totalPoints: number;
  completedScenarios: string[];
  attempts: Record<string, number>;
  bestScore: number;
}

export const alertsHomeworkScenarios: HomeworkScenario[] = [
  {
    id: 'sequential-alerts',
    title: 'Sequential Alert Chain',
    description: 'Complete a sequence of 3 different alert types in the correct order',
    difficulty: 'Easy',
    instructions: [
      'Click "Start Chain" to begin',
      'First: Confirm you want to proceed (click OK)',
      'Second: Enter your name in the prompt',
      'Third: Acknowledge the welcome message'
    ],
    expectedActions: ['confirm', 'prompt', 'alert'],
    points: 10
  },
  {
    id: 'conditional-flow',
    title: 'Conditional Alert Flow',
    description: 'Navigate through branching alert paths based on your choices',
    difficulty: 'Medium',
    instructions: [
      'Answer the initial question correctly',
      'If you choose "Yes": complete the advanced path (3 more dialogs)',
      'If you choose "No": complete the basic path (2 more dialogs)',
      'Each path has different requirements'
    ],
    expectedActions: ['confirm', 'prompt', 'alert'],
    points: 15
  },
  {
    id: 'calculator-challenge',
    title: 'Alert Calculator',
    description: 'Build a calculator using only prompt dialogs with input validation',
    difficulty: 'Hard',
    instructions: [
      'Enter first number (must be valid)',
      'Choose operation (+, -, *, /)',
      'Enter second number (must be valid)',
      'Handle division by zero cases',
      'See the result and continue or finish'
    ],
    expectedActions: ['prompt', 'prompt', 'prompt', 'confirm', 'alert'],
    points: 25
  },
  {
    id: 'registration-flow',
    title: 'User Registration Wizard',
    description: 'Complete a multi-step registration using prompts with validation',
    difficulty: 'Hard',
    instructions: [
      'Enter username (minimum 3 characters)',
      'Enter email (must contain @ and .)',
      'Enter age (must be 18 or older)',
      'Confirm registration details',
      'Handle validation errors appropriately'
    ],
    expectedActions: ['prompt', 'prompt', 'prompt', 'confirm', 'alert'],
    points: 30
  },
  {
    id: 'ajax-sequence',
    title: 'AJAX Operation Chain',
    description: 'Manage multiple AJAX operations with proper handling',
    difficulty: 'Medium',
    instructions: [
      'Trigger first AJAX operation',
      'Wait for success and return',
      'Confirm next operation',
      'Trigger second AJAX operation',
      'Complete the full sequence'
    ],
    expectedActions: ['ajax', 'confirm', 'ajax', 'alert'],
    points: 20
  }
];

export const homeworkConfig = {
  maxPoints: 100,
  passingScore: 70,
  allowRetry: true,
  showHints: true
};