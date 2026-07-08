import React from 'react';

export function Input({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  required = false,
  disabled = false,
  error = '',
  className = '',
  ...props 
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border border-slate-300 rounded-2xl bg-slate-50
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          disabled:bg-slate-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
