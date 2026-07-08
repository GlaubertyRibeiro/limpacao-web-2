import React from 'react';
import { Text } from '../atoms';

export function VoteSection({ 
  votes = 0,
  className = '' 
}) {
  return (
    <div className={`text-right ${className}`}>
      <div className="text-sm font-bold text-green-600">{votes}</div>
      <Text size="xs" color="light">votos</Text>
    </div>
  );
}
