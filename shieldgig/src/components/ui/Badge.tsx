import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'danger' | 'warn' | 'info' | 'purple';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'default', dot }) => {
  const variants = {
    default: 'text-slate-300 bg-slate-700/80 border-slate-600',
    success: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    danger: 'text-red-400 bg-red-400/10 border-red-400/20',
    warn: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    info: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
      variants[variant],
      className
    )}>
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant === 'success' && 'bg-emerald-400',
          variant === 'danger' && 'bg-red-400',
          variant === 'warn' && 'bg-amber-400',
          variant === 'info' && 'bg-blue-400',
          variant === 'purple' && 'bg-purple-400',
          variant === 'default' && 'bg-slate-400',
        )} />
      )}
      {children}
    </span>
  );
};

export function statusToBadge(status: string): React.ReactElement {
  const map: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
    approved: { label: 'Approved', variant: 'success' },
    completed: { label: 'Completed', variant: 'success' },
    active: { label: 'Active', variant: 'success' },
    pending: { label: 'Pending', variant: 'warn' },
    processing: { label: 'Processing', variant: 'warn' },
    monitoring: { label: 'Monitoring', variant: 'warn' },
    under_review: { label: 'Under Review', variant: 'info' },
    rejected: { label: 'Rejected', variant: 'danger' },
    failed: { label: 'Failed', variant: 'danger' },
    resolved: { label: 'Resolved', variant: 'default' },
  };
  const { label, variant } = map[status] || { label: status, variant: 'default' as BadgeProps['variant'] };
  return <Badge variant={variant} dot>{label}</Badge>;
}
