import React from 'react';
import { Input } from '../atoms';

export function FormField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  required = false,
  error = '',
  disabled = false,
  className = ''
}) {
  return (
    <div className={className}>
      <Input
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        required={required}
        error={error}
        disabled={disabled}
      />
    </div>
  );
}
