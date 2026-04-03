import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CreditCard, Activity } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency } from '../../lib/utils';
import type { AnalyticsData } from '../../types';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getAnalytics().then(d => { setData(d); setLoading(false); });
  }, []);

  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalClaims = data.reduce((s, d) => s + d.claims, 0);
  const totalPayouts = data.reduce((s, d) => s + d.payouts, 0);
  const avgWorkers = data.length ? Math.round(data.reduce((s, d) => s + d.activeWorkers, 0) / data.length) : 0;

  if (loading) return (
    <div className="space-y-6 max-w-7xl">
      {Array.from({ length: 3 }).map((_, i) => <div key={i} className="glass-card h-64 animate-pulse" />)}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-xl font-bold text-white">Analytics</h2>
        <p className="text-slate-400 text-sm">Platform-wide performance metrics — last 7 days</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: <TrendingUp className="w-5 h-5" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          { label: 'Total Claims Filed', value: totalClaims, icon: <Activity className="w-5 h-5" />, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
          { label: 'Payouts Disbursed', value: totalPayouts, icon: <CreditCard className="w-5 h-5" />, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
          { label: 'Avg Active Workers', value: avgWorkers.toLocaleString(), icon: <Users className="w-5 h-5" />, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
        ].map(({ label, value, icon, color, bg }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`glass-card p-5 border ${bg}`}>
            <div className={`${color} mb-3`}>{icon}</div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-slate-400 mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue chart */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Revenue Trend</h3>
          <Badge variant="success">+18% vs prev week</Badge>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c1f35" />
            <XAxis dataKey="date" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
  contentStyle={{
    background: '#0f1023',
    border: '1px solid #1c1f35',
    borderRadius: 12,
    color: '#e2e8f0'
  }}
  formatter={(value) => [
    `₹${Number(value ?? 0).toLocaleString()}`,
    'Revenue'
  ]}
/>
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Claims vs Payouts */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Claims vs Payouts</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-indigo-400"><span className="w-2 h-2 rounded-full bg-indigo-500" />Claims</span>
              <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500" />Payouts</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c1f35" />
              <XAxis dataKey="date" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
  contentStyle={{
    background: '#0f1023',
    border: '1px solid #1c1f35',
    borderRadius: 12,
    color: '#e2e8f0'
  }}
  formatter={(value) => [
    `₹${Number(value ?? 0).toLocaleString()}`,
    'Revenue'
  ]}
/>
              <Bar dataKey="claims" name="Claims" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="payouts" name="Payouts" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Active Workers */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Active Workers</h3>
            <Badge variant="purple">Daily</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c1f35" />
              <XAxis dataKey="date" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(1)}k`} />
<Tooltip
  contentStyle={{
    background: '#0f1023',
    border: '1px solid #1c1f35',
    borderRadius: 12,
    color: '#e2e8f0'
  }}
  formatter={(value) => [
    `₹${Number(value ?? 0).toLocaleString()}`,
    'Revenue'
  ]}
/>
              <Line type="monotone" dataKey="activeWorkers" name="Active Workers" stroke="#a78bfa" strokeWidth={2.5} dot={{ fill: '#a78bfa', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Data table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <p className="text-sm font-semibold text-white">Daily Breakdown</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-surface-800/50">
                {['Date', 'Claims Filed', 'Payouts Sent', 'Revenue', 'Active Workers', 'Approval Rate'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <motion.tr key={row.date} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                  className="border-b border-slate-800/50 hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 text-sm font-semibold text-white">{row.date}</td>
                  <td className="py-3 px-4 text-sm text-slate-300">{row.claims}</td>
                  <td className="py-3 px-4 text-sm text-slate-300">{row.payouts}</td>
                  <td className="py-3 px-4 text-sm font-bold text-white">{formatCurrency(row.revenue)}</td>
                  <td className="py-3 px-4 text-sm text-slate-300">{row.activeWorkers.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-emerald-400 font-semibold">
                        {((row.payouts / row.claims) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
};
