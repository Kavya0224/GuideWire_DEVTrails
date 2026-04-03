import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Activity, TrendingDown } from 'lucide-react';
import { MOCK_CLAIMS } from '../../lib/mockData';
import { Card, StatCard } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { getFraudColor, formatDateTime } from '../../lib/utils';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

export const AdminFraudPage: React.FC = () => {
  const highRisk = MOCK_CLAIMS.filter(c => c.fraudScore >= 60);
  const medRisk = MOCK_CLAIMS.filter(c => c.fraudScore >= 30 && c.fraudScore < 60);
  const lowRisk = MOCK_CLAIMS.filter(c => c.fraudScore < 30);

  const scatterData = MOCK_CLAIMS.map(c => ({
    x: c.fraudScore,
    y: c.fraudFlags.length,
    name: c.workerName,
    amount: c.amount,
    id: c.id,
  }));

  const flagStats = [
    { type: 'location_mismatch', count: MOCK_CLAIMS.filter(c => c.fraudFlags.some(f => f.type === 'location_mismatch')).length },
    { type: 'repeated_claim', count: MOCK_CLAIMS.filter(c => c.fraudFlags.some(f => f.type === 'repeated_claim')).length },
    { type: 'suspicious_timing', count: MOCK_CLAIMS.filter(c => c.fraudFlags.some(f => f.type === 'suspicious_timing')).length },
    { type: 'device_anomaly', count: MOCK_CLAIMS.filter(c => c.fraudFlags.some(f => f.type === 'device_anomaly')).length },
    { type: 'velocity_check', count: MOCK_CLAIMS.filter(c => c.fraudFlags.some(f => f.type === 'velocity_check')).length },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-xl font-bold text-white">Fraud Detection</h2>
        <p className="text-slate-400 text-sm">AI-powered fraud analysis of all submitted claims</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="High Risk Claims" value={highRisk.length} change="Flagged" trend="down" icon={<AlertTriangle className="w-5 h-5" />} color="danger" />
        <StatCard label="Medium Risk" value={medRisk.length} change="Monitoring" trend="neutral" icon={<Activity className="w-5 h-5" />} color="warn" />
        <StatCard label="Low Risk / Clean" value={lowRisk.length} change="Safe" trend="up" icon={<Shield className="w-5 h-5" />} color="success" />
        <StatCard label="Fraud Prevented" value="₹3.12L" change="This month" trend="up" icon={<TrendingDown className="w-5 h-5" />} color="brand" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Scatter plot */}
        <Card>
          <h3 className="font-semibold text-white mb-4">Fraud Score vs Flag Count</h3>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1c1f35" />
              <XAxis dataKey="x" name="Fraud Score" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: 'Fraud Score', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 11 }} />
              <YAxis dataKey="y" name="Flags" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: 'Flags', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
             <Tooltip
  cursor={{ strokeDasharray: '3 3' }}
  contentStyle={{
    background: '#0f1023',
    border: '1px solid #1c1f35',
    borderRadius: 12,
    color: '#e2e8f0',
    fontSize: 12
  }}
  formatter={(value, name) => [
    Number(value ?? 0),
    name === 'x' ? 'Fraud Score' : 'Flags'
  ]}
/>
              <Scatter data={scatterData} name="Claims">
                {scatterData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.x >= 60 ? '#ef4444' : entry.x >= 30 ? '#f59e0b' : '#10b981'}
                    opacity={0.8}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        {/* Flag breakdown */}
        <Card>
          <h3 className="font-semibold text-white mb-4">Fraud Flag Breakdown</h3>
          <div className="space-y-3">
            {flagStats.map(({ type, count }) => (
              <div key={type} className="flex items-center gap-3">
                <p className="text-sm text-slate-400 capitalize w-40 flex-shrink-0">{type.replace(/_/g, ' ')}</p>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / MOCK_CLAIMS.length) * 100}%` }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="h-full bg-red-500 rounded-full"
                  />
                </div>
                <span className="text-sm text-slate-300 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-3 gap-3">
            {[
              { label: '< 30', desc: 'Clean', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
              { label: '30–60', desc: 'Review', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
              { label: '> 60', desc: 'High Risk', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
            ].map(({ label, desc, color, bg }) => (
              <div key={label} className={`p-2.5 rounded-xl border ${bg} text-center`}>
                <p className={`text-sm font-bold ${color}`}>{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* High risk claims list */}
      <Card>
        <h3 className="font-semibold text-white mb-4">
          High Risk Claims{' '}
          <Badge variant="danger">{highRisk.length} items</Badge>
        </h3>
        <div className="space-y-3">
          {MOCK_CLAIMS.filter(c => c.fraudScore > 0).sort((a, b) => b.fraudScore - a.fraudScore).map((claim, idx) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="flex items-start gap-4 p-4 bg-surface-700/40 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className={`text-2xl font-bold w-12 text-center flex-shrink-0 ${getFraudColor(claim.fraudScore)}`}>
                {claim.fraudScore}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-semibold text-white">{claim.workerName}</p>
                  <Badge variant={claim.fraudScore >= 60 ? 'danger' : claim.fraudScore >= 30 ? 'warn' : 'success'}>
                    {claim.fraudScore >= 60 ? 'High Risk' : claim.fraudScore >= 30 ? 'Medium' : 'Clean'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2 truncate">{claim.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {claim.fraudFlags.map((flag, i) => (
                    <span key={i} className={`text-xs px-2 py-0.5 rounded-full border ${
                      flag.severity === 'high' ? 'text-red-300 border-red-500/30 bg-red-500/10' :
                      flag.severity === 'medium' ? 'text-amber-300 border-amber-500/30 bg-amber-500/10' :
                      'text-blue-300 border-blue-500/30 bg-blue-500/10'
                    }`}>
                      {flag.type.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {claim.fraudFlags.length === 0 && <span className="text-xs text-emerald-400">No flags</span>}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-white">₹{claim.amount.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-0.5">{formatDateTime(claim.requestedAt)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
