export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface AlertEvent {
  id: string;
  timestamp: Date;
  severity: AlertSeverity;
  message: string;
  objectType: string;
  distance: number;
  location: string;
  speed: number;
}

export interface SystemStatus {
  isOnline: boolean;
  lastUpdate: Date;
  activeVehicles: number;
  detectionRate: number;
  cpuUsage: number;
  memoryUsage: number;
  batteryLevel: number;
}