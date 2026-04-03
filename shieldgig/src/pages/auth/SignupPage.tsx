import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [localError, setLocalError] = useState('');

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();
    if (form.password !== form.confirm) {
      setLocalError('Passwords do not match');
      return;
    }
    await signup(form.name, form.email, form.password);
    const user = useAuthStore.getState().user;
    if (user) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">ShieldGig</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 text-center">Create your account</h1>
        <p className="text-slate-400 mb-8 text-center">Start protecting your income today</p>

        <div className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" value={form.name} onChange={set('name')} placeholder="Arjun Sharma" icon={<User className="w-4 h-4" />} required />
            <Input label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" icon={<Mail className="w-4 h-4" />} required />
            <Input label="Phone Number" type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" icon={<Phone className="w-4 h-4" />} required />
            <Input
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={set('password')}
              placeholder="Min. 8 characters"
              icon={<Lock className="w-4 h-4" />}
              iconRight={
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />
            <Input label="Confirm Password" type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" icon={<Lock className="w-4 h-4" />} required />

            {(error || localError) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error || localError}
              </motion.div>
            )}

            <Button type="submit" size="lg" loading={isLoading} className="w-full mt-2" iconRight={<ArrowRight className="w-4 h-4" />}>
              Create Account
            </Button>
          </form>

          <p className="text-slate-500 text-xs text-center mt-4">
            By signing up you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};
