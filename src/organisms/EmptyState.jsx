import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Text } from '../atoms';

export function EmptyState({ onNewReportClick }) {
  return (
    <div className="glass-panel max-w-2xl mx-auto text-center py-16 px-8">
      <AlertCircle size={52} className="mx-auto text-slate-400 mb-5" />
      <h3 className="text-2xl font-semibold text-slate-900 mb-3">Nenhum report encontrado</h3>
      <p className="text-slate-600 mb-8">Ajuste os filtros ou adicione um novo reporte para ajudar a comunidade.</p>
      <button
        onClick={onNewReportClick}
        className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-2xl font-semibold transition-colors"
      >
        + Ser o primeiro a reportar
      </button>
    </div>
  );
}
