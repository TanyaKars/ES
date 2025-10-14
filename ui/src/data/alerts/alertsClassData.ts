import { ScenarioConfig } from '../../components/ScenarioCard';

// Alert button configurations
export interface AlertButtonConfig {
  id: string;
  label: string;
  type: 'alert' | 'confirm' | 'prompt' | 'ajax';
  message: string;
  title: string;
  defaultValue?: string;
  testId: string;
  buttonClass?: string;
  delay?: number;
  openNewTab?: boolean;
}

export const alertButtons: AlertButtonConfig[] = [
  {
    id: 'javascript-alert',
    label: 'CLICK ME!',
    type: 'alert',
    message: 'I am an alert box!',
    title: 'JavaScript Alert',
    testId: 'javascript-alert-button',
    buttonClass: 'btn-primary'
  },
  {
    id: 'javascript-confirm',
    label: 'CLICK ME!',
    type: 'confirm',
    message: 'Press a button!',
    title: 'JavaScript Confirm Box',
    testId: 'javascript-confirm-button',
    buttonClass: 'btn-primary'
  },
  {
    id: 'javascript-prompt',
    label: 'CLICK ME!',
    type: 'prompt',
    message: 'Please enter your name',
    title: 'JavaScript Prompt',
    defaultValue: '',
    testId: 'javascript-prompt-button',
    buttonClass: 'btn-primary'
  },
  {
    id: 'ajax-loader',
    label: 'CLICK ME!',
    type: 'ajax',
    message: 'Well Done For Waiting....!!!',
    title: 'Ajax Loader',
    testId: 'ajax-loader-button',
    buttonClass: 'btn-primary',
    delay: 5000,
    openNewTab: true
  }
];

export const alertsClassScenarios: ScenarioConfig[] = [
  {
    id: 'alert-testing',
    title: 'Alert Testing',
    icon: '🚨',
    testId: 'alert-scenario',
    items: [
      { text: 'Test simple alert() dialog acceptance' },
      { text: 'Verify alert message content is correct' },
      { text: 'Test alert dismissal with OK button' },
      { text: 'Handle alerts with special characters and long text' }
    ]
  },
  {
    id: 'confirm-testing',
    title: 'Confirm Dialog Testing',
    icon: '❓',
    testId: 'confirm-scenario',
    items: [
      { text: 'Test confirm() dialog with OK/Cancel options' },
      { text: 'Verify both positive and negative responses' },
      { text: 'Test confirm dialog message content' },
      { text: 'Handle different confirm dialog scenarios' }
    ]
  },
  {
    id: 'prompt-testing',
    title: 'Prompt Dialog Testing',
    icon: '💬',
    testId: 'prompt-scenario',
    items: [
      { text: 'Test prompt() dialog input handling' },
      { text: 'Verify default values are displayed correctly' },
      { text: 'Test prompt with different input types' },
      { text: 'Handle prompt cancellation vs. input submission' }
    ]
  },
  {
    id: 'ajax-alert-testing',
    title: 'AJAX Alert Testing',
    icon: '🌐',
    testId: 'ajax-alert-scenario',
    items: [
      { text: 'Test delayed alert appearances' },
      { text: 'Handle alerts triggered by AJAX responses' },
      { text: 'Test alert timing and wait strategies' },
      { text: 'Verify AJAX alert content and sequence' }
    ]
  },
  {
    id: 'mixed-alert-testing',
    title: 'Mixed Alert Scenarios',
    icon: '🔄',
    testId: 'mixed-scenario',
    items: [
      { text: 'Test multiple consecutive alerts' },
      { text: 'Handle nested alert scenarios' },
      { text: 'Test alert interruption and recovery' },
      { text: 'Verify alert handling in different contexts' }
    ]
  },
  {
    id: 'advanced-alert-testing',
    title: 'Advanced Alert Automation',
    icon: '🎯',
    testId: 'advanced-scenario',
    items: [
      { text: 'Implement proper wait strategies for alerts' },
      { text: 'Test alert handling across different browsers' },
      { text: 'Handle unexpected alerts gracefully' },
      { text: 'Create robust alert automation patterns' }
    ]
  }
];

// Initial state for alert responses
export const alertsClassInitialState = {
  lastAlertResult: '',
  lastConfirmResult: null as boolean | null,
  lastPromptResult: '',
  alertHistory: [] as Array<{
    type: string;
    message: string;
    result: any;
    timestamp: number;
  }>
};