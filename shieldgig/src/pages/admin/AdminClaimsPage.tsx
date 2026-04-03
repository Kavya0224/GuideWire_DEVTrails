import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Search } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { statusToBadge, Badge } from '../../components/ui/Badge';
import { formatCurrency, formatDateTime, getFraudColor } from '../../lib/utils';
import type { Claim } from '../../types';

export const AdminClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actioning, setActioning] = useState<string | null>(null);

  useEffect(() => {
    mockApi.getAllClaims().then(c => { setClaims(c); setLoading(false); });
  }, []);

  const filtered = claims.filter(c =>
    c.workerName.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    c.type.includes(search.toLowerCase())
  );

  const handleAction = async (claimId: string, action: 'approve' | 'reject') => {
    setActioning(claimId + action);
    if (action === 'approve') await mockApi.approveClaim(claimId);
    else await mockApi.rejectClaim(claimId);
    const updated = await mockApi.getAllClaims();
    setClaims(updated);
    setActioning(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Claims Management</h2>
          <p className="text-slate-400 text-sm">{claims.length} total claims</p>
        </div>
        <div className="w-72">
          <Input placeholder="Search claims…" value={search} onChange={e => setSearch(e.target.value)} icon={<Search className="w-4 h-4" />} />
        </div>
      </div>

      {/* Summary counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Approved', count: claims.filter(c => c.status === 'approved').length, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
          { label: 'Pending', count: claims.filter(c => c.status === 'pending').length, color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
          { label: 'Under Review', count: claims.filter(c => c.status === 'under_review').length, color: 'text-blue-400 border-blue-500/20 bg-blue-500/5' },
          { label: 'Rejected', count: claims.filter(c => c.status === 'rejected').length, color: 'text-red-400 border-red-500/20 bg-red-500/5' },
        ].map(({ label, count, color }) => (
          <div key={label} className={`p-4 rounded-xl border ${color} flex items-center gap-3`}>
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-sm opacity-80">{label}</p>
          </div>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <p className="text-sm font-semibold text-white">All Claims</p>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-slate-700/40 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-surface-800/50">
                  {['Worker', 'Type', 'Amount', 'Fraud Score', 'Status', 'Filed', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((claim, idx) => (
                  <motion.tr
                    key={claim.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b border-slate-800/50 hover:bg-white/2 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <p className="text-sm font-semibold text-white">{claim.workerName}</p>
                      <p className="text-xs text-slate-400">{claim.city}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-slate-300 capitalize">{claim.type.replace('_', ' ')}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm font-bold text-white">{formatCurrency(claim.amount)}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${claim.fraudScore < 30 ? 'bg-emerald-500' : claim.fraudScore < 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${claim.fraudScore}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${getFraudColor(claim.fraudScore)}`}>{claim.fraudScore}</span>
                        {claim.fraudFlags.length > 0 && (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">{statusToBadge(claim.status)}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs text-slate-400">{formatDateTime(claim.requestedAt)}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {(claim.status === 'pending' || claim.status === 'under_review') && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="success"
                            loading={actioning === claim.id + 'approve'}
                            onClick={() => handleAction(claim.id, 'approve')}
                            icon={<CheckCircle className="w-3.5 h-3.5" />}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            loading={actioning === claim.id + 'reject'}
                            onClick={() => handleAction(claim.id, 'reject')}
                            icon={<XCircle className="w-3.5 h-3.5" />}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </motion.div>
  );
};
