import React from 'react';

interface RadarLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'default' | 'squid-red' | 'squid-green';
  className?: string;
}

const RadarLoader: React.FC<RadarLoaderProps> = ({ 
  size = 'md', 
  theme = 'default', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32', 
    lg: 'w-40 h-40'
  };

  const themeClasses = {
    default: '',
    'squid-red': 'squid-red',
    'squid-green': 'squid-green'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`loader ${sizeClasses[size]} ${themeClasses[theme]}`}>
        <span></span>
      </div>
    </div>
  );
};

export default RadarLoader;
