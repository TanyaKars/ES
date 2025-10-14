import React, { useState } from 'react';
import HomeworkLayout from '../../components/homework/HomeworkLayout';
import HomeworkResults from '../../components/homework/HomeworkResults';
import InfoCard from '../../components/alert-elements/InfoCard';
import AlertHomeworkScenarioCard from '../../components/alert-elements/AlertHomeworkScenarioCard';
import { useAuth } from '../../hooks/useAuth';
import { useHomeworkState } from '../../hooks/useHomeworkState';
import { alertsHomeworkScenarios, homeworkConfig } from '../../data/alerts/alertsHomeworkData';

const AlertsHomework: React.FC = () => {
  const { user, isLoading } = useAuth();
  const {
    isStarted,
    showResults,
    completedScenarios,
    totalPoints,
    startHomework,
    submitHomework,
    completeScenario
  } = useHomeworkState({
    maxPoints: homeworkConfig.maxPoints,
    totalScenarios: alertsHomeworkScenarios.length
  });
  
  const [currentScenario, setCurrentScenario] = useState<string | null>(null);

  const startScenario = (scenarioId: string) => {
    if (completedScenarios.includes(scenarioId)) {
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
      
      completeScenario('sequential-alerts', 20);
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
    
    completeScenario('conditional-flow', 25);
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
    
    completeScenario('calculator-challenge', 30);
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
    completeScenario('registration-flow', 20);
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
          completeScenario('ajax-sequence', 25);
        }, 4000);
      } else {
        alert('AJAX sequence incomplete. Try again to complete all operations.');
        setCurrentScenario(null);
      }
    }, 3000);
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
      title="Alerts & Prompts - Homework Assignment"
      description="Complete complex alert scenarios to test your understanding. Each scenario builds on the concepts learned in class."
      backToClassPath="/class/alerts"
      backToClassText="← Back to Alerts Class"
      completedScenarios={completedScenarios.length}
      totalScenarios={alertsHomeworkScenarios.length}
      totalPoints={totalPoints}
      maxPoints={homeworkConfig.maxPoints}
      passingScore={homeworkConfig.passingScore}
      isStarted={isStarted}
      showResults={showResults}
      onStartHomework={startHomework}
      onSubmitHomework={submitHomework}
    >
      {isStarted && !showResults && (
        <div className="scenarios-grid">
          {alertsHomeworkScenarios.map((scenario) => (
            <AlertHomeworkScenarioCard
              key={scenario.id}
              scenario={scenario}
              isCompleted={completedScenarios.includes(scenario.id)}
              attempts={0}
              onStart={startScenario}
              isDisabled={currentScenario !== null}
            />
          ))}
        </div>
      )}

      {showResults && (
        <HomeworkResults
          completedScenarios={completedScenarios.length}
          totalScenarios={alertsHomeworkScenarios.length}
          totalPoints={totalPoints}
          maxPoints={homeworkConfig.maxPoints}
        />
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
    </HomeworkLayout>
  );
};

export default AlertsHomework;