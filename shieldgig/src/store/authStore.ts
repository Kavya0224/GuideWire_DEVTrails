import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Notification } from '../types';
import { mockApi } from '../lib/mockApi';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  notifications: Notification[];
  unreadCount: number;

  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  fetchNotifications: () => Promise<void>;
  markRead: (id: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      notifications: [],
      unreadCount: 0,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockApi.login(email, password);
          set({ user, token, isLoading: false });
          // fetch notifications
          get().fetchNotifications();
        } catch (e) {
          set({ error: 'Invalid credentials. Please try again.', isLoading: false });
        }
      },

      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockApi.signup(name, email, password);
          set({ user, token, isLoading: false });
        } catch (e) {
          set({ error: 'Signup failed. Please try again.', isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null, notifications: [], unreadCount: 0 });
      },

      updateUser: (updates) => {
        const user = get().user;
        if (user) set({ user: { ...user, ...updates } });
      },

      fetchNotifications: async () => {
        const user = get().user;
        if (!user) return;
        const notifications = await mockApi.getNotifications(user.id);
        const unreadCount = notifications.filter(n => !n.read).length;
        set({ notifications, unreadCount });
      },

      markRead: (id) => {
        const notifications = get().notifications.map(n =>
          n.id === id ? { ...n, read: true } : n
        );
        const unreadCount = notifications.filter(n => !n.read).length;
        set({ notifications, unreadCount });
        mockApi.markNotificationRead(id);
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'shieldgig-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
