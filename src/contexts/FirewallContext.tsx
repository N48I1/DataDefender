import React, { createContext, useContext, useState } from 'react';
import { FirewallRule, FirewallContextType } from '../types/firewall';

const FirewallContext = createContext<FirewallContextType | null>(null);

export const useFirewall = () => {
  const context = useContext(FirewallContext);
  if (!context) {
    throw new Error('useFirewall must be used within a FirewallProvider');
  }
  return context;
};

const initialRules: FirewallRule[] = [
  {
    id: '1',
    name: 'Block External SSH',
    source: '0.0.0.0/0',
    destination: '10.0.0.0/8',
    protocol: 'TCP',
    port: 22,
    action: 'DENY',
    priority: 100,
    description: 'Block all incoming SSH traffic from external networks',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Allow Internal Traffic',
    source: '192.168.0.0/16',
    destination: '192.168.0.0/16',
    protocol: 'ANY',
    port: 'ANY',
    action: 'ALLOW',
    priority: 50,
    description: 'Allow all internal network traffic',
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    name: 'Web Traffic',
    source: '0.0.0.0/0',
    destination: '10.0.0.5',
    protocol: 'TCP',
    port: 443,
    action: 'ALLOW',
    priority: 75,
    description: 'Allow HTTPS traffic to web server',
    createdAt: new Date('2024-01-03'),
  },
];

export const FirewallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rules, setRules] = useState<FirewallRule[]>(initialRules);

  const addRule = (newRule: Omit<FirewallRule, 'id' | 'createdAt'>) => {
    const rule: FirewallRule = {
      ...newRule,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setRules(prev => [...prev, rule].sort((a, b) => a.priority - b.priority));
  };

  const updateRule = (id: string, updatedFields: Partial<FirewallRule>) => {
    setRules(prev => 
      prev.map(rule => 
        rule.id === id 
          ? { ...rule, ...updatedFields }
          : rule
      ).sort((a, b) => a.priority - b.priority)
    );
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  return (
    <FirewallContext.Provider value={{ rules, addRule, updateRule, deleteRule }}>
      {children}
    </FirewallContext.Provider>
  );
};