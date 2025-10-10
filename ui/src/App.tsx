import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';

// Class Pages
import FormsClass from './pages/classes/FormsClass.tsx';
import FormElementsClass from './pages/classes/FormElementsClass.tsx';

// Homework Pages
import FormsHomework from './pages/homework/FormsHomework.tsx';
import FormElementsHomework from './pages/homework/FormElementsHomework.tsx';

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
          <Route path="/class/form-elements" element={<FormElementsClass />} />
          
          {/* Homework Routes */}
          <Route path="/homework/forms" element={<FormsHomework />} />
          <Route path="/homework/form-elements" element={<FormElementsHomework />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;