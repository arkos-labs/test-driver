export interface DriverProfile {
  id: string;
  name: string;
  phone: string;
  avatarUrl?: string;
  vehicle: {
    model: string;
    plate: string;
    type: 'SCOOTER' | 'CAR' | 'VAN';
  };
}

export interface DailyStats {
  totalEarnings: number;
  completedOrders: number;
  onlineTimeMinutes: number;
}

export interface Order {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  price: number;
  distanceKm: number;
  status: 'PENDING' | 'ACCEPTED' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED';
}

export enum AppStatus {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
  IN_ORDER = 'IN_ORDER'
}