import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('arjun@worker.com');
  const [password, setPassword] = useState('password123');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
    const user = useAuthStore.getState().user;
    if (user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    }
  };

  const quickLogin = async (role: 'worker' | 'admin') => {
    clearError();
    const e = role === 'admin' ? 'admin@shieldgig.in' : 'arjun@worker.com';
    await login(e, 'password');
    const user = useAuthStore.getState().user;
    if (user) navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-900 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-surface-900" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(99,102,241,0.15) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(167,139,250,0.1) 0%, transparent 50%)`
        }} />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">ShieldGig</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Income protection<br />for the gig economy
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              AI-powered parametric insurance that detects<br />disruptions and pays you instantly.
            </p>
            <div className="space-y-4">
              {[
                { icon: '🌧️', text: 'Auto-detects weather, AQI & curfews' },
                { icon: '⚡', text: 'Instant payouts in under 15 minutes' },
                { icon: '🛡️', text: 'AI fraud protection built-in' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 p-4 glass-card border-indigo-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">A</div>
                <div>
                  <p className="text-white text-sm font-semibold">Arjun Sharma</p>
                  <p className="text-slate-400 text-xs">Zomato Delivery Partner, Mumbai</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm italic">"Got ₹1,200 in 8 minutes during the monsoon red alert. No forms, no waiting!"</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ShieldGig</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 mb-8">Sign in to your ShieldGig account</p>

          {/* Quick login buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => quickLogin('worker')}
              className="flex-1 py-2.5 px-4 glass-card border-indigo-500/30 text-indigo-300 text-sm font-medium hover:bg-indigo-500/10 transition-colors rounded-xl"
            >
              🛵 Demo Worker
            </button>
            <button
              onClick={() => quickLogin('admin')}
              className="flex-1 py-2.5 px-4 glass-card border-purple-500/30 text-purple-300 text-sm font-medium hover:bg-purple-500/10 transition-colors rounded-xl"
            >
              ⚡ Demo Admin
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-500 text-xs">or sign in manually</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              iconRight={
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
            <Button type="submit" size="lg" loading={isLoading} className="w-full" iconRight={<ArrowRight className="w-4 h-4" />}>
              Sign In
            </Button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Create one free
            </Link>
          </p>

          <div className="mt-6 p-4 bg-surface-700/50 rounded-xl border border-slate-800">
            <p className="text-slate-400 text-xs mb-2 font-medium">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-slate-500">
              <p>Worker: arjun@worker.com / any password</p>
              <p>Admin: admin@shieldgig.in / any password</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
