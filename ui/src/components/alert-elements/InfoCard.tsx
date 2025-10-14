import React from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, className = '' }) => {
  return (
    <div className={`card-base card-small card-info card-centered ${className}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-content">
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;