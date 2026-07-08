import React, { useState, useEffect } from 'react';
import { Heading, Text } from '../atoms';
import { ReportHeader, LocationField } from '../molecules';
import { Modal } from './Modal';
import { Select } from '../atoms';
import { Pencil, Trash2 } from 'lucide-react';

export function ReportCard({ report, onEdit, onDelete, onOpenChat, onOpenHelpForm, onStatusChange, onToggleParticipation, showActions = false, showOwnerActions = false }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const {
    id,
    title,
    location,
    urgency,
    status,
    date,
    image,
    description,
    author,
    participants = 0,
    helpers = 0,
    helpOffers = [],
    chat = [],
    multirao = false,
    isOwner = false,
  } = report;

  useEffect(() => {
    const handler = (e) => {
      setShowImageModal(e.detail === id);
    };

    window.addEventListener('openImageModal', handler);
    return () => window.removeEventListener('openImageModal', handler);
  }, [id]);

  return (
    <>
      <div
        className={`flex h-full flex-col bg-white rounded-[1.5rem] overflow-hidden shadow-xl border border-slate-200 transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl border-l-4 ${
          urgency === 'high' ? 'border-red-200' : urgency === 'medium' ? 'border-yellow-200' : 'border-blue-200'
        }`}
      >
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            onClick={() => window.dispatchEvent(new CustomEvent('openImageModal', { detail: id }))}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <ReportHeader urgency={urgency} status={status} className="mb-3" />

          {multirao && (
            <div className="mb-3 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
              Multirão confirmado
            </div>
          )}

          <Heading level={3} className="line-clamp-2 mb-2">
            {title}
          </Heading>

          <LocationField location={location} className="mb-3" />

          <Text size="sm" color="slate" className="mb-4 line-clamp-2">
            {description}
          </Text>

          <div className="mt-auto flex flex-col gap-4 pt-3 border-t border-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Text size="xs" color="dark" weight="medium">
                {author}
              </Text>
              <Text size="xs" color="light">
                {date}
              </Text>
            </div>

            <div className="space-y-3 text-right">
              <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-slate-500">
                {multirao && (
                  <span className="rounded-full bg-slate-100 px-3 py-1">{participants} participando</span>
                )}
                <span className="rounded-full bg-slate-100 px-3 py-1">{helpers} ajudando</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{chat.length} mensagens</span>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-slate-500">
                {helpOffers.length > 0 && (
                  <span className="rounded-full bg-slate-100 px-3 py-1">{helpOffers.length} ofertas de ajuda</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200">
            {/* Botões de ação/interação - meio do card */}
            <button
              type="button"
              onClick={onOpenChat}
              className="text-sm text-sky-600 hover:underline"
              aria-label="Abrir chat"
            >
              Ver mensagens
            </button>
            {!isOwner && (
              <>
                <button
                  type="button"
                  onClick={onOpenHelpForm}
                  className={`text-sm ${
                    report.myParticipation?.helping
                      ? 'text-emerald-600 font-semibold'
                      : 'text-blue-600'
                  } hover:underline`}
                  aria-label={report.myParticipation?.helping ? 'Remover ajuda' : 'Quero ajudar'}
                >
                  {report.myParticipation?.helping ? '✓ Ajudando' : 'Quero ajudar'}
                </button>
                {multirao && (
                  <button
                    type="button"
                    onClick={() => onToggleParticipation && onToggleParticipation(report.id, 'participating')}
                    className={`text-sm ${
                      report.myParticipation?.participating
                        ? 'text-emerald-600 font-semibold'
                        : 'text-purple-600'
                    } hover:underline`}
                    aria-label={report.myParticipation?.participating ? 'Cancelar participação' : 'Quero participar'}
                  >
                    {report.myParticipation?.participating ? '✓ Participando' : 'Quero participar'}
                  </button>
                )}
              </>
            )}
          </div>

          {showActions && isOwner && (
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200">
              {/* Botões editar/remover - fundo do card */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onEdit}
                  className="text-sm text-slate-500 hover:text-sky-600 transition-colors"
                  aria-label="Editar"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={onDelete}
                  className="text-sm text-slate-500 hover:text-red-600 transition-colors"
                  aria-label="Remover"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <Select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                options={[
                  { value: 'pending', label: 'Pendente' },
                  { value: 'in-progress', label: 'Em andamento' },
                  { value: 'resolved', label: 'Concluído' },
                ]}
                className="!py-1 !px-2 !text-sm !w-auto"
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        title={title}
        onSubmit={() => setShowImageModal(false)}
        submitLabel="Fechar"
        zIndex={1200}
      >
        <div className="flex justify-center items-center">
          <img src={image} alt={title} className="max-h-[80vh] w-auto object-contain rounded-md" />
        </div>
      </Modal>
    </>
  );
}