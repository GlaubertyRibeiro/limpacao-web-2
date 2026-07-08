import React from 'react';
import { Button } from '../atoms';
import { Logo } from '../molecules';
import { Plus, LogOut } from 'lucide-react';

const tabs = [
  { key: 'home', label: 'Página inicial' },
  { key: 'myReports', label: 'Meus reportes' },
  { key: 'works', label: 'Conheça nossos trabalhos' },
  { key: 'myData', label: 'Perfil' },
];

export function Header({ onNewReportClick, activeTab, onNavigate, user, onLogout }) {
  const handleNavigate = (tab) => {
    if (onNavigate) onNavigate(tab);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
        <div className="flex items-center justify-between gap-3 md:justify-start">
          <Logo size="md" />
          {user && (
            <span className="text-sm text-slate-600 md:hidden">
              Olá, <span className="font-semibold">{user.name}</span>
            </span>
          )}
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 p-1.5 shadow-sm md:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleNavigate(tab.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                activeTab === tab.key
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center justify-center gap-2 md:justify-end">
          {user && (
            <span className="hidden text-sm text-slate-600 md:inline">
              Olá, <span className="font-semibold">{user.name}</span>
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="flex items-center gap-1 text-slate-500 hover:text-red-600"
          >
            <LogOut size={16} />
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onNewReportClick}
            className="flex items-center gap-2 px-3 py-2 sm:px-4"
          >
            <Plus size={18} />
            <span className="text-sm">Reportar</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
