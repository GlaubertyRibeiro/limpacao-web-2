import React from 'react';
import { StatCard } from '../molecules';
import { BarChart3, CheckCircle2, Clock } from 'lucide-react';

export function StatsPanel({ stats = {}, myReports = 0, onFilterStatus }) {
  const {
    total = 0,
    resolved = 0,
    inProgress = 0,
  } = stats;

  const completionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  return (
    <section className="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-500 text-white py-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-100/80">Painel de acompanhamento</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Visão geral dos reportes</h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100/90">
              Acompanhe o volume de reportes, o progresso das ações e os casos resolvidos em tempo real.
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 px-5 py-4 shadow-lg backdrop-blur-sm w-full sm:w-auto">
            <p className="text-sm text-emerald-100">Taxa de resolução</p>
            <p className="mt-2 text-4xl font-semibold text-white">{completionRate}%</p>
            <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-white" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            icon={BarChart3}
            value={total}
            label="Reportes cadastrados"
            textColor="white"
            className="bg-white/15 border-white/20"
            onClick={() => onFilterStatus && onFilterStatus('all')}
          />
          <StatCard
            icon={CheckCircle2}
            value={resolved}
            label="Problemas resolvidos"
            textColor="white"
            className="bg-white/15 border-white/20"
            onClick={() => onFilterStatus && onFilterStatus('resolved')}
          />
          <StatCard
            icon={Clock}
            value={inProgress}
            label="Em andamento"
            textColor="white"
            className="bg-white/15 border-white/20"
            onClick={() => onFilterStatus && onFilterStatus('in-progress')}
          />
          <StatCard
            icon={BarChart3}
            value={myReports}
            label="Meus reportes"
            textColor="white"
            className="bg-white/15 border-white/20"
            onClick={() => onFilterStatus && onFilterStatus('myReports')}
          />
        </div>
      </div>
    </section>
  );
}
