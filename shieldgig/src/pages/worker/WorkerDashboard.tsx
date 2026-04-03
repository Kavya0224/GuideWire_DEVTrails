import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, ShieldCheck, AlertTriangle, Zap, MapPin,
  Clock, ChevronRight, Wifi, CloudRain, Wind,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { mockApi } from '../../lib/mockApi';
import { StatCard, Card, SkeletonCard } from '../../components/ui/Card';
import { Badge, statusToBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatCurrency, formatDateTime, getZarsLabel } from '../../lib/utils';
import type { Claim } from '../../types';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ANALYTICS_DATA } from '../../lib/mockData';

const earningsData = ANALYTICS_DATA.map(d => ({ date: d.date, amount: d.revenue / 100 }));

export const WorkerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [liveAQI] = useState(287);
  const [liveTemp] = useState(34);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const d = await mockApi.getWorkerDashboard(user!.id);
      setClaims(d.claims.slice(0, 3));
      setLoading(false);
    };
    load();
  }, [user]);

  const zars = getZarsLabel(user?.zarsScore || 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-7xl">
      {/* Welcome Banner */}
      <motion.div variants={itemVariants} className="glass-card p-6 bg-gradient-to-r from-indigo-900/40 to-purple-900/30 border-indigo-500/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'},{' '}
              {user?.name?.split(' ')[0]}! 👋
            </h2>
            <div className="flex items-center gap-2 mt-1 text-slate-400">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span className="text-sm">{user?.zone}, {user?.city}</span>
              <span className="text-slate-600">•</span>
              <span className="text-sm capitalize">{user?.platform} Delivery Partner</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user?.plan !== 'none' ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-emerald-400 font-semibold text-sm capitalize">{user?.plan} Shield</p>
                  <p className="text-emerald-300/70 text-xs">Active coverage</p>
                </div>
              </div>
            ) : (
              <Button onClick={() => navigate('/buy-plan')} size="sm" icon={<ShieldCheck className="w-4 h-4" />}>
                Get Insured
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Live Alerts */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 p-4 glass-card bg-amber-500/10 border-amber-500/30 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 animate-pulse" />
          <p className="text-amber-300 text-sm flex-1">
            <span className="font-semibold">⚠️ AQI Alert:</span> Air Quality Index in {user?.zone} is{' '}
            <span className="font-bold">{liveAQI} (Very Poor)</span>. If disrupted, your claim will auto-trigger.
          </p>
          <Button size="sm" variant="outline" onClick={() => navigate('/claims')}>
            View
          </Button>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : <>
            <StatCard
              label="Today's Earnings"
              value={formatCurrency(user?.earnings.today || 0)}
              change="+12%"
              trend="up"
              icon={<TrendingUp className="w-5 h-5" />}
              color="brand"
            />
            <StatCard
              label="This Week"
              value={formatCurrency(user?.earnings.week || 0)}
              change="+8%"
              trend="up"
              icon={<TrendingUp className="w-5 h-5" />}
              color="success"
            />
            <StatCard
              label="ZARS Risk Score"
              value={`${user?.zarsScore}/100`}
              change={zars.label}
              trend={user?.zarsScore! >= 60 ? 'up' : 'down'}
              icon={<ShieldCheck className="w-5 h-5" />}
              color={user?.zarsScore! >= 60 ? 'success' : 'warn'}
            />
            <StatCard
              label="Trust Score"
              value={`${user?.trustScore}%`}
              change="Verified"
              trend="neutral"
              icon={<Zap className="w-5 h-5" />}
              color="brand"
            />
          </>
        }
      </motion.div>

      {/* Charts + Conditions Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="xl:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Earnings Overview</h3>
              <Badge variant="info">Last 7 days</Badge>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c1f35" />
                <XAxis dataKey="date" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={v => `₹${v}`} />
                <Tooltip
                  contentStyle={{ background: '#0f1023', border: '1px solid #1c1f35', borderRadius: 12, color: '#e2e8f0' }}
                  formatter={(v) => [`₹${String(v)}`, 'Earnings']}
                />
                <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} fill="url(#earningsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <h3 className="font-semibold text-white mb-4">Live Conditions</h3>
            <div className="space-y-3">
              {[
                { icon: CloudRain, label: 'Weather', value: 'Heavy Rain', status: 'warn', detail: 'Red Alert' },
                { icon: Wind, label: 'AQI Index', value: `${liveAQI} — Very Poor`, status: 'warn', detail: 'Unhealthy' },
                { icon: Wifi, label: 'Zomato Status', value: 'Operational', status: 'success', detail: '99.9% uptime' },
                { icon: MapPin, label: 'Your Zone', value: user?.zone || 'Unknown', status: 'info', detail: user?.city },
              ].map(({ icon: Icon, label, value, status, detail }) => (
                <div key={label} className={`flex items-center gap-3 p-3 rounded-xl border ${
                  status === 'warn' ? 'bg-amber-500/5 border-amber-500/20' :
                  status === 'success' ? 'bg-emerald-500/5 border-emerald-500/20' :
                  'bg-blue-500/5 border-blue-500/20'
                }`}>
                  <Icon className={`w-4 h-4 flex-shrink-0 ${
                    status === 'warn' ? 'text-amber-400' : status === 'success' ? 'text-emerald-400' : 'text-blue-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-semibold text-white truncate">{value}</p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">{detail}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Claims */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Claims</h3>
            <Button size="sm" variant="ghost" onClick={() => navigate('/claims')} iconRight={<ChevronRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 bg-slate-700/40 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : claims.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <ShieldCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No claims yet. Your shield is protecting you!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {claims.map(claim => (
                <motion.div
                  key={claim.id}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-4 p-4 bg-surface-700/50 rounded-xl border border-slate-800 hover:border-indigo-500/20 transition-colors cursor-pointer"
                  onClick={() => navigate('/claims')}
                >
                  <div className={`p-2 rounded-lg ${
                    claim.type === 'weather' ? 'bg-blue-500/10 text-blue-400' :
                    claim.type === 'aqi' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-purple-500/10 text-purple-400'
                  }`}>
                    {claim.type === 'weather' ? <CloudRain className="w-4 h-4" /> :
                     claim.type === 'aqi' ? <Wind className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white capitalize">{claim.type.replace('_', ' ')} Claim</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <p className="text-xs text-slate-400">{formatDateTime(claim.requestedAt)}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-white">{formatCurrency(claim.amount)}</p>
                    <div className="mt-1">{statusToBadge(claim.status)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};
