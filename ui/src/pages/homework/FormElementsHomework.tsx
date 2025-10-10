import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormElementsHomework: React.FC = () => {
  const navigate = useNavigate();
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  
  // Challenge 1: Complex checkbox form
  const [surveyData, setSurveyData] = useState({
    languages: [] as string[],
    experience: '',
    availability: [] as string[],
    newsletter: false,
    terms: false
  });
  
  // Challenge 2: Radio button quiz
  const [quizAnswers, setQuizAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });
  
  // Challenge 3: Dynamic conditional form
  const [userType, setUserType] = useState('');
  const [conditionalData, setConditionalData] = useState({
    student: { school: '', year: '', major: '' },
    professional: { company: '', position: '', experience: '' },
    other: { description: '' }
  });

  const handleSurveyCheckbox = (category: 'languages' | 'availability', value: string) => {
    setSurveyData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = surveyData.languages.length >= 2 && 
                   surveyData.experience && 
                   surveyData.availability.length >= 1 && 
                   surveyData.terms;
    
    if (isValid) {
      markChallengeComplete(1);
      alert('Survey submitted successfully!');
    } else {
      alert('Please complete all required fields: Select at least 2 languages, choose experience level, select availability, and accept terms.');
    }
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allAnswered = Object.values(quizAnswers).every(answer => answer !== '');
    if (allAnswered) {
      const correctAnswers = {
        question1: 'radio',
        question2: 'multiple',
        question3: 'false'
      };
      
      const score = Object.entries(quizAnswers).reduce((acc, [key, value]) => {
        return acc + (value === correctAnswers[key as keyof typeof correctAnswers] ? 1 : 0);
      }, 0);
      
      alert(`Quiz completed! Score: ${score}/3`);
      markChallengeComplete(2);
    } else {
      alert('Please answer all questions');
    }
  };

  const handleUserTypeChange = (type: string) => {
    setUserType(type);
    // Reset conditional data when user type changes
    setConditionalData({
      student: { school: '', year: '', major: '' },
      professional: { company: '', position: '', experience: '' },
      other: { description: '' }
    });
  };

  const handleConditionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userType) {
      alert('Please select a user type');
      return;
    }
    
    const currentData = conditionalData[userType as keyof typeof conditionalData];
    const isValid = Object.values(currentData).every(value => value !== '');
    
    if (isValid) {
      markChallengeComplete(3);
      alert('Conditional form submitted successfully!');
    } else {
      alert('Please fill all fields for the selected user type');
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
          onClick={() => navigate('/class/form-elements')} 
          className="btn btn-secondary"
          data-testid="back-to-class"
        >
          ← Back to Form Elements Class
        </button>
        <h1 data-testid="homework-title">Form Elements Homework</h1>
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
              <h3>📋 Challenge 1: Survey Form</h3>
              <p>Complex checkbox and radio combinations</p>
              {completedChallenges.includes(1) && <span className="completed-badge">✓</span>}
            </div>

            <div 
              className={`challenge-card ${completedChallenges.includes(2) ? 'completed' : ''} ${activeChallenge === 2 ? 'active' : ''}`}
              onClick={() => setActiveChallenge(activeChallenge === 2 ? null : 2)}
              data-testid="challenge-2-card"
            >
              <h3>🧠 Challenge 2: Knowledge Quiz</h3>
              <p>Radio button quiz with validation</p>
              {completedChallenges.includes(2) && <span className="completed-badge">✓</span>}
            </div>

            <div 
              className={`challenge-card ${completedChallenges.includes(3) ? 'completed' : ''} ${activeChallenge === 3 ? 'active' : ''}`}
              onClick={() => setActiveChallenge(activeChallenge === 3 ? null : 3)}
              data-testid="challenge-3-card"
            >
              <h3>🔄 Challenge 3: Conditional Form</h3>
              <p>Dynamic form based on selections</p>
              {completedChallenges.includes(3) && <span className="completed-badge">✓</span>}
            </div>
          </div>
        </div>

        {/* Challenge 1: Survey Form */}
        {activeChallenge === 1 && (
          <div className="challenge-section" data-testid="challenge-1">
            <h2>Challenge 1: Developer Survey Form</h2>
            <p>Complete this survey using various form elements with complex validation rules.</p>
            
            <div className="requirements">
              <h4>Requirements to test:</h4>
              <ul>
                <li>Select at least 2 programming languages</li>
                <li>Choose your experience level</li>
                <li>Select at least 1 availability option</li>
                <li>Accept terms and conditions</li>
              </ul>
            </div>

            <form onSubmit={handleSurveySubmit} className="challenge-form" data-testid="survey-form">
              <div className="form-group">
                <h4>Programming Languages (Select at least 2):</h4>
                <div className="checkbox-group">
                  {['JavaScript', 'Python', 'Java', 'C#', 'TypeScript', 'Go'].map(lang => (
                    <label key={lang} className="checkbox-label" data-testid={`lang-${lang.toLowerCase()}-label`}>
                      <input
                        type="checkbox"
                        checked={surveyData.languages.includes(lang)}
                        onChange={() => handleSurveyCheckbox('languages', lang)}
                        data-testid={`lang-${lang.toLowerCase()}-checkbox`}
                      />
                      {lang}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <h4>Experience Level:</h4>
                <div className="radio-group">
                  {['Beginner (0-1 years)', 'Intermediate (2-5 years)', 'Advanced (5+ years)'].map(level => (
                    <label key={level} className="radio-label" data-testid={`exp-${level.split('(')[0].trim().toLowerCase()}-label`}>
                      <input
                        type="radio"
                        name="experience"
                        value={level}
                        checked={surveyData.experience === level}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, experience: e.target.value }))}
                        data-testid={`exp-${level.split('(')[0].trim().toLowerCase()}-radio`}
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <h4>Availability (Select all that apply):</h4>
                <div className="checkbox-group">
                  {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(avail => (
                    <label key={avail} className="checkbox-label" data-testid={`avail-${avail.toLowerCase()}-label`}>
                      <input
                        type="checkbox"
                        checked={surveyData.availability.includes(avail)}
                        onChange={() => handleSurveyCheckbox('availability', avail)}
                        data-testid={`avail-${avail.toLowerCase()}-checkbox`}
                      />
                      {avail}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label" data-testid="newsletter-label">
                  <input
                    type="checkbox"
                    checked={surveyData.newsletter}
                    onChange={(e) => setSurveyData(prev => ({ ...prev, newsletter: e.target.checked }))}
                    data-testid="newsletter-checkbox"
                  />
                  Subscribe to newsletter (optional)
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label" data-testid="terms-label">
                  <input
                    type="checkbox"
                    checked={surveyData.terms}
                    onChange={(e) => setSurveyData(prev => ({ ...prev, terms: e.target.checked }))}
                    data-testid="terms-checkbox"
                  />
                  I accept the terms and conditions *
                </label>
              </div>

              <button type="submit" className="btn btn-primary" data-testid="survey-submit">
                Submit Survey
              </button>
            </form>
          </div>
        )}

        {/* Challenge 2: Quiz */}
        {activeChallenge === 2 && (
          <div className="challenge-section" data-testid="challenge-2">
            <h2>Challenge 2: Form Elements Knowledge Quiz</h2>
            <p>Test your knowledge about form elements by answering these questions.</p>
            
            <form onSubmit={handleQuizSubmit} className="challenge-form" data-testid="quiz-form">
              <div className="form-group">
                <h4>Question 1: Which form element allows only one selection from a group?</h4>
                <div className="radio-group">
                  <label className="radio-label" data-testid="q1-checkbox-label">
                    <input
                      type="radio"
                      name="question1"
                      value="checkbox"
                      checked={quizAnswers.question1 === 'checkbox'}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, question1: e.target.value }))}
                      data-testid="q1-checkbox-radio"
                    />
                    Checkbox
                  </label>
                  <label className="radio-label" data-testid="q1-radio-label">
                    <input
                      type="radio"
                      name="question1"
                      value="radio"
                      checked={quizAnswers.question1 === 'radio'}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, question1: e.target.value }))}
                      data-testid="q1-radio-radio"
                    />
                    Radio Button
                  </label>
                  <label className="radio-label" data-testid="q1-select-label">
                    <input
                      type="radio"
                      name="question1"
                      value="select"
                      checked={quizAnswers.question1 === 'select'}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, question1: e.target.value }))}
                      data-testid="q1-select-radio"
                    />
                    Select Dropdown
                  </label>
                </div>
              </div>

              <div className="form-group">
                <h4>Question 2: Which form element allows multiple selections?</h4>
                <div className="radio-group">
                  <label className="radio-label" data-testid="q2-single-label">
                    <input
                      type="radio"
                      name="question2"
                      value="single"
                      checked={quizAnswers.question2 === 'single'}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, question2: e.target.value }))}
                      data-testid="q2-single-radio"
                    />
                    Radio buttons
                  </label>
                  <label className="radio-label" data-testid="q2-multiple-label">
                    <input
                      type="radio"
                      name="question2"
                      value="multiple"
                      checked={quizAnswers.question2 === 'multiple'}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, question2: e.target.value }))}
                      data-testid="q2-multiple-radio"
                    />
                    Checkboxes
                  </label>
                  <label className="radio-label" data-testid="q2-text-label">
                    <input
                      type="radio"
                      name="question2"
                      value="text"
                      checked={quizAnswers.question2 === 'text'}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, question2: e.target.value }))}
                      data-testid="q2-text-radio"
                    />
                    Text inputs
                  </label>
                </div>
              </div>

              <div className="form-group">
                <h4>Question 3: Can disabled form elements be modified by users?</h4>
                <div className="radio-group">
                  <label className="radio-label" data-testid="q3-true-label">
                    <input
                      type="radio"
                      name="question3"
                      value="true"
                      checked={quizAnswers.question3 === 'true'}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, question3: e.target.value }))}
                      data-testid="q3-true-radio"
                    />
                    True
                  </label>
                  <label className="radio-label" data-testid="q3-false-label">
                    <input
                      type="radio"
                      name="question3"
                      value="false"
                      checked={quizAnswers.question3 === 'false'}
                      onChange={(e) => setQuizAnswers(prev => ({ ...prev, question3: e.target.value }))}
                      data-testid="q3-false-radio"
                    />
                    False
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" data-testid="quiz-submit">
                Submit Quiz
              </button>
            </form>
          </div>
        )}

        {/* Challenge 3: Conditional Form */}
        {activeChallenge === 3 && (
          <div className="challenge-section" data-testid="challenge-3">
            <h2>Challenge 3: Conditional Registration Form</h2>
            <p>Form fields change based on user type selection - test dynamic form behavior.</p>
            
            <form onSubmit={handleConditionalSubmit} className="challenge-form" data-testid="conditional-form">
              <div className="form-group">
                <h4>I am a:</h4>
                <div className="radio-group">
                  <label className="radio-label" data-testid="usertype-student-label">
                    <input
                      type="radio"
                      name="userType"
                      value="student"
                      checked={userType === 'student'}
                      onChange={(e) => handleUserTypeChange(e.target.value)}
                      data-testid="usertype-student-radio"
                    />
                    Student
                  </label>
                  <label className="radio-label" data-testid="usertype-professional-label">
                    <input
                      type="radio"
                      name="userType"
                      value="professional"
                      checked={userType === 'professional'}
                      onChange={(e) => handleUserTypeChange(e.target.value)}
                      data-testid="usertype-professional-radio"
                    />
                    Professional
                  </label>
                  <label className="radio-label" data-testid="usertype-other-label">
                    <input
                      type="radio"
                      name="userType"
                      value="other"
                      checked={userType === 'other'}
                      onChange={(e) => handleUserTypeChange(e.target.value)}
                      data-testid="usertype-other-radio"
                    />
                    Other
                  </label>
                </div>
              </div>

              {userType === 'student' && (
                <div className="conditional-section" data-testid="student-section">
                  <h4>Student Information:</h4>
                  <div className="form-group">
                    <label htmlFor="school">School/University:</label>
                    <input
                      type="text"
                      id="school"
                      value={conditionalData.student.school}
                      onChange={(e) => setConditionalData(prev => ({
                        ...prev,
                        student: { ...prev.student, school: e.target.value }
                      }))}
                      data-testid="school-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="year">Year of Study:</label>
                    <select
                      id="year"
                      value={conditionalData.student.year}
                      onChange={(e) => setConditionalData(prev => ({
                        ...prev,
                        student: { ...prev.student, year: e.target.value }
                      }))}
                      data-testid="year-select"
                    >
                      <option value="">Select year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="major">Major:</label>
                    <input
                      type="text"
                      id="major"
                      value={conditionalData.student.major}
                      onChange={(e) => setConditionalData(prev => ({
                        ...prev,
                        student: { ...prev.student, major: e.target.value }
                      }))}
                      data-testid="major-input"
                    />
                  </div>
                </div>
              )}

              {userType === 'professional' && (
                <div className="conditional-section" data-testid="professional-section">
                  <h4>Professional Information:</h4>
                  <div className="form-group">
                    <label htmlFor="company">Company:</label>
                    <input
                      type="text"
                      id="company"
                      value={conditionalData.professional.company}
                      onChange={(e) => setConditionalData(prev => ({
                        ...prev,
                        professional: { ...prev.professional, company: e.target.value }
                      }))}
                      data-testid="company-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="position">Position:</label>
                    <input
                      type="text"
                      id="position"
                      value={conditionalData.professional.position}
                      onChange={(e) => setConditionalData(prev => ({
                        ...prev,
                        professional: { ...prev.professional, position: e.target.value }
                      }))}
                      data-testid="position-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="experience">Years of Experience:</label>
                    <select
                      id="experience"
                      value={conditionalData.professional.experience}
                      onChange={(e) => setConditionalData(prev => ({
                        ...prev,
                        professional: { ...prev.professional, experience: e.target.value }
                      }))}
                      data-testid="experience-select"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>
              )}

              {userType === 'other' && (
                <div className="conditional-section" data-testid="other-section">
                  <h4>Additional Information:</h4>
                  <div className="form-group">
                    <label htmlFor="description">Please describe yourself:</label>
                    <textarea
                      id="description"
                      value={conditionalData.other.description}
                      onChange={(e) => setConditionalData(prev => ({
                        ...prev,
                        other: { ...prev.other, description: e.target.value }
                      }))}
                      rows={4}
                      data-testid="description-textarea"
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={!userType}
                data-testid="conditional-submit"
              >
                Submit Registration
              </button>
            </form>
          </div>
        )}

        {completedChallenges.length === 3 && (
          <div className="completion-section" data-testid="completion-section">
            <h2>🎉 Excellent Work!</h2>
            <p>You've mastered form elements testing! Ready for the next challenge?</p>
            <button 
              onClick={() => navigate('/class/iframes')}
              className="btn btn-primary btn-large"
              data-testid="next-class-button"
            >
              Continue to Next Class: iFrames →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormElementsHomework;