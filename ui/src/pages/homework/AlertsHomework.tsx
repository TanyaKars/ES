import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';
import StatCard from '../../components/alert-elements/StatCard';
import InfoCard from '../../components/alert-elements/InfoCard';
import AlertHomeworkScenarioCard from '../../components/alert-elements/AlertHomeworkScenarioCard';
import { alertsHomeworkScenarios, homeworkConfig, UserStats } from '../../data/alerts/alertsHomeworkData';

const AlertsHomework: React.FC = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    completedScenarios: [],
    attempts: {},
    bestScore: 0
  });
  
  const [currentScenario, setCurrentScenario] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const startHomework = () => {
    setIsStarted(true);
    setShowResults(false);
    setUserStats(prev => ({
      ...prev,
      totalPoints: 0,
      completedScenarios: []
    }));
  };

  const startScenario = (scenarioId: string) => {
    if (userStats.completedScenarios.includes(scenarioId)) {
      if (!confirm('You have already completed this scenario. Do you want to retry?')) {
        return;
      }
    }
    
    setCurrentScenario(scenarioId);
    
    // Start the specific scenario
    switch (scenarioId) {
      case 'sequential-alerts':
        handleSequentialAlerts();
        break;
      case 'conditional-flow':
        handleConditionalFlow();
        break;
      case 'calculator-challenge':
        handleCalculatorChallenge();
        break;
      case 'registration-flow':
        handleRegistrationFlow();
        break;
      case 'ajax-sequence':
        handleAjaxSequence();
        break;
    }
  };

  // Sequential Alerts Scenario
  const handleSequentialAlerts = async () => {
    try {
      // Step 1: Confirm
      const proceed = confirm('Do you want to proceed with the alert chain?');
      if (!proceed) {
        alert('Scenario cancelled. Try again!');
        setCurrentScenario(null);
        return;
      }

      // Step 2: Prompt for name
      const name = prompt('Please enter your name:');
      if (!name || name.trim() === '') {
        alert('Name is required! Scenario failed.');
        setCurrentScenario(null);
        return;
      }

      // Step 3: Welcome alert
      alert(`Welcome, ${name}! You have successfully completed the sequential alert chain.`);
      
      completeScenario('sequential-alerts');
    } catch (error) {
      alert('An error occurred during the scenario.');
      setCurrentScenario(null);
    }
  };

  // Conditional Flow Scenario
  const handleConditionalFlow = () => {
    const isAdvanced = confirm('Do you want to take the advanced path? (Click OK for Yes, Cancel for No)');
    
    if (isAdvanced) {
      // Advanced path
      const experience = prompt('How many years of QA experience do you have?');
      if (!experience || isNaN(Number(experience))) {
        alert('Invalid input! Please enter a number.');
        setCurrentScenario(null);
        return;
      }

      const tools = prompt('What automation tools have you used? (Selenium, Cypress, etc.)');
      if (!tools || tools.trim() === '') {
        alert('Please specify at least one tool.');
        setCurrentScenario(null);
        return;
      }

      const wantsCertification = confirm('Are you interested in certification programs?');
      const message = wantsCertification 
        ? `Great! With ${experience} years of experience using ${tools}, you're ready for advanced certification!`
        : `Perfect! Your ${experience} years with ${tools} show solid practical experience.`;
      
      alert(message);
    } else {
      // Basic path
      const interest = prompt('What interests you most about QA? (Testing, Automation, etc.)');
      if (!interest || interest.trim() === '') {
        alert('Please share your interest to continue.');
        setCurrentScenario(null);
        return;
      }

      alert(`Excellent! ${interest} is a great area to focus on. Welcome to your QA journey!`);
    }
    
    completeScenario('conditional-flow');
  };

  // Calculator Challenge Scenario
  const handleCalculatorChallenge = () => {
    let continueCalculating = true;
    
    while (continueCalculating) {
      // Get first number
      const num1Input = prompt('Enter the first number:');
      if (num1Input === null) break; // User cancelled
      
      const num1 = parseFloat(num1Input);
      if (isNaN(num1)) {
        alert('Invalid number! Please enter a valid number.');
        continue;
      }

      // Get operation
      const operation = prompt('Enter operation (+, -, *, /):');
      if (operation === null) break;
      
      if (!['+', '-', '*', '/'].includes(operation)) {
        alert('Invalid operation! Please enter +, -, *, or /');
        continue;
      }

      // Get second number
      const num2Input = prompt('Enter the second number:');
      if (num2Input === null) break;
      
      const num2 = parseFloat(num2Input);
      if (isNaN(num2)) {
        alert('Invalid number! Please enter a valid number.');
        continue;
      }

      // Check division by zero
      if (operation === '/' && num2 === 0) {
        alert('Error: Cannot divide by zero! Please try again.');
        continue;
      }

      // Calculate result
      let result: number;
      switch (operation) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
        default: result = 0;
      }

      alert(`Result: ${num1} ${operation} ${num2} = ${result}`);
      continueCalculating = confirm('Do you want to perform another calculation?');
    }
    
    completeScenario('calculator-challenge');
  };

  // Registration Flow Scenario
  const handleRegistrationFlow = () => {
    // Username validation
    const username = prompt('Enter username (minimum 3 characters):');
    if (!username || username.length < 3) {
      alert('Username must be at least 3 characters long!');
      setCurrentScenario(null);
      return;
    }

    // Email validation
    const email = prompt('Enter email address:');
    if (!email || !email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address!');
      setCurrentScenario(null);
      return;
    }

    // Age validation
    const ageInput = prompt('Enter your age:');
    const age = parseInt(ageInput || '0');
    if (isNaN(age) || age < 18) {
      alert('You must be 18 or older to register!');
      setCurrentScenario(null);
      return;
    }

    // Confirmation
    const confirmData = confirm(`Please confirm your registration:\nUsername: ${username}\nEmail: ${email}\nAge: ${age}\n\nIs this correct?`);
    if (!confirmData) {
      alert('Registration cancelled. Please try again.');
      setCurrentScenario(null);
      return;
    }

    alert(`Registration successful! Welcome, ${username}!`);
    completeScenario('registration-flow');
  };

  // AJAX Sequence Scenario
  const handleAjaxSequence = () => {
    // First AJAX operation
    const window1 = window.open('', '_blank');
    if (window1) {
      window1.document.write(`
        <html>
          <head><title>AJAX Operation 1</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h2>Processing AJAX Request 1...</h2>
            <div style="margin: 20px;">Loading...</div>
            <script>
              setTimeout(() => {
                document.body.innerHTML = \`
                  <h2>AJAX Operation 1 Completed!</h2>
                  <p>Data processed successfully.</p>
                  <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px;">
                    Return to Homework
                  </button>
                \`;
              }, 2000);
            </script>
          </body>
        </html>
      `);
    }

    // Wait and continue with sequence
    setTimeout(() => {
      const continueSequence = confirm('First AJAX operation completed. Continue with second operation?');
      if (continueSequence) {
        // Second AJAX operation
        const window2 = window.open('', '_blank');
        if (window2) {
          window2.document.write(`
            <html>
              <head><title>AJAX Operation 2</title></head>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h2>Processing AJAX Request 2...</h2>
                <div style="margin: 20px;">Synchronizing data...</div>
                <script>
                  setTimeout(() => {
                    document.body.innerHTML = \`
                      <h2>All AJAX Operations Completed!</h2>
                      <p>Full sequence executed successfully.</p>
                      <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px;">
                        Finish Sequence
                      </button>
                    \`;
                  }, 3000);
                </script>
              </body>
            </html>
          `);
        }
        
        setTimeout(() => {
          alert('AJAX sequence completed successfully! All operations processed.');
          completeScenario('ajax-sequence');
        }, 4000);
      } else {
        alert('AJAX sequence incomplete. Try again to complete all operations.');
        setCurrentScenario(null);
      }
    }, 3000);
  };

  const completeScenario = (scenarioId: string) => {
    const scenario = alertsHomeworkScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    setUserStats(prev => {
      const newStats = {
        ...prev,
        totalPoints: prev.totalPoints + scenario.points,
        completedScenarios: [...prev.completedScenarios.filter(id => id !== scenarioId), scenarioId],
        attempts: {
          ...prev.attempts,
          [scenarioId]: (prev.attempts[scenarioId] || 0) + 1
        }
      };
      newStats.bestScore = Math.max(newStats.bestScore, newStats.totalPoints);
      return newStats;
    });

    setCurrentScenario(null);
    alert(`Scenario completed! You earned ${scenario.points} points.`);
  };

  const submitHomework = () => {
    setShowResults(true);
    
    const percentage = (userStats.totalPoints / homeworkConfig.maxPoints) * 100;
    const passed = percentage >= homeworkConfig.passingScore;
    
    alert(`Homework submitted!\nTotal Points: ${userStats.totalPoints}/${homeworkConfig.maxPoints}\nScore: ${percentage.toFixed(1)}%\nStatus: ${passed ? 'PASSED' : 'FAILED'}`);
  };

  return (
    <div className="alerts-homework">
      <Header user={{ email: 'student@example.com', firstName: 'Student' }} />
      <NavigationBar 
        buttons={[
          {
            text: "← Back to Alerts Class",
            onClick: () => navigate('/class/alerts'),
            testId: "back-to-class"
          },
          {
            text: "← Back to Dashboard",
            onClick: () => navigate('/dashboard'),
            testId: "back-to-dashboard"
          }
        ]}
      />
      <div className="homework-container">
        <div className="homework-header">
          <h1>Alerts & Prompts - Homework Assignment</h1>
          <p>Complete complex alert scenarios to test your understanding. Each scenario builds on the concepts learned in class.</p>
          
          <div className="homework-stats">
            <StatCard 
              title="Progress" 
              value={`${userStats.completedScenarios.length}/${alertsHomeworkScenarios.length} scenarios`} 
            />
            <StatCard 
              title="Points" 
              value={`${userStats.totalPoints}/${homeworkConfig.maxPoints}`} 
            />
            <StatCard 
              title="Status" 
              value={userStats.totalPoints >= homeworkConfig.passingScore ? 'PASSING' : 'NEEDS WORK'} 
            />
          </div>

          <div className="homework-controls">
            {!isStarted && !showResults && (
              <button className="homework-btn primary" onClick={startHomework}>
                Start Homework
              </button>
            )}
            {isStarted && !showResults && (
              <button className="homework-btn success" onClick={submitHomework}>
                Submit Homework
              </button>
            )}
          </div>
        </div>

        {isStarted && !showResults && (
          <div className="scenarios-grid">
            {alertsHomeworkScenarios.map((scenario) => (
              <AlertHomeworkScenarioCard
                key={scenario.id}
                scenario={scenario}
                isCompleted={userStats.completedScenarios.includes(scenario.id)}
                attempts={userStats.attempts[scenario.id]}
                onStart={startScenario}
                isDisabled={currentScenario !== null}
              />
            ))}
          </div>
        )}

        {showResults && (
          <div className="results-section">
            <h2>Homework Results</h2>
            <div className="final-score">
              <h3>Final Score: {userStats.totalPoints}/{homeworkConfig.maxPoints} ({((userStats.totalPoints / homeworkConfig.maxPoints) * 100).toFixed(1)}%)</h3>
              <p className={`status ${userStats.totalPoints >= homeworkConfig.passingScore ? 'passed' : 'failed'}`}>
                {userStats.totalPoints >= homeworkConfig.passingScore ? 'PASSED' : 'FAILED'}
              </p>
            </div>
            
            <div className="scenario-breakdown">
              <h4>Scenario Breakdown:</h4>
              {alertsHomeworkScenarios.map(scenario => (
                <div key={scenario.id} className="result-item">
                  <span>{scenario.title}</span>
                  <span>{userStats.completedScenarios.includes(scenario.id) ? `✓ ${scenario.points} pts` : '✗ 0 pts'}</span>
                </div>
              ))}
            </div>
            
            <Link to="/class/alerts" className="btn btn-secondary">
              Back to Alerts Class
            </Link>
          </div>
        )}

        {!isStarted && !showResults && (
          <div className="pre-start-info">
            <h2>Before You Start</h2>
            <div className="info-cards">
              <InfoCard 
                title="Passing Score" 
                description={`${homeworkConfig.passingScore}% (${(homeworkConfig.maxPoints * homeworkConfig.passingScore / 100)} points)`} 
              />
              <InfoCard 
                title="Retry Policy" 
                description={homeworkConfig.allowRetry ? 'Unlimited retries allowed' : 'One attempt only'} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsHomework;