import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../atoms';

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Buscar...',
  className = ''
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-3 text-slate-400" size={20} />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
