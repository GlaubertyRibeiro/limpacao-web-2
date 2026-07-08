import React from 'react';
import { Heading, Text, Icon } from '../atoms';

export function StatCard({ 
  icon: IconComponent, 
  value, 
  label, 
  className = '',
  textColor = 'slate',
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left bg-white rounded-lg p-6 shadow-sm border border-slate-200 ${className} transition hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <Text size="sm" color={textColor === 'white' ? 'white' : 'light'}>{label}</Text>
          <Heading level={3} className={`mt-2 ${textColor === 'white' ? 'text-white' : ''}`}>{value}</Heading>
        </div>
        {IconComponent && (
          <Icon 
            component={IconComponent} 
            size={32} 
            color={textColor === 'white' ? '#ffffff' : '#22c55e'}
            className={textColor === 'white' ? 'text-white' : 'text-green-500'}
          />
        )}
      </div>
    </button>
  );
}
