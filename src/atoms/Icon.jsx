import React from 'react';

export function Icon({ 
  component: Component, 
  size = 20, 
  color = 'currentColor',
  className = '',
  ...props 
}) {
  if (!Component) return null;
  
  return (
    <Component 
      size={size} 
      color={color}
      className={className}
      {...props}
    />
  );
}
