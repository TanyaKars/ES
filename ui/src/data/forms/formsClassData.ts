import { DropdownConfig } from '../../components/form-elements/DropdownGroup';
import { CheckboxOption } from '../../components/form-elements/CheckboxGroup';
import { RadioOption } from '../../components/form-elements/RadioGroup';
import { TextAreaConfig } from '../../components/form-elements/TextAreaGroup';
import { ScenarioConfig } from '../../components/ScenarioCard';

export const formsClassDropdowns: DropdownConfig[] = [
  {
    id: 'dropdown1',
    label: 'Programming Languages:',
    placeholder: 'Choose Language',
    testId: 'dropdown1',
    labelTestId: 'dropdown1-label',
    placeholderTestId: 'dropdown1-placeholder',
    options: [
      { value: 'javascript', label: 'JavaScript', testId: 'dropdown1-javascript' },
      { value: 'python', label: 'Python', testId: 'dropdown1-python' },
      { value: 'java', label: 'Java', testId: 'dropdown1-java' },
      { value: 'csharp', label: 'C#', testId: 'dropdown1-csharp' }
    ]
  },
  {
    id: 'dropdown2',
    label: 'Test Tools:',
    placeholder: 'Choose Tool',
    testId: 'dropdown2',
    labelTestId: 'dropdown2-label',
    placeholderTestId: 'dropdown2-placeholder',
    options: [
      { value: 'selenium', label: 'Selenium', testId: 'dropdown2-selenium' },
      { value: 'cypress', label: 'Cypress', testId: 'dropdown2-cypress' },
      { value: 'playwright', label: 'Playwright', testId: 'dropdown2-playwright' },
      { value: 'testcafe', label: 'TestCafe', testId: 'dropdown2-testcafe' }
    ]
  },
  {
    id: 'dropdown3',
    label: 'Experience Level:',
    placeholder: 'Choose Level',
    testId: 'dropdown3',
    labelTestId: 'dropdown3-label',
    placeholderTestId: 'dropdown3-placeholder',
    options: [
      { value: 'beginner', label: 'Beginner', testId: 'dropdown3-beginner' },
      { value: 'intermediate', label: 'Intermediate', testId: 'dropdown3-intermediate' },
      { value: 'advanced', label: 'Advanced', testId: 'dropdown3-advanced' },
      { value: 'expert', label: 'Expert', testId: 'dropdown3-expert' }
    ]
  }
];

export const formsClassCheckboxes: CheckboxOption[] = [
  { id: 'option1', label: 'Option 1', testId: 'option1-checkbox', labelTestId: 'option1-label' },
  { id: 'option2', label: 'Option 2', testId: 'option2-checkbox', labelTestId: 'option2-label' },
  { id: 'option3', label: 'Option 3', testId: 'option3-checkbox', labelTestId: 'option3-label' },
  { id: 'option4', label: 'Option 4', testId: 'option4-checkbox', labelTestId: 'option4-label' }
];

export const formsClassRadioButtons: RadioOption[] = [
  { value: 'green', label: 'Green', testId: 'green-radio', labelTestId: 'green-label' },
  { value: 'blue', label: 'Blue', testId: 'blue-radio', labelTestId: 'blue-label' },
  { value: 'yellow', label: 'Yellow', testId: 'yellow-radio', labelTestId: 'yellow-label' },
  { value: 'orange', label: 'Orange', testId: 'orange-radio', labelTestId: 'orange-label' },
  { value: 'purple', label: 'Purple', testId: 'purple-radio', labelTestId: 'purple-label' }
];

export const formsClassDisabledCheckboxes: CheckboxOption[] = [
  { id: 'lettuce', label: 'Lettuce (Disabled & Selected)', disabled: true, testId: 'lettuce-checkbox', labelTestId: 'lettuce-label' },
  { id: 'cabbage', label: 'Cabbage', testId: 'cabbage-checkbox', labelTestId: 'cabbage-label' },
  { id: 'pumpkin', label: 'Pumpkin', testId: 'pumpkin-checkbox', labelTestId: 'pumpkin-label' }
];

export const formsClassTextAreas: TextAreaConfig[] = [
  { id: 'message', label: 'Message:', placeholder: 'Enter your message here...', testId: 'message-textarea', labelTestId: 'message-label' },
  { id: 'comments', label: 'Comments:', placeholder: 'Enter your comments here...', testId: 'comments-textarea', labelTestId: 'comments-label' }
];

export const formsClassScenarios: ScenarioConfig[] = [
  {
    id: 'dropdown',
    title: 'Dropdown Testing',
    icon: '📋',
    testId: 'dropdown-scenario',
    items: [
      { text: 'Test dropdown option selection' },
      { text: 'Verify default placeholder values' },
      { text: 'Test multiple dropdown interactions' },
      { text: 'Verify selected values are displayed correctly' }
    ]
  },
  {
    id: 'checkbox',
    title: 'Checkbox Testing',
    icon: '☑️',
    testId: 'checkbox-scenario',
    items: [
      { text: 'Test individual checkbox toggle' },
      { text: 'Test multiple checkbox selections' },
      { text: 'Verify checkbox state persistence' },
      { text: 'Test disabled checkbox behavior' }
    ]
  },
  {
    id: 'radio',
    title: 'Radio Button Testing',
    icon: '📻',
    testId: 'radio-scenario',
    items: [
      { text: 'Test radio button group exclusivity' },
      { text: 'Verify only one selection per group' },
      { text: 'Test radio button deselection' },
      { text: 'Verify color selection updates correctly' }
    ]
  },
  {
    id: 'textarea',
    title: 'Text Area Testing',
    icon: '📝',
    testId: 'textarea-scenario',
    items: [
      { text: 'Test text input and character counting' },
      { text: 'Test placeholder text behavior' },
      { text: 'Test text area resizing (if enabled)' },
      { text: 'Test text area focus and blur events' }
    ]
  },
  {
    id: 'disabled',
    title: 'Disabled Elements',
    icon: '🚫',
    testId: 'disabled-scenario',
    items: [
      { text: 'Verify disabled elements cannot be modified' },
      { text: 'Test pre-selected disabled elements' },
      { text: 'Verify disabled styling is applied' },
      { text: 'Test accessibility for disabled elements' }
    ]
  },
  {
    id: 'combination',
    title: 'Element Combinations',
    icon: '🔄',
    testId: 'combination-scenario',
    items: [
      { text: 'Test form with multiple element selections' },
      { text: 'Verify all element states are tracked' },
      { text: 'Test reset functionality' },
      { text: 'Test complex form validation scenarios' }
    ]
  }
];

// Initial state values
export const formsClassInitialState = {
  dropdowns: {
    dropdown1: '',
    dropdown2: '',
    dropdown3: ''
  },
  checkboxes: {
    option1: false,
    option2: false,
    option3: false,
    option4: false
  },
  radio: '',
  disabledCheckboxes: {
    lettuce: true,
    cabbage: false,
    pumpkin: false
  },
  textAreas: {
    message: '',
    comments: ''
  }
};