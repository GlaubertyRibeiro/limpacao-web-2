import React from 'react';
import { Select } from '../atoms';

export function FilterSelect({ 
  label, 
  value, 
  onChange, 
  options = [],
  className = ''
}) {
  return (
    <div className={className}>
      <Select
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
      />
    </div>
  );
}
