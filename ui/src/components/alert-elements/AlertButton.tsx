import React from 'react';
import { AlertButtonConfig } from '../../data/alerts/alertsClassData';

interface AlertButtonProps {
  config: AlertButtonConfig;
  onResult: (type: string, result: any) => void;
}

const AlertButton: React.FC<AlertButtonProps> = ({ config, onResult }) => {
  const handleClick = async () => {
    try {
      switch (config.type) {
        case 'alert':
          alert(config.message);
          onResult('alert', config.message);
          break;
          
        case 'confirm':
          const confirmResult = confirm(config.message);
          onResult('confirm', confirmResult);
          break;
          
        case 'prompt':
          const promptResult = prompt(config.message, config.defaultValue);
          onResult('prompt', promptResult);
          break;
          
        case 'ajax':
          if (config.openNewTab) {
            // Open a new tab that will show the loading page
            const newWindow = window.open('', '_blank');
            if (newWindow) {
              // Initial loading page
              newWindow.document.write(`
                <html>
                  <head>
                    <title>AJAX Loader</title>
                    <style>
                      body { 
                        font-family: Arial, sans-serif; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        height: 100vh; 
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                      }
                      .loader { 
                        text-align: center; 
                      }
                      .spinner {
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #3498db;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 2s linear infinite;
                        margin: 0 auto 20px;
                      }
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                      .success-page {
                        display: none;
                        text-align: center;
                        max-width: 500px;
                        padding: 2rem;
                      }
                      .success-page.show {
                        display: block;
                      }
                      .success-icon {
                        font-size: 4rem;
                        margin-bottom: 1rem;
                      }
                      .btn {
                        background-color: #28a745;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        font-size: 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin-top: 20px;
                        transition: background-color 0.2s ease;
                      }
                      .btn:hover {
                        background-color: #218838;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="loader" id="loader">
                      <div class="spinner"></div>
                      <h2>Processing AJAX Request</h2>
                      <p>Please wait while we process your request...</p>
                    </div>
                    
                    <div class="success-page" id="successPage">
                      <div class="success-icon">✅</div>
                      <h1>Well Done For Waiting....!!!</h1>
                      <p>Your AJAX request has been processed successfully!</p>
                      <p>This page demonstrates how to handle AJAX responses and redirects in automation testing.</p>
                      <button class="btn" onclick="goBackToClass()" data-testid="back-to-class-btn">
                        Return to Alerts Class
                      </button>
                    </div>
                    
                    <script>
                      function goBackToClass() {
                        // Get the parent window URL and navigate back to alerts class
                        const alertsClassUrl = window.opener ? 
                          window.opener.location.origin + '/class/alerts' : 
                          '/class/alerts';
                        window.location.href = alertsClassUrl;
                      }
                      
                      // Show success page after delay
                      setTimeout(() => {
                        document.getElementById('loader').style.display = 'none';
                        document.getElementById('successPage').classList.add('show');
                      }, ${config.delay || 5000});
                    </script>
                  </body>
                </html>
              `);
            }
            onResult('ajax', 'New tab opened with AJAX loader');
          } else {
            // Regular delayed alert in same window
            setTimeout(() => {
              alert(config.message);
              onResult('ajax', config.message);
            }, config.delay || 1000);
          }
          break;
          
        default:
          console.log('Unknown alert type:', config.type);
      }
    } catch (error) {
      console.error('Error showing alert:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn ${config.buttonClass || 'btn-primary'}`}
      data-testid={config.testId}
    >
      {config.label}
    </button>
  );
};

export default AlertButton;