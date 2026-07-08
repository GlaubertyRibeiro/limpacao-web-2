import React from 'react';

export function Heading({ 
  level = 1, 
  children, 
  className = '' 
}) {
  const sizeStyles = {
    1: 'text-4xl font-bold',
    2: 'text-3xl font-bold',
    3: 'text-2xl font-bold',
    4: 'text-xl font-bold',
    5: 'text-lg font-bold',
    6: 'text-base font-bold',
  };

  const Element = `h${level}`;

  return React.createElement(
    Element,
    { className: `text-slate-900 ${sizeStyles[level]} ${className}` },
    children
  );
}
