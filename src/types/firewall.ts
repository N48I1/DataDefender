export type Protocol = 'TCP' | 'UDP' | 'ICMP' | 'ANY';
export type Action = 'ALLOW' | 'DENY';

export interface FirewallRule {
  id: string;
  name: string;
  source: string;
  destination: string;
  protocol: Protocol;
  port: string | number;
  action: Action;
  priority: number;
  description?: string;
  createdAt: Date;
}

export interface FirewallContextType {
  rules: FirewallRule[];
  addRule: (rule: Omit<FirewallRule, 'id' | 'createdAt'>) => void;
  updateRule: (id: string, rule: Partial<FirewallRule>) => void;
  deleteRule: (id: string) => void;
}