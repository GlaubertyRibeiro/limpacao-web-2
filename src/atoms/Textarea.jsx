import React from 'react';

export function Textarea({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  disabled = false,
  error = '',
  rows = 3,
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
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`
          w-full px-4 py-3 border border-slate-300 rounded-2xl bg-slate-50
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          disabled:bg-slate-100 disabled:cursor-not-allowed
          resize-vertical
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
