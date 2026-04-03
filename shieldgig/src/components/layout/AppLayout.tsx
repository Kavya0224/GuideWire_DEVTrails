import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar, Topbar } from './Sidebar';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  requiredRole?: 'worker' | 'admin';
}

export const AppLayout: React.FC<AppLayoutProps> = ({ requiredRole }) => {
  const { user, token } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCollapsed(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!token || !user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  return (
    <div className="min-h-screen bg-surface-900">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Topbar sidebarCollapsed={collapsed} />
      <motion.main
        animate={{ marginLeft: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="pt-16 min-h-screen"
      >
        <div className="p-6">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};
