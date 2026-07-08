import React from 'react';
import { Modal } from './Modal';

export function MeusDadosModal({ isOpen, onClose, user = {} }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Perfil" submitLabel="Fechar" onSubmit={onClose}>
      <div className="space-y-3">
        <p><strong>Nome:</strong> {user.name || 'Usuário'}</p>
        <p><strong>Email:</strong> {user.email || 'usuario@exemplo.com'}</p>
        <p><strong>Cidade:</strong> {user.city || '—'}</p>
      </div>
    </Modal>
  );
}

export default MeusDadosModal;
