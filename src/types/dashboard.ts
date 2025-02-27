export interface NetworkMetrics {
  bandwidth: number;
  packetLoss: number;
  latency: number;
  activeConnections: number;
}

export interface AlertType {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}

export interface NetworkNode {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'warning';
  type: 'switch' | 'router' | 'endpoint';
  metrics: NetworkMetrics;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'engineer' | 'viewer';
  email: string;
}