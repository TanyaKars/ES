export interface CallToActionConfig {
  title: string;
  description: string;
  buttonText: string;
  buttonRoute: string;
  buttonTestId: string;
  containerTestId?: string;
  icon?: string;
}

// Call-to-action configurations for different scenarios
export const callToActionConfigs = {
  formsHomework: {
    title: "Ready for Homework?",
    description: "Practice your skills with unique challenges and edge cases!",
    buttonText: "Start Forms Homework →",
    buttonRoute: "/homework/forms",
    buttonTestId: "homework-button",
    containerTestId: "homework-section"
  },
  
  formsComplete: {
    title: "Assignment Complete!",
    description: "Great work! You've mastered form elements testing. Ready for the next challenge?",
    buttonText: "Continue to Next Class: Alerts →",
    buttonRoute: "/class/alerts",
    buttonTestId: "next-class-button",
    containerTestId: "completion-section",
    icon: "🎯"
  },

  alertsHomework: {
    title: "Ready for Homework?",
    description: "Master alert handling with challenging popup scenarios!",
    buttonText: "Start Alerts Homework →",
    buttonRoute: "/homework/alerts",
    buttonTestId: "homework-button",
    containerTestId: "homework-section"
  },
  
  alertsComplete: {
    title: "Assignment Complete!",
    description: "Outstanding! You've mastered alert testing. Ready for the next challenge?",
    buttonText: "Continue to Next Class: iFrames →",
    buttonRoute: "/class/iframes",
    buttonTestId: "next-class-button",
    containerTestId: "completion-section",
    icon: "🎯"
  },
  
  iframesHomework: {
    title: "Ready for Homework?",
    description: "Test your iframe handling skills with complex scenarios!",
    buttonText: "Start iFrames Homework →",
    buttonRoute: "/homework/iframes",
    buttonTestId: "homework-button",
    containerTestId: "homework-section"
  },
  
  iframesComplete: {
    title: "Assignment Complete!",
    description: "Excellent! You've mastered iframe testing. Ready for the final challenge?",
    buttonText: "Continue to Next Class: Mouse Actions →",
    buttonRoute: "/class/mouse-actions",
    buttonTestId: "next-class-button",
    containerTestId: "completion-section",
    icon: "🎯"
  },
  
  mouseActionsHomework: {
    title: "Ready for Homework?",
    description: "Perfect your mouse action skills with advanced interaction scenarios!",
    buttonText: "Start Mouse Actions Homework →",
    buttonRoute: "/homework/mouse-actions",
    buttonTestId: "homework-button",
    containerTestId: "homework-section"
  },
  
  mouseActionsComplete: {
    title: "Course Complete!",
    description: "Congratulations! You've mastered all QA automation fundamentals. Time to put it all together!",
    buttonText: "Back to Dashboard →",
    buttonRoute: "/dashboard",
    buttonTestId: "dashboard-button",
    containerTestId: "completion-section",
    icon: "🏆"
  }
} as const;