import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Edit2, Save, X, ShieldCheck, Star, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { mockApi } from '../../lib/mockApi';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, getZarsLabel } from '../../lib/utils';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    zone: user?.zone || '',
  });

  const handleSave = async () => {
    setSaving(true);
    const updated = await mockApi.updateProfile(user!.id, form);
    updateUser(updated);
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const zars = getZarsLabel(user?.zarsScore || 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border-indigo-500/20">
        <div className="flex items-start gap-5 flex-wrap">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold glow">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
              <Badge variant="success" dot>Verified</Badge>
              {user?.plan !== 'none' && (
                <Badge variant="purple" dot>{user?.plan?.toUpperCase()} Shield</Badge>
              )}
            </div>
            <p className="text-slate-400 mt-1">{user?.email}</p>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-indigo-400" />
                {user?.zone}, {user?.city}
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm capitalize">
                <Zap className="w-4 h-4 text-amber-400" />
                {user?.platform} Partner
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant={editing ? 'ghost' : 'outline'}
            icon={editing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            onClick={() => setEditing(!editing)}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Profile updated successfully!
          </motion.div>
        )}
      </Card>

      {/* Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1c1f35" strokeWidth="3.2" />
              <circle
                cx="18" cy="18" r="15.9" fill="none" stroke="#6366f1" strokeWidth="3.2"
                strokeDasharray={`${user?.zarsScore || 0} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xl font-bold ${zars.color}`}>{user?.zarsScore}</span>
            </div>
          </div>
          <p className="text-white font-semibold">ZARS Score</p>
          <p className={`text-sm ${zars.color} font-medium`}>{zars.label}</p>
          <p className="text-slate-500 text-xs mt-1">AI Risk Assessment</p>
        </Card>

        <Card className="text-center">
          <div className="text-5xl font-bold text-emerald-400 mb-2">{user?.trustScore}%</div>
          <p className="text-white font-semibold">Trust Score</p>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${user?.trustScore}%` }} />
          </div>
          <p className="text-slate-500 text-xs mt-2">Claim History</p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-white mb-1">{formatCurrency(user?.earnings.month || 0)}</div>
          <p className="text-slate-400 text-sm mb-2">This Month</p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Today</span>
              <span className="text-white font-medium">{formatCurrency(user?.earnings.today || 0)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">This Week</span>
              <span className="text-white font-medium">{formatCurrency(user?.earnings.week || 0)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Form */}
      {editing ? (
        <Card>
          <h3 className="font-semibold text-white mb-4">Edit Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} icon={<User className="w-4 h-4" />} />
            <Input label="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} icon={<Phone className="w-4 h-4" />} />
            <Input label="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} icon={<MapPin className="w-4 h-4" />} />
            <Input label="Zone / Area" value={form.zone} onChange={e => setForm(f => ({ ...f, zone: e.target.value }))} icon={<MapPin className="w-4 h-4" />} />
          </div>
          <div className="flex gap-3 mt-5">
            <Button onClick={handleSave} loading={saving} icon={<Save className="w-4 h-4" />}>Save Changes</Button>
            <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        </Card>
      ) : (
        <Card>
          <h3 className="font-semibold text-white mb-4">Account Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', value: user?.name },
              { label: 'Email', value: user?.email },
              { label: 'Phone', value: user?.phone },
              { label: 'City', value: user?.city },
              { label: 'Zone', value: user?.zone },
              { label: 'Platform', value: user?.platform, capitalize: true },
              { label: 'Member Since', value: user?.joinedAt },
              { label: 'Active Plan', value: user?.plan === 'none' ? 'No plan' : `${user?.plan} Shield`, capitalize: true },
            ].map(({ label, value, capitalize }) => (
              <div key={label}>
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className={`text-sm font-medium text-white ${capitalize ? 'capitalize' : ''}`}>{value || '—'}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
};
