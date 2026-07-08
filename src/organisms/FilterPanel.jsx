import React from 'react';
import { SearchBar, FilterSelect } from '../molecules';

export function FilterPanel({ 
  searchTerm, 
  onSearchChange,
  filterUrgency,
  onUrgencyChange,
  filterStatus,
  onStatusChange,
}) {
  const urgencyOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'high', label: 'Urgente' },
    { value: 'medium', label: 'Média' },
    { value: 'low', label: 'Baixa' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'pending', label: 'Pendente' },
    { value: 'in-progress', label: 'Em andamento' },
    { value: 'resolved', label: 'Resolvido' },
  ];

  const orderOptions = [
    { value: 'recent', label: 'Mais recentes' },
    { value: 'urgent', label: 'Mais urgentes' },
  ];

  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex flex-col gap-6">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Buscar por título ou localização..."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FilterSelect
            label="Urgência"
            value={filterUrgency}
            onChange={onUrgencyChange}
            options={urgencyOptions}
          />
          <FilterSelect
            label="Status"
            value={filterStatus}
            onChange={onStatusChange}
            options={statusOptions}
          />
          <FilterSelect
            label="Ordenação"
            value="recent"
            onChange={() => {}}
            options={orderOptions}
          />
        </div>
      </div>
    </div>
  );
}
