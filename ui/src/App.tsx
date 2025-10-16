import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';

// Class Pages
import FormsClass from './pages/classes/FormsClass.tsx';
import AlertsClass from './pages/classes/AlertsClass.tsx';
import IframesClass from './pages/classes/IframesClass.tsx';
import MouseActionsClass from './pages/classes/MouseActionsClass.tsx';

// Homework Pages
import FormsHomework from './pages/homework/FormsHomework.tsx';
import AlertsHomework from './pages/homework/AlertsHomework.tsx';
import IframesHomework from './pages/homework/IframesHomework.tsx';
import MouseActionsHomework from './pages/homework/MouseActionsHomework.tsx';

// Iframe Examples
import TextAreaExample from './pages/classes/iframes/examples/TextAreaExample.tsx';
import FormExample from './pages/classes/iframes/examples/FormExample.tsx';

// Iframe Homework
import NestedIframeExample from './pages/classes/iframes/homework/NestedIframeExample.tsx';
import ComplexNestedIframe from './pages/classes/iframes/homework/ComplexNestedIframe.tsx';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Class Routes */}
          <Route path="/class/forms" element={<FormsClass />} />
          <Route path="/class/alerts" element={<AlertsClass />} />
          <Route path="/class/iframes" element={<IframesClass />} />
          <Route path="/class/mouse-actions" element={<MouseActionsClass />} />
          
          {/* Homework Routes */}
          <Route path="/homework/forms" element={<FormsHomework />} />
          <Route path="/homework/alerts" element={<AlertsHomework />} />
          <Route path="/homework/iframes" element={<IframesHomework />} />
          <Route path="/homework/mouse-actions" element={<MouseActionsHomework />} />
          
          {/* Iframe Examples */}
          <Route path="/class/iframes/examples/form" element={<FormExample />} />
          <Route path="/class/iframes/examples/textarea" element={<TextAreaExample />} />
          
          {/* Iframe Homework */}
          <Route path="/class/iframes/homework/nested" element={<NestedIframeExample />} />
          <Route path="/class/iframes/homework/complex" element={<ComplexNestedIframe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;