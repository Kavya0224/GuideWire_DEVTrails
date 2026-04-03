import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, hover, glow, onClick }) => (
  <motion.div
    whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
    onClick={onClick}
    className={cn(
      'glass-card p-6',
      glow && 'glow-sm',
      hover && 'cursor-pointer hover:border-indigo-500/30 transition-colors duration-300',
      onClick && 'cursor-pointer',
      className
    )}
  >
    {children}
  </motion.div>
);

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color?: 'brand' | 'success' | 'danger' | 'warn';
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label, value, change, trend, icon, color = 'brand', loading
}) => {
  const colorMap = {
    brand: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/20',
    success: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/20',
    danger: 'from-red-500/20 to-rose-500/20 border-red-500/20',
    warn: 'from-amber-500/20 to-orange-500/20 border-amber-500/20',
  };

  const iconColorMap = {
    brand: 'bg-indigo-500/20 text-indigo-400',
    success: 'bg-emerald-500/20 text-emerald-400',
    danger: 'bg-red-500/20 text-red-400',
    warn: 'bg-amber-500/20 text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('glass-card p-5 bg-gradient-to-br border', colorMap[color])}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-2.5 rounded-xl', iconColorMap[color])}>
          {icon}
        </div>
        {change && (
          <span className={cn(
            'text-xs font-semibold px-2 py-1 rounded-lg',
            trend === 'up' && 'text-emerald-400 bg-emerald-400/10',
            trend === 'down' && 'text-red-400 bg-red-400/10',
            trend === 'neutral' && 'text-slate-400 bg-slate-700',
          )}>
            {change}
          </span>
        )}
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="h-8 w-24 bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-32 bg-slate-700/60 rounded animate-pulse" />
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-white mb-1">{value}</p>
          <p className="text-sm text-slate-400">{label}</p>
        </>
      )}
    </motion.div>
  );
};

export const SkeletonCard: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="glass-card p-5 space-y-3">
    <div className="h-5 w-48 bg-slate-700 rounded animate-pulse" />
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className={`h-4 bg-slate-700/70 rounded animate-pulse`} style={{ width: `${70 + (i % 3) * 10}%` }} />
    ))}
  </div>
);
