import React from 'react';
import { Badge, Icon } from '../atoms';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const statusIcons = {
  pending: AlertCircle,
  'in-progress': Clock,
  resolved: CheckCircle,
};

const urgencyConfig = {
  high: { variant: 'urgentHigh', label: 'Urgente' },
  medium: { variant: 'urgentMedium', label: 'Média' },
  low: { variant: 'urgentLow', label: 'Baixa' },
};

const statusConfig = {
  pending: { variant: 'statusPending', label: 'Pendente' },
  'in-progress': { variant: 'statusInProgress', label: 'Em andamento' },
  resolved: { variant: 'statusResolved', label: 'Resolvido' },
};

export function ReportHeader({ 
  urgency = 'medium', 
  status = 'pending',
  className = ''
}) {
  const urgencyInfo = urgencyConfig[urgency] || urgencyConfig.medium;
  const statusInfo = statusConfig[status] || statusConfig.pending;
  const StatusIcon = statusIcons[status];

  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      <Badge variant={urgencyInfo.variant}>
        {urgencyInfo.label}
      </Badge>
      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
        {StatusIcon && <Icon component={StatusIcon} size={14} />}
        {statusInfo.label}
      </Badge>
    </div>
  );
}
