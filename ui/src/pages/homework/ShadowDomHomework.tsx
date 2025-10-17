import React, { useEffect, useRef, useState } from 'react';
import { callToActionConfigs } from '../../data/callToActionData';
import CallToAction from '../../components/CallToAction';
import '../../styles/pages/ClassPages.css';

// Declare custom elements for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'user-profile': {
        username?: string;
        email?: string;
        'data-testid'?: string;
      };
      'notification-popup': {
        message?: string;
        type?: string;
        'data-testid'?: string;
      };
    }
  }
}

const ShadowDomHomework: React.FC = () => {
  const [challenges, setChallenges] = useState({
    shadowButton: false,
    hiddenContent: false,
    customElement: false,
    nestedShadow: false
  });

  const shadowHostRef = useRef<HTMLDivElement>(null);
  const hiddenContentRef = useRef<HTMLDivElement>(null);
  const nestedShadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Challenge 1: Create a shadow DOM with interactive button
    if (shadowHostRef.current) {
      const shadowRoot = shadowHostRef.current.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <style>
          .shadow-container {
            background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            color: white;
            font-family: Arial, sans-serif;
          }
          .secret-button {
            background: white;
            color: #FF6B6B;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 15px;
            transition: transform 0.3s ease;
          }
          .secret-button:hover {
            transform: scale(1.1);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
        </style>
        <div class="shadow-container">
          <h3>🎯 Challenge 1: Find the Hidden Button</h3>
          <p>This button is inside Shadow DOM!</p>
          <button class="secret-button" id="challenge-button" data-testid="shadow-challenge-button">
            Click to Complete Challenge!
          </button>
        </div>
      `;
      
      const challengeButton = shadowRoot.querySelector('#challenge-button');
      challengeButton?.addEventListener('click', () => {
        setChallenges(prev => ({ ...prev, shadowButton: true }));
        alert('Challenge 1 Complete! ✅');
      });
    }

    // Challenge 2: Hidden content that's revealed
    if (hiddenContentRef.current) {
      const shadowRoot = hiddenContentRef.current.attachShadow({ mode: 'closed' });
      shadowRoot.innerHTML = `
        <style>
          .hidden-container {
            background: #2C3E50;
            color: white;
            padding: 20px;
            border-radius: 10px;
            border: 2px dashed #3498DB;
          }
          .reveal-btn {
            background: #3498DB;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          }
          .hidden-text {
            display: none;
            margin-top: 15px;
            padding: 10px;
            background: #34495E;
            border-radius: 5px;
          }
          .hidden-text.revealed {
            display: block;
            animation: fadeIn 0.5s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        </style>
        <div class="hidden-container">
          <h4>🔍 Challenge 2: Reveal Hidden Content</h4>
          <p>This content is in a closed Shadow DOM!</p>
          <button class="reveal-btn" id="reveal-button">Reveal Secret</button>
          <div class="hidden-text" id="secret-content">
            🎊 Congratulations! You found the hidden content!
            <br>This was hidden in a closed Shadow DOM.
          </div>
        </div>
      `;
      
      const revealButton = shadowRoot.querySelector('#reveal-button');
      const secretContent = shadowRoot.querySelector('#secret-content');
      
      revealButton?.addEventListener('click', () => {
        secretContent?.classList.add('revealed');
        setChallenges(prev => ({ ...prev, hiddenContent: true }));
        setTimeout(() => alert('Challenge 2 Complete! ✅'), 500);
      });
    }

    // Challenge 3: Nested Shadow DOM
    if (nestedShadowRef.current) {
      const outerShadow = nestedShadowRef.current.attachShadow({ mode: 'open' });
      outerShadow.innerHTML = `
        <style>
          .outer-shell {
            background: #E8F4FD;
            border: 3px solid #3498DB;
            padding: 20px;
            border-radius: 12px;
          }
          .inner-host {
            margin-top: 15px;
            min-height: 100px;
          }
        </style>
        <div class="outer-shell">
          <h4>🪆 Challenge 4: Nested Shadow DOM</h4>
          <p>Find the button hidden in nested Shadow DOM!</p>
          <div class="inner-host" id="inner-host"></div>
        </div>
      `;
      
      const innerHost = outerShadow.querySelector('#inner-host');
      if (innerHost) {
        const innerShadow = (innerHost as HTMLElement).attachShadow({ mode: 'open' });
        innerShadow.innerHTML = `
          <style>
            .inner-content {
              background: #F39C12;
              color: white;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
            }
            .nested-button {
              background: white;
              color: #F39C12;
              border: none;
              padding: 8px 16px;
              border-radius: 20px;
              cursor: pointer;
              font-weight: bold;
              margin-top: 10px;
            }
          </style>
          <div class="inner-content">
            <p>🎯 You found the nested content!</p>
            <button class="nested-button" id="nested-challenge-button" data-testid="nested-shadow-button">
              Complete Nested Challenge
            </button>
          </div>
        `;
        
        const nestedButton = innerShadow.querySelector('#nested-challenge-button');
        nestedButton?.addEventListener('click', () => {
          setChallenges(prev => ({ ...prev, nestedShadow: true }));
          alert('Challenge 4 Complete! ✅');
        });
      }
    }

    // Challenge 3: Register custom elements
    class UserProfile extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        
        const username = this.getAttribute('username') || 'Anonymous';
        const email = this.getAttribute('email') || 'user@example.com';
        
        shadow.innerHTML = `
          <style>
            .profile-card {
              background: #9B59B6;
              color: white;
              padding: 20px;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(155, 89, 182, 0.3);
              max-width: 300px;
              margin: 10px 0;
            }
            .avatar {
              width: 60px;
              height: 60px;
              background: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 2em;
              margin: 0 auto 15px;
            }
            .info {
              text-align: center;
            }
            .challenge-btn {
              background: white;
              color: #9B59B6;
              border: none;
              padding: 10px 20px;
              border-radius: 20px;
              cursor: pointer;
              font-weight: bold;
              margin-top: 15px;
              width: 100%;
            }
          </style>
          <div class="profile-card">
            <div class="avatar">👤</div>
            <div class="info">
              <h3>${username}</h3>
              <p>${email}</p>
              <button class="challenge-btn" id="profile-button" data-testid="custom-element-button">
                Interact with Custom Element
              </button>
            </div>
          </div>
        `;
        
        const profileButton = shadow.querySelector('#profile-button');
        profileButton?.addEventListener('click', () => {
          setChallenges(prev => ({ ...prev, customElement: true }));
          alert('Challenge 3 Complete! ✅');
        });
      }
    }

    class NotificationPopup extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        
        const message = this.getAttribute('message') || 'Default notification';
        const type = this.getAttribute('type') || 'info';
        
        const colors = {
          info: '#3498DB',
          success: '#2ECC71',
          warning: '#F39C12',
          error: '#E74C3C'
        };
        
        shadow.innerHTML = `
          <style>
            .notification {
              background: ${colors[type as keyof typeof colors] || colors.info};
              color: white;
              padding: 15px 20px;
              border-radius: 8px;
              margin: 10px 0;
              box-shadow: 0 3px 10px rgba(0,0,0,0.2);
              animation: slideIn 0.3s ease-out;
              position: relative;
            }
            @keyframes slideIn {
              from { transform: translateX(-100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            .icon {
              font-size: 1.2em;
              margin-right: 10px;
            }
          </style>
          <div class="notification">
            <span class="icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️'}</span>
            ${message}
          </div>
        `;
      }
    }
    
    // Register custom elements if not already registered
    if (!customElements.get('user-profile')) {
      customElements.define('user-profile', UserProfile);
    }
    if (!customElements.get('notification-popup')) {
      customElements.define('notification-popup', NotificationPopup);
    }
  }, []);

  const completedChallenges = Object.values(challenges).filter(Boolean).length;
  const totalChallenges = Object.keys(challenges).length;
  const allCompleted = completedChallenges === totalChallenges;

  return (
    <div className="class-page">
      <div className="class-header">
        <h1>🌑 Shadow DOM Homework</h1>
        <p className="class-description">
          Complete these challenges to master Shadow DOM testing and interaction patterns.
          Each challenge focuses on different aspects of Shadow DOM encapsulation.
        </p>
        
        <div className="progress-section">
          <h3>Progress: {completedChallenges}/{totalChallenges} Challenges Complete</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedChallenges / totalChallenges) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="class-content">
        {/* Challenge 1: Basic Shadow DOM Interaction */}
        <section className="challenge-section">
          <h2>🎯 Challenge 1: Shadow DOM Button Interaction {challenges.shadowButton && '✅'}</h2>
          <p>
            Find and click the button inside the Shadow DOM. This tests your ability to 
            locate and interact with elements encapsulated in Shadow DOM.
          </p>
          <div className="demo-container">
            <div 
              ref={shadowHostRef} 
              className="shadow-host"
              data-testid="shadow-host-challenge"
            >
              {/* Shadow content will be inserted here */}
            </div>
          </div>
          <div className="testing-hint">
            <strong>💡 Testing Hint:</strong> Use <code>page.locator('[data-testid="shadow-host-challenge"]').locator('#challenge-button')</code>
          </div>
        </section>

        {/* Challenge 2: Hidden Content */}
        <section className="challenge-section">
          <h2>🔍 Challenge 2: Hidden Content Revelation {challenges.hiddenContent && '✅'}</h2>
          <p>
            This content is in a closed Shadow DOM. Find the reveal button and uncover the hidden message.
          </p>
          <div className="demo-container">
            <div 
              ref={hiddenContentRef} 
              className="shadow-host"
              data-testid="hidden-content-host"
            >
              {/* Closed shadow content will be inserted here */}
            </div>
          </div>
          <div className="testing-hint">
            <strong>💡 Testing Hint:</strong> Closed Shadow DOM requires different testing strategies
          </div>
        </section>

        {/* Challenge 3: Custom Elements */}
        <section className="challenge-section">
          <h2>👤 Challenge 3: Custom Element Interaction {challenges.customElement && '✅'}</h2>
          <p>
            Interact with these custom elements that use Shadow DOM for encapsulation.
          </p>
          <div className="demo-container">
            <user-profile 
              username="Test User" 
              email="test@example.com"
              data-testid="user-profile-element"
            ></user-profile>
            
            <notification-popup 
              message="This is a custom notification component!"
              type="success"
              data-testid="notification-element"
            ></notification-popup>
          </div>
          <div className="testing-hint">
            <strong>💡 Testing Hint:</strong> Use <code>page.locator('user-profile').locator('[data-testid="custom-element-button"]')</code>
          </div>
        </section>

        {/* Challenge 4: Nested Shadow DOM */}
        <section className="challenge-section">
          <h2>🪆 Challenge 4: Nested Shadow DOM {challenges.nestedShadow && '✅'}</h2>
          <p>
            Navigate through nested Shadow DOM structures to find the deeply hidden button.
          </p>
          <div className="demo-container">
            <div 
              ref={nestedShadowRef} 
              className="shadow-host"
              data-testid="nested-shadow-host"
            >
              {/* Nested shadow content will be inserted here */}
            </div>
          </div>
          <div className="testing-hint">
            <strong>💡 Testing Hint:</strong> Chain multiple <code>.locator()</code> calls to traverse nested shadows
          </div>
        </section>

        {/* Success Message */}
        {allCompleted && (
          <section className="success-section">
            <div className="success-card">
              <h2>🎊 Congratulations!</h2>
              <p>
                You've successfully completed all Shadow DOM challenges! You now understand:
              </p>
              <ul>
                <li>✅ How to interact with Shadow DOM elements</li>
                <li>✅ Testing strategies for encapsulated content</li>
                <li>✅ Working with custom elements</li>
                <li>✅ Navigating nested Shadow DOM structures</li>
              </ul>
            </div>
          </section>
        )}

        {/* Call to Action */}
        {allCompleted && (
          <CallToAction {...callToActionConfigs.shadowDomComplete} />
        )}
      </div>
    </div>
  );
};

export default ShadowDomHomework;