import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { Card, StatCard } from '../../components/ui/Card';
import { statusToBadge, Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatCurrency, formatDateTime } from '../../lib/utils';
import type { Payout } from '../../types';

const methodIcon: Record<string, string> = { upi: '📱', bank: '🏦', wallet: '👝' };

export const AdminPayoutsPage: React.FC = () => {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [reprocessing, setReprocessing] = useState<string | null>(null);

  useEffect(() => {
    mockApi.getPayouts().then(p => { setPayouts(p); setLoading(false); });
  }, []);

  const handleReprocess = async (id: string) => {
    setReprocessing(id);
    await new Promise(r => setTimeout(r, 1500));
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'processing' } : p));
    setReprocessing(null);
  };

  const total = payouts.reduce((s, p) => s + (p.status === 'completed' ? p.amount : 0), 0);
  const pending = payouts.reduce((s, p) => s + (p.status === 'processing' || p.status === 'pending' ? p.amount : 0), 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-xl font-bold text-white">Payout Management</h2>
        <p className="text-slate-400 text-sm">Track and manage all worker payouts</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Paid Out" value={formatCurrency(total)} change="Completed" trend="up" icon={<CheckCircle className="w-5 h-5" />} color="success" />
        <StatCard label="Pending / Processing" value={formatCurrency(pending)} change={`${payouts.filter(p => p.status !== 'completed' && p.status !== 'failed').length} payouts`} trend="neutral" icon={<Clock className="w-5 h-5" />} color="warn" />
        <StatCard label="Failed Payouts" value={payouts.filter(p => p.status === 'failed').length} change="Needs action" trend="down" icon={<XCircle className="w-5 h-5" />} color="danger" />
        <StatCard label="Total Transactions" value={payouts.length} change="All time" trend="neutral" icon={<CreditCard className="w-5 h-5" />} color="brand" />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Payout Ledger</p>
          <Badge variant="info">Live</Badge>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-slate-700/40 rounded-xl animate-pulse" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-surface-800/50">
                  {['Worker', 'Amount', 'Method', 'Triggered By', 'Status', 'Created', 'Action'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payouts.map((payout, idx) => (
                  <motion.tr
                    key={payout.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-slate-800/50 hover:bg-white/2 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <p className="text-sm font-semibold text-white">{payout.workerName}</p>
                      <p className="text-xs text-slate-400 font-mono">{payout.id}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm font-bold text-white">{formatCurrency(payout.amount)}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-slate-300">{methodIcon[payout.method]} {payout.method.toUpperCase()}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs text-slate-400">{payout.triggeredBy}</span>
                    </td>
                    <td className="py-3.5 px-4">{statusToBadge(payout.status)}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs text-slate-400">{formatDateTime(payout.createdAt)}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {payout.status === 'failed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          loading={reprocessing === payout.id}
                          onClick={() => handleReprocess(payout.id)}
                          icon={<RefreshCw className="w-3.5 h-3.5" />}
                        >
                          Retry
                        </Button>
                      )}
                      {payout.status === 'completed' && (
                        <span className="text-xs text-slate-500">{formatDateTime(payout.completedAt!)}</span>
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
