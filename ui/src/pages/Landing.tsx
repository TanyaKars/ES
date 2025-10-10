import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <nav className="landing-nav">
          <div className="nav-brand">
            <h1>QA Academy</h1>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link" data-testid="login-link">
              Login
            </Link>
            <Link to="/register" className="nav-link nav-link-primary" data-testid="register-link">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title" data-testid="hero-title">
              Master QA Automation
            </h1>
            <p className="hero-subtitle" data-testid="hero-subtitle">
              Learn UI and API testing with hands-on practice in a real application
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large" data-testid="get-started-btn">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large" data-testid="login-btn">
                Already have an account?
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="code-mockup" data-testid="code-mockup">
              <div className="code-line">
                <span className="code-keyword">describe</span>
                <span className="code-string">('Login functionality', () =&gt; {'{'}</span>
              </div>
              <div className="code-line">
                <span className="code-keyword">  it</span>
                <span className="code-string">('should login successfully', () =&gt; {'{'}</span>
              </div>
              <div className="code-line">
                <span className="code-comment">    // Your test automation code here</span>
              </div>
              <div className="code-line">
                <span className="code-string">  {'}'});</span>
              </div>
              <div className="code-line">
                <span className="code-string">{'}'});</span>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section" data-testid="features-section">
          <div className="container">
            <h2 className="section-title">What You'll Learn</h2>
            <div className="features-grid">
              <div className="feature-card" data-testid="ui-testing-feature">
                <div className="feature-icon">🖥️</div>
                <h3>UI Testing</h3>
                <p>Learn to automate web interface testing with modern tools and best practices</p>
                <ul>
                  <li>Element selection strategies</li>
                  <li>User interaction simulation</li>
                  <li>Cross-browser testing</li>
                  <li>Visual regression testing</li>
                </ul>
              </div>
              <div className="feature-card" data-testid="api-testing-feature">
                <div className="feature-icon">🔌</div>
                <h3>API Testing</h3>
                <p>Master REST API testing and validation techniques</p>
                <ul>
                  <li>HTTP methods and status codes</li>
                  <li>Request/Response validation</li>
                  <li>Authentication testing</li>
                  <li>Performance testing</li>
                </ul>
              </div>
              <div className="feature-card" data-testid="integration-feature">
                <div className="feature-icon">🔗</div>
                <h3>Integration Testing</h3>
                <p>Connect UI and API testing for complete coverage</p>
                <ul>
                  <li>End-to-end workflows</li>
                  <li>Data consistency validation</li>
                  <li>Environment management</li>
                  <li>CI/CD integration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section" data-testid="cta-section">
          <div className="container">
            <h2>Ready to Start Your QA Journey?</h2>
            <p>Join thousands of professionals who have advanced their careers with our courses</p>
            <Link to="/register" className="btn btn-primary btn-large" data-testid="bottom-cta-btn">
              Start Learning Today
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2025 QA Academy. Built for learning and practice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;