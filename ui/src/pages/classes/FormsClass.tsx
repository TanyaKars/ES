import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header.tsx';
import NavigationBar from '../../components/NavigationBar.tsx';
import DropdownGroup from '../../components/form-elements/DropdownGroup.tsx';
import CheckboxGroup from '../../components/form-elements/CheckboxGroup.tsx';
import RadioGroup from '../../components/form-elements/RadioGroup.tsx';
import TextAreaGroup from '../../components/form-elements/TextAreaGroup.tsx';
import CallToAction from '../../components/CallToAction.tsx';
import {
  formsClassDropdowns,
  formsClassCheckboxes,
  formsClassRadioButtons,
  formsClassDisabledCheckboxes,
  formsClassTextAreas,
  formsClassScenarios,
  formsClassInitialState
} from '../../data/forms/formsClassData';
import { callToActionConfigs } from '../../data/callToActionData.ts';

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
  };

  const handleCheckboxChange = (id: string) => {
    setCheckboxValues(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  };

  const handleDisabledCheckboxChange = (id: string) => {
    if (id !== 'lettuce') { // Lettuce is disabled
      setDisabledCheckboxValues(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
    }
  };

  const handleTextAreaChange = (id: string, value: string) => {
    setTextAreaValues(prev => ({ ...prev, [id]: value }));
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
            onChange={setRadioValue}
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

        <CallToAction {...callToActionConfigs.formsHomework} />
      </div>
    </div>
  );
};

export default FormsClass;