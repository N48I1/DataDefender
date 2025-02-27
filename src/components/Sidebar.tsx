import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Network, 
  Shield, 
  BarChart3, 
  Settings,
  Bell,
  LogOut 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { unreadCount } = useNotifications();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Network, label: 'Network Topology', href: '/topology' },
    { icon: Shield, label: 'Firewall Rules', href: '/firewall' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Bell, label: 'Notifications', href: '/notifications', badge: unreadCount },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-purple-900 to-black h-screen fixed left-0 top-0 text-white p-4">
      <div className="flex items-center gap-2 mb-8">
        <Network className="h-8 w-8" />
        <h1 className="text-xl font-bold">SDN Manager</h1>
      </div>
      
      <nav>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center gap-3 text-gray-300 hover:text-white hover:bg-purple-800/50 rounded-lg p-3 transition-colors mb-1 ${
                isActive ? 'bg-purple-800/50 text-white' : ''
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 w-full left-0 px-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-purple-800/50 rounded-lg p-3 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;