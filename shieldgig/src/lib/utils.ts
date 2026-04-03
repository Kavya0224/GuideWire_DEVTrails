import clsx from 'clsx';

export function cn(...inputs: Parameters<typeof clsx>) {
  return clsx(...inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'approved': case 'completed': case 'active': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'pending': case 'processing': case 'monitoring': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'rejected': case 'failed': return 'text-red-400 bg-red-400/10 border-red-400/20';
    case 'under_review': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'resolved': return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    default: return 'text-slate-400 bg-slate-700/50 border-slate-600';
  }
}

export function getFraudColor(score: number): string {
  if (score < 30) return 'text-emerald-400';
  if (score < 60) return 'text-amber-400';
  return 'text-red-400';
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
    case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
    case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    default: return 'text-slate-400';
  }
}

export function getZarsLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Excellent', color: 'text-emerald-400' };
  if (score >= 60) return { label: 'Good', color: 'text-blue-400' };
  if (score >= 40) return { label: 'Fair', color: 'text-amber-400' };
  return { label: 'Poor', color: 'text-red-400' };
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
