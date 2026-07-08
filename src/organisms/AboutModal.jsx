import React from 'react';
import { Modal } from './Modal';

export function AboutModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quem Somos" submitLabel="Fechar" onSubmit={onClose}>
      <div className="prose">
        <h3>Quem Somos</h3>
        <p>Somos um projeto dedicado a mapear e denunciar áreas poluídas, reunindo informações da comunidade para promover ações ambientais.</p>
        <p>Nosso objetivo é facilitar a comunicação entre cidadãos e autoridades, fornecendo dados claros e acessíveis.</p>
      </div>
    </Modal>
  );
}
