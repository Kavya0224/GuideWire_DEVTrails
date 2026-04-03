import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ShieldCheck, FileText, Bell, User,
  LogOut, ChevronLeft, ChevronRight, Zap, Users, AlertTriangle,
  TrendingUp, CreditCard, Activity, Shield,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

const workerLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/buy-plan', icon: ShieldCheck, label: 'My Plan' },
  { to: '/claims', icon: FileText, label: 'Claims' },
  { to: '/notifications', icon: Bell, label: 'Notifications', badge: true },
  { to: '/profile', icon: User, label: 'Profile' },
];

const adminLinks = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/workers', icon: Users, label: 'Workers' },
  { to: '/admin/claims', icon: FileText, label: 'Claims' },
  { to: '/admin/triggers', icon: Zap, label: 'Triggers' },
  { to: '/admin/fraud', icon: AlertTriangle, label: 'Fraud Detect' },
  { to: '/admin/payouts', icon: CreditCard, label: 'Payouts' },
  { to: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { user, unreadCount, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const links = user?.role === 'admin' ? adminLinks : workerLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col glass border-r border-slate-800/80 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800/80">
        <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0 glow-sm">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-bold text-lg gradient-text">ShieldGig</span>
              <p className="text-xs text-slate-500 -mt-0.5">
                {user?.role === 'admin' ? 'Admin Panel' : 'Worker Portal'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-7 w-7 h-7 bg-surface-600 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all z-10"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Nav links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {links.map(({ to, icon: Icon, label, badge }) => {
          const isActive = location.pathname === to || (to !== '/dashboard' && to !== '/admin/dashboard' && location.pathname.startsWith(to));
          return (
            <NavLink key={to} to={to}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative',
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                <div className="relative flex-shrink-0">
                  <Icon className={cn('w-5 h-5', isActive && 'text-indigo-400')} />
                  {badge && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="truncate"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-r"
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-slate-800/80 p-3">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export const Topbar: React.FC<{ sidebarCollapsed: boolean }> = ({ sidebarCollapsed }) => {
  const { user, unreadCount } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const map: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/buy-plan': 'Insurance Plans',
      '/claims': 'My Claims',
      '/notifications': 'Notifications',
      '/profile': 'My Profile',
      '/admin/dashboard': 'Admin Overview',
      '/admin/workers': 'Worker Management',
      '/admin/claims': 'Claims Management',
      '/admin/triggers': 'Trigger Simulator',
      '/admin/fraud': 'Fraud Detection',
      '/admin/payouts': 'Payout Management',
      '/admin/analytics': 'Analytics',
    };
    return map[location.pathname] || 'ShieldGig';
  };

  return (
    <header
      className="fixed top-0 right-0 h-16 z-40 glass border-b border-slate-800/80 flex items-center justify-between px-6 transition-all duration-300"
      style={{ left: sidebarCollapsed ? 72 : 240 }}
    >
      <div>
        <h1 className="text-lg font-bold text-white">{getPageTitle()}</h1>
        <p className="text-xs text-slate-500">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">Systems Operational</span>
        </div>
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white leading-none">{user?.name?.split(' ')[0]}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
