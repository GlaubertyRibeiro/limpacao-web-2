import React, { useEffect } from 'react';
import { Button, Heading } from '../atoms';
import { FormField } from '../molecules';

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  onSubmit,
  submitLabel = 'Enviar',
  zIndex = 1000
}) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyle = { zIndex: typeof zIndex === 'number' ? zIndex : 1000 };

  return (
    <div
      style={overlayStyle}
      className="fixed inset-0 bg-slate-950/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[1.25rem] shadow-2xl max-w-xl w-full p-6 border border-slate-200 max-h-[85vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <Heading level={2} className="mb-4">{title}</Heading>
        {children}
        <div className="flex flex-col gap-3 pt-4 mt-6 border-t border-slate-200 sm:flex-row">
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onSubmit}
            className="flex-1"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
