import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header.tsx';
import NavigationBar from '../../components/NavigationBar.tsx';
import DragDropGroup from '../../components/mouse-actions/DragDropGroup.tsx';
import ClickActionsGroup from '../../components/mouse-actions/ClickActionsGroup.tsx';
import HoverGroup from '../../components/mouse-actions/HoverGroup.tsx';
import InteractionHistory, { InteractionHistoryEntry } from '../../components/shared/InteractionHistory.tsx';
import CallToAction from '../../components/CallToAction.tsx';
import {
  mouseActionsClassDragDrop,
  mouseActionsClassClicks,
  mouseActionsClassSimpleHovers
} from '../../data/mouse-actions/mouseActionsClassData';
import { callToActionConfigs } from '../../data/callToActionData.ts';
import '../../styles/components/MouseActions.css';
import '../../styles/components/InteractionHistory.css';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

const MouseActionsClass: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  // State for tracking all mouse actions
  const [actionHistory, setActionHistory] = useState<InteractionHistoryEntry[]>([]);

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

  // Action handlers
  const handleDragDropAction = (success: boolean) => {
    if (success) {
      const newEntry: InteractionHistoryEntry = {
        type: 'drag_drop',
        action: 'drag_drop',
        element: 'draggable-element',
        timestamp: Date.now(),
        details: { success }
      };
      
      setActionHistory(prev => [...prev, newEntry]);
    }
  };

  const handleClickAction = (actionType: string, actionId: string) => {
    const newEntry: InteractionHistoryEntry = {
      type: `click_${actionType}`,
      action: `click_${actionType}`,
      element: actionId,
      timestamp: Date.now(),
      details: { actionType }
    };
    
    setActionHistory(prev => [...prev, newEntry]);
  };

  const handleHoverAction = (hoverId: string, isHovering: boolean) => {
    const newEntry: InteractionHistoryEntry = {
      type: isHovering ? 'hover_enter' : 'hover_leave',
      action: isHovering ? 'hover_enter' : 'hover_leave',
      element: hoverId,
      timestamp: Date.now(),
      details: { isHovering }
    };
    
    setActionHistory(prev => [...prev, newEntry]);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="class-page">
      <Header user={user} title="Class 4: Mouse Actions & Interactions" />
      
      <NavigationBar 
        buttons={[
          {
            text: "← Back to Dashboard",
            onClick: () => navigate('/dashboard'),
            testId: "back-to-dashboard"
          }
        ]}
      />

      <div className="class-content">
        <div className="class-intro">
          <h2>Master Mouse Actions & Interactions!</h2>
          <p>
            Learn to automate complex mouse interactions including drag & drop, various click types, 
            and hover effects. These skills are essential for testing modern 
            interactive web applications.
          </p>
        </div>

        {/* Drag and Drop Section */}
        <div className="practice-section">
          <DragDropGroup
            title="🎯 Drag & Drop Challenge"
            config={mouseActionsClassDragDrop[0]}
            onDrop={handleDragDropAction}
            containerTestId="drag-drop-section"
          />

          {/* Click Actions Section */}
          <ClickActionsGroup
            title="🖱️ Click Action Challenges"
            actions={mouseActionsClassClicks}
            onActionPerformed={handleClickAction}
            containerTestId="click-actions-section"
          />

          {/* Simple Hover Section */}
          <HoverGroup
            title="✨ Simple Hover Effects"
            hovers={mouseActionsClassSimpleHovers}
            requiresSequence={false}
            onHover={handleHoverAction}
            containerTestId="simple-hover-section"
          />

          {/* Interaction History */}
          <InteractionHistory 
            history={actionHistory} 
            title="🖱️ Mouse Actions History"
            maxEntries={10}
          />
        </div>

        <CallToAction {...callToActionConfigs.mouseActionsHomework} />
      </div>
    </div>
  );
};

export default MouseActionsClass;