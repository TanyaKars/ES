import React from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, className = '' }) => {
  return (
    <div className={`info-card ${className}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default InfoCard;