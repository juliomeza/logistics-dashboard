import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 ${className}`}>
      {children}
    </div>
  );
};

export default Card;