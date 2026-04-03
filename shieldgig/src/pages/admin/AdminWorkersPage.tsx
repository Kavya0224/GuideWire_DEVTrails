import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, ShieldCheck, TrendingUp } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { formatCurrency } from '../../lib/utils';
import type { User } from '../../types';

const platformBadge: Record<string, React.ReactElement> = {
  zomato: <Badge variant="danger">Zomato</Badge>,
  swiggy: <Badge variant="warn">Swiggy</Badge>,
  both: <Badge variant="purple">Both</Badge>,
};

const planBadge: Record<string, React.ReactElement> = {
  none: <Badge>No Plan</Badge>,
  basic: <Badge variant="info">Basic</Badge>,
  plus: <Badge variant="purple">Plus</Badge>,
  pro: <Badge variant="success">Pro</Badge>,
};

export const AdminWorkersPage: React.FC = () => {
  const [workers, setWorkers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    mockApi.getAllWorkers().then(w => { setWorkers(w); setLoading(false); });
  }, []);

  const filtered = workers.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.city.toLowerCase().includes(search.toLowerCase()) ||
    w.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Worker Management</h2>
          <p className="text-slate-400 text-sm">{workers.length} registered workers</p>
        </div>
        <div className="w-72">
          <Input
            placeholder="Search by name, city, email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'With Active Plan', value: workers.filter(w => w.plan !== 'none').length, icon: <ShieldCheck className="w-4 h-4" />, color: 'text-emerald-400' },
          { label: 'High Trust (>80%)', value: workers.filter(w => w.trustScore > 80).length, icon: <Users className="w-4 h-4" />, color: 'text-indigo-400' },
          { label: 'High ZARS (>70)', value: workers.filter(w => w.zarsScore > 70).length, icon: <TrendingUp className="w-4 h-4" />, color: 'text-amber-400' },
        ].map(({ label, value, icon, color }) => (
          <Card key={label} className="flex items-center gap-3 p-4">
            <div className={`${color} opacity-80`}>{icon}</div>
            <div>
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <p className="text-sm font-semibold text-white">Worker Directory</p>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-slate-700/40 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-surface-800/50">
                  {['Worker', 'City / Zone', 'Platform', 'Plan', 'Trust', 'ZARS', 'Earnings (Month)'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((w, idx) => (
                  <motion.tr
                    key={w.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b border-slate-800/50 hover:bg-white/2 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {w.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{w.name}</p>
                          <p className="text-xs text-slate-400">{w.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-sm text-white">{w.city}</p>
                      <p className="text-xs text-slate-400">{w.zone}</p>
                    </td>
                    <td className="py-3.5 px-4">{platformBadge[w.platform]}</td>
                    <td className="py-3.5 px-4">{planBadge[w.plan]}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${w.trustScore}%` }} />
                        </div>
                        <span className="text-sm text-slate-300">{w.trustScore}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-sm font-semibold ${w.zarsScore >= 70 ? 'text-emerald-400' : w.zarsScore >= 45 ? 'text-amber-400' : 'text-red-400'}`}>
                        {w.zarsScore}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm font-semibold text-white">{formatCurrency(w.earnings.month)}</span>
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
