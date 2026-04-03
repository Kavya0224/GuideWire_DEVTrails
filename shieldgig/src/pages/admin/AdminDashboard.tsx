import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, CreditCard, AlertTriangle, TrendingUp, Clock, Zap, Activity } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { StatCard, Card, SkeletonCard } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { statusToBadge } from '../../components/ui/Badge';
import { formatCurrency, formatDateTime } from '../../lib/utils';
import { MOCK_CLAIMS, MOCK_TRIGGERS, ANALYTICS_DATA } from '../../lib/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    mockApi.getAdminDashboard().then(d => { setStats(d); setLoading(false); });
  }, []);

  const pieData = [
    { name: 'Approved', value: 58 },
    { name: 'Pending', value: 21 },
    { name: 'Under Review', value: 13 },
    { name: 'Rejected', value: 8 },
  ];

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6 max-w-7xl">
      {/* Header Banner */}
      <motion.div variants={item} className="glass-card p-5 bg-gradient-to-r from-purple-900/40 to-indigo-900/30 border-purple-500/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Admin Control Center</h2>
            <p className="text-slate-400 text-sm mt-0.5">Real-time operations overview — ShieldGig Platform</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400">All Systems Live</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-semibold text-red-400">
                {MOCK_TRIGGERS.filter(t => t.status === 'active').length} Active Alerts
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={item} className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} lines={2} />)
          : <>
            <StatCard label="Total Workers" value={stats?.totalWorkers?.toLocaleString()} change="+234 this week" trend="up" icon={<Users className="w-5 h-5" />} color="brand" />
            <StatCard label="Active Insured" value={stats?.activeInsured?.toLocaleString()} change="58.3% coverage" trend="up" icon={<ShieldCheck className="w-5 h-5" />} color="success" />
            <StatCard label="Payouts This Month" value={formatCurrency(stats?.totalPayoutsMonth)} change="+18% MoM" trend="up" icon={<CreditCard className="w-5 h-5" />} color="warn" />
            <StatCard label="Claims Processed" value={stats?.claimsProcessed?.toLocaleString()} change="4,821 this month" trend="up" icon={<Activity className="w-5 h-5" />} color="brand" />
            <StatCard label="Fraud Prevented" value={formatCurrency(stats?.fraudPrevented)} change="312 blocked" trend="neutral" icon={<AlertTriangle className="w-5 h-5" />} color="danger" />
            <StatCard label="Avg Payout Time" value={`${stats?.avgPayoutTime} min`} change="-2.1 min" trend="up" icon={<Clock className="w-5 h-5" />} color="success" />
            <StatCard label="Risk Alerts" value={stats?.riskAlerts} change="2 critical" trend="down" icon={<Zap className="w-5 h-5" />} color="danger" />
            <StatCard label="Platform Health" value="99.9%" change="Operational" trend="neutral" icon={<Activity className="w-5 h-5" />} color="success" />
          </>
        }
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div variants={item} className="xl:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Claims & Payouts Trend</h3>
              <Badge variant="info">Last 7 days</Badge>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ANALYTICS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c1f35" />
                <XAxis dataKey="date" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
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
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <h3 className="font-semibold text-white mb-4">Claims by Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
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
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Revenue chart */}
      <motion.div variants={item}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Revenue Overview</h3>
            <Badge variant="success">+18% vs last week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={ANALYTICS_DATA}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Recent claims + Active triggers */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <h3 className="font-semibold text-white mb-4">Recent Claims</h3>
            <div className="space-y-3">
              {MOCK_CLAIMS.slice(0, 4).map(claim => (
                <div key={claim.id} className="flex items-center gap-3 p-3 bg-surface-700/40 rounded-xl border border-slate-800">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{claim.workerName}</p>
                    <p className="text-xs text-slate-400 capitalize">{claim.type.replace('_', ' ')} — {claim.city}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-white">{formatCurrency(claim.amount)}</p>
                    <div className="mt-1">{statusToBadge(claim.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <h3 className="font-semibold text-white mb-4">Active Triggers</h3>
            <div className="space-y-3">
              {MOCK_TRIGGERS.filter(t => t.status === 'active').map(trigger => (
                <div key={trigger.id} className="p-3 bg-surface-700/40 rounded-xl border border-red-500/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-semibold text-white capitalize">{trigger.type.replace('_', ' ')} — {trigger.city}</p>
                    <Badge variant="danger" dot>{trigger.severity}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{trigger.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>👷 {trigger.affectedWorkers.toLocaleString()} affected</span>
                    <span>💰 {formatCurrency(trigger.payoutAmount)}/worker</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
