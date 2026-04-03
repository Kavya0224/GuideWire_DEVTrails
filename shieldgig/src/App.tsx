import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';

import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { BuyPlanPage } from './pages/worker/BuyPlanPage';
import { ClaimsPage } from './pages/worker/ClaimsPage';
import { NotificationsPage } from './pages/worker/NotificationsPage';
import { ProfilePage } from './pages/worker/ProfilePage';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminWorkersPage } from './pages/admin/AdminWorkersPage';
import { AdminClaimsPage } from './pages/admin/AdminClaimsPage';
import { AdminTriggersPage } from './pages/admin/AdminTriggersPage';
import { AdminFraudPage } from './pages/admin/AdminFraudPage';
import { AdminPayoutsPage } from './pages/admin/AdminPayoutsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Worker */}
        <Route element={<AppLayout requiredRole="worker" />}>
          <Route path="/dashboard" element={<WorkerDashboard />} />
          <Route path="/buy-plan" element={<BuyPlanPage />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Admin */}
        <Route element={<AppLayout requiredRole="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/workers" element={<AdminWorkersPage />} />
          <Route path="/admin/claims" element={<AdminClaimsPage />} />
          <Route path="/admin/triggers" element={<AdminTriggersPage />} />
          <Route path="/admin/fraud" element={<AdminFraudPage />} />
          <Route path="/admin/payouts" element={<AdminPayoutsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
