export type UserRole = 'worker' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  city: string;
  zone: string;
  platform: 'zomato' | 'swiggy' | 'both';
  trustScore: number;
  zarsScore: number;
  plan: 'none' | 'basic' | 'plus' | 'pro';
  joinedAt: string;
  avatar?: string;
  earnings: {
    today: number;
    week: number;
    month: number;
  };
}

export interface Plan {
  id: 'basic' | 'plus' | 'pro';
  name: string;
  price: number;
  coverage: number;
  features: string[];
  popular?: boolean;
}

export interface Claim {
  id: string;
  workerId: string;
  workerName: string;
  type: 'weather' | 'aqi' | 'curfew' | 'platform_outage' | 'accident';
  status: 'approved' | 'under_review' | 'rejected' | 'pending';
  amount: number;
  requestedAt: string;
  resolvedAt?: string;
  fraudScore: number;
  fraudFlags: FraudFlag[];
  city: string;
  zone: string;
  description: string;
  evidence?: string;
}

export interface FraudFlag {
  type: 'location_mismatch' | 'repeated_claim' | 'suspicious_timing' | 'device_anomaly' | 'velocity_check';
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'payout' | 'approval' | 'warning' | 'info';
  read: boolean;
  createdAt: string;
  icon?: string;
}

export interface Trigger {
  id: string;
  type: 'weather' | 'aqi' | 'curfew' | 'platform_outage';
  city: string;
  zone: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'monitoring';
  affectedWorkers: number;
  triggeredAt: string;
  resolvedAt?: string;
  autoPayoutEnabled: boolean;
  payoutAmount: number;
  description: string;
}

export interface Payout {
  id: string;
  workerId: string;
  workerName: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  method: 'upi' | 'bank' | 'wallet';
  triggeredBy: string;
  createdAt: string;
  completedAt?: string;
}

export interface AnalyticsData {
  date: string;
  claims: number;
  payouts: number;
  revenue: number;
  activeWorkers: number;
}
