import React from 'react';
import { MapPin } from 'lucide-react';
import { Icon, Text } from '../atoms';

export function LocationField({ 
  location,
  className = '' 
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon component={MapPin} size={16} color="#22c55e" className="text-green-500 flex-shrink-0" />
      <Text size="sm" color="slate" className="line-clamp-1">
        {location}
      </Text>
    </div>
  );
}
