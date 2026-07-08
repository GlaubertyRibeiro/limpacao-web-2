import React from 'react';
import { Button } from '../atoms';

export function ButtonGroup({ 
  buttons = [], 
  layout = 'horizontal',
  className = '' 
}) {
  const layoutStyles = {
    horizontal: 'flex gap-3',
    vertical: 'flex flex-col gap-3',
  };

  return (
    <div className={`${layoutStyles[layout]} ${className}`}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant || 'primary'}
          size={button.size || 'md'}
          onClick={button.onClick}
          disabled={button.disabled}
          className={button.className}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}
