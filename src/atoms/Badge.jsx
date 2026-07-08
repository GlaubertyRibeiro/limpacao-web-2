import React from 'react';

export function Badge({ 
  children, 
  variant = 'primary', 
  className = '' 
}) {
  const variantStyles = {
    primary: 'bg-blue-100 text-blue-700 border-blue-200',
    urgentHigh: 'bg-red-100 text-red-700 border-red-200',
    urgentMedium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    urgentLow: 'bg-blue-100 text-blue-700 border-blue-200',
    statusPending: 'bg-slate-100 text-slate-700 border-slate-200',
    statusInProgress: 'bg-amber-100 text-amber-700 border-amber-200',
    statusResolved: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <span
      className={`
        inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
