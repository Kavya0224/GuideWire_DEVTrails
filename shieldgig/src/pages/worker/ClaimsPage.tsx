import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CloudRain, Wind, Zap, Building, Clock, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Badge, statusToBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatCurrency, formatDateTime, getFraudColor } from '../../lib/utils';
import type { Claim } from '../../types';

const typeIcon: Record<string, React.ReactNode> = {
  weather: <CloudRain className="w-4 h-4" />,
  aqi: <Wind className="w-4 h-4" />,
  curfew: <AlertTriangle className="w-4 h-4" />,
  platform_outage: <Zap className="w-4 h-4" />,
  accident: <Building className="w-4 h-4" />,
};

const typeColor: Record<string, string> = {
  weather: 'bg-blue-500/10 text-blue-400',
  aqi: 'bg-amber-500/10 text-amber-400',
  curfew: 'bg-red-500/10 text-red-400',
  platform_outage: 'bg-purple-500/10 text-purple-400',
  accident: 'bg-rose-500/10 text-rose-400',
};

export const ClaimsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    mockApi.getClaims(user?.id).then(c => { setClaims(c); setLoading(false); });
  }, [user]);

  const filtered = filter === 'all' ? claims : claims.filter(c => c.status === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">My Claims</h2>
          <p className="text-slate-400 text-sm">{claims.length} total claims on record</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'approved', 'under_review', 'pending', 'rejected'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                filter === s
                  ? 'bg-indigo-600 text-white'
                  : 'bg-surface-700 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card p-5 h-20 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-16">
          <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <p className="text-slate-400 text-lg font-medium">No claims found</p>
          <p className="text-slate-500 text-sm mt-1">Your shield is protecting you — no disruptions detected yet</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((claim, idx) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card overflow-hidden"
            >
              <div
                className="flex items-center gap-4 p-5 cursor-pointer hover:bg-white/2 transition-colors"
                onClick={() => setExpanded(expanded === claim.id ? null : claim.id)}
              >
                <div className={`p-2.5 rounded-xl flex-shrink-0 ${typeColor[claim.type]}`}>
                  {typeIcon[claim.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-white capitalize">{claim.type.replace('_', ' ')}</p>
                    {statusToBadge(claim.status)}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{claim.description}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-white">{formatCurrency(claim.amount)}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{formatDateTime(claim.requestedAt)}</p>
                </div>

                <div className="text-slate-500 flex-shrink-0">
                  {expanded === claim.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded Detail */}
              {expanded === claim.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-slate-800 p-5 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3 bg-surface-700/50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Claim ID</p>
                      <p className="text-sm font-mono font-semibold text-white">{claim.id.toUpperCase()}</p>
                    </div>
                    <div className="p-3 bg-surface-700/50 rounded-xl">
                      <p className="text-xs text-slate-500 mb-1">Location</p>
                      <p className="text-sm font-semibold text-white">{claim.zone}, {claim.city}</p>
                    </div>
                    {claim.resolvedAt && (
                      <div className="p-3 bg-surface-700/50 rounded-xl">
                        <p className="text-xs text-slate-500 mb-1">Resolved At</p>
                        <p className="text-sm font-semibold text-white">{formatDateTime(claim.resolvedAt)}</p>
                      </div>
                    )}
                  </div>

                  {/* Fraud Score */}
                  <div className="p-4 bg-surface-700/50 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-white">AI Fraud Analysis</p>
                      <span className={`text-lg font-bold ${getFraudColor(claim.fraudScore)}`}>
                        {claim.fraudScore}/100
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${claim.fraudScore}%` }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className={`h-full rounded-full ${
                          claim.fraudScore < 30 ? 'bg-emerald-500' :
                          claim.fraudScore < 60 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    {claim.fraudFlags.length === 0 ? (
                      <p className="text-xs text-emerald-400">✓ No fraud indicators detected</p>
                    ) : (
                      <div className="space-y-2 mt-2">
                        {claim.fraudFlags.map((flag, i) => (
                          <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg text-xs border ${
                            flag.severity === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-300' :
                            flag.severity === 'medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' :
                            'bg-blue-500/10 border-blue-500/20 text-blue-300'
                          }`}>
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold capitalize">{flag.type.replace('_', ' ')}</span>
                              <span className="text-slate-400"> — {flag.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
