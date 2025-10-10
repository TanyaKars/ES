import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header.tsx';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

const FormsClass: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  // Dropdown states
  const [selectedDropdown1, setSelectedDropdown1] = useState('');
  const [selectedDropdown2, setSelectedDropdown2] = useState('');
  const [selectedDropdown3, setSelectedDropdown3] = useState('');
  
  // Checkbox states
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false
  });
  
  // Radio button state
  const [selectedColor, setSelectedColor] = useState('');
  
  // Selected & Disabled elements
  const [disabledCheckboxes, setDisabledCheckboxes] = useState({
    lettuce: true,   // pre-selected
    cabbage: false,
    pumpkin: false
  });
  
  // Text area state
  const [textAreaContent, setTextAreaContent] = useState('');
  const [comments, setComments] = useState('');

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
    setCheckboxes(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev]
    }));
  };

  const handleDisabledCheckboxChange = (name: string) => {
    // Only cabbage and pumpkin can be changed, lettuce is disabled
    if (name !== 'lettuce') {
      setDisabledCheckboxes(prev => ({
        ...prev,
        [name]: !prev[name as keyof typeof prev]
      }));
    }
  };

  const resetAllElements = () => {
    setSelectedDropdown1('');
    setSelectedDropdown2('');
    setSelectedDropdown3('');
    setCheckboxes({ option1: false, option2: false, option3: false, option4: false });
    setSelectedColor('');
    setDisabledCheckboxes({ lettuce: true, cabbage: false, pumpkin: false });
    setTextAreaContent('');
    setComments('');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="class-page">
      <Header user={user} title="Class 1: Dropdown Menu, Checkbox & Radio Button" />
      
      <div className="class-navigation">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="btn btn-secondary"
          data-testid="back-to-dashboard"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="class-content">
        <div className="practice-section">
          <h2>Interactive Form Elements</h2>
          
          {/* Dropdown Menus Section */}
          <div className="element-group">
            <h3>Dropdown Menu(s)</h3>
            <div className="dropdowns-container">
              <div className="dropdown-item">
                <label htmlFor="dropdown1" data-testid="dropdown1-label">Programming Languages:</label>
                <select
                  id="dropdown1"
                  value={selectedDropdown1}
                  onChange={(e) => setSelectedDropdown1(e.target.value)}
                  data-testid="dropdown1"
                >
                  <option value="" data-testid="dropdown1-placeholder">Choose Language</option>
                  <option value="javascript" data-testid="dropdown1-javascript">JavaScript</option>
                  <option value="python" data-testid="dropdown1-python">Python</option>
                  <option value="java" data-testid="dropdown1-java">Java</option>
                  <option value="csharp" data-testid="dropdown1-csharp">C#</option>
                </select>
              </div>

              <div className="dropdown-item">
                <label htmlFor="dropdown2" data-testid="dropdown2-label">Test Tools:</label>
                <select
                  id="dropdown2"
                  value={selectedDropdown2}
                  onChange={(e) => setSelectedDropdown2(e.target.value)}
                  data-testid="dropdown2"
                >
                  <option value="" data-testid="dropdown2-placeholder">Choose Tool</option>
                  <option value="selenium" data-testid="dropdown2-selenium">Selenium</option>
                  <option value="cypress" data-testid="dropdown2-cypress">Cypress</option>
                  <option value="playwright" data-testid="dropdown2-playwright">Playwright</option>
                  <option value="testcafe" data-testid="dropdown2-testcafe">TestCafe</option>
                </select>
              </div>

              <div className="dropdown-item">
                <label htmlFor="dropdown3" data-testid="dropdown3-label">Experience Level:</label>
                <select
                  id="dropdown3"
                  value={selectedDropdown3}
                  onChange={(e) => setSelectedDropdown3(e.target.value)}
                  data-testid="dropdown3"
                >
                  <option value="" data-testid="dropdown3-placeholder">Choose Level</option>
                  <option value="beginner" data-testid="dropdown3-beginner">Beginner</option>
                  <option value="intermediate" data-testid="dropdown3-intermediate">Intermediate</option>
                  <option value="advanced" data-testid="dropdown3-advanced">Advanced</option>
                  <option value="expert" data-testid="dropdown3-expert">Expert</option>
                </select>
              </div>
            </div>
            
            <div className="element-status" data-testid="dropdown-status">
              <p><strong>Selected values:</strong></p>
              <p>Language: {selectedDropdown1 || 'None'}</p>
              <p>Tool: {selectedDropdown2 || 'None'}</p>
              <p>Level: {selectedDropdown3 || 'None'}</p>
            </div>
          </div>

          {/* Checkboxes Section */}
          <div className="element-group">
            <h3>Checkboxe(s)</h3>
            <div className="checkbox-group" data-testid="checkbox-group">
              <label className="checkbox-label" data-testid="option1-label">
                <input
                  type="checkbox"
                  checked={checkboxes.option1}
                  onChange={() => handleCheckboxChange('option1')}
                  data-testid="option1-checkbox"
                />
                Option 1
              </label>
              
              <label className="checkbox-label" data-testid="option2-label">
                <input
                  type="checkbox"
                  checked={checkboxes.option2}
                  onChange={() => handleCheckboxChange('option2')}
                  data-testid="option2-checkbox"
                />
                Option 2
              </label>
              
              <label className="checkbox-label" data-testid="option3-label">
                <input
                  type="checkbox"
                  checked={checkboxes.option3}
                  onChange={() => handleCheckboxChange('option3')}
                  data-testid="option3-checkbox"
                />
                Option 3
              </label>
              
              <label className="checkbox-label" data-testid="option4-label">
                <input
                  type="checkbox"
                  checked={checkboxes.option4}
                  onChange={() => handleCheckboxChange('option4')}
                  data-testid="option4-checkbox"
                />
                Option 4
              </label>
            </div>
            
            <div className="element-status" data-testid="checkbox-status">
              <p><strong>Selected options:</strong> {
                Object.entries(checkboxes)
                  .filter(([, value]) => value)
                  .map(([key]) => key)
                  .join(', ') || 'None'
              }</p>
            </div>
          </div>

          {/* Radio Buttons Section */}
          <div className="element-group">
            <h3>Radio Button(s)</h3>
            <div className="radio-group" data-testid="radio-group">
              <label className="radio-label" data-testid="green-label">
                <input
                  type="radio"
                  name="color"
                  value="green"
                  checked={selectedColor === 'green'}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  data-testid="green-radio"
                />
                Green
              </label>
              
              <label className="radio-label" data-testid="blue-label">
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  checked={selectedColor === 'blue'}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  data-testid="blue-radio"
                />
                Blue
              </label>
              
              <label className="radio-label" data-testid="yellow-label">
                <input
                  type="radio"
                  name="color"
                  value="yellow"
                  checked={selectedColor === 'yellow'}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  data-testid="yellow-radio"
                />
                Yellow
              </label>
              
              <label className="radio-label" data-testid="orange-label">
                <input
                  type="radio"
                  name="color"
                  value="orange"
                  checked={selectedColor === 'orange'}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  data-testid="orange-radio"
                />
                Orange
              </label>
              
              <label className="radio-label" data-testid="purple-label">
                <input
                  type="radio"
                  name="color"
                  value="purple"
                  checked={selectedColor === 'purple'}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  data-testid="purple-radio"
                />
                Purple
              </label>
            </div>
            
            <div className="element-status" data-testid="radio-status">
              <p><strong>Selected color:</strong> {selectedColor || 'None'}</p>
            </div>
          </div>

          {/* Selected & Disabled Section */}
          <div className="element-group">
            <h3>Selected & Disabled</h3>
            <div className="checkbox-group" data-testid="disabled-group">
              <label className="checkbox-label disabled" data-testid="lettuce-label">
                <input
                  type="checkbox"
                  checked={disabledCheckboxes.lettuce}
                  disabled
                  data-testid="lettuce-checkbox"
                />
                Lettuce (Disabled & Selected)
              </label>
              
              <label className="checkbox-label" data-testid="cabbage-label">
                <input
                  type="checkbox"
                  checked={disabledCheckboxes.cabbage}
                  onChange={() => handleDisabledCheckboxChange('cabbage')}
                  data-testid="cabbage-checkbox"
                />
                Cabbage
              </label>
              
              <label className="checkbox-label" data-testid="pumpkin-label">
                <input
                  type="checkbox"
                  checked={disabledCheckboxes.pumpkin}
                  onChange={() => handleDisabledCheckboxChange('pumpkin')}
                  data-testid="pumpkin-checkbox"
                />
                Pumpkin
              </label>
            </div>
            
            <div className="element-status" data-testid="disabled-status">
              <p><strong>Selected vegetables:</strong> {
                Object.entries(disabledCheckboxes)
                  .filter(([, value]) => value)
                  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                  .join(', ') || 'None'
              }</p>
            </div>
          </div>

          {/* Text Areas Section */}
          <div className="element-group">
            <h3>Text Area(s)</h3>
            <div className="textarea-group">
              <div className="form-group">
                <label htmlFor="message" data-testid="message-label">
                  Message:
                </label>
                <textarea
                  id="message"
                  value={textAreaContent}
                  onChange={(e) => setTextAreaContent(e.target.value)}
                  placeholder="Enter your message here..."
                  rows={4}
                  cols={50}
                  data-testid="message-textarea"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="comments" data-testid="comments-label">
                  Comments:
                </label>
                <textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter your comments here..."
                  rows={3}
                  cols={50}
                  data-testid="comments-textarea"
                />
              </div>
            </div>
            
            <div className="element-status" data-testid="textarea-status">
              <p><strong>Message length:</strong> {textAreaContent.length} characters</p>
              <p><strong>Comments length:</strong> {comments.length} characters</p>
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
          <h2>Testing Scenarios to Practice</h2>
          <div className="scenarios-grid">
            <div className="scenario-card" data-testid="dropdown-scenario">
              <h4>� Dropdown Testing</h4>
              <ul>
                <li>Test dropdown option selection</li>
                <li>Verify default placeholder values</li>
                <li>Test multiple dropdown interactions</li>
                <li>Verify selected values are displayed correctly</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="checkbox-scenario">
              <h4>☑️ Checkbox Testing</h4>
              <ul>
                <li>Test individual checkbox toggle</li>
                <li>Test multiple checkbox selections</li>
                <li>Verify checkbox state persistence</li>
                <li>Test disabled checkbox behavior</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="radio-scenario">
              <h4>📻 Radio Button Testing</h4>
              <ul>
                <li>Test radio button group exclusivity</li>
                <li>Verify only one selection per group</li>
                <li>Test radio button deselection</li>
                <li>Verify color selection updates correctly</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="textarea-scenario">
              <h4>📝 Text Area Testing</h4>
              <ul>
                <li>Test text input and character counting</li>
                <li>Test placeholder text behavior</li>
                <li>Test text area resizing (if enabled)</li>
                <li>Test text area focus and blur events</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="disabled-scenario">
              <h4>� Disabled Elements</h4>
              <ul>
                <li>Verify disabled elements cannot be modified</li>
                <li>Test pre-selected disabled elements</li>
                <li>Verify disabled styling is applied</li>
                <li>Test accessibility for disabled elements</li>
              </ul>
            </div>

            <div className="scenario-card" data-testid="combination-scenario">
              <h4>🔄 Element Combinations</h4>
              <ul>
                <li>Test form with multiple element selections</li>
                <li>Verify all element states are tracked</li>
                <li>Test reset functionality</li>
                <li>Test complex form validation scenarios</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="homework-section">
          <h2>Ready for Homework?</h2>
          <p>Practice your skills with unique challenges and edge cases!</p>
          <button 
            onClick={() => navigate('/homework/forms')}
            className="btn btn-primary btn-large"
            data-testid="homework-button"
          >
            Start Forms Homework →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormsClass;