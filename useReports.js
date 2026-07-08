import { useState } from 'react';
import { mockReports } from '../data/mockData';

export function useReports() {
  const [reports, setReports] = useState(mockReports);
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar reports com base nos critérios
  const filteredReports = reports.filter((report) => {
    const matchesUrgency = filterUrgency === 'all' || report.urgency === filterUrgency;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesUrgency && matchesStatus && matchesSearch;
  });

  // Calcular estatísticas
  const stats = {
    total: reports.length,
    resolved: reports.filter((r) => r.status === 'resolved').length,
    inProgress: reports.filter((r) => r.status === 'in-progress').length,
  };

  // Criar novo report
  const addReport = (newReportData) => {
    const newReport = {
      id: reports.length + 1,
      ...newReportData,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1559020615-cd4628902d4a?w=400&h=300&fit=crop',
      author: 'Você',
      votes: 1,
    };
    setReports([newReport, ...reports]);
    return newReport;
  };

  // Atualizar report
  const updateReport = (id, updatedData) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, ...updatedData } : r)));
  };

  // Remover report
  const deleteReport = (id) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  // Votar em report
  const upvoteReport = (id) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, votes: r.votes + 1 } : r)));
  };

  return {
    reports,
    filteredReports,
    stats,
    filterUrgency,
    setFilterUrgency,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    addReport,
    updateReport,
    deleteReport,
    upvoteReport,
  };
}
