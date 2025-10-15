import React, { useState } from 'react';
import HomeworkLayout from '../../components/homework/HomeworkLayout';
import HomeworkResults from '../../components/homework/HomeworkResults';
import CallToAction from '../../components/CallToAction.tsx';
import HomeworkScenarioCard from '../../components/alert-elements/HomeworkScenarioCard.tsx';
import InfoCard from '../../components/alert-elements/InfoCard';
import { useAuth } from '../../hooks/useAuth';
import { useHomeworkState } from '../../hooks/useHomeworkState';
import { callToActionConfigs } from '../../data/callToActionData.ts';
import { formsHomeworkScenarios, formsHomeworkConfig } from '../../data/homework/formsHomeworkData.ts';

const FormsHomework: React.FC = () => {
  const { user, isLoading } = useAuth();
  const {
    isStarted,
    showResults,
    completedScenarios,
    totalPoints,
    startHomework,
    submitHomework,
    resetHomework
  } = useHomeworkState({
    maxPoints: 100,
    totalScenarios: formsHomeworkScenarios.length
  });

  // Form states for interactive practice
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: true,
    option3: false,
    disabled: true
  });
  
  const [radioValue, setRadioValue] = useState('medium');
  const [selectValue, setSelectValue] = useState('');
  const [enabledField, setEnabledField] = useState('');
  const [conditionallyDisabled, setConditionallyDisabled] = useState('');
  const [enableConditional, setEnableConditional] = useState(false);

  const handleCheckboxChange = (option: keyof typeof checkboxes) => {
    if (option !== 'disabled') {
      setCheckboxes(prev => ({ ...prev, [option]: !prev[option] }));
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Authentication required</div>;
  }

  return (
    <HomeworkLayout
      user={user}
      title="Forms Homework: Advanced Form Elements Testing"
      description="Practice testing advanced form elements including checkboxes, radio buttons, dropdowns, and disabled elements. Complete all the testing scenarios below to master form element automation."
      backToClassPath="/class/forms"
      backToClassText="← Back to Forms Class"
      completedScenarios={completedScenarios.length}
      totalScenarios={formsHomeworkScenarios.length}
      totalPoints={totalPoints}
      maxPoints={100}
      passingScore={70}
      isStarted={isStarted}
      showResults={showResults}
      onStartHomework={startHomework}
      onSubmitHomework={submitHomework}
      onTryAgain={resetHomework}
    >
      {!isStarted && !showResults && (
        <div className="pre-start-info">
          <h2>Before You Start</h2>
          <div className="cards-grid small">
            <InfoCard 
              title="Passing Score" 
              description={`${formsHomeworkConfig.passingScore}% (${(formsHomeworkConfig.maxPoints * formsHomeworkConfig.passingScore / 100)} points)`} 
            />
            <InfoCard 
              title="Retry Policy" 
              description={formsHomeworkConfig.allowRetry ? 'Unlimited retries allowed' : 'One attempt only'} 
            />
          </div>
        </div>
      )}

      {isStarted && !showResults && (
        <>
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
                  <option value="">-- Please choose a country --</option>
                  <option value="usa">United States</option>
                  <option value="canada">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="germany">Germany</option>
                  <option value="france">France</option>
                </select>
              </div>
              
              <div className="element-status" data-testid="select-status">
                <p>Selected country: {selectValue || 'None'}</p>
              </div>
            </div>

            {/* Text Input Section */}
            <div className="element-group">
              <h3>Text Inputs</h3>
              <div className="form-group">
                <label htmlFor="enabled-input" data-testid="enabled-label">
                  Enabled Input:
                </label>
                <input
                  type="text"
                  id="enabled-input"
                  value={enabledField}
                  onChange={(e) => setEnabledField(e.target.value)}
                  placeholder="Type something here"
                  data-testid="enabled-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="disabled-input" data-testid="disabled-label">
                  Disabled Input:
                </label>
                <input
                  type="text"
                  id="disabled-input"
                  value="This field is disabled"
                  disabled
                  data-testid="disabled-input"
                />
              </div>
              
              <div className="form-group">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="enable-conditional-checkbox"
                    checked={enableConditional}
                    onChange={(e) => setEnableConditional(e.target.checked)}
                    data-testid="enable-conditional-checkbox"
                  />
                  <label htmlFor="enable-conditional-checkbox" data-testid="enable-conditional-label">
                    Enable the field below
                  </label>
                </div>
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
                className="homework-btn secondary"
                data-testid="reset-button"
              >
                Reset All Elements
              </button>
            </div>
          </div>
        </>
      )}

      {showResults && (
        <HomeworkResults
          completedScenarios={completedScenarios.length}
          totalScenarios={formsHomeworkScenarios.length}
          totalPoints={totalPoints}
          maxPoints={100}
        />
      )}

      <CallToAction {...callToActionConfigs.formsComplete} />
    </HomeworkLayout>
  );
};

export default FormsHomework;
