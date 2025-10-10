import { CheckboxOption } from '../pages/components/form-elements/CheckboxGroup';
import { RadioOption } from '../pages/components/form-elements/RadioGroup';
import { DropdownConfig } from '../pages/components/form-elements/DropdownGroup';

export const formsHomeworkCheckboxes: CheckboxOption[] = [
  { id: 'option1', label: 'Option 1', testId: 'option1-checkbox', labelTestId: 'option1-label' },
  { id: 'option2', label: 'Option 2 (Pre-selected)', testId: 'option2-checkbox', labelTestId: 'option2-label' },
  { id: 'option3', label: 'Option 3', testId: 'option3-checkbox', labelTestId: 'option3-label' },
  { id: 'disabled', label: 'Disabled Option (Checked)', disabled: true, testId: 'disabled-checkbox', labelTestId: 'disabled-label' }
];

export const formsHomeworkRadioButtons: RadioOption[] = [
  { value: 'small', label: 'Small', testId: 'small-radio', labelTestId: 'small-label' },
  { value: 'medium', label: 'Medium (Selected)', testId: 'medium-radio', labelTestId: 'medium-label' },
  { value: 'large', label: 'Large', testId: 'large-radio', labelTestId: 'large-label' }
];

export const formsHomeworkDropdowns: DropdownConfig[] = [
  {
    id: 'select1',
    label: 'Select Option:',
    placeholder: 'Please select an option',
    testId: 'select-dropdown',
    labelTestId: 'select-label',
    placeholderTestId: 'select-placeholder',
    options: [
      { value: 'option1', label: 'Option 1', testId: 'select-option1' },
      { value: 'option2', label: 'Option 2', testId: 'select-option2' },
      { value: 'option3', label: 'Option 3', testId: 'select-option3' }
    ]
  }
];

// Initial state values for homework
export const formsHomeworkInitialState = {
  checkboxes: {
    option1: false,
    option2: true,
    option3: false,
    disabled: true
  },
  radio: 'medium',
  dropdown: {
    select1: ''
  },
  fields: {
    enabled: '',
    disabled: 'This field is disabled',
    conditional: '',
    enableConditional: false
  }
};