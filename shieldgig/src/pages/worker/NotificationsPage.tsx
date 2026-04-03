import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Zap, ShieldCheck, AlertTriangle, Info, CreditCard } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { timeAgo } from '../../lib/utils';
import type { Notification } from '../../types';

const notifIcon: Record<string, React.ReactNode> = {
  alert: <AlertTriangle className="w-5 h-5 text-amber-400" />,
  payout: <CreditCard className="w-5 h-5 text-emerald-400" />,
  approval: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-red-400" />,
  info: <Info className="w-5 h-5 text-blue-400" />,
};

const notifBg: Record<string, string> = {
  alert: 'bg-amber-500/10 border-amber-500/20',
  payout: 'bg-emerald-500/10 border-emerald-500/20',
  approval: 'bg-indigo-500/10 border-indigo-500/20',
  warning: 'bg-red-500/10 border-red-500/20',
  info: 'bg-blue-500/10 border-blue-500/20',
};

export const NotificationsPage: React.FC = () => {
  const { notifications, markRead, fetchNotifications } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications().then(() => setLoading(false));
  }, []);

  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  const markAllRead = () => {
    unread.forEach(n => markRead(n.id));
  };

  if (loading) return (
    <div className="max-w-2xl space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass-card p-4 h-20 animate-pulse" />
      ))}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Notifications</h2>
          <p className="text-slate-400 text-sm">{unread.length} unread</p>
        </div>
        {unread.length > 0 && (
          <Button size="sm" variant="ghost" onClick={markAllRead} icon={<CheckCheck className="w-4 h-4" />}>
            Mark all read
          </Button>
        )}
      </div>

      {unread.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">New</p>
          <div className="space-y-2">
            {unread.map((n, i) => (
              <NotifItem key={n.id} n={n} idx={i} onRead={markRead} />
            ))}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Earlier</p>
          <div className="space-y-2">
            {read.map((n, i) => (
              <NotifItem key={n.id} n={n} idx={i} onRead={markRead} dimmed />
            ))}
          </div>
        </div>
      )}

      {notifications.length === 0 && (
        <Card className="text-center py-16">
          <Bell className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <p className="text-slate-400">No notifications yet</p>
        </Card>
      )}
    </motion.div>
  );
};

const NotifItem: React.FC<{ n: Notification; idx: number; onRead: (id: string) => void; dimmed?: boolean }> = ({ n, idx, onRead, dimmed }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: idx * 0.05 }}
    onClick={() => !n.read && onRead(n.id)}
    className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/2 ${
      !n.read
        ? `${notifBg[n.type]} border-opacity-100`
        : 'bg-surface-700/30 border-slate-800/60'
    } ${dimmed ? 'opacity-60' : ''}`}
  >
    <div className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${!n.read ? notifBg[n.type] : 'bg-surface-600'}`}>
      {notifIcon[n.type]}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <p className={`text-sm font-semibold ${n.read ? 'text-slate-400' : 'text-white'}`}>{n.title}</p>
        {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />}
      </div>
      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
      <p className="text-xs text-slate-600 mt-1.5">{timeAgo(n.createdAt)}</p>
    </div>
  </motion.div>
);
