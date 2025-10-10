import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.tsx';
import NavigationBar from '../components/NavigationBar.tsx';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

const FormsHomework: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  // Checkbox states
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: true,
    option3: false,
    disabled: true
  });
  
  // Radio button state
  const [radioValue, setRadioValue] = useState('medium');
  const [disabledRadio] = useState('default');
  
  // Select dropdown state
  const [selectValue, setSelectValue] = useState('');
  
  // Disabled field states
  const [enabledField, setEnabledField] = useState('');
  const [disabledField] = useState('This field is disabled');
  const [conditionallyDisabled, setConditionallyDisabled] = useState('');
  const [enableConditional, setEnableConditional] = useState(false);

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

  const handleCheckboxChange = (name: string) => {
    if (name !== 'disabled') { // Can't change disabled checkbox
      setCheckboxes(prev => ({
        ...prev,
        [name]: !prev[name as keyof typeof prev]
      }));
    }
  };

  const handleRadioChange = (value: string) => {
    setRadioValue(value);
  };

  const resetAllElements = () => {
    setCheckboxes({ option1: false, option2: true, option3: false, disabled: true });
    setRadioValue('medium');
    setSelectValue('');
    setEnabledField('');
    setConditionallyDisabled('');
    setEnableConditional(false);
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homework-page">
      <Header user={user} title="Forms Homework: Advanced Form Elements Testing" />
      
      <NavigationBar 
        buttons={[
          {
            text: "← Back to Forms Class",
            onClick: () => navigate('/class/forms'),
            testId: "back-to-class"
          },
          {
            text: "← Back to Dashboard",
            onClick: () => navigate('/dashboard'),
            testId: "back-to-dashboard"
          }
        ]}
      />

      <div className="homework-content">
        <div className="challenges-overview">
          <h2>Your Assignment</h2>
          <p>Practice testing advanced form elements including checkboxes, radio buttons, dropdowns, and disabled elements. Complete all the testing scenarios below to master form element automation.</p>
        </div>

        <div className="practice-section">
          <h2>Interactive Form Elements - Test All Scenarios</h2>
          
          {/* Checkbox Section */}
          <div className="element-group">
            <h3>Checkboxes</h3>
            <div className="checkbox-group" data-testid="checkbox-group">
              <label className="checkbox-label" data-testid="checkbox-1-label">
                <input
                  type="checkbox"
                  checked={checkboxes.option1}
                  onChange={() => handleCheckboxChange('option1')}
                  data-testid="checkbox-1"
                />
                Option 1 (Initially unchecked)
              </label>
              
              <label className="checkbox-label" data-testid="checkbox-2-label">
                <input
                  type="checkbox"
                  checked={checkboxes.option2}
                  onChange={() => handleCheckboxChange('option2')}
                  data-testid="checkbox-2"
                />
                Option 2 (Initially checked)
              </label>
              
              <label className="checkbox-label" data-testid="checkbox-3-label">
                <input
                  type="checkbox"
                  checked={checkboxes.option3}
                  onChange={() => handleCheckboxChange('option3')}
                  data-testid="checkbox-3"
                />
                Option 3 (Initially unchecked)
              </label>
              
              <label className="checkbox-label disabled" data-testid="checkbox-disabled-label">
                <input
                  type="checkbox"
                  checked={checkboxes.disabled}
                  disabled
                  data-testid="checkbox-disabled"
                />
                Disabled Option (Cannot be changed)
              </label>
            </div>
            
            <div className="element-status" data-testid="checkbox-status">
              <p>Selected options: {Object.entries(checkboxes)
                .filter(([key, value]) => value && key !== 'disabled')
                .map(([key]) => key)
                .join(', ') || 'None'}</p>
            </div>
          </div>

          {/* Radio Button Section */}
          <div className="element-group">
            <h3>Radio Buttons</h3>
            <div className="radio-group" data-testid="radio-group">
              <label className="radio-label" data-testid="radio-small-label">
                <input
                  type="radio"
                  name="size"
                  value="small"
                  checked={radioValue === 'small'}
                  onChange={() => handleRadioChange('small')}
                  data-testid="radio-small"
                />
                Small
              </label>
              
              <label className="radio-label" data-testid="radio-medium-label">
                <input
                  type="radio"
                  name="size"
                  value="medium"
                  checked={radioValue === 'medium'}
                  onChange={() => handleRadioChange('medium')}
                  data-testid="radio-medium"
                />
                Medium (Default selected)
              </label>
              
              <label className="radio-label" data-testid="radio-large-label">
                <input
                  type="radio"
                  name="size"
                  value="large"
                  checked={radioValue === 'large'}
                  onChange={() => handleRadioChange('large')}
                  data-testid="radio-large"
                />
                Large
              </label>
            </div>
            
            <div className="element-status" data-testid="radio-status">
              <p>Selected size: {radioValue}</p>
            </div>

            {/* Disabled Radio Group */}
            <h4>Disabled Radio Group</h4>
            <div className="radio-group disabled" data-testid="disabled-radio-group">
              <label className="radio-label disabled">
                <input
                  type="radio"
                  name="disabledGroup"
                  value="option1"
                  checked={disabledRadio === 'option1'}
                  disabled
                  data-testid="disabled-radio-1"
                />
                Disabled Option 1
              </label>
              
              <label className="radio-label disabled">
                <input
                  type="radio"
                  name="disabledGroup"
                  value="default"
                  checked={disabledRadio === 'default'}
                  disabled
                  data-testid="disabled-radio-2"
                />
                Disabled Option 2 (Selected)
              </label>
            </div>
          </div>

          {/* Select Dropdown Section */}
          <div className="element-group">
            <h3>Select Dropdown</h3>
            <div className="select-group">
              <label htmlFor="country-select" data-testid="select-label">Choose a country:</label>
              <select
                id="country-select"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                data-testid="country-select"
              >
                <option value="" data-testid="select-placeholder">-- Please choose an option --</option>
                <option value="us" data-testid="select-us">United States</option>
                <option value="ca" data-testid="select-ca">Canada</option>
                <option value="uk" data-testid="select-uk">United Kingdom</option>
                <option value="au" data-testid="select-au">Australia</option>
                <option value="disabled" disabled data-testid="select-disabled">Disabled Option</option>
              </select>
            </div>
            
            <div className="element-status" data-testid="select-status">
              <p>Selected country: {selectValue || 'None selected'}</p>
            </div>
          </div>

          {/* Disabled Elements Section */}
          <div className="element-group">
            <h3>Disabled Elements</h3>
            
            <div className="form-group">
              <label htmlFor="enabled-input" data-testid="enabled-label">Enabled Input:</label>
              <input
                type="text"
                id="enabled-input"
                value={enabledField}
                onChange={(e) => setEnabledField(e.target.value)}
                placeholder="You can type here"
                data-testid="enabled-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="disabled-input" data-testid="disabled-label">Disabled Input:</label>
              <input
                type="text"
                id="disabled-input"
                value={disabledField}
                disabled
                data-testid="disabled-input"
              />
            </div>
            
            <div className="form-group">
              <label className="checkbox-label" data-testid="enable-conditional-label">
                <input
                  type="checkbox"
                  checked={enableConditional}
                  onChange={(e) => setEnableConditional(e.target.checked)}
                  data-testid="enable-conditional-checkbox"
                />
                Enable the field below
              </label>
            </div>
            
            <div className="form-group">
              <label htmlFor="conditional-input" data-testid="conditional-label">
                Conditionally Disabled Input:
              </label>
              <input
                type="text"
                id="conditional-input"
                value={conditionallyDisabled}
                onChange={(e) => setConditionallyDisabled(e.target.value)}
                disabled={!enableConditional}
                placeholder={enableConditional ? "Now you can type!" : "Check the box above to enable"}
                data-testid="conditional-input"
              />
            </div>
          </div>

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

        <div className="testing-scenarios">
          <h2>Homework Testing Scenarios</h2>
          <div className="scenarios-grid">
            <div className="scenario-card" data-testid="checkbox-scenario">
              <h4>☑️ Checkbox Testing</h4>
              <ul>
                <li>Test individual checkbox toggle</li>
                <li>Verify disabled checkboxes cannot be changed</li>
                <li>Test multiple checkbox selections</li>
                <li>Verify checkbox state persistence</li>
                <li>Test checkbox accessibility (labels, focus)</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="radio-scenario">
              <h4>📻 Radio Button Testing</h4>
              <ul>
                <li>Test radio button group exclusivity</li>
                <li>Verify default selection</li>
                <li>Test disabled radio groups</li>
                <li>Verify only one selection per group</li>
                <li>Test radio button keyboard navigation</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="select-scenario">
              <h4>📋 Dropdown Testing</h4>
              <ul>
                <li>Test dropdown option selection</li>
                <li>Verify disabled options are not selectable</li>
                <li>Test default/placeholder behavior</li>
                <li>Test keyboard navigation</li>
                <li>Verify dropdown value persistence</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="disabled-scenario">
              <h4>🚫 Disabled Elements</h4>
              <ul>
                <li>Verify disabled elements are not interactive</li>
                <li>Test conditional enable/disable logic</li>
                <li>Verify disabled styling is applied</li>
                <li>Test accessibility for disabled elements</li>
                <li>Test form submission with disabled fields</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="edge-case-scenario">
              <h4>🧪 Edge Cases</h4>
              <ul>
                <li>Test rapid clicking on elements</li>
                <li>Test form state after page refresh</li>
                <li>Test elements with JavaScript disabled</li>
                <li>Test form validation with disabled elements</li>
                <li>Test browser autofill behavior</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="automation-scenario">
              <h4>🤖 Automation Challenges</h4>
              <ul>
                <li>Create test scripts for all element types</li>
                <li>Implement wait strategies for dynamic elements</li>
                <li>Test element visibility and interaction</li>
                <li>Handle element state changes</li>
                <li>Verify element attributes and properties</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="completion-section" data-testid="completion-section">
          <h2>🎯 Assignment Complete!</h2>
          <p>Great work! You've mastered form elements testing. Ready for the next challenge?</p>
          <button 
            onClick={() => navigate('/class/iframes')}
            className="btn btn-primary btn-large"
            data-testid="next-class-button"
          >
            Continue to Next Class: iFrames →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormsHomework;