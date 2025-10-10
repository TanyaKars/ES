import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormsHomework: React.FC = () => {
  const navigate = useNavigate();
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  
  // Challenge 1: Registration form
  const [regForm, setRegForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [regErrors, setRegErrors] = useState<{[key: string]: string}>({});
  
  // Challenge 2: Dynamic form
  const [dynamicFields, setDynamicFields] = useState<{id: number, value: string}[]>([
    { id: 1, value: '' }
  ]);
  
  // Challenge 3: Multi-step form
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState({
    step1: { name: '', email: '' },
    step2: { phone: '', address: '' },
    step3: { preferences: [], newsletter: false }
  });

  const handleRegFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateRegistration = () => {
    const errors: {[key: string]: string} = {};
    
    if (!regForm.username || regForm.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!regForm.email || !/\S+@\S+\.\S+/.test(regForm.email)) {
      errors.email = 'Valid email is required';
    }
    
    if (!regForm.password || regForm.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (regForm.password !== regForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!regForm.terms) {
      errors.terms = 'You must accept the terms and conditions';
    }
    
    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateRegistration()) {
      markChallengeComplete(1);
      alert('Registration successful!');
    }
  };

  const addDynamicField = () => {
    const newId = Math.max(...dynamicFields.map(f => f.id)) + 1;
    setDynamicFields([...dynamicFields, { id: newId, value: '' }]);
  };

  const removeDynamicField = (id: number) => {
    if (dynamicFields.length > 1) {
      setDynamicFields(dynamicFields.filter(f => f.id !== id));
    }
  };

  const updateDynamicField = (id: number, value: string) => {
    setDynamicFields(dynamicFields.map(f => 
      f.id === id ? { ...f, value } : f
    ));
  };

  const handleDynamicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allFilled = dynamicFields.every(f => f.value.trim() !== '');
    if (allFilled && dynamicFields.length >= 3) {
      markChallengeComplete(2);
      alert('Dynamic form submitted successfully!');
    } else {
      alert('Please add at least 3 fields and fill all of them');
    }
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      markChallengeComplete(3);
      alert('Multi-step form completed!');
    }
  };

  const markChallengeComplete = (challengeNumber: number) => {
    if (!completedChallenges.includes(challengeNumber)) {
      setCompletedChallenges([...completedChallenges, challengeNumber]);
    }
  };

  return (
    <div className="homework-page">
      <header className="homework-header">
        <button 
          onClick={() => navigate('/class/forms')} 
          className="btn btn-secondary"
          data-testid="back-to-class"
        >
          ← Back to Forms Class
        </button>
        <h1 data-testid="homework-title">Forms Homework Challenges</h1>
        <div className="progress-indicator">
          Progress: {completedChallenges.length}/3 challenges completed
        </div>
      </header>

      <div className="homework-content">
        <div className="challenges-overview">
          <h2>Your Challenges</h2>
          <div className="challenges-grid">
            <div 
              className={`challenge-card ${completedChallenges.includes(1) ? 'completed' : ''} ${activeChallenge === 1 ? 'active' : ''}`}
              onClick={() => setActiveChallenge(activeChallenge === 1 ? null : 1)}
              data-testid="challenge-1-card"
            >
              <h3>🔥 Challenge 1: Registration Form</h3>
              <p>Complex validation with password confirmation</p>
              {completedChallenges.includes(1) && <span className="completed-badge">✓</span>}
            </div>

            <div 
              className={`challenge-card ${completedChallenges.includes(2) ? 'completed' : ''} ${activeChallenge === 2 ? 'active' : ''}`}
              onClick={() => setActiveChallenge(activeChallenge === 2 ? null : 2)}
              data-testid="challenge-2-card"
            >
              <h3>⚡ Challenge 2: Dynamic Form</h3>
              <p>Add/remove fields dynamically</p>
              {completedChallenges.includes(2) && <span className="completed-badge">✓</span>}
            </div>

            <div 
              className={`challenge-card ${completedChallenges.includes(3) ? 'completed' : ''} ${activeChallenge === 3 ? 'active' : ''}`}
              onClick={() => setActiveChallenge(activeChallenge === 3 ? null : 3)}
              data-testid="challenge-3-card"
            >
              <h3>🚀 Challenge 3: Multi-Step Form</h3>
              <p>Navigate through form steps</p>
              {completedChallenges.includes(3) && <span className="completed-badge">✓</span>}
            </div>
          </div>
        </div>

        {/* Challenge 1: Registration Form */}
        {activeChallenge === 1 && (
          <div className="challenge-section" data-testid="challenge-1">
            <h2>Challenge 1: Registration Form</h2>
            <p>Create a complete registration form with complex validation rules.</p>
            
            <div className="requirements">
              <h4>Requirements to test:</h4>
              <ul>
                <li>Username must be at least 3 characters</li>
                <li>Email format validation</li>
                <li>Password must be at least 8 characters</li>
                <li>Password confirmation must match</li>
                <li>Terms and conditions must be accepted</li>
              </ul>
            </div>

            <form onSubmit={handleRegSubmit} className="challenge-form" data-testid="registration-form">
              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={regForm.username}
                  onChange={handleRegFormChange}
                  className={regErrors.username ? 'input-error' : ''}
                  data-testid="username-input"
                />
                {regErrors.username && <div className="error-message" data-testid="username-error">{regErrors.username}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Email *</label>
                <input
                  type="email"
                  id="reg-email"
                  name="email"
                  value={regForm.email}
                  onChange={handleRegFormChange}
                  className={regErrors.email ? 'input-error' : ''}
                  data-testid="reg-email-input"
                />
                {regErrors.email && <div className="error-message" data-testid="reg-email-error">{regErrors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Password *</label>
                <input
                  type="password"
                  id="reg-password"
                  name="password"
                  value={regForm.password}
                  onChange={handleRegFormChange}
                  className={regErrors.password ? 'input-error' : ''}
                  data-testid="reg-password-input"
                />
                {regErrors.password && <div className="error-message" data-testid="reg-password-error">{regErrors.password}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password *</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={regForm.confirmPassword}
                  onChange={handleRegFormChange}
                  className={regErrors.confirmPassword ? 'input-error' : ''}
                  data-testid="confirm-password-input"
                />
                {regErrors.confirmPassword && <div className="error-message" data-testid="confirm-password-error">{regErrors.confirmPassword}</div>}
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={regForm.terms}
                    onChange={handleRegFormChange}
                    data-testid="terms-checkbox"
                  />
                  I accept the Terms and Conditions *
                </label>
                {regErrors.terms && <div className="error-message" data-testid="terms-error">{regErrors.terms}</div>}
              </div>

              <button type="submit" className="btn btn-primary" data-testid="register-submit">
                Register
              </button>
            </form>
          </div>
        )}

        {/* Challenge 2: Dynamic Form */}
        {activeChallenge === 2 && (
          <div className="challenge-section" data-testid="challenge-2">
            <h2>Challenge 2: Dynamic Form Fields</h2>
            <p>Test a form where you can add and remove fields dynamically.</p>
            
            <div className="requirements">
              <h4>Requirements to test:</h4>
              <ul>
                <li>Add new fields by clicking "Add Field"</li>
                <li>Remove fields (except the first one)</li>
                <li>Submit requires at least 3 fields, all filled</li>
                <li>Each field has a unique identifier</li>
              </ul>
            </div>

            <form onSubmit={handleDynamicSubmit} className="challenge-form" data-testid="dynamic-form">
              <div className="dynamic-fields">
                {dynamicFields.map((field, index) => (
                  <div key={field.id} className="dynamic-field-group" data-testid={`dynamic-field-${field.id}`}>
                    <label htmlFor={`field-${field.id}`}>Field {index + 1}</label>
                    <div className="field-with-controls">
                      <input
                        type="text"
                        id={`field-${field.id}`}
                        value={field.value}
                        onChange={(e) => updateDynamicField(field.id, e.target.value)}
                        placeholder={`Enter value for field ${index + 1}`}
                        data-testid={`dynamic-input-${field.id}`}
                      />
                      {dynamicFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDynamicField(field.id)}
                          className="btn btn-danger btn-small"
                          data-testid={`remove-field-${field.id}`}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={addDynamicField}
                  className="btn btn-secondary"
                  data-testid="add-field-button"
                >
                  Add Field
                </button>
                <button type="submit" className="btn btn-primary" data-testid="dynamic-submit">
                  Submit Dynamic Form
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Challenge 3: Multi-Step Form */}
        {activeChallenge === 3 && (
          <div className="challenge-section" data-testid="challenge-3">
            <h2>Challenge 3: Multi-Step Form</h2>
            <p>Navigate through a multi-step form process.</p>
            
            <div className="step-indicator" data-testid="step-indicator">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
            </div>

            <form onSubmit={handleStepSubmit} className="challenge-form" data-testid="multistep-form">
              {currentStep === 1 && (
                <div className="step-content" data-testid="step-1">
                  <h3>Step 1: Personal Information</h3>
                  <div className="form-group">
                    <label htmlFor="step1-name">Full Name</label>
                    <input
                      type="text"
                      id="step1-name"
                      value={stepData.step1.name}
                      onChange={(e) => setStepData(prev => ({
                        ...prev,
                        step1: { ...prev.step1, name: e.target.value }
                      }))}
                      required
                      data-testid="step1-name-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="step1-email">Email</label>
                    <input
                      type="email"
                      id="step1-email"
                      value={stepData.step1.email}
                      onChange={(e) => setStepData(prev => ({
                        ...prev,
                        step1: { ...prev.step1, email: e.target.value }
                      }))}
                      required
                      data-testid="step1-email-input"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step-content" data-testid="step-2">
                  <h3>Step 2: Contact Information</h3>
                  <div className="form-group">
                    <label htmlFor="step2-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="step2-phone"
                      value={stepData.step2.phone}
                      onChange={(e) => setStepData(prev => ({
                        ...prev,
                        step2: { ...prev.step2, phone: e.target.value }
                      }))}
                      required
                      data-testid="step2-phone-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="step2-address">Address</label>
                    <input
                      type="text"
                      id="step2-address"
                      value={stepData.step2.address}
                      onChange={(e) => setStepData(prev => ({
                        ...prev,
                        step2: { ...prev.step2, address: e.target.value }
                      }))}
                      required
                      data-testid="step2-address-input"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="step-content" data-testid="step-3">
                  <h3>Step 3: Preferences</h3>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={stepData.step3.newsletter}
                        onChange={(e) => setStepData(prev => ({
                          ...prev,
                          step3: { ...prev.step3, newsletter: e.target.checked }
                        }))}
                        data-testid="newsletter-checkbox"
                      />
                      Subscribe to newsletter
                    </label>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="btn btn-secondary"
                    data-testid="prev-step-button"
                  >
                    Previous
                  </button>
                )}
                <button type="submit" className="btn btn-primary" data-testid="next-step-button">
                  {currentStep === 3 ? 'Complete' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        )}

        {completedChallenges.length === 3 && (
          <div className="completion-section" data-testid="completion-section">
            <h2>🎉 Congratulations!</h2>
            <p>You've completed all forms homework challenges!</p>
            <button 
              onClick={() => navigate('/class/form-elements')}
              className="btn btn-primary btn-large"
              data-testid="next-class-button"
            >
              Continue to Next Class: Form Elements →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormsHomework;