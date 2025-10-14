export interface HomeworkScenarioData {
  title: string;
  icon: string;
  scenarios: string[];
  testId?: string;
}

export const formsHomeworkScenarios: HomeworkScenarioData[] = [
  {
    title: 'Checkbox Testing',
    icon: '☑️',
    testId: 'checkbox-scenario',
    scenarios: [
      'Test individual checkbox toggle',
      'Verify disabled checkboxes cannot be changed',
      'Test multiple checkbox selections',
      'Verify checkbox state persistence',
      'Test checkbox accessibility (labels, focus)'
    ]
  },
  {
    title: 'Radio Button Testing',
    icon: '📻',
    testId: 'radio-scenario',
    scenarios: [
      'Test radio button group exclusivity',
      'Verify default selection',
      'Test disabled radio groups',
      'Verify only one selection per group',
      'Test radio button keyboard navigation'
    ]
  },
  {
    title: 'Dropdown Testing',
    icon: '📋',
    testId: 'select-scenario',
    scenarios: [
      'Test dropdown option selection',
      'Verify disabled options are not selectable',
      'Test default/placeholder behavior',
      'Test keyboard navigation',
      'Verify dropdown value persistence'
    ]
  },
  {
    title: 'Disabled Elements',
    icon: '🚫',
    testId: 'disabled-scenario',
    scenarios: [
      'Verify disabled elements are not interactive',
      'Test conditional enable/disable logic',
      'Verify disabled styling is applied',
      'Test accessibility for disabled elements',
      'Test form submission with disabled fields'
    ]
  },
  {
    title: 'Edge Cases',
    icon: '🧪',
    testId: 'edge-case-scenario',
    scenarios: [
      'Test rapid clicking on elements',
      'Test form state after page refresh',
      'Test elements with JavaScript disabled',
      'Test form validation with disabled elements',
      'Test browser autofill behavior'
    ]
  },
  {
    title: 'Automation Challenges',
    icon: '🤖',
    testId: 'automation-scenario',
    scenarios: [
      'Create test scripts for all element types',
      'Implement wait strategies for dynamic elements',
      'Test element visibility and interaction',
      'Handle element state changes',
      'Verify element attributes and properties'
    ]
  }
];