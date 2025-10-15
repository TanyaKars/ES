import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header.tsx';
import NavigationBar from '../../components/NavigationBar.tsx';
import DropdownGroup from '../../components/form-elements/DropdownGroup.tsx';
import CheckboxGroup from '../../components/form-elements/CheckboxGroup.tsx';
import RadioGroup from '../../components/form-elements/RadioGroup.tsx';
import TextAreaGroup from '../../components/form-elements/TextAreaGroup.tsx';
import InteractionHistory, { InteractionHistoryEntry } from '../../components/shared/InteractionHistory.tsx';
import CallToAction from '../../components/CallToAction.tsx';
import {
  formsClassDropdowns,
  formsClassCheckboxes,
  formsClassRadioButtons,
  formsClassDisabledCheckboxes,
  formsClassTextAreas,
  formsClassInitialState
} from '../../data/forms/formsClassData';
import { callToActionConfigs } from '../../data/callToActionData.ts';
import '../../styles/components/InteractionHistory.css';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

const FormsClass: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  // State based on configuration
  const [dropdownValues, setDropdownValues] = useState(formsClassInitialState.dropdowns);
  const [checkboxValues, setCheckboxValues] = useState(formsClassInitialState.checkboxes);
  const [radioValue, setRadioValue] = useState(formsClassInitialState.radio);
  const [disabledCheckboxValues, setDisabledCheckboxValues] = useState(formsClassInitialState.disabledCheckboxes);
  const [textAreaValues, setTextAreaValues] = useState(formsClassInitialState.textAreas);
  
  // Interaction history tracking
  const [interactionHistory, setInteractionHistory] = useState<InteractionHistoryEntry[]>([]);

  // Helper function to add interaction to history
  const addToHistory = (type: string, action: string, element?: string, result?: any) => {
    setInteractionHistory(prev => [
      ...prev,
      {
        type,
        action,
        element,
        result,
        timestamp: Date.now(),
        details: result
      }
    ]);
  };

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  // Handler functions
  const handleDropdownChange = (id: string, value: string) => {
    setDropdownValues(prev => ({ ...prev, [id]: value }));
    addToHistory('form', 'dropdown selection', `${id} dropdown`, value);
  };

  const handleCheckboxChange = (id: string) => {
    const newValue = !checkboxValues[id as keyof typeof checkboxValues];
    setCheckboxValues(prev => ({ ...prev, [id]: newValue }));
    addToHistory('form', 'checkbox toggle', `${id} checkbox`, newValue ? 'checked' : 'unchecked');
  };

  const handleDisabledCheckboxChange = (id: string) => {
    if (id !== 'lettuce') { // Lettuce is disabled
      const newValue = !disabledCheckboxValues[id as keyof typeof disabledCheckboxValues];
      setDisabledCheckboxValues(prev => ({ ...prev, [id]: newValue }));
      addToHistory('form', 'checkbox toggle', `${id} checkbox`, newValue ? 'checked' : 'unchecked');
    } else {
      addToHistory('form', 'interaction blocked', `${id} checkbox`, 'disabled element');
    }
  };

  const handleTextAreaChange = (id: string, value: string) => {
    setTextAreaValues(prev => ({ ...prev, [id]: value }));
    addToHistory('form', 'text input', `${id} textarea`, `${value.length} characters`);
  };

  const handleRadioChange = (value: string) => {
    setRadioValue(value);
    addToHistory('form', 'radio selection', 'age group radio', value);
  };

  const handleTextAreaChangeWithAutoExpand = (e: React.ChangeEvent<HTMLTextAreaElement>, setter: (value: string) => void) => {
    const textarea = e.target;
    setter(textarea.value);
    
    // Auto-expand functionality
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const resetAllElements = () => {
    setDropdownValues(formsClassInitialState.dropdowns);
    setCheckboxValues(formsClassInitialState.checkboxes);
    setRadioValue(formsClassInitialState.radio);
    setDisabledCheckboxValues(formsClassInitialState.disabledCheckboxes);
    setTextAreaValues(formsClassInitialState.textAreas);
    addToHistory('form', 'reset', 'all form elements', 'form reset to initial state');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="class-page">
      <Header user={user} title="Class 1: Dropdown Menu, Checkbox & Radio Button" />
      
      <NavigationBar 
        buttons={[
          {
            text: "← Back to Dashboard",
            onClick: () => navigate('/dashboard'),
            testId: "back-to-dashboard"
          }
        ]}
      />

      <div className="class-content">
         <div className="class-intro">
          <h2>Interactive Form Elements</h2>
          <p>
            Learn to work with most common page elements such as dropdown menus, checkboxes, radio buttons, and text areas.
          </p>
        </div>
        <div className="practice-section">          
          <DropdownGroup
            title="Dropdown Menu(s)"
            dropdowns={formsClassDropdowns}
            values={dropdownValues}
            onChange={handleDropdownChange}
            statusTestId="dropdown-status"
          />

          <CheckboxGroup
            title="Checkboxe(s)"
            options={formsClassCheckboxes}
            values={checkboxValues}
            onChange={handleCheckboxChange}
            containerTestId="checkbox-group"
            statusTestId="checkbox-status"
          />

          <RadioGroup
            title="Radio Button(s)"
            name="color"
            options={formsClassRadioButtons}
            value={radioValue}
            onChange={handleRadioChange}
            containerTestId="radio-group"
            statusTestId="radio-status"
            statusLabel="Selected color"
          />

          <CheckboxGroup
            title="Selected & Disabled"
            options={formsClassDisabledCheckboxes}
            values={disabledCheckboxValues}
            onChange={handleDisabledCheckboxChange}
            containerTestId="disabled-group"
            statusTestId="disabled-status"
            statusLabel="Selected vegetables"
          />

          <TextAreaGroup
            title="Text Area(s)"
            textAreas={formsClassTextAreas}
            values={textAreaValues}
            onChange={handleTextAreaChange}
            statusTestId="textarea-status"
            onTextAreaChange={handleTextAreaChangeWithAutoExpand}
          />

          <div className="form-actions">
            <button
              type="button"
              onClick={resetAllElements}
              className="btn btn-secondary"
              data-testid="reset-button"
            >
              Reset All Elements
            </button>
          </div>
        </div>

        <InteractionHistory 
          history={interactionHistory}
          title="Forms Interaction History"
          maxEntries={10}
        />

        <CallToAction {...callToActionConfigs.formsHomework} />
      </div>
    </div>
  );
};

export default FormsClass;