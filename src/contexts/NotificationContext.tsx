import React, { createContext, useContext, useState } from 'react';
import { Notification, NotificationContextType } from '../types/notifications';

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'High CPU Usage',
    message: 'Node SW-Core-01 experiencing CPU utilization above 80%',
    type: 'warning',
    timestamp: new Date(Date.now() - 120000),
    read: false,
  },
  {
    id: '2',
    title: 'Network Link Down',
    message: 'Connection lost between SW-Edge-01 and SW-Core-02',
    type: 'error',
    timestamp: new Date(Date.now() - 300000),
    read: false,
  },
  {
    id: '3',
    title: 'Firewall Rule Update',
    message: 'New firewall rules have been applied successfully',
    type: 'info',
    timestamp: new Date(Date.now() - 900000),
    read: false,
  },
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      markAllAsRead, 
      clearNotification 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};