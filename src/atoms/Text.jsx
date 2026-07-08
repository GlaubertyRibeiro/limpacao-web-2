import React from 'react';

export function Text({ 
  children, 
  size = 'md',
  color = 'slate',
  weight = 'normal',
  className = '',
  ...props 
}) {
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const colorStyles = {
    slate: 'text-slate-600',
    dark: 'text-slate-900',
    light: 'text-slate-400',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
  };

  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <p
      className={`
        ${sizeStyles[size]}
        ${colorStyles[color]}
        ${weightStyles[weight]}
        ${className}
      `}
      {...props}
    >
      {children}
    </p>
  );
}
