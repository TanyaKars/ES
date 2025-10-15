import { DragDropConfig } from '../../components/mouse-actions/DragDropGroup';
import { ClickActionConfig } from '../../components/mouse-actions/ClickActionsGroup';
import { HoverConfig } from '../../components/mouse-actions/HoverGroup';

// Drag and Drop configurations
export const mouseActionsClassDragDrop: DragDropConfig[] = [
  {
    id: 'basic-drag-drop',
    draggableText: 'DRAG ME TO MY TARGET!',
    dropZoneText: 'DROP HERE!',
    successMessage: '✅ Successfully Dropped!',
    draggableTestId: 'draggable-element',
    dropZoneTestId: 'drop-zone',
    statusTestId: 'drag-drop-status'
  }
];

// Click action configurations
export const mouseActionsClassClicks: ClickActionConfig[] = [
  {
    id: 'single-click',
    title: 'Single Click',
    description: 'Test single click functionality',
    buttonText: 'Click Me!',
    actionType: 'single',
    testId: 'single-click-button',
    statusTestId: 'single-click-status'
  },
  {
    id: 'double-click',
    title: 'Double Click',
    description: 'Test double click functionality',
    buttonText: 'Double Click Me!',
    actionType: 'double',
    testId: 'double-click-button',
    statusTestId: 'double-click-status'
  },
  {
    id: 'right-click',
    title: 'Right Click',
    description: 'Test right click (context menu)',
    buttonText: 'Right Click Me!',
    actionType: 'right',
    testId: 'right-click-button',
    statusTestId: 'right-click-status'
  },
  {
    id: 'click-hold',
    title: 'Click and Hold',
    description: 'Test click and hold functionality',
    buttonText: 'Click and Hold!',
    actionType: 'hold',
    testId: 'click-hold-button',
    statusTestId: 'click-hold-status'
  }
];

// Hover configurations
export const mouseActionsClassHovers: HoverConfig[] = [
  {
    id: 'hover-first',
    text: 'Hover Over Me First!',
    hoverText: '🎯 First Element Hovered!',
    testId: 'hover-element-1',
    statusTestId: 'hover-status-1',
    sequence: 1
  },
  {
    id: 'hover-second',
    text: 'Hover Over Me Second!',
    hoverText: '🎯 Second Element Hovered!',
    testId: 'hover-element-2',
    statusTestId: 'hover-status-2',
    sequence: 2
  },
  {
    id: 'hover-third',
    text: 'Hover Over Me Third!',
    hoverText: '🎯 Third Element Hovered!',
    testId: 'hover-element-3',
    statusTestId: 'hover-status-3',
    sequence: 3
  }
];

// Simple hover configurations (no sequence)
export const mouseActionsClassSimpleHovers: HoverConfig[] = [
  {
    id: 'simple-hover-1',
    text: 'Hover to See Magic!',
    hoverText: '✨ Magic Revealed!',
    testId: 'simple-hover-1',
    statusTestId: 'simple-hover-status-1'
  },
  {
    id: 'simple-hover-2',
    text: 'Hover for Surprise!',
    hoverText: '🎉 Surprise!',
    testId: 'simple-hover-2',
    statusTestId: 'simple-hover-status-2'
  }
];

// Initial state for the mouse actions class
export const mouseActionsClassInitialState = {
  dragDropStates: {},
  clickStates: {},
  hoverStates: {},
  sequenceHoverStates: {},
  actionHistory: [] as Array<{
    action: string;
    element: string;
    timestamp: number;
    details?: any;
  }>
};

// Mouse actions scenarios for homework
export const mouseActionsClassScenarios = [
  {
    id: 'drag-drop-scenario',
    title: 'Drag and Drop Challenge',
    description: 'Successfully drag an element to its target zone',
    difficulty: 'Easy',
    instructions: [
      'Click and hold the draggable element',
      'Drag it to the drop zone',
      'Release to drop',
      'Verify success message appears'
    ],
    expectedActions: ['drag_start', 'drag_over', 'drop', 'verify_success'],
    points: 25,
    testId: 'drag-drop-scenario'
  },
  {
    id: 'click-actions-scenario',
    title: 'Click Actions Challenge',
    description: 'Perform all types of click actions',
    difficulty: 'Medium',
    instructions: [
      'Perform single click',
      'Perform double click',
      'Perform right click',
      'Perform click and hold',
      'Verify all actions are registered'
    ],
    expectedActions: ['single_click', 'double_click', 'right_click', 'click_hold', 'verify_all'],
    points: 35,
    testId: 'click-actions-scenario'
  },
  {
    id: 'hover-sequence-scenario',
    title: 'Hover Sequence Challenge',
    description: 'Hover over elements in the correct sequence',
    difficulty: 'Hard',
    instructions: [
      'Hover over the first element',
      'Hover over the second element',
      'Hover over the third element',
      'Complete the sequence correctly',
      'Verify sequence completion'
    ],
    expectedActions: ['hover_first', 'hover_second', 'hover_third', 'verify_sequence'],
    points: 40,
    testId: 'hover-sequence-scenario'
  }
];