import { create } from 'zustand';
import { AppStatus, DailyStats, DriverProfile, Order } from './types';

interface AppState {
  status: AppStatus;
  driver: DriverProfile | null;
  dailyStats: DailyStats;
  currentOrder: Order | null;
  
  // Actions
  toggleOnline: () => void;
  setOrder: (order: Order | null) => void;
  updateStats: (stats: Partial<DailyStats>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  status: AppStatus.OFFLINE,
  driver: {
    id: 'DRV-001',
    name: 'Thomas Anderson',
    phone: '+33 6 12 34 56 78',
    vehicle: {
      model: 'Peugeot 3008',
      plate: 'AB-123-CD',
      type: 'CAR'
    }
  },
  dailyStats: {
    totalEarnings: 84.50,
    completedOrders: 5,
    onlineTimeMinutes: 120
  },
  currentOrder: null,

  toggleOnline: () => {
    const current = get().status;
    if (current === AppStatus.IN_ORDER) return; // Cannot toggle if in order
    
    set({ status: current === AppStatus.ONLINE ? AppStatus.OFFLINE : AppStatus.ONLINE });
  },

  setOrder: (order) => {
    set({ 
      currentOrder: order,
      status: order ? AppStatus.IN_ORDER : AppStatus.ONLINE
    });
  },

  updateStats: (newStats) => {
    set((state) => ({
      dailyStats: { ...state.dailyStats, ...newStats }
    }));
  }
}));