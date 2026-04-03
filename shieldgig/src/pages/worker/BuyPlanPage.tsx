import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, ShieldCheck } from 'lucide-react';
import { mockApi } from '../../lib/mockApi';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { Plan } from '../../types';

export const BuyPlanPage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    mockApi.getPlans().then(p => { setPlans(p); setLoading(false); });
  }, []);

  const handlePurchase = async (planId: Plan['id']) => {
    setPurchasing(planId);
    const res = await mockApi.purchasePlan(user!.id, planId);
    if (res.success) {
      updateUser({ plan: planId });
      setSuccess(planId);
    }
    setPurchasing(null);
  };

  const colorMap: Record<string, string> = {
    basic: 'from-slate-600/20 to-slate-700/20 border-slate-600/30',
    plus: 'from-indigo-600/25 to-purple-700/25 border-indigo-500/40',
    pro: 'from-amber-600/20 to-orange-700/20 border-amber-500/40',
  };
  const iconColorMap: Record<string, string> = {
    basic: 'text-slate-400 bg-slate-700',
    plus: 'text-indigo-400 bg-indigo-500/20',
    pro: 'text-amber-400 bg-amber-500/20',
  };

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass-card p-6 h-96 animate-pulse" />
      ))}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Choose Your Shield Plan</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Parametric insurance that automatically triggers payouts based on verified disruption data — no paperwork required.
        </p>
        {user?.plan !== 'none' && (
          <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium capitalize">
              Current Plan: {user?.plan} Shield — Active
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => {
          const isActive = user?.plan === plan.id;
          const isSuccess = success === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative glass-card p-6 bg-gradient-to-br border ${colorMap[plan.id]} ${plan.popular ? 'ring-2 ring-indigo-500/50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 bg-indigo-600 rounded-full text-white text-xs font-bold">
                    <Star className="w-3 h-3" /> MOST POPULAR
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl ${iconColorMap[plan.id]}`}>
                  {plan.id === 'pro' ? <Zap className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400">Up to {plan.coverage >= 1000 ? `₹${(plan.coverage/1000).toFixed(1)}k` : `₹${plan.coverage}`}/day</p>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                  <span className="text-slate-400 text-sm mb-1">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">≈ ₹{(plan.price / 30).toFixed(0)}/day for peace of mind</p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>

              {isActive || isSuccess ? (
                <div className="flex items-center justify-center gap-2 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold text-sm">
                    {isSuccess ? 'Activated!' : 'Current Plan'}
                  </span>
                </div>
              ) : (
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  loading={purchasing === plan.id}
                  onClick={() => handlePurchase(plan.id)}
                >
                  {purchasing === plan.id ? 'Activating…' : `Get ${plan.name}`}
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border-indigo-500/20">
        <div className="flex flex-wrap items-center gap-6">
          {[
            { label: '15,847', desc: 'Protected Workers' },
            { label: '₹2.84Cr', desc: 'Paid Out This Month' },
            { label: '12 min', desc: 'Avg Payout Time' },
            { label: '99.2%', desc: 'Claim Approval Rate' },
          ].map(({ label, desc }) => (
            <div key={desc} className="flex-1 min-w-[120px] text-center">
              <p className="text-2xl font-bold gradient-text">{label}</p>
              <p className="text-slate-400 text-xs mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
