import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  className?: string;
  isWarning?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, className = '', isWarning = false }) => {
  return (
    <div className={`stat-card ${className}`}>
      <h3>{title}</h3>
      <p className={isWarning ? 'time-warning' : ''}>{value}</p>
    </div>
  );
};

export default StatCard;