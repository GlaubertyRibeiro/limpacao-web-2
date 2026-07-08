import React, { useEffect, useState } from 'react';
import { FormField } from '../molecules';
import { Textarea, Select } from '../atoms';
import { Modal } from './Modal';

export function NewReportForm({ 
  formData, 
  onFormChange,
  errors = {}
}) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [tempImage, setTempImage] = useState(formData.image || '');

  useEffect(() => {
    setTempImage(formData.image || '');
  }, [formData.image]);
  const urgencyOptions = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Urgente' },
  ];

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Novo reporte</h3>
        <p className="text-sm text-slate-500 mt-1">Preencha os dados abaixo. Campos obrigatórios estão marcados.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FormField
            label="Título"
            value={formData.title}
            onChange={(value) => onFormChange('title', value)}
            placeholder="Ex: Lixo na Praia da Armação"
            required
            error={errors.title}
          />
        </div>

        <div>
          <FormField
            label="Localização"
            value={formData.location}
            onChange={(value) => onFormChange('location', value)}
            placeholder="Ex: Praia da Armação, Florianópolis"
            required
            error={errors.location}
          />
        </div>

        <div className="sm:col-span-2">
          <Textarea
            label="Descrição"
            value={formData.description}
            onChange={(e) => onFormChange('description', e.target.value)}
            placeholder="Descreva o problema..."
            required
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <Select
            label="Urgência"
            value={formData.urgency}
            onChange={(e) => onFormChange('urgency', e.target.value)}
            options={urgencyOptions}
          />
          {errors.urgency && (
            <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Realizar multirão?</label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="multirao"
                value="true"
                checked={formData.multirao === true}
                onChange={() => onFormChange('multirao', true)}
                className="h-4 w-4 text-sky-600"
              />
              Sim
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="multirao"
                value="false"
                checked={formData.multirao === false}
                onChange={() => onFormChange('multirao', false)}
                className="h-4 w-4 text-sky-600"
              />
              Não
            </label>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Foto <span className="text-red-500">*</span></label>
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => { setTempImage(formData.image || ''); setShowImageModal(true); }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm5 3a1 1 0 112 0v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6z" />
              </svg>
              Adicionar / Alterar foto
            </button>

            {formData.image ? (
              <div className="w-36 overflow-hidden rounded-md border border-slate-200">
                <img src={formData.image} alt="Preview" className="w-full h-24 object-cover" />
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-sm text-slate-500">Nenhuma foto selecionada. A foto é obrigatória para criar um report.</p>
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}

          <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)} title="Selecionar foto" onSubmit={() => { onFormChange('image', tempImage); setShowImageModal(false); }} submitLabel="Salvar" zIndex={1100}>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return setTempImage('');
                  const reader = new FileReader();
                  reader.onload = () => setTempImage(reader.result);
                  reader.readAsDataURL(file);
                }}
                className="block w-full text-sm text-slate-600"
              />

              {tempImage ? (
                <div className="mt-3 w-full max-w-xs overflow-hidden rounded-md border border-slate-200">
                  <img src={tempImage} alt="Preview" className="w-full h-36 object-cover" />
                </div>
              ) : (
                <p className="text-sm text-slate-500">Nenhuma imagem selecionada</p>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
