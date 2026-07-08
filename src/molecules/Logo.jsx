import React from 'react';
import { Heading, Text } from '../atoms';

export function Logo({ 
  size = 'md',
  className = '' 
}) {
  const sizeStyles = {
    sm: {
      box: 'w-8 h-8',
      title: 'text-lg',
      subtitle: 'text-xs',
    },
    md: {
      box: 'w-10 h-10',
      title: 'text-2xl',
      subtitle: 'text-xs',
    },
    lg: {
      box: 'w-12 h-12',
      title: 'text-3xl',
      subtitle: 'text-sm',
    },
  };

  const styles = sizeStyles[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${styles.box} bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold text-lg">L</span>
      </div>
      <div>
        <h1 className={`${styles.title} font-bold text-slate-900`}>LimpAção</h1>
        <p className={`${styles.subtitle} text-slate-500`}>Florianópolis mais limpa</p>
      </div>
    </div>
  );
}
