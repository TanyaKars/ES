export interface MouseActionHomeworkScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instructions: string[];
  expectedActions: string[];
  points: number;
  interactionType: 'drag-drop' | 'click-sequence' | 'hover-chain' | 'complex-combo';
}

export interface MouseActionUserStats {
  totalPoints: number;
  completedScenarios: string[];
  attempts: Record<string, number>;
  bestScore: number;
}

export const mouseActionsHomeworkScenarios: MouseActionHomeworkScenario[] = [
  {
    id: 'basic-drag-drop',
    title: 'Shopping Cart Challenge',
    description: 'Drag multiple items into a shopping cart in the correct order',
    difficulty: 'Easy',
    instructions: [
      'Drag "Laptop" from the products area to the shopping cart',
      'Drag "Mouse" from products to cart',
      'Drag "Keyboard" from products to cart',
      'Verify all items appear in the cart with correct total'
    ],
    expectedActions: ['drag_laptop', 'drag_mouse', 'drag_keyboard', 'verify_total'],
    points: 15,
    interactionType: 'drag-drop'
  },
  {
    id: 'sequential-clicks',
    title: 'Navigation Sequence',
    description: 'Complete a multi-step navigation using different click types',
    difficulty: 'Easy',
    instructions: [
      'Single click the "Start" button',
      'Double click the "Documents" folder to open it',
      'Right click on "important.txt" file',
      'Single click "Properties" from context menu',
      'Single click "OK" to close properties dialog'
    ],
    expectedActions: ['single_click', 'double_click', 'right_click', 'context_select', 'dialog_close'],
    points: 20,
    interactionType: 'click-sequence'
  },
  {
    id: 'hover-tooltip-chain',
    title: 'Tooltip Explorer',
    description: 'Hover over elements to reveal hidden information and follow the chain',
    difficulty: 'Medium',
    instructions: [
      'Hover over the "Info" icon to reveal the first clue',
      'Hover over the element mentioned in the first clue',
      'Continue following the hover chain through 4 elements',
      'Hover over the final "Secret Button" that becomes visible',
      'Click the secret button to complete the challenge'
    ],
    expectedActions: ['hover_info', 'hover_clue1', 'hover_clue2', 'hover_clue3', 'hover_secret', 'click_secret'],
    points: 25,
    interactionType: 'hover-chain'
  },
  {
    id: 'drag-to-sort',
    title: 'Task Priority Organizer',
    description: 'Drag tasks to reorder them by priority (High, Medium, Low)',
    difficulty: 'Medium',
    instructions: [
      'Drag "Fix Critical Bug" to the High Priority section',
      'Drag "Update Documentation" to the Low Priority section',
      'Drag "Code Review" to the Medium Priority section',
      'Drag "Deploy to Production" to the High Priority section',
      'Verify tasks are correctly categorized'
    ],
    expectedActions: ['sort_critical', 'sort_docs', 'sort_review', 'sort_deploy', 'verify_sorting'],
    points: 30,
    interactionType: 'drag-drop'
  },
  {
    id: 'complex-interaction',
    title: 'Multi-Modal Interface Challenge',
    description: 'Combine drag-drop, hover, and click interactions in a complex workflow',
    difficulty: 'Hard',
    instructions: [
      'Hover over "Tools" to reveal the tool palette',
      'Drag the "Select" tool from palette to the workspace',
      'Click and hold to select multiple objects (simulated)',
      'Drag the selected objects to the "Archive" zone',
      'Right-click the archive zone and select "Compress"',
      'Double-click the compressed file to verify contents'
    ],
    expectedActions: ['hover_tools', 'drag_tool', 'click_hold', 'drag_multiple', 'right_click_archive', 'compress_select', 'verify_contents'],
    points: 40,
    interactionType: 'complex-combo'
  },
  {
    id: 'precision-clicking',
    title: 'Pixel Perfect Clicking',
    description: 'Click precisely on small targets and moving elements',
    difficulty: 'Hard',
    instructions: [
      'Click the small "X" button (10px x 10px) to close popup',
      'Click the moving target that bounces around the screen',
      'Click the element that only appears for 2 seconds',
      'Click the correct button from 5 identical-looking buttons',
      'Complete all clicks within 30 seconds'
    ],
    expectedActions: ['click_small_x', 'click_moving', 'click_timed', 'click_identical', 'complete_in_time'],
    points: 35,
    interactionType: 'click-sequence'
  }
];

export const mouseActionsHomeworkConfig = {
  maxPoints: 165,
  passingScore: 70, // 70% = 115.5 points
  allowRetry: true
};