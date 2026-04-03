import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, CloudRain, Wind, AlertTriangle, Wifi, Play, CheckCircle } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge, statusToBadge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Input';
import { formatCurrency, formatDateTime, getSeverityColor } from '../../lib/utils';
import type { Trigger } from '../../types';

const typeIcon: Record<string, React.ReactNode> = {
  weather: <CloudRain className="w-5 h-5" />,
  aqi: <Wind className="w-5 h-5" />,
  curfew: <AlertTriangle className="w-5 h-5" />,
  platform_outage: <Wifi className="w-5 h-5" />,
};

const typeColor: Record<string, string> = {
  weather: 'text-blue-400 bg-blue-500/10',
  aqi: 'text-amber-400 bg-amber-500/10',
  curfew: 'text-red-400 bg-red-500/10',
  platform_outage: 'text-purple-400 bg-purple-500/10',
};

export const AdminTriggersPage: React.FC = () => {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<Trigger | null>(null);
  const [simForm, setSimForm] = useState({
    type: 'weather',
    city: 'Mumbai',
    severity: 'high',
  });

  useEffect(() => {
    mockApi.getAllTriggers().then(t => { setTriggers(t); setLoading(false); });
  }, []);

  const handleSimulate = async () => {
    setSimulating(true);
    setSimResult(null);
    const result = await mockApi.simulateTrigger(simForm.type, simForm.city, simForm.severity);
    setTriggers(prev => [result, ...prev]);
    setSimResult(result);
    setSimulating(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-xl font-bold text-white">Trigger Simulator</h2>
        <p className="text-slate-400 text-sm">Simulate disruption events and monitor auto-payout trigger status</p>
      </div>

      {/* Simulator Panel */}
      <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border-indigo-500/30">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Event Simulator</h3>
            <p className="text-xs text-slate-400">Simulate real-world disruption triggers for testing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <Select
            label="Event Type"
            value={simForm.type}
            onChange={e => setSimForm(f => ({ ...f, type: e.target.value }))}
            options={[
              { value: 'weather', label: '🌧️ Weather Alert' },
              { value: 'aqi', label: '💨 AQI Alert' },
              { value: 'curfew', label: '🚫 Curfew / Section 144' },
              { value: 'platform_outage', label: '📵 Platform Outage' },
            ]}
          />
          <Select
            label="City"
            value={simForm.city}
            onChange={e => setSimForm(f => ({ ...f, city: e.target.value }))}
            options={[
              { value: 'Mumbai', label: 'Mumbai' },
              { value: 'Delhi', label: 'Delhi' },
              { value: 'Bangalore', label: 'Bangalore' },
              { value: 'Hyderabad', label: 'Hyderabad' },
              { value: 'Ahmedabad', label: 'Ahmedabad' },
              { value: 'Chennai', label: 'Chennai' },
              { value: 'Kolkata', label: 'Kolkata' },
            ]}
          />
          <Select
            label="Severity Level"
            value={simForm.severity}
            onChange={e => setSimForm(f => ({ ...f, severity: e.target.value }))}
            options={[
              { value: 'low', label: '🟢 Low' },
              { value: 'medium', label: '🟡 Medium' },
              { value: 'high', label: '🟠 High' },
              { value: 'critical', label: '🔴 Critical' },
            ]}
          />
        </div>

        <Button
          onClick={handleSimulate}
          loading={simulating}
          icon={<Play className="w-4 h-4" />}
          size="lg"
          className="glow"
        >
          {simulating ? 'Simulating trigger…' : 'Fire Trigger'}
        </Button>

        {simResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <p className="text-emerald-400 font-semibold">Trigger fired successfully!</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div><p className="text-slate-500">Trigger ID</p><p className="text-white font-mono">{simResult.id}</p></div>
              <div><p className="text-slate-500">Affected Workers</p><p className="text-white font-semibold">{simResult.affectedWorkers.toLocaleString()}</p></div>
              <div><p className="text-slate-500">Auto-Payout</p><p className="text-white font-semibold">{formatCurrency(simResult.payoutAmount)}</p></div>
              <div><p className="text-slate-500">Total Liability</p><p className="text-white font-semibold">{formatCurrency(simResult.affectedWorkers * simResult.payoutAmount)}</p></div>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Active triggers */}
      <div>
        <h3 className="font-semibold text-white mb-3">
          All Triggers{' '}
          <Badge variant="warn">{triggers.filter(t => t.status === 'active').length} Active</Badge>
        </h3>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="glass-card h-24 animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-3">
            {triggers.map((trigger, idx) => (
              <motion.div
                key={trigger.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-5"
              >
                <div className="flex items-start gap-4 flex-wrap">
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${typeColor[trigger.type]}`}>
                    {typeIcon[trigger.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-white capitalize">{trigger.type.replace('_', ' ')} — {trigger.city}</p>
                      {statusToBadge(trigger.status)}
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${getSeverityColor(trigger.severity)}`}>
                        {trigger.severity}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{trigger.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span>👷 {trigger.affectedWorkers.toLocaleString()} workers</span>
                      <span>💰 {formatCurrency(trigger.payoutAmount)}/worker</span>
                      <span>🕐 {formatDateTime(trigger.triggeredAt)}</span>
                      {trigger.autoPayoutEnabled && (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Auto-payout enabled
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-white">{formatCurrency(trigger.affectedWorkers * trigger.payoutAmount)}</p>
                    <p className="text-xs text-slate-500">Total liability</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
