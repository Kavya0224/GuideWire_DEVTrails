import {
  MOCK_WORKERS, MOCK_ADMIN, MOCK_CLAIMS, MOCK_NOTIFICATIONS,
  MOCK_TRIGGERS, MOCK_PAYOUTS, ANALYTICS_DATA, PLANS,
} from './mockData';
import type { User, Claim, Notification, Trigger, Payout } from '../types';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const mockApi = {
  async login(email: string, _password: string): Promise<{ user: User; token: string }> {
    await delay(1200);
    if (email === 'admin@shieldgig.in') {
      return { user: MOCK_ADMIN, token: 'mock-admin-token-xyz' };
    }
    const worker = MOCK_WORKERS.find(w => w.email === email);
    if (worker) {
      return { user: worker, token: `mock-worker-token-${worker.id}` };
    }
    // default worker fallback
    return { user: MOCK_WORKERS[0], token: 'mock-worker-token-w001' };
  },

  async signup(name: string, email: string, _password: string): Promise<{ user: User; token: string }> {
    await delay(1500);
    const newUser: User = {
      id: `w${Date.now()}`,
      name,
      email,
      role: 'worker',
      phone: '+91 00000 00000',
      city: 'Mumbai',
      zone: 'Andheri West',
      platform: 'zomato',
      trustScore: 50,
      zarsScore: 40,
      plan: 'none',
      joinedAt: new Date().toISOString().split('T')[0],
      earnings: { today: 0, week: 0, month: 0 },
    };
    return { user: newUser, token: `mock-token-${newUser.id}` };
  },

  async getWorkerDashboard(workerId: string) {
    await delay(800);
    const worker = MOCK_WORKERS.find(w => w.id === workerId) || MOCK_WORKERS[0];
    const myClaims = MOCK_CLAIMS.filter(c => c.workerId === worker.id);
    const myNotifications = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
    return { worker, claims: myClaims, unreadNotifications: myNotifications };
  },

  async getClaims(workerId?: string): Promise<Claim[]> {
    await delay(700);
    if (workerId) return MOCK_CLAIMS.filter(c => c.workerId === workerId);
    return MOCK_CLAIMS;
  },

  async getNotifications(workerId: string): Promise<Notification[]> {
    await delay(500);
    // suppress unused warning
    void workerId;
    return MOCK_NOTIFICATIONS;
  },

  async markNotificationRead(id: string): Promise<void> {
    await delay(200);
    const n = MOCK_NOTIFICATIONS.find(n => n.id === id);
    if (n) n.read = true;
  },

  async getPlans() {
    await delay(400);
    return PLANS;
  },

  async purchasePlan(workerId: string, planId: string): Promise<{ success: boolean; message: string }> {
    await delay(1800);
    void workerId;
    return { success: true, message: `Plan ${planId} activated successfully!` };
  },

  async submitClaim(data: Partial<Claim>): Promise<{ success: boolean; claim: Partial<Claim> }> {
    await delay(2000);
    const fraudScore = Math.floor(Math.random() * 40);
    return {
      success: true,
      claim: { ...data, id: `clm${Date.now()}`, status: 'pending', fraudScore, fraudFlags: [] },
    };
  },

  async updateProfile(workerId: string, updates: Partial<User>): Promise<User> {
    await delay(1000);
    const worker = MOCK_WORKERS.find(w => w.id === workerId) || MOCK_WORKERS[0];
    return { ...worker, ...updates };
  },

  // Admin APIs
  async getAdminDashboard() {
    await delay(900);
    return {
      totalWorkers: 15847,
      activeInsured: 9234,
      totalPayoutsMonth: 2840000,
      claimsProcessed: 4821,
      fraudPrevented: 312000,
      avgPayoutTime: 12.4,
      riskAlerts: MOCK_TRIGGERS.filter(t => t.status === 'active').length,
    };
  },

  async getAllWorkers(): Promise<User[]> {
    await delay(700);
    return MOCK_WORKERS;
  },

  async getAllClaims(): Promise<Claim[]> {
    await delay(600);
    return MOCK_CLAIMS;
  },

  async getAllTriggers(): Promise<Trigger[]> {
    await delay(500);
    return MOCK_TRIGGERS;
  },

  async simulateTrigger(type: string, city: string, severity: string): Promise<Trigger> {
    await delay(2000);
    const trigger: Trigger = {
      id: `t${Date.now()}`,
      type: type as Trigger['type'],
      city,
      zone: 'All Zones',
      severity: severity as Trigger['severity'],
      status: 'active',
      affectedWorkers: Math.floor(Math.random() * 2000) + 100,
      triggeredAt: new Date().toISOString(),
      autoPayoutEnabled: true,
      payoutAmount: severity === 'critical' ? 2500 : severity === 'high' ? 1200 : 500,
      description: `Simulated ${type} trigger for ${city} — Severity: ${severity}`,
    };
    MOCK_TRIGGERS.unshift(trigger);
    return trigger;
  },

  async getPayouts(): Promise<Payout[]> {
    await delay(600);
    return MOCK_PAYOUTS;
  },

  async getAnalytics() {
    await delay(800);
    return ANALYTICS_DATA;
  },

  async approveClaim(claimId: string): Promise<void> {
    await delay(1000);
    const claim = MOCK_CLAIMS.find(c => c.id === claimId);
    if (claim) { claim.status = 'approved'; claim.resolvedAt = new Date().toISOString(); }
  },

  async rejectClaim(claimId: string): Promise<void> {
    await delay(1000);
    const claim = MOCK_CLAIMS.find(c => c.id === claimId);
    if (claim) { claim.status = 'rejected'; claim.resolvedAt = new Date().toISOString(); }
  },
};
