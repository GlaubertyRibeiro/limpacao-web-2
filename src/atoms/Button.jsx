import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) {
  const variantStyles = {
      primary: 'bg-green-500 hover:bg-green-600 text-white',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
      danger: 'bg-red-100 hover:bg-red-200 text-red-700',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
    };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-medium rounded-lg transition-colors
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
